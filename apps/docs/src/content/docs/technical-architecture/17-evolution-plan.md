---
title: Evolution Plan
description: Критерии перехода от первой topology к более распределённой реализации.
---

# Evolution Plan

## Статус

Proposed

---

## Основной принцип

```text
Logical boundaries early
Physical boundaries late
```

---

## Когда выделять deployment unit

Разделение рассматривается при измеряемой потребности:

- independent scaling;
- distinct failure domain;
- security isolation;
- radically different resource profile;
- deployment cadence;
- edge placement.

---

## Media

```text
Camera Domain
     │
Media Contract
     │
     ▼
Media Service
```

Trigger: media CPU/bandwidth влияет на Core или требует специализированного runtime.

---

## Analytics

Выделяется, если heavy queries/workers начинают конкурировать за Core resources.

---

## Realtime

Отдельный realtime layer появляется только если connection fan-out и horizontal scaling перестают удобно обслуживаться внутри API deployment.

---

## Telemetry ingestion

При высоком ingestion rate может появиться отдельный input pipeline при сохранении internal contracts.

---

## Broker

Broker вводится, когда нужны durable buffering, large fan-out, independent consumers или throughput, которые больше неудобно обеспечивать DB/outbox/background delivery.

---

## Evidence

Перед разделением фиксируются Metric, Baseline, Bottleneck, Expected Benefit и Operational Cost.

---

## Инварианты

- Новый service решает измеряемую проблему.
- Module boundary существует до service extraction.
- Data ownership не меняется автоматически.
- Contract сохраняется или имеет migration.
- New failure modes документируются.
- Observability готова до cutover.
- Rollback/roll-forward strategy известна.

---

## Заключение

Последняя страница определяет первый production vertical slice.
