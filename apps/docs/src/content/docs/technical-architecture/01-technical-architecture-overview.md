---
title: Technical Architecture Overview
description: Техническая архитектура первой production-реализации платформы «Призма».
---

---

# Technical Architecture Overview

## Статус

Proposed

---

## Введение

Архитектурная книга определяет фундаментальные свойства «Призмы».

Она отвечает на вопросы:

- что представляет собой цифровой мир;
- какие сущности существуют внутри него;
- каким образом изменяется состояние;
- где проходят границы согласованности;
- как работают события, версии и проекции;
- каким образом платформа должна вести себя при отказах;
- как сохраняется история;
- как архитектура развивается во времени.

Однако этих правил недостаточно, чтобы начать реализацию.

Необходимо определить, каким образом они будут выражены в конкретной технической системе.

Эту задачу решает Technical Architecture.

---

## Что такое Technical Architecture

Technical Architecture представляет собой конкретную техническую модель реализации архитектурных принципов «Призмы».

Она определяет:

- структуру backend;
- структуру frontend;
- persistent storage;
- realtime transport;
- GIS и 3D rendering;
- интеграционные адаптеры;
- работу с файлами;
- deployment topology;
- runtime boundaries;
- observability;
- security implementation;
- путь развития системы.

Если Architecture Book отвечает:

> какой должна быть система?

то Technical Architecture отвечает:

> как именно мы строим такую систему сейчас?

---

## Architecture Book и Technical Architecture

Между этими документами должна существовать чёткая граница.

```text
Architecture Book
       │
       │ определяет
       ▼
Architectural Properties
       │
       │ реализуются через
       ▼
Technical Architecture
       │
       │ реализуется в
       ▼
Source Code
```

Technical Architecture не имеет права противоречить фундаментальным инвариантам Architecture Book.

---

## Пример

Architecture Book определяет:

> Projection не является источником истины.

Technical Architecture может определить:

```text
PostgreSQL
   │
   ├── Authoritative State
   │
   └── Map Projection
```

Обе структуры физически могут находиться даже в одной базе.

Но архитектурно они остаются разными.

Map Projection должна иметь возможность быть перестроенной.

---

## Другой пример

Architecture Book определяет:

> Module boundary не равна network boundary.

Следовательно, Technical Architecture не обязана создавать:

```text
transport-service
camera-service
relation-service
object-service
```

только потому, что существуют соответствующие предметные области.

Первоначально они могут работать внутри одного backend process.

---

# Цель первой реализации

Первая версия «Призмы» не должна пытаться реализовать все будущие возможности платформы.

Её задача — доказать работоспособность фундаментальной архитектурной цепочки.

```text
Physical World
      │
      ▼
Digital Object
      │
      ▼
Execution
      │
      ▼
Persistent State
      │
      ▼
Projection
      │
      ▼
Realtime
      │
      ▼
User Interface
```

Если эта цепочка построена правильно, дальнейшая функциональность развивается поверх неё.

---

# Архитектурная стратегия v1

Для первой production-реализации используется модель:

> **логически разделять систему сразу, физически разделять только при появлении причины.**

```text
Logical architecture

Platform Core
Transport
Cameras
World
Execution
Projections
Realtime

          │
          │ deployment mapping
          ▼

Physical architecture v1

┌───────────────────────────┐
│      Prizma Backend       │
│                           │
│ Platform Core             │
│ Transport                 │
│ Cameras                   │
│ Execution                 │
│ Projections               │
│ Realtime                  │
└───────────────────────────┘
```

Это означает использование **модульного монолита** как начальной backend topology.

---

# Почему модульный монолит

Модульный монолит позволяет сохранить архитектурные границы без преждевременной стоимости распределённой системы.

Внутри процесса:

```text
Transport Module
      │
      ▼
Camera Public Contract
      │
      ▼
Camera Module
```

взаимодействие может быть обычным in-process вызовом.

После физического разделения:

```text
Transport Service
      │
      ▼
Network
      │
      ▼
Camera Service
```

семантика контракта может остаться прежней.

---

## Что мы выигрываем

На раннем этапе:

- проще локальная разработка;
- проще debugging;
- проще transactions;
- меньше infrastructure;
- меньше сетевых failure modes;
- проще deployment;
- проще onboarding backend-разработчика;
- быстрее создание первого vertical slice.

---

## Что мы сознательно не делаем

Первая версия не строится как набор мелких сервисов.

Не создаются отдельные:

```text
Object Service
Relation Service
Event Service
Transport Service
Camera Service
Projection Service
Realtime Service
```

только ради service separation.

Физическое разделение появляется после возникновения измеримой необходимости.

