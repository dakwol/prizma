---
title: Repository Structure
description: Структура monorepo платформы «Призма», границы приложений, модулей и правила зависимостей между ними.
---

---

# Repository Structure

## Статус

Proposed

---

## Введение

Архитектурные границы имеют ценность только тогда, когда разработчик может увидеть их в коде.

Если Architecture Book говорит о независимых модулях, а исходный код представляет собой:

```text
src/
├── services/
├── helpers/
├── models/
├── utils/
└── repositories/
```

то реальные границы системы быстро теряются.

Через некоторое время становится невозможно определить:

- какой модуль владеет данными;
- где находятся предметные правила;
- кто имеет право изменять объект;
- какой код является публичным контрактом;
- что можно использовать из другого модуля;
- где заканчивается Domain и начинается Infrastructure.

Поэтому структура репозитория является частью Technical Architecture.

Она должна делать правильный путь разработки естественным, а нарушение архитектурных границ — заметным.

---

# Основной принцип

Структура кода должна следовать **ответственности**, а не техническому типу файлов.

Плохая организация:

```text
backend/
├── controllers/
├── services/
├── repositories/
├── entities/
└── validators/
```

На первый взгляд она выглядит аккуратно.

Но когда появляется несколько предметных областей, код одной функции оказывается разбросан по всему приложению:

```text
controllers/
└── VehicleController.cs

services/
└── VehicleService.cs

repositories/
└── VehicleRepository.cs

entities/
└── Vehicle.cs

validators/
└── VehicleValidator.cs
```

Чтобы понять Transport Domain, приходится ходить по всему repository tree.

---

## В «Призме» используем вертикальное разделение

```text
Modules/
├── Transport/
├── Cameras/
├── World/
└── ...
```

Внутри каждого модуля уже существуют:

```text
Domain
Application
Contracts
Infrastructure
```

Таким образом весь код, принадлежащий одной предметной области, находится рядом.

---

# Monorepo

«Призма» развивается как monorepo.

На верхнем уровне находятся основные технические области платформы.

```text
prizma/
│
├── apps/
│   └── docs/
│
├── backend/
│
├── frontend/
│
├── infrastructure/
│
├── docs/
│
├── .github/
│
├── README.md
└── ...
```

Эти каталоги имеют разную ответственность.

---

# `apps/docs`

`apps/docs` является приложением документации.

```text
apps/
└── docs/
    ├── src/
    │   └── content/
    │       └── docs/
    │
    ├── public/
    └── package.json
```

Здесь находится Starlight/Astro-приложение, которое отображает документацию.

Важно:

```text
apps/docs
    ≠
product frontend
```

Documentation application не должно постепенно превращаться в административный интерфейс или часть основного продукта.

---

# Документация

Внутри documentation content разделяем несколько типов знаний.

```text
apps/docs/src/content/docs/
│
├── architecture-book/
│
├── technical-architecture/
│
├── product/
│
├── adr/
│
└── rfc/
```

---

## `architecture-book`

Содержит фундаментальные свойства системы.

```text
architecture-book/
├── 01-foundation/
├── 02-domain-model/
├── 03-execution-model/
├── ...
└── architecture-summary/
```

Этот раздел изменяется относительно редко.

---

## `technical-architecture`

Содержит текущую техническую реализацию архитектуры.

```text
technical-architecture/
├── 01-technical-architecture-overview.md
├── 02-repository-structure.md
├── 03-backend-architecture.md
└── ...
```

Он может изменяться значительно чаще Architecture Book.

---

## `adr`

Фиксирует принятые технические и архитектурные решения.

Например:

```text
adr/
├── 0001-use-modular-monolith.md
├── 0002-use-postgresql-postgis.md
├── 0003-use-signalr-for-realtime.md
└── ...
```

---

## `rfc`

Содержит предложения, которые ещё обсуждаются.

```text
rfc/
├── 0001-media-plane.md
└── ...
```

