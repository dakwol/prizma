---
title: Observability Implementation
description: Техническая реализация логов, метрик, traces и correlation.
---

# Observability Implementation

## Статус

Proposed

---

## Сигналы

```text
Logs
Metrics
Traces
Health
Domain operational metrics
```

---

## Structured Logging

Backend logs включают по необходимости:

```text
traceId
commandId
subjectId
objectId
module
result
duration
```

Sensitive data исключается.

---

## Distributed Tracing

OpenTelemetry является предпочтительным instrumentation standard.

```text
HTTP request
  │
Execution
  │
Database
  │
Outbox publish
  │
Projection
  │
Realtime
```

---

## Metrics

Технические: latency, errors, DB latency, connection count, CPU/memory.

Предметно-операционные: command rejection, projection lag, stale telemetry, integration status, realtime subscribers.

---

## Frontend

Измеряются realtime reconnect, long tasks, map FPS/frame time, fatal UI errors и network failures.

---

## Инварианты

- OpenTelemetry является общим instrumentation standard при отсутствии объективного ограничения.
- Logs structured.
- Sensitive data исключена.
- Domain operation имеет correlation identity.
- Projection/realtime lag измерим.
- Frontend performance входит в observability.
- Deployment version присутствует в telemetry.

---

## Заключение

Следующая страница фиксирует topology первой production-версии.
