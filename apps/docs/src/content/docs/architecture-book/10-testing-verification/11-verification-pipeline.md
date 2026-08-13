---
title: Verification Pipeline
description: Архитектурная модель последовательной проверки изменения от локальной разработки до production.
---

# Verification Pipeline

## Статус

Accepted

---

## Введение

Если все проверки запускаются только перед production release, feedback приходит слишком поздно.

Verification должна начинаться максимально близко к моменту изменения.

---

## Pipeline

```text
Developer
   │
   ▼
Static checks
   │
   ▼
Unit / Domain tests
   │
   ▼
Architecture tests
   │
   ▼
Integration tests
   │
   ▼
Contract tests
   │
   ▼
Build
   │
   ▼
System tests
   │
   ▼
Performance / resilience gates
   │
   ▼
Deploy
   │
   ▼
Production verification
```

Не каждый commit обязан запускать самые дорогие тесты.

---

## Fast feedback

Быстрые проверки выполняются чаще.

```text
seconds  → static/unit
minutes  → integration/contracts
longer   → load/soak/resilience
```

---

## Risk-based verification

Изменение текста документации и изменение transaction engine имеют разный риск.

Pipeline может усиливать verification для критических областей.

---

## Required gates

Release не должен зависеть только от субъективного решения «вроде всё работает».

Критические критерии формализуются:

- tests passed;
- contracts compatible;
- migration validated;
- security checks passed;
- artifact created;
- deployment verified.

---

## Flaky tests

Flaky test разрушает доверие к pipeline.

```text
Failure
  │
"probably flaky"
  │
ignore
```

такое поведение со временем делает весь gate бессмысленным.

Flakiness является дефектом, который необходимо устранять.

---

## Test artifacts

При failure полезно сохранять:

- logs;
- traces;
- screenshots;
- request/response samples;
- performance reports.

Это сокращает диагностику.

---

## Инварианты

- Verification начинается до merge/release.
- Быстрые проверки дают ранний feedback.
- Дорогие проверки запускаются согласно риску и cadence.
- Критические release gates автоматизированы.
- Flaky tests не принимаются как постоянная норма.
- Failure сохраняет достаточные diagnostic artifacts.
- Production rollout продолжает verification через observability.

---

## Заключение

Остаётся определить, когда систему можно считать достаточно проверенной и как измерять доверие к verification process.