После принятия RFC его результат может быть зафиксирован ADR.

---

# Backend

Backend является самостоятельной областью monorepo.

```text
backend/
│
├── Prizma.sln
│
├── src/
│
├── tests/
│
├── Directory.Build.props
│
├── Directory.Packages.props
│
└── README.md
```

---

# Backend solution

Первая версия backend строится вокруг одного solution.

```text
Prizma.sln
```

Solution объединяет:

- API;
- Platform Core;
- Domain Modules;
- Infrastructure;
- Tests.

---

# `backend/src`

Базовая структура:

```text
backend/src/
│
├── Prizma.Api/
│
├── Prizma.Platform/
│
├── Modules/
│   ├── Transport/
│   ├── Cameras/
│   └── ...
│
└── Prizma.Infrastructure/
```

При росте проекта отдельные части могут быть вынесены в самостоятельные `.csproj`.

Но логическая структура должна существовать с самого начала.

---

# `Prizma.Api`

```text
Prizma.Api/
│
├── Endpoints/
├── Realtime/
├── Middleware/
├── Configuration/
└── Program.cs
```

API является внешней transport boundary.

Он отвечает за:

- HTTP;
- authentication transport;
- serialization;
- status codes;
- SignalR endpoints;
- middleware;
- application composition.

---

## Чего не должно быть в API

```text
Prizma.Api
    X
Domain Rules
```

Например, endpoint не должен содержать:

```text
if vehicle.Status == Archived
    reject movement
```

Это предметный invariant Transport Module.

---

# Platform

`Prizma.Platform` содержит фундаментальные механизмы, определённые Architecture Book.

```text
Prizma.Platform/
│
├── Objects/
├── Components/
├── Relations/
├── Events/
├── Execution/
├── Identity/
├── Versioning/
└── Time/
```

Однако Platform должен оставаться небольшим.

---

## Опасность Platform Core

Очень легко превратить Core в:

```text
Prizma.Platform/
├── Everything/
├── Shared/
├── Common/
└── Utils/
```

После этого любой модуль начинает складывать туда удобный общий код.

Так делать нельзя.

---

## Правило

Код попадает в Platform только если он действительно является фундаментальным primitive цифрового мира.

Например:

```text
ObjectId
RelationId
ExecutionContext
DomainVersion
```

Но:

```text
VehicleSpeed
CameraDirection
RouteStatus
```

не являются Platform concepts.

---

# Domain Modules

Предметные возможности группируются по модулям.

Например:

```text
Modules/
│
├── Transport/
│
├── Cameras/
│
├── Access/
│
└── ...
```

Список модулей не фиксируется навсегда этой страницей.

Он развивается вместе с пониманием Domain.

---

# Структура модуля

Возьмём Transport.

```text
Modules/
└── Transport/
    │
    ├── Domain/
    ├── Application/
    ├── Contracts/
    └── Infrastructure/
```

---

# Domain

```text
Transport/
└── Domain/
    ├── Vehicles/
    ├── Routes/
    ├── Events/
    ├── ValueObjects/
    └── Services/
```

Здесь находятся предметные правила Transport.

---

## Пример

```text
Domain/
└── Vehicles/
    ├── Vehicle.cs
    ├── VehicleId.cs
    ├── VehicleStatus.cs
    └── VehiclePosition.cs
```

Если позже окажется, что `Vehicle` не является самостоятельной Domain Entity, а реализуется через Platform Object + Components, структура изменится.

Важно не название каталога.

Важно ownership.

---

# Application

```text
Transport/
└── Application/
    ├── Commands/
    ├── Queries/
    └── Services/
```

Application организует use cases.

Например:

```text
Commands/
├── CreateVehicle/
├── UpdateVehiclePosition/
└── AssignVehicleRoute/
```

---

# Вертикальная организация use case

Вместо:

