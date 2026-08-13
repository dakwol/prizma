---
title: First Production Slice
description: Минимальный вертикальный срез, с которого начинается реальная разработка «Призмы».
---

# First Production Slice

## Статус

Proposed

---

## Цель

Первая реализация должна доказать основную архитектурную цепочку.

```text
Real object
   │
   ▼
Digital World
   │
   ▼
Execution
   │
   ▼
Persistence
   │
   ▼
Projection
   │
   ▼
Realtime
   │
   ▼
Map
```

---

## Сценарий

> Создать автомобиль в цифровом мире, отобразить его на карте, изменить его положение и увидеть обновление через realtime.

---

## Backend minimum

```text
Platform Core
  ├── ObjectId
  ├── Object
  ├── Version
  └── Event contract

Transport
  ├── Vehicle state
  ├── CreateVehicle
  └── UpdateVehiclePosition

Execution
  ├── CommandId
  ├── validation
  ├── transaction
  └── outbox/event

Projection
  └── VehicleMapProjection

Realtime
  └── VehiclePositionUpdated
```

---

## Persistence minimum

```text
PostgreSQL + PostGIS
  ├── objects
  ├── transport vehicle state
  ├── position geometry
  ├── version
  ├── outbox
  └── map projection
```

---

## Frontend minimum

```text
React
  │
  ├── app initialization
  ├── map page
  ├── vehicle entity projection
  ├── initial snapshot
  ├── SignalR subscription
  └── MapLibre representation
```

Three.js не обязателен для первого commit, если MapLibre representation достаточно для доказательства data flow.

---

## End-to-end path

```text
1. POST CreateVehicle
2. Backend validates
3. PostgreSQL commit
4. Projection contains vehicle
5. Frontend loads snapshot
6. Vehicle appears on map
7. Position update arrives
8. Backend commits new version
9. Realtime update delivered
10. Map moves vehicle
```

---

## Что сознательно не входит

- полноценная camera subsystem;
- media streaming;
- analytics;
- edge;
- microservices;
- broker cluster;
- universal plugin system.

---

## Verification

Первый slice считается успешным, если доказаны Domain Invariant, transaction, optimistic version, projection, realtime, reconnect/resnapshot, authorization boundary, structured tracing, basic load baseline и migration path.

---

## Следующий increment

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
Media
```

---

## Итог

First Production Slice — точка, где Architecture Book начинает существовать в реальном коде.

```text
Architecture
    │
    ▼
Technical Architecture
    │
    ▼
Vertical Slice
    │
    ▼
Working Prizma Core
```
