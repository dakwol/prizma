---
title: Rollback и roll-forward
description: Архитектурная модель восстановления после неудачного выпуска.
---

# Rollback и roll-forward

## Статус

Accepted

---

## Введение

Не каждый deployment должен завершаться продолжением rollout.

Если новая версия ухудшает систему, необходим заранее определённый путь восстановления.

---

## Rollback

```text
v1
 │
deploy v2
 │
problem
 │
rollback
 │
v1
```

Rollback эффективен, когда изменение обратимо.

---

## Roll-forward

Иногда возврат опаснее исправления вперёд.

```text
v1
 │
migration
 │
v2 problem
 │
fix v2.1
```

Если данные уже преобразованы необратимо, старый код может быть несовместим.

---

## Decision

```text
Incident after deploy
        │
        ▼
Is rollback safe?
   ┌────┴────┐
  yes        no
   │          │
rollback   roll-forward
```

Ответ должен быть известен для migration-sensitive releases.

---

## Automatic rollback

Автоматический rollback может использоваться при объективных сигналах:

- error rate;
- readiness failure;
- latency regression;
- crash loop.

Но автоматизация не должна откатывать версию, если rollback сам способен повредить данные.

---

## Deployment metadata

Для расследования необходимо знать:

- deployed version;
- artifact identity;
- deployment time;
- schema version;
- configuration version;
- initiator.

---

## Инварианты

- Для рискованных releases существует recovery strategy.
- Rollback не предполагается безопасным автоматически.
- Data migration учитывается при выборе rollback/roll-forward.
- Deployment version коррелируется с observability signals.
- Автоматический rollback используется только при доказуемо безопасном возврате.
- Recovery procedure регулярно проверяется.

---

## Заключение

Центральная инфраструктура — не единственное место исполнения «Призмы». Платформа может иметь локальные edge-узлы. Их deployment требует отдельной модели.