```text
Commands/
├── CreateVehicleCommand.cs
├── UpdateVehicleCommand.cs

Handlers/
├── CreateVehicleHandler.cs
├── UpdateVehicleHandler.cs

Validators/
├── CreateVehicleValidator.cs
└── UpdateVehicleValidator.cs
```

предпочтительнее:

```text
Commands/
├── CreateVehicle/
│   ├── CreateVehicleCommand.cs
│   ├── CreateVehicleHandler.cs
│   └── CreateVehicleValidator.cs
│
└── UpdateVehiclePosition/
    ├── UpdateVehiclePositionCommand.cs
    ├── UpdateVehiclePositionHandler.cs
    └── UpdateVehiclePositionValidator.cs
```

Один use case находится в одном месте.

---

# Contracts

`Contracts` содержит то, что модуль разрешает использовать снаружи.

```text
Transport/
└── Contracts/
    ├── Commands/
    ├── Queries/
    ├── Events/
    └── Models/
```

---

## Главное правило

Другой модуль может импортировать:

```text
Transport.Contracts
```

но не:

```text
Transport.Domain
Transport.Infrastructure
Transport.Application.Internal
```

---

# Пример межмодульного взаимодействия

Камера установлена на автомобиль.

Camera Module может потребовать информацию о существовании объекта Transport.

Неправильно:

```text
Cameras
   │
   ▼
TransportRepository
   │
   ▼
transport.vehicles
```

Так Camera Module начинает знать внутреннее устройство Transport.

---

## Правильно

```text
Cameras
   │
   ▼
Transport Contract
   │
   ▼
Transport
```

Например:

```text
GetTransportObject
```

или другой специально определённый public contract.

---

# Infrastructure внутри модуля

```text
Transport/
└── Infrastructure/
    ├── Persistence/
    ├── Integrations/
    └── Configuration/
```

Здесь находятся технические реализации interfaces, определённых Application/Domain.

---

## Persistence

Например:

```text
Infrastructure/
└── Persistence/
    ├── TransportDbContext.cs
    ├── Configurations/
    └── Repositories/
```

---

## Integration

Например:

```text
Infrastructure/
└── Integrations/
    └── GpsProvider/
        ├── GpsProviderClient.cs
        ├── GpsProviderMapper.cs
        └── GpsProviderOptions.cs
```

GPS provider не должен быть виден Domain.

---

# Shared Infrastructure

Некоторые механизмы действительно являются общими.

Например:

```text
Prizma.Infrastructure/
│
├── Persistence/
├── Messaging/
├── ObjectStorage/
├── Observability/
└── Security/
```

Но сюда помещается именно **technical infrastructure**, а не предметный код.

---

# Что запрещено складывать в `Shared`

Мы сознательно избегаем каталогов:

```text
Shared/
Common/
Helpers/
Utils/
```

как универсального места для всего.

---

## Почему

Типичный жизненный цикл:

```text
Useful function
      │
      ▼
shared/utils
      │
      ▼
Another function
      │
      ▼
Another model
      │
      ▼
Half the project
```

После этого ownership исчезает.

---

# Когда код действительно общий

Код можно поднять выше только если существует **общая семантика**, а не просто похожая реализация.

Например, две функции:

```text
Transport.calculateDistance()
Camera.calculateDistance()
```

не означают автоматически необходимость:

```text
shared/calculateDistance
```

Возможно, одна работает с geographic distance, а другая — с local scene coordinates.

Сначала определяется смысл.

Потом abstraction.

---

# Tests

Backend tests отражают production structure.

```text
backend/tests/
│
├── Prizma.Platform.Tests/
├── Prizma.Transport.Tests/
├── Prizma.Cameras.Tests/
├── Prizma.IntegrationTests/
└── Prizma.ArchitectureTests/
```

---

# Architecture Tests

Особенно важен отдельный слой:

```text
Prizma.ArchitectureTests
```

Он автоматически проверяет правила зависимостей.

