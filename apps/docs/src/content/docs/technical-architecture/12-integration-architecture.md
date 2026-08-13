---
title: Integration Architecture
description: Техническая реализация adapters, external identity mapping и входящих/исходящих интеграций.
---

# Integration Architecture

## Статус

Proposed

---

## Adapter boundary

```text
External System
      │
      ▼
Adapter
      │
      ▼
Internal Contract
      │
      ▼
Execution / Projection
```

External DTO не распространяется внутрь Domain.

---

## GPS

```text
GPS Provider
    │
    ▼
GpsAdapter
    │
Identity Mapping
    │
Normalize units/time
    │
    ▼
Vehicle telemetry input
```

---

## External Identity Mapping

```text
Provider A: 481 ──┐
Provider B: VH42 ─┼──► ObjectId
Camera AI: C119 ──┘
```

---

## Inbound

Adapter authenticates provider, validates transport shape, maps identity, normalizes units/time и формирует internal command/observation.

---

## Outbound

Outbound adapter получает Domain Event/Projection и формирует provider-specific request после commit.

---

## Инварианты

- External contract заканчивается в adapter.
- External identity не заменяет ObjectId.
- Units/time нормализуются на integration boundary.
- Inbound mutation проходит Execution Model.
- Outbound side effect запускается post-commit.
- Provider errors не протекают в Domain.
- Adapter имеет observability и retry policy.

---

## Заключение

Локальные adapters могут в будущем исполняться на Edge.
