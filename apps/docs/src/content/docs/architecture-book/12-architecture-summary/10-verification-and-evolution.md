---
title: Верификация и эволюция
description: Итоговая модель доказательства корректности и управляемого изменения архитектуры.
---

# Верификация и эволюция

## Статус

Accepted

---

## Введение

«Призма» должна одновременно решать две задачи:

1. сохранять текущие архитектурные гарантии;
2. иметь возможность изменять их осознанно.

---

## Verification

```text
Invariant
   │
   ▼
Test / Runtime signal
   │
   ▼
Evidence
```

Например:

```text
Domain Invariant → Domain test
DB semantics      → Integration test
API compatibility → Contract test
Critical flow     → E2E
Capacity          → Load test
Recovery          → Failure test
```

---

## Evolution

```text
New problem
   │
Evidence
   │
RFC
   │
ADR
   │
Migration
   │
Verification
   │
New stable architecture
```

---

## Пример

Media workload перестал помещаться в общий backend.

Сначала измеряется проблема:

```text
Media CPU / bandwidth
       │
       ▼
Core degradation
```

Затем принимается решение:

```text
Extract Media Plane
```

После этого:

- определяется contract;
- создаётся deployment unit;
- переносится workload;
- проверяется compatibility;
- удаляется старый путь;
- обновляется архитектурная книга.

---

## Architecture is stable, not static

```text
Stable principles
      │
      ▼
Changing implementation
```

Не нужно перепроектировать систему из-за каждого нового framework.

Но нельзя сохранять старое решение только потому, что оно когда-то было Accepted.

---

## Инварианты

- Critical architecture rules имеют verification.
- Architecture change начинается с проблемы и evidence.
- Значимые решения фиксируются ADR.
- Breaking evolution имеет migration path.
- Deprecated paths удаляются.
- Accepted decision может быть superseded.
- История решений сохраняется.
- Architecture Book отражает актуальную постоянную модель.

---

## Заключение

Теперь можно собрать архитектуру в одну сквозную схему.
