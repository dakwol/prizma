---
title: Projection Architecture
description: Техническая реализация read models и специализированных проекций платформы.
---

# Projection Architecture

## Статус

Proposed

---

## Цель

```text
Domain State
    │
    ▼
Events / Change feed
    │
    ▼
Projection
    │
    ▼
Consumer
```

Write model оптимизирована под изменение.

Projection — под чтение.

---

## Первая версия

На первом этапе read models могут находиться в PostgreSQL в специализированных tables/views.

Отдельная database technology не вводится без необходимости.

---

## Map Projection

Минимальный state:

```text
ObjectId
Position
Heading
Visual classification
Status
Version
```

Она не возвращает весь Domain Aggregate.

---

## Object List Projection

```text
ObjectId
Name
Type
Status
UpdatedAt
Owner/Group
```

---

## Rebuild

Проекция хранит checkpoint и собственную version semantics там, где это необходимо.

```text
Projection broken
      │
      ▼
Rebuild
      │
      ▼
Catch up
      │
      ▼
Ready
```

---

## Инварианты

- Projection schema определяется read workload.
- Projection не раскрывает internal write model.
- На первом этапе projections могут использовать PostgreSQL.
- Projection имеет rebuild/resume strategy.
- Map Projection возвращает минимальный spatial state.
- Consumer не знает database tables.

---

## Заключение

После snapshot клиент получает incremental realtime updates.
