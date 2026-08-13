---
title: Persistence Architecture
description: Техническая модель хранения текущего состояния, истории и spatial data в PostgreSQL/PostGIS.
---

# Persistence Architecture

## Статус

Proposed

---

## Основное хранилище

```text
PostgreSQL
   +
PostGIS
```

PostgreSQL обеспечивает transactional storage.

PostGIS обеспечивает spatial types, indexes и queries.

---

## Что хранится

```text
PostgreSQL
│
├── Core identities
├── Module current state
├── Relations
├── Versions
├── Domain history metadata
├── Outbox
├── Idempotency records
└── Projection state where appropriate
```

---

## Схемы модулей

Предпочтительно логически разделять ownership:

```text
platform.*
transport.*
cameras.*
projection.*
```

---

## EF Core

Для обычного transactional persistence допускается EF Core.

Raw SQL используется там, где spatial/performance requirements этого требуют.

Raw SQL остаётся Infrastructure detail и не обходит module ownership.

---

## Spatial data

Coordinates и geometries используют PostGIS types и spatial indexes.

Viewport/search queries не должны выполнять full scan при значимом объёме данных.

---

## Current State и History

```text
Current tables
      │
      └── current operations

History / Events
      │
      └── historical access
```

Они не обязаны быть одной физической таблицей.

---

## Инварианты

- PostgreSQL является primary transactional storage первой версии.
- PostGIS используется для spatial semantics.
- Database structure отражает module ownership.
- EF Core не является частью Domain Model.
- Raw SQL разрешён как infrastructure optimization.
- Current State и History могут иметь разные physical models.
- Outbox/idempotency участвуют в consistency strategy.
- Migration является частью release.

---

## Заключение

Read workload отделяется через projections.
