---
title: Наблюдаемость и контроль
description: Итоговая роль observability в понимании состояния цифрового мира и работающей платформы.
---

# Наблюдаемость и контроль

## Статус

Accepted

---

## Введение

Если система распределена между процессами, очередями, базами, edge-узлами и клиентами, локальный log одной функции почти ничего не объясняет.

Observability должна позволять восстановить путь операции.

---

## Signals

```text
Logs
Metrics
Traces
Events
Health
Business signals
```

Каждый сигнал отвечает на разные вопросы.

---

## Correlation

```text
User action
   │ traceId
API
   │
Execution
   │
Database
   │
Event
   │
Projection
   │
Realtime
```

Correlation связывает технические этапы в одну историю.

---

## Technical и Domain observability

Важно видеть не только:

```text
HTTP 500
CPU 90%
```

но и:

```text
Projection lag
Stale vehicle positions
Failed executions
Rejected commands
Unprocessed events
```

---

## SLO

Наблюдаемость должна отвечать:

> выполняет ли система обещанное качество?

Например:

```text
95/99% updates visible within budget
```

Конкретные SLO определяются требованиями эксплуатации.

---

## Change correlation

Deployment и configuration change должны быть видны на той же временной шкале, что и degradation.

```text
Deploy v42
   │
   ▼
Latency ↑
Errors ↑
```

---

## Инварианты

- Критические операции имеют correlation identity.
- Metrics отражают технические и предметные свойства.
- Logs структурированы.
- Trace проходит через значимые distributed boundaries.
- SLO измеряется из observable signals.
- Deployment/configuration events коррелируются с runtime behavior.
- Observability не содержит secrets.

---

## Заключение

Наблюдаемость показывает состояние. Verification доказывает, что архитектурные свойства действительно сохраняются.
