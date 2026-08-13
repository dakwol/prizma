---
title: Frontend Architecture
description: Архитектура React/TypeScript frontend платформы «Призма» по FSD.
---

# Frontend Architecture

## Статус

Proposed

---

## Стек

```text
React
TypeScript
FSD
MapLibre GL
Three.js
```

State-management library фиксируется отдельным implementation decision по фактическим требованиям.

---

## FSD

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

---

## entities

Frontend entity представляет UI projection, а не копию backend Aggregate.

```text
Backend Vehicle Domain
       │
       ▼
VehicleMapProjection
       │
       ▼
frontend/entities/vehicle
```

---

## features

Feature выражает пользовательское намерение:

```text
change-camera-direction
assign-vehicle-route
select-map-object
```

---

## Server State и UI State

```text
Vehicle position → server projection
Sidebar opened   → UI state
```

Они имеют разный lifecycle.

---

## Инварианты

- Frontend следует FSD.
- Frontend entity является UI projection.
- Server State и UI State различаются.
- Feature выражает пользовательский сценарий.
- Transport DTO преобразуется на boundary.
- GIS realtime path не обязан проходить через глобальный React render.

---

## Заключение

Главная пользовательская поверхность первой версии — GIS/3D сцена.