---

# Базовый технологический стек

Первая реализация ориентируется на следующий технологический фундамент.

```text
Backend
  │
  └── .NET / C#

Primary Database
  │
  └── PostgreSQL

Spatial Database
  │
  └── PostGIS

Frontend
  │
  └── React + TypeScript

GIS
  │
  └── MapLibre GL

3D Rendering
  │
  └── Three.js

Realtime
  │
  └── SignalR

Binary Storage
  │
  └── S3-compatible Object Storage
```

Это не означает, что технологии становятся частью фундаментальной Domain Model.

---

# Почему .NET / C#

Backend-разработчик команды работает с C#.

Кроме организационного фактора, .NET хорошо соответствует требованиям платформы:

- строгая типизация;
- развитая async model;
- зрелый web stack;
- SignalR;
- OpenTelemetry;
- хорошие PostgreSQL drivers;
- развитая dependency injection ecosystem;
- удобная реализация background workers.

Главный аргумент здесь не:

> .NET является лучшей технологией вообще.

А:

> .NET позволяет реализовать нужную архитектурную модель без искусственных ограничений и соответствует компетенции backend-команды.

---

# Почему PostgreSQL

«Призма» работает с большим количеством структурированных и связанных данных:

- Object;
- Component state;
- Relation;
- Version;
- Event metadata;
- permissions;
- configuration;
- projections.

PostgreSQL предоставляет:

- ACID transactions;
- constraints;
- indexes;
- mature tooling;
- replication capabilities;
- extensibility;
- поддержку PostGIS.

Это хорошо соответствует Execution Model.

---

# Почему PostGIS

Пространственная модель является одной из центральных возможностей «Призмы».

Необходимо выполнять запросы вроде:

```text
Какие объекты находятся внутри области?
```

```text
Какие автомобили находятся рядом с камерой?
```

```text
Какие объекты попадают в текущий viewport?
```

```text
Какие отношения имеют пространственную зависимость?
```

PostGIS позволяет решать эти задачи на уровне persistent spatial model.

---

# Backend и GIS имеют разные обязанности

PostGIS отвечает за пространственные данные и запросы.

MapLibre и Three.js отвечают за визуальное представление.

```text
PostGIS
  │
  ▼
Spatial Projection
  │
  ▼
Frontend
  │
  ├── MapLibre
  └── Three.js
```

Визуальный offset модели не должен автоматически становиться geographic state объекта.

---

# Почему React

React используется как основа product frontend.

Но React не является storage для цифрового мира.

```text
Backend Projection
      │
      ▼
Frontend State
      │
      ▼
React UI
```

Высокочастотный rendering path карты может существовать отдельно от стандартного React update cycle.

---

# Почему FSD

Frontend «Призмы» ожидаемо будет большим.

Будут существовать:

- карта;
- карточки объектов;
- сценарии;
- камеры;
- редакторы;
- аналитика;
- управление пользователями;
- настройки.

FSD используется для разделения ответственности интерфейса.

```text
app
pages
widgets
features
entities
shared
```

FSD не определяет Domain Architecture backend.

Это frontend organizational architecture.

---

# Почему MapLibre

MapLibre предоставляет:

- карту;
- globe;
- vector layers;
- terrain;
- custom layers;
- geographic camera;
- большой объём GIS-инфраструктуры.

Это делает его основой spatial presentation.

---

# Почему Three.js

MapLibre хорошо работает с географическим представлением.

Но «Призма» требует более сложного 3D:

- автомобили;
- камеры;
- оборудование;
- 3D-модели;
- пространственные индикаторы;
- custom visualizations.

Three.js используется как 3D rendering engine поверх карты.

```text
MapLibre
   │
   └── CustomLayer
          │
          ▼
       Three.js
```

---

# Почему SignalR

Пользовательский интерфейс должен быстро получать изменения цифрового мира.

Например:

```text
VehiclePositionChanged
CameraStateChanged
ObjectCreated
ObjectRemoved
```

Для .NET backend SignalR является естественной первой реализацией realtime transport.

Важно:

```text
SignalR ≠ Event Model
```

SignalR только доставляет информацию.

---

# Binary Storage

Файлы не должны храниться как огромные binary blobs внутри основной relational model без необходимости.

```text
PostgreSQL
  │
  └── File Metadata
          │
          ▼
      Object Storage
          │
          └── Binary
```

Для этого используется S3-compatible object storage.

Конкретная реализация может быть MinIO или облачное S3-compatible решение.

---

# Начальная runtime topology

Первая версия может выглядеть так:

