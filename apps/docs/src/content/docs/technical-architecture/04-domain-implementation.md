---
title: Реализация Domain Model
description: Техническое представление Object, Component, Relation, State, Event и Version в backend.
---

# Реализация Domain Model

## Статус

Proposed

---

## Object Identity

`ObjectId` представляется типизированным идентификатором, а не произвольной строкой.

---

## Object

```text
Object
  │
  ├── Identity
  ├── Classification
  └── Lifecycle
```

Предметные свойства принадлежат components/modules.

---

## Component

```text
Transport
  └── VehicleMovementComponent

Cameras
  └── CameraObservationComponent
```

Platform Core знает механизм component composition, но не предметную семантику каждого типа.

---

## Relation

Relation имеет собственную Identity и version semantics.

```text
RelationId
SourceObjectId
TargetObjectId
RelationType
Lifecycle
Version
```

---

## State

Module State описывается строгими C# types.

Не используется единая бесконтрольная `Dictionary<string, object>` только ради универсальности.

---

## Event

Domain Event — уже произошедший факт.

```text
VehicleRouteAssigned
CameraAttachedToObject
ObjectArchived
```

---

## Version

Version используется для optimistic concurrency, ordering, stale detection и projection synchronization.

---

## Инварианты

- Object Identity типизирована.
- Module state имеет строгие C# types.
- Platform Core не содержит switch по всем предметным типам.
- Relation является отдельной сущностью.
- Domain Event является фактом, а не командой.
- Version является частью concurrency/synchronization semantics.
- Универсальность не реализуется бесконтрольным dynamic JSON.

---

## Заключение

Эти types изменяются только через единый Execution Pipeline.
