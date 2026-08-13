---
title: Edge Architecture
description: Техническая модель будущих локальных узлов «Призмы».
---

# Edge Architecture

## Статус

Proposed

---

## Роль Edge

Edge нужен для closed local networks, low latency, local camera/GPS integrations и ограниченной автономии.

Первый vertical slice Edge не требует.

---

## Модель

```text
Central Prizma
      │
Secure channel
      │
      ▼
Edge Node
      │
      ├── Local Camera Adapter
      ├── Local GPS Adapter
      └── Local System Adapter
```

---

## Offline

```text
Central X
   │
Edge
 ├── local allowed operations
 ├── durable local buffer
 └── disconnected status
```

После восстановления выполняются replay и reconciliation.

---

## Ownership

Edge не становится глобальным владельцем мира.

Local autonomy определяется отдельной consistency boundary.

---

## Инварианты

- Edge вводится только при реальной необходимости.
- Edge имеет отдельную Identity.
- Offline behavior определён заранее.
- Local buffering durable там, где потеря недопустима.
- Reconciliation обязателен после автономной работы.
- Edge не расширяет ownership автоматически.
- Central platform знает версию edge runtime.

---

## Заключение

Runtime components используют единую Security Implementation.