```text
                         Client Browser
                               │
                               ▼
                    ┌────────────────────┐
                    │    Web Frontend    │
                    │ React + MapLibre   │
                    │     + Three.js     │
                    └─────────┬──────────┘
                              │
                    HTTP + SignalR
                              │
                              ▼
                ┌───────────────────────────┐
                │       Prizma Backend      │
                │                           │
                │ ASP.NET                   │
                │                           │
                │ Platform Core             │
                │ Execution                 │
                │ Transport                 │
                │ Cameras                   │
                │ Projections               │
                │ Realtime                  │
                └────────────┬──────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
       ┌─────────────────┐       ┌─────────────────┐
       │ PostgreSQL      │       │ Object Storage  │
       │ + PostGIS       │       │                 │
       └─────────────────┘       └─────────────────┘
```

---

# Что пока отсутствует

В этой topology сознательно отсутствуют:

- Kafka;
- RabbitMQ;
- Redis;
- Elasticsearch;
- Kubernetes;
- отдельный realtime cluster;
- отдельный analytics service;
- отдельный media service;
- edge infrastructure.

Это не означает, что эти технологии запрещены.

Это означает, что сейчас нет причины делать их обязательным фундаментом.

---

# Broker

В Architecture Book существует event-based взаимодействие.

Но event architecture не означает обязательный message broker с первого дня.

На раннем этапе можно использовать:

```text
Transaction
   │
   ├── State
   └── Outbox
           │
           ▼
     Background Dispatcher
           │
           ▼
      Consumers
```

Когда появится необходимость:

```text
high throughput
large fan-out
independent deployment
durable distributed consumers
```

между Outbox и consumer может появиться broker.

---

# Redis

Redis также не добавляется автоматически.

Potential use cases:

- distributed cache;
- ephemeral coordination;
- SignalR backplane;
- rate limiting.

Пока ни один из них не является обязательным для первого vertical slice.

---

# Search Engine

Elasticsearch/OpenSearch не нужен, пока PostgreSQL способен обслуживать реальные search workload.

Если появится:

- полнотекстовый поиск большого масштаба;
- сложная search ranking;
- отдельная analytics workload;

тогда search projection может быть вынесена в специализированный engine.

---

# Kubernetes

Kubernetes решает задачи управления большим количеством deployment units.

В первой версии deployment units мало.

Следовательно:

```text
Few deployment units
      │
      ▼
Simple deployment first
```

Kubernetes может появиться позже при реальной эксплуатационной необходимости.

---

# Архитектурный путь пользовательского действия

Например, оператор изменяет положение автомобиля.

```text
User
  │
  ▼
React Feature
  │
  ▼
HTTP Command
  │
  ▼
ASP.NET Endpoint
  │
  ▼
Application Command
  │
  ▼
Authorization
  │
  ▼
Execution Pipeline
  │
  ▼
Transport Domain
  │
  ▼
PostgreSQL Transaction
  │
  ├── Vehicle State
  ├── Version
  └── Outbox Event
          │
          ▼
      Projection
          │
          ▼
       SignalR
          │
          ▼
      Other Clients
```

Это один из главных путей, который должна доказать первая реализация.

---

# Архитектурный путь внешнего наблюдения

GPS provider передаёт координату.

```text
GPS Provider
     │
     ▼
Integration Adapter
     │
     ▼
External Identity Mapping
     │
     ▼
Unit normalization
     │
     ▼
Internal observation
     │
     ▼
Execution
     │
     ▼
Transport State
     │
     ▼
Projection
     │
     ▼
Map
```

Domain Model не знает формат GPS provider.

---

# Архитектурный путь чтения

Пользователь открывает карту.

```text
Map Page
   │
   ▼
Viewport
   │
   ▼
Map Projection Query
   │
   ▼
PostGIS spatial query
   │
   ▼
Visible Object Projection
   │
   ▼
Frontend Spatial State
   │
   ▼
MapLibre / Three.js
```

После этого realtime subscription обновляет только релевантные объекты.

---

# Граница frontend/backend

Frontend не получает прямого доступа к:

- tables;
- EF models;
- internal aggregates;
- provider APIs.

```text
Frontend
    │
    ▼
Public Contracts
    │
    ▼
Backend
```

Transport DTO заканчивается на frontend API boundary.

---

# Граница backend/storage

Domain не знает:

```text
DbContext
NpgsqlConnection
SQL table
```

Domain знает:

```text
Object
Relation
State
Invariant
```

Persistence adapter преобразует одно в другое.

---

# Первая масштабируемая граница

Из всех подсистем наиболее вероятный первый кандидат на физическое отделение — Media Plane.

Причина проста:

