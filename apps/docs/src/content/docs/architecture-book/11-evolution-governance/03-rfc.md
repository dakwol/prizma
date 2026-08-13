---
title: Request for Comments
description: Модель обсуждения крупных архитектурных изменений до принятия решения.
---

# Request for Comments

## Статус

Accepted

---

## Введение

Не каждое архитектурное изменение должно сначала появляться в коде.

Если изменение затрагивает несколько областей, полезно заранее сформулировать проблему и предложенный переход.

---

## Когда нужен RFC

RFC полезен для:

- нового major subsystem;
- изменения публичных контрактов;
- изменения Domain Model;
- смены ownership;
- крупной migration;
- нового distributed pattern;
- изменения security model;
- изменения storage strategy.

---

## RFC flow

```text
Problem
  │
Proposal
  │
Discussion
  │
Revision
  │
Decision
  │
ADR
```

RFC может быть отклонён.

Это нормальный результат.

---

## Что должен содержать RFC

- problem statement;
- constraints;
- current behavior;
- proposed model;
- alternatives;
- migration;
- risks;
- observability;
- testing;
- rollback/roll-forward;
- unresolved questions.

---

## Scope

RFC должен описывать проблему, а не заранее продавать конкретную технологию.

Плохо:

> Нам нужен Kafka.

Лучше:

> Текущая модель доставки событий не выдерживает требуемый throughput и recovery semantics.

После этого сравниваются варианты.

---

## Инварианты

- RFC начинается с проблемы.
- Альтернативы описываются до принятия решения.
- Migration path является частью предложения.
- Риски и неизвестные вопросы не скрываются.
- Принятое решение фиксируется ADR.
- Отклонённый RFC может сохраняться как исторический контекст.

---

## Заключение

Архитектура эволюционирует через контракты.

Следующая страница определяет compatibility и versioning policy.