Например:

```text
Transport
    X
Cameras.Infrastructure
```

или:

```text
Domain
    X
EntityFrameworkCore
```

---

## Пример правила

```text
Domain projects
must not reference
Infrastructure projects
```

Так архитектурное правило перестаёт быть только текстом в книге.

---

# Frontend

Frontend является отдельным приложением.

```text
frontend/
│
├── src/
├── public/
├── package.json
├── tsconfig.json
└── ...
```

---

# FSD структура

```text
frontend/src/
│
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

---

# `app`

```text
app/
├── providers/
├── router/
├── styles/
└── index.tsx
```

`app` отвечает за композицию приложения.

---

# `pages`

```text
pages/
├── WorldPage/
├── CamerasPage/
└── ...
```

Page собирает widgets/features для route-level сценария.

---

# `widgets`

Например:

```text
widgets/
├── WorldMap/
├── ObjectTree/
├── ObjectDetailsSidebar/
└── CameraViewer/
```

Widget является крупной UI-композицией.

---

# `features`

Features описывают пользовательские действия.

```text
features/
├── CreateObject/
├── SelectObject/
├── UpdateVehiclePosition/
├── AssignRoute/
└── ControlCamera/
```

---

# `entities`

Entities содержат frontend representation предметных сущностей.

```text
entities/
├── object/
├── vehicle/
├── camera/
├── relation/
└── ...
```

Но frontend entity не является копией backend Domain Entity.

---

## Пример

Backend может иметь сложный Transport Aggregate.

Frontend карте нужен:

```text
VehicleMapModel
```

с полями:

```text
id
position
heading
status
version
```

Нет причины переносить весь backend Aggregate в браузер.

---

# FSD public API

Каждый slice экспортирует только публичную поверхность.

Например:

```text
entities/vehicle/
├── api/
├── model/
├── ui/
├── lib/
└── index.ts
```

Другие slices импортируют:

```text
entities/vehicle
```

а не:

```text
entities/vehicle/model/internal/vehicleStore
```

---

# Пример небольшого компонента

Внутри UI также сохраняем небольшие компоненты.

```text
VehicleMarker/
├── ui/
│   └── VehicleMarker.tsx
│
├── model/
│   └── types.ts
│
└── index.ts
```

Если компонент не имеет собственного model/lib, пустые каталоги создавать не требуется.

Структура должна помогать, а не генерировать церемониальный boilerplate.

---

# Shared frontend

`shared` содержит действительно предметно-независимые механизмы.

```text
shared/
├── api/
├── ui/
├── lib/
├── config/
└── types/
```

---

## `shared/ui`

Общий UI Kit:

```text
Button
Modal
Input
Tooltip
```

---

## `shared/lib`

Только универсальная техническая логика.

Например:

```text
date formatting
generic math
browser utilities
```

Но `calculateVehicleRoute` не может находиться в `shared/lib`.

---

# GIS внутри frontend

GIS — достаточно крупная техническая область.

Но она не должна превращаться в параллельную архитектуру вне FSD.

Общие rendering primitives могут находиться:

```text
shared/lib/map/
shared/lib/three/
```

или в более специализированных slices по мере развития.

---

## Например

```text
widgets/WorldMap/
│
├── ui/
├── model/
└── lib/
```

а representations конкретных сущностей:

```text
entities/vehicle/ui/VehicleMapObject/
entities/camera/ui/CameraMapObject/
```

---

# Высокочастотный rendering

Важно не заставлять FSD или React владеть каждым frame update.

Например:

```text
Realtime
   │
   ▼
Vehicle Spatial Store
   │
   ▼
Interpolation
   │
   ▼
Three.js Object3D
```

может работать без React render на каждом обновлении координаты.

---

# Generated API

Если backend публикует OpenAPI schema, часть TypeScript contracts может генерироваться.

Например:

```text
backend OpenAPI
      │
      ▼