```text
Domain workload
    ≠
Video workload
```

Видео имеет совершенно другой профиль:

- bandwidth;
- codecs;
- sessions;
- buffering;
- CPU/GPU.

Поэтому Camera Domain и Media Plane проектируются как разные технические области уже сейчас.

Но отдельный service создаётся только при необходимости.

---

# Observability с первого vertical slice

Observability не откладывается до production.

Минимально необходимы:

```text
Structured Logs
TraceId
CommandId
ObjectId
Request latency
Database latency
Execution result
```

Позже добавляются:

- projection lag;
- realtime connections;
- integration status;
- frontend performance;
- media metrics.

---

# Security с первого vertical slice

Даже если первая версия имеет простую модель пользователей, архитектурный путь должен учитывать:

```text
Subject
   │
   ▼
Command
   │
   ▼
Authorization
   │
   ▼
Execution
```

Нельзя сначала построить backend без понятия Subject, а потом пытаться добавить security поверх всех команд.

---

# Первый vertical slice

Первая реализация должна доказать основную цепочку.

Мы берём простой объект — автомобиль.

```text
Create Vehicle
      │
      ▼
Persist
      │
      ▼
Map Projection
      │
      ▼
Display on Map
      │
      ▼
Update Position
      │
      ▼
Realtime Update
      │
      ▼
Vehicle moves
```

Это маленькая функция с очень большим архитектурным значением.

---

# Что этот slice проверяет

Он одновременно заставляет реализовать:

- Object Identity;
- Module boundary;
- Command;
- Execution;
- Validation;
- Transaction;
- Version;
- PostgreSQL;
- PostGIS;
- Projection;
- HTTP;
- Realtime;
- React state;
- MapLibre;
- observability;
- migration.

После этого у нас существует настоящий вертикальный каркас платформы.

---

# Что не входит в первый slice

Сознательно не входят:

- сложная аналитика;
- video streaming;
- edge;
- workflow engine;
- plugin system;
- сложное управление пользователями;
- несколько физических backend services;
- распределённый broker cluster.

---

# Принцип развития

Дальнейшее развитие происходит вертикальными increments.

```text
Vehicle
   │
   ▼
Relations
   │
   ▼
Camera
   │
   ▼
Video
   │
   ▼
Integrations
   │
   ▼
Analytics
   │
   ▼
Automation
```

Каждый increment расширяет работающий Digital World.

---

# Критерий хорошего технического решения

Для любого решения задаём три вопроса.

### 1. Какое архитектурное требование оно реализует?

Например:

```text
PostGIS
   │
   ▼
Spatial query requirement
```

### 2. Какую стоимость оно создаёт?

Например:

```text
Message Broker
   │
   ├── operational complexity
   ├── delivery semantics
   └── monitoring
```

### 3. Можно ли отложить эту стоимость?

Если технология не решает текущую проблему, она не становится обязательной.

---

# Инварианты Technical Architecture v1

Первая Technical Architecture обязана соблюдать следующие правила.

- Backend начинается как модульный монолит.
- Domain Modules отделены независимо от deployment topology.
- PostgreSQL является transactional source для первой версии.
- PostGIS обслуживает persistent spatial model.
- Frontend использует React + TypeScript и FSD.
- MapLibre является основой geographic presentation.
- Three.js используется для специализированного 3D rendering.
- SignalR является realtime transport первой версии.
- Binary content хранится отдельно от основной relational model.
- Projection не является Source of Truth.
- Infrastructure не определяет Domain Model.
- External integrations заканчиваются на Adapter Boundary.
- Security Context проходит Execution Pipeline.
- Observability существует с первого vertical slice.
- Новая инфраструктурная технология добавляется только при наличии конкретной потребности.
- Physical distribution следует за измеряемой нагрузкой, а не предшествует ей.

---

# Архитектурное значение

Эта страница определяет техническую форму первой версии «Призмы».

Она сознательно оставляет систему простой физически:

```text
Frontend
   │
Backend
   │
PostgreSQL
```

но сложной и строгой логически:

```text
Platform Core
Domain Modules
Execution Model
Projection Model
Integration Boundaries
Security
Observability
```

Именно такое разделение позволяет начать разработку без преждевременной распределённой инфраструктуры и при этом не оказаться в обычном монолите без архитектурных границ.

---

## Заключение

Теперь известна общая техническая форма первой реализации.

Но эта форма должна быть выражена непосредственно в структуре исходного кода.

Следующий вопрос:

> Как организовать monorepo так, чтобы границы Architecture Book были видны уже на уровне каталогов, проектов и зависимостей?

Этому посвящена следующая страница — **Repository Structure**.
