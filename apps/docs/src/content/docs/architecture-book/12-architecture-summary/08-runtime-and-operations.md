---
title: Работающая платформа
description: Итоговая модель deployment, runtime и эксплуатации архитектуры «Призма».
---

# Работающая платформа

## Статус

Accepted

---

## Введение

Архитектура не заканчивается после `git push`.

Она должна существовать как управляемая runtime system.

---

## Release flow

```text
Source
  │
Verify
  │
Build
  │
Artifact
  │
Deploy
  │
Readiness
  │
Traffic
  │
Observe
```

---

## Deployment topology

Domain boundary и process boundary не обязаны совпадать.

```text
One backend process
 ├── Vehicle Module
 ├── Camera Module
 └── World Module
```

Позже:

```text
Core Backend
Media Service
Telemetry Workers
```

Логическая модель может сохраниться.

---

## Configuration

```text
Artifact
   +
Environment Configuration
   +
Secrets
```

Secrets имеют отдельный lifecycle и не являются обычными настройками.

---

## Database migration

```text
Expand
  │
Compatible deployment
  │
Backfill
  │
Switch
  │
Contract
```

---

## Edge

Локальный узел:

```text
Central Platform
       │
       ▼
Authenticated Edge
       │
       ▼
Cameras / local systems
```

Он имеет:

- identity;
- version;
- configuration;
- offline behavior;
- update policy.

---

## Health

```text
Started ≠ Ready
```

Компонент получает workload только после достижения реальной готовности.

---

## Инварианты

- Deployment topology не определяет Domain Model.
- Artifact идентифицируем и воспроизводим.
- Configuration отделена от code.
- Secrets имеют scope и rotation.
- Database migration совместима с rollout strategy.
- Edge является отдельной operational boundary.
- Readiness отражает способность обслуживать workload.
- Deployment проверяется observability signals.

---

## Заключение

Чтобы понимать состояние работающей платформы, необходима Observability.
