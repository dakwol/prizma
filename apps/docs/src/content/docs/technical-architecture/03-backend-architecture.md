---
title: Backend Architecture
description: Архитектура .NET backend платформы «Призма».
---

# Backend Architecture

## Статус

Proposed

---

## Основная модель

Backend строится как модульный монолит.

```text
Prizma.Api
    │
    ▼
Application Composition
    │
    ├── Platform
    ├── Transport
    ├── Cameras
    └── Other Modules
```

---

## Внутри модуля

```text
Module
│
├── Domain
├── Application
├── Contracts
└── Infrastructure
```

### Domain

Содержит entities/value objects, invariants, domain services, state transitions и domain events.

### Application

Содержит commands, queries, handlers и orchestration внутри module boundary.

### Contracts

Содержит публичную поверхность модуля.

### Infrastructure

Содержит database, external API, files и transport adapters.

---

## Dependency direction

```text
Api
 │
 ▼
Application
 │
 ▼
Domain

Infrastructure
     │
     └──► Application/Domain contracts
```

Domain не импортирует EF Core, ASP.NET, SignalR или provider SDK.

---

## Composition Root

```text
Program
  │
  ├── register Platform
  ├── register Transport
  ├── register Cameras
  ├── register Persistence
  └── register Realtime
```

Модули не выполняют скрытую глобальную регистрацию.

---

## Межмодульное взаимодействие

Внутри одного process разрешены in-process calls, но только через public contracts.

```text
Camera Module
      │
      ▼
Transport Public Contract
      │
      ▼
Transport Module
```

Запрещено обращаться к internal repository другого модуля.

---

## API

ASP.NET API является transport boundary.

Endpoint принимает transport DTO, создаёт security context, вызывает application contract и возвращает response.

Он не содержит Domain Rules.

---

## Инварианты

- Backend является модульным монолитом.
- Domain не зависит от Infrastructure.
- Module internals не импортируются другим модулем.
- API не содержит предметных правил.
- Composition Root является явным.
- Public contracts являются единственной межмодульной surface.
- Infrastructure adapters заменяемы относительно Domain.

---

## Заключение

Следующая страница показывает, как фундаментальные сущности Architecture Book выражаются в backend-коде.
