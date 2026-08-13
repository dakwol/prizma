---
title: Надёжность и согласованность
description: Итоговая модель сохранения корректности цифрового мира при отказах.
---

# Надёжность и согласованность

## Статус

Accepted

---

## Основной принцип

Отказ является нормальным состоянием распределённой системы.

Архитектура определяет не отсутствие отказов, а контролируемое поведение при них.

---

## Failure boundaries

```text
Digital World Core
       │
       ├── Integration A X
       ├── Analytics ✔
       └── Map ✔
```

Отказ одного необязательного consumer не должен автоматически разрушать Core.

---

## Retry

Retry применяется только к операции, которую безопасно повторять.

```text
Attempt
  │
failure
  │
retry budget
  │
  ├── success
  └── exhausted
```

---

## Idempotency

```text
Message #42
   │
   ├── delivery 1
   └── delivery 2
          │
          ▼
      one effect
```

---

## Ordering

Если порядок важен:

```text
v10 → v11 → v12
```

consumer должен распознавать stale или out-of-order update.

---

## Degraded mode

Пример:

GPS provider недоступен.

```text
Vehicle remains in world
Position becomes stale
Historical data remains available
Other functions continue
```

Система не обязана притворяться полностью здоровой.

Но она должна сохранять безопасный смысл.

---

## Recovery

```text
Failure
  │
Degraded
  │
Dependency restored
  │
Replay / Reconcile
  │
Recovered
```

Recovery является частью архитектуры, а не ручной импровизацией после аварии.

---

## Инварианты

- Failure domains ограничиваются.
- Retry имеет budget и backoff.
- Повторяемые операции проектируются idempotent.
- Ordering assumptions явны.
- Degraded state имеет определённую семантику.
- Recovery возвращает систему к согласованному состоянию.
- Авторитетное состояние защищается сильнее производных представлений.

---

## Заключение

Корректная система должна оставаться полезной и при росте масштаба. Это связывает архитектуру с performance и scalability.
