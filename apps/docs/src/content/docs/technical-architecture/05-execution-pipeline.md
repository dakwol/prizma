---
title: Execution Pipeline
description: Техническая реализация пути Command → Authorization → Validation → Transaction → Events.
---

# Execution Pipeline

## Статус

Proposed

---

## Общая цепочка

```text
Request
  │
  ▼
Command
  │
  ▼
Security Context
  │
  ▼
Authorization
  │
  ▼
Application Validation
  │
  ▼
Load authoritative state
  │
  ▼
Domain Execution
  │
  ▼
Transaction
  │
  ▼
Commit
  │
  ├── state
  ├── version
  └── events
```

---

## Command

Command имеет CommandId, Subject Context, Payload и correlation metadata.

---

## Validation levels

```text
Transport validation
       │
Application validation
       │
Authorization
       │
Domain invariants
```

---

## Transaction

Для первой версии transaction boundary реализуется средствами PostgreSQL.

Изменение текущего состояния и обязательной commit metadata атомарно внутри consistency boundary.

---

## Events и Outbox

Domain Events собираются во время execution и публикуются только после commit.

```text
Transaction
  ├── State
  └── Outbox Event

COMMIT
   │
   ▼
Publisher
```

Transactional Outbox является базовой стратегией post-commit delivery первой реализации.

---

## Idempotency

Повторяемые команды используют `CommandId` и processed-command record, согласованный с transaction semantics.

---

## Optimistic concurrency

```text
ExpectedVersion = 10
CurrentVersion  = 10
      │
      ▼
Commit v11
```

---

## Инварианты

- Command имеет stable identity.
- Authorization выполняется до Domain mutation.
- Domain Rules не находятся в controller.
- Commit атомарен внутри consistency boundary.
- Events не публикуются как успешные до commit.
- Outbox имеет recovery strategy.
- Повтор Command не создаёт второй эффект.
- Concurrency conflict обрабатывается явно.

---

## Заключение

Execution Pipeline опирается на persistent storage.
