---
title: Resilience и Failure Testing
description: Проверка поведения платформы при сетевых, инфраструктурных и интеграционных отказах.
---

# Resilience и Failure Testing

## Статус

Accepted

---

## Введение

Reliability mechanism, который никогда не проверялся при реальном отказе, остаётся гипотезой.

Нужно доказать, что:

- timeout срабатывает;
- retry ограничен;
- circuit breaker открывается;
- degraded mode сохраняет безопасные функции;
- recovery действительно восстанавливает систему.

---

## Failure injection

```text
Healthy system
      │
Inject failure
      │
      ▼
Observe behavior
```

Можно моделировать:

- timeout;
- connection reset;
- unavailable database replica;
- broken external provider;
- full queue;
- process restart;
- network partition.

---

## Пример

GPS Provider становится недоступен.

Ожидаемый результат:

```text
GPS X
 │
Timeout
 │
Retry budget
 │
Circuit open
 │
Vehicle remains
 │
Position marked stale
 │
Other modules continue
```

Тест проверяет всю цепочку.

---

## Recovery verification

Недостаточно проверить деградацию.

```text
Failure
  │
Degraded
  │
Dependency restored
  │
Recovery
  │
Reconciliation
  │
Normal
```

Система должна вернуться к корректному состоянию.

---

## Chaos testing

Chaos-подход полезен для зрелой инфраструктуры, но не является самоцелью.

Сначала должны существовать:

- известные invariants;
- observability;
- controlled blast radius;
- rollback/stop mechanism.

---

## Инварианты

- Критические failure modes имеют проверяемый сценарий.
- Failure injection выполняется с контролируемой областью воздействия.
- Проверяется не только отказ, но и recovery.
- Retry storms и cascading failures тестируются там, где риск существенен.
- Degraded mode проверяется как отдельное состояние.
- Chaos experiments не проводятся без observability и stop conditions.

---

## Заключение

Отдельный класс ошибок связан с параллельным изменением одного состояния.

Следующая страница посвящена concurrency и consistency testing.
