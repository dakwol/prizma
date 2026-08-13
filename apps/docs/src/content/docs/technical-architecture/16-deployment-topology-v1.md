---
title: Deployment Topology v1
description: Физическая схема первой production-версии платформы «Призма».
---

# Deployment Topology v1

## Статус

Proposed

---

## Topology

```text
                        Internet / LAN
                              │
                              ▼
                    ┌──────────────────┐
                    │ Reverse Proxy /  │
                    │ Ingress          │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌───────────────┐         ┌───────────────┐
        │ Product Web   │         │ Prizma API    │
        │ Frontend      │         │ .NET          │
        └───────────────┘         └───────┬───────┘
                                          │
                          ┌───────────────┼───────────────┐
                          ▼               ▼               ▼
                   PostgreSQL         Object Store     Integrations
                    + PostGIS
```

SignalR работает через тот же backend deployment.

---

## Что не выделяем

На v1 не создаются без необходимости Object Service, Relation Service, Transport Service, Camera Service, Realtime Service или Projection Service.

Это внутренние модули backend.

---

## Возможное раннее выделение

Media workload — первый кандидат, если video sessions создадут отдельный bottleneck.

---

## Local development

Минимальный environment:

```text
Frontend
Backend
PostgreSQL + PostGIS
S3-compatible local object storage
```

Он должен подниматься воспроизводимо.

---

## Инварианты

- v1 backend — один modular-monolith deployment.
- SignalR находится в backend deployment.
- PostgreSQL/PostGIS — primary persistent dependency.
- Object Storage используется для binary content.
- Отдельные services не создаются до появления причины.
- Local environment воспроизводим.
- Deployment topology может изменяться без переписывания Domain Model.

---

## Заключение

Следующая страница фиксирует критерии будущего разделения.
