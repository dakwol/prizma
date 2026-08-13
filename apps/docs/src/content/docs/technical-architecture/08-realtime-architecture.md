---
title: Realtime Architecture
description: Техническая модель snapshot, SignalR updates, interest subscriptions и reconnect.
---

# Realtime Architecture

## Статус

Proposed

---

## Технология

Первая backend-реализация использует SignalR для server-to-client realtime delivery.

SignalR является transport implementation, а не архитектурным source of truth.

---

## Snapshot + Updates

```text
Client opens world
      │
      ▼
Initial Projection Snapshot
      │
      ▼
Subscribe to realtime
      │
      ▼
Incremental Updates
```

---

## Interest Model

GIS-подписка определяется world, permissions, viewport, selected objects и enabled layers.

```text
All objects
    │
    ▼
Interest filter
    │
    ▼
Client updates
```

---

## Version

```text
client v105
incoming v106 → apply

client v106
incoming v105 → ignore/reconcile
```

---

## Reconnect

```text
Connection X
    │
 reconnect
    │
    ▼
Resume possible?
  ┌───┴───┐
 yes      no
  │        │
resume   snapshot
```

---

## Coalescing и Backpressure

Высокочастотный visual state может coalesce, если промежуточные значения не несут обязательной предметной семантики.

Server buffer bounded.

---

## Инварианты

- Initial state приходит через projection snapshot.
- Realtime delivery учитывает interest model.
- Updates versioned.
- Reconnect имеет reconciliation strategy.
- High-frequency visual state может coalesce.
- Server buffers bounded.
- Security применяется до subscription/delivery.

---

## Заключение

Frontend потребляет projections и realtime contracts.
