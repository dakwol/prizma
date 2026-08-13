---
title: Security Implementation
description: Техническая реализация identity, authentication, authorization и service identities.
---

# Security Implementation

## Статус

Proposed

---

## Authentication

Frontend получает user identity через выбранный Identity Provider.

Конкретный provider фиксируется отдельным ADR.

---

## Subject Context

```text
SubjectId
SubjectType
Roles/Claims
World/Scope
Correlation
```

Контекст передаётся в Execution Pipeline.

---

## Authorization

```text
Subject
  │
Action
  │
Resource
  │
Policy
  │
  ├── Allow
  └── Deny
```

Backend является authoritative authorization boundary.

---

## Object-level access

Projection фильтрует недоступные объекты до отправки клиенту.

---

## Service identities

Отдельную identity получают integration adapter, edge node, background worker и будущий media service.

---

## Инварианты

- Backend является authoritative authorization boundary.
- Subject Context проходит Execution Pipeline.
- Object-level permissions применяются до выдачи данных.
- Service identities различаются.
- Secrets не находятся в source/frontend.
- Security failure не маскируется successful Domain result.
- Audit correlation сохраняет исходного subject там, где требуется.

---

## Заключение

Наблюдаемость делает весь технический путь диагностируемым.