code generation
      │
      ▼
frontend/shared/api/generated
```

Generated code не редактируется вручную.

---

# Но generated DTO не является frontend model

```text
GeneratedVehicleDto
       │
       ▼
Mapper
       │
       ▼
VehicleModel
```

Это позволяет frontend не зависеть напрямую от формы transport contract во всех слоях.

---

# Infrastructure

Infrastructure хранится отдельно:

```text
infrastructure/
│
├── local/
├── deployment/
├── environments/
└── observability/
```

---

# Local

```text
infrastructure/local/
```

содержит reproducible local environment.

Например:

```text
PostgreSQL + PostGIS
Object Storage
Observability dependencies
```

---

# Deployment

```text
infrastructure/deployment/
```

содержит deployment definitions.

Технология может измениться:

```text
Docker Compose
Ansible
Terraform
Kubernetes
```

Структура репозитория не должна предполагать Kubernetes заранее.

---

# Environments

```text
infrastructure/environments/
├── development/
├── staging/
└── production/
```

Здесь находятся environment-specific non-secret configuration references.

Secrets в Git не хранятся.

---

# CI/CD

Workflow definitions располагаются:

```text
.github/workflows/
```

Минимально:

```text
docs.yml
backend.yml
frontend.yml
architecture.yml
```

---

# Изменения только затронутой области

Monorepo не означает, что любое изменение должно пересобирать абсолютно всё.

Например:

```text
frontend/**
    │
    ▼
frontend pipeline
```

```text
backend/**
    │
    ▼
backend pipeline
```

Изменение Architecture Book может запускать только documentation validation/deployment.

---

# Dependency Graph

На верхнем уровне зависимости выглядят так:

```text
                   ┌──────────────┐
                   │ Architecture │
                   │    Docs      │
                   └──────────────┘


┌──────────────┐      Contracts      ┌──────────────┐
│   Frontend   │ ◄────────────────── │   Backend    │
└──────────────┘                     └───────┬──────┘
                                            │
                                            ▼
                                    ┌──────────────┐
                                    │ Persistence  │
                                    │ Integrations │
                                    └──────────────┘
```

Frontend не импортирует backend source code.

Связь осуществляется через contracts.

---

# Backend dependency graph

```text
                       Prizma.Api
                           │
                           ▼
                     Application
                           │
                           ▼
                         Domain
                           ▲
                           │
                    Infrastructure
```

Для модулей:

```text
Module A
   │
   ▼
Module B Contracts
```

но не:

```text
Module A
   │
   X
Module B Infrastructure
```

---

# Frontend dependency graph

Упрощённо:

```text
app
 │
 ▼
pages
 │
 ▼
widgets
 │
 ▼
features
 │
 ▼
entities
 │
 ▼
shared
```

Импорт снизу вверх запрещён.

---

# Circular Dependencies

Circular dependency рассматривается как архитектурный сигнал.

Например:

```text
Transport → Cameras
    ▲          │
    └──────────┘
```

обычно означает, что:

- неверно определён ownership;
- отсутствует отдельный contract;
- существует третий concept;
- interaction нужно перевести на event.

Circular reference между modules не разрешается просто добавлением ещё одной project reference.

---

# Пример: автомобиль и камера

Допустим:

```text
Vehicle
  │
  └── carries → Camera
```

Нельзя сразу делать:

```text
Transport.Domain → Cameras.Domain
Cameras.Domain   → Transport.Domain
```

Relation может принадлежать World/Relation model.

```text
Vehicle Object
      │
      │ Relation
      ▼
Camera Object
```

Каждый module остаётся владельцем собственной предметной семантики.

---

# Ownership базы данных

Даже внутри одной PostgreSQL instance модули не должны обращаться напрямую к чужим tables.

Неправильно:

```text
CameraRepository
    │
    ▼
SELECT *
FROM transport.vehicles
```

---

## Правильно

```text
Camera Module
    │
    ▼
Transport Contract
```

или, если это read-only cross-domain view:

```text
Projection
```

---

# Почему это важно уже в монолите

Можно сказать:

> Всё равно база одна. Зачем запрещать JOIN?

Потому что сегодня:

```text
one process
one database
```

а завтра:

```text
Transport
   │
   ▼
independent deployment
```

Если половина системы напрямую читает `transport.*`, физическое разделение становится практически невозможным.

---

# Public API модуля

У каждого backend module должна существовать понятная public surface.

Концептуально:

```text
Transport
│
├── Contracts      ← public
│
├── Application    ← internal
├── Domain         ← internal
└── Infrastructure ← internal
```

Физически это обеспечивается project boundaries, `internal`, architecture tests или их комбинацией.

---

# Имена

Названия каталогов и проектов должны отражать предметную семантику.

Предпочтительно:

```text
Transport
Cameras
Relations
Execution
```

а не:

```text
Core2
Manager
Engine
Service
Processor
```

если эти слова не описывают реальную архитектурную роль.

---

# Не создавать абстракции заранее

Например, не нужно сразу создавать:

```text
IRepository<T>
IService<T>
IManager<T>
IProcessor<T>
```

только потому, что они могут когда-нибудь пригодиться.

Абстракция появляется, когда существует конкретная boundary или несколько реализаций с общей семантикой.

---

# Пример первого vertical slice

После создания первой функции repository может выглядеть примерно так:

```text
backend/
└── src/
    ├── Prizma.Api/
    │   └── Endpoints/
    │       └── Vehicles/
    │
    ├── Prizma.Platform/
    │   ├── Objects/
    │   ├── Events/
    │   └── Execution/
    │
    └── Modules/
        └── Transport/
            ├── Domain/
            │   └── Vehicles/
            │
            ├── Application/
            │   └── Commands/
            │       ├── CreateVehicle/
            │       └── UpdateVehiclePosition/
            │
            ├── Contracts/
            └── Infrastructure/
                └── Persistence/
```

Frontend:

```text
frontend/src/
├── app/
│
├── pages/
│   └── WorldPage/
│
├── widgets/
│   └── WorldMap/
│
├── features/
│   └── CreateVehicle/
│
├── entities/
│   └── vehicle/
│       ├── api/
│       ├── model/
│       └── ui/
│
└── shared/
    ├── api/
    ├── ui/
    └── lib/
        └── map/
```

Этого достаточно.

Не нужно создавать пятьдесят пустых каталогов до появления первого кода.

---

# Как структура растёт

Следующий increment добавляет Cameras:

```text
Modules/
├── Transport/
└── Cameras/
```

Frontend:

```text
entities/
├── vehicle/
└── camera/
```

После появления Relations:

```text
Platform / Relations
```

или отдельный module — в зависимости от конкретной семантики, которую мы зафиксируем при реализации.

---

# Структура не является догмой

Repository Structure должна помогать поддерживать архитектуру.

Она может изменяться.

Например, если:

```text
Modules/Transport
```

становится отдельным deployment unit, код может физически переехать:

```text
services/transport/
```

При этом его Domain и public contracts сохраняют семантику.

---

# Что считается архитектурным изменением структуры

Не каждое перемещение файла требует ADR.

Например:

```text
VehicleMapper.cs
```

перенесён из одного internal каталога Transport в другой — обычный refactoring.

Но:

```text
Transport Domain
      │
      ▼
становится частью Platform Core
```

уже меняет ownership и требует архитектурного решения.

---

# Правила repository review

При code review полезно задавать следующие вопросы.

### Где живёт этот код?

Если ответ:

> ну пока положил в shared

это сигнал проверить ownership.

### Кто владеет этим типом?

Тип должен принадлежать конкретной архитектурной области.

### Кто имеет право его импортировать?

Public surface должна быть понятна.

### Можно ли удалить этот модуль, не разбирая весь repository?

Чем меньше скрытых зависимостей, тем лучше граница.

### Что произойдёт, если модуль завтра станет отдельным process?

Не нужно быть готовым вынести его за один день.

Но прямые нарушения ownership должны быть видны.

---

# Архитектурные тесты структуры

Часть правил необходимо автоматизировать.

Например:

```text
Domain
  must not depend on
Infrastructure
```

```text
Module A
  must not depend on
Module B internals
```

```text
Frontend entities
  must not import
features
```

```text
shared
  must not import
entities/features/widgets/pages
```

---

# Почему автоматизация важна

Документ легко забыть.

Compiler/test — сложнее.

```text
Architecture Rule
       │
       ▼
Architecture Test
       │
       ▼
CI
       │
       ▼
Merge blocked
```

Так часть Architecture Book становится исполняемым ограничением.

---

# Целевая структура первой версии

В результате получаем:

```text
prizma/
│
├── apps/
│   └── docs/
│
├── backend/
│   ├── src/
│   │   ├── Prizma.Api/
│   │   ├── Prizma.Platform/
│   │   ├── Modules/
│   │   │   ├── Transport/
│   │   │   └── Cameras/
│   │   └── Prizma.Infrastructure/
│   │
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── pages/
│   │   ├── widgets/
│   │   ├── features/
│   │   ├── entities/
│   │   └── shared/
│   │
│   └── public/
│
├── infrastructure/
│   ├── local/
│   ├── deployment/
│   ├── environments/
│   └── observability/
│
├── .github/
│   └── workflows/
│
└── README.md
```

Это не дерево, которое необходимо создать пустым прямо сейчас.

Это карта ownership, к которой repository приходит по мере появления функциональности.

---

# Инварианты Repository Structure

- «Призма» развивается как monorepo.
- Documentation application отделено от product frontend.
- Architecture Book и Technical Architecture являются разными разделами.
- Backend организован вокруг предметных модулей.
- Domain Module владеет собственной предметной логикой.
- Другие модули используют только его public contracts.
- Domain не зависит от Infrastructure.
- API является transport/composition boundary.
- Platform Core содержит только действительно фундаментальные primitives.
- `Shared`, `Common`, `Utils` не используются как склад кода без ownership.
- Backend modules не читают напрямую чужие persistence tables.
- Frontend использует FSD.
- Frontend slices имеют public API.
- Transport DTO не становится автоматически frontend model.
- High-frequency rendering может существовать вне React render cycle.
- Infrastructure хранится отдельно от application code.
- Secrets не хранятся в repository.
- Tests отражают production architecture.
- Architecture Tests автоматически защищают ключевые dependency rules.
- Circular dependency считается архитектурной проблемой.
- Новые abstractions не создаются до появления реальной семантики.
- Repository растёт вместе с функциональностью, а не заполняется пустыми слоями заранее.

---

# Архитектурное значение

Repository Structure превращает абстрактные границы Architecture Book в физически наблюдаемую структуру исходного кода.

```text
Architecture
      │
      ▼
Ownership
      │
      ▼
Modules
      │
      ▼
Directories / Projects
      │
      ▼
Dependency Rules
      │
      ▼
Architecture Tests
```

Благодаря этому архитектура существует не только в документации.

Она становится частью ежедневной разработки.

---

## Заключение

Теперь определено, где будет находиться код и какие зависимости между областями допустимы.

Следующий уровень — внутренняя архитектура самого backend.

Необходимо определить:

- из каких проектов и слоёв состоит .NET-приложение;
- где проходит граница Domain/Application/Infrastructure;
- как модули регистрируются;
- как они взаимодействуют внутри modular monolith;
- что является public contract;
- как не превратить `Prizma.Platform` в огромный `Shared`;
- каким образом подготовить модуль к потенциальному физическому выделению.

Этому посвящена следующая страница — **Backend Architecture**.
