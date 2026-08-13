---
title: Architecture Review Process
description: Процесс рассмотрения изменений, затрагивающих архитектуру платформы «Призма».
---

# Architecture Review Process

## Статус

Accepted

---

## Введение

Не каждый Pull Request требует архитектурного совета.

Но изменения, затрагивающие фундаментальные границы, должны быть замечены до merge.

---

## Change classification

```text
Change
  │
  ├── Local implementation
  ├── Contract change
  ├── Module boundary change
  ├── Data ownership change
  └── Core architecture change
```

Чем глубже уровень, тем сильнее review.

---

## Local implementation

Например:

- внутренний refactoring;
- optimization без изменения contract;
- UI detail.

Обычного code review достаточно.

---

## Contract change

Нужно проверить:

- compatibility;
- consumers;
- migration;
- versioning.

---

## Boundary / ownership change

Обычно требуется RFC или ADR.

---

## Core change

Изменение:

- Object;
- Component;
- Relation;
- Event;
- State;
- consistency semantics

требует наиболее строгого review.

---

## Review criteria

```text
Problem
Alternatives
Boundaries
Ownership
Compatibility
Migration
Reliability
Security
Performance
Verification
Operations
```

---

## Decision latency

Governance не должен делать небольшое решение недельным процессом.

Review depth соответствует blast radius.

---

## Инварианты

- Изменения классифицируются по архитектурному влиянию.
- Review depth соответствует blast radius.
- Contract changes проверяют compatibility.
- Ownership/Core changes требуют explicit architecture decision.
- Review включает migration и verification.
- Governance process должен оставаться достаточно быстрым для разработки.

---

## Заключение

Решение должно не только пройти review, но и считаться завершённым по понятным критериям.

Следующая страница определяет архитектурный Definition of Done.
