---
title: Владение архитектурой
description: Правила ответственности за архитектурные области, контракты и решения платформы.
---

# Владение архитектурой

## Статус

Accepted

---

## Введение

Общая ответственность часто означает отсутствие ответственности.

Каждая значимая область должна иметь понятного владельца.

---

## Ownership

Владелец отвечает за:

- архитектурный смысл;
- публичные contracts;
- invariants;
- evolution;
- migration;
- observability expectations;
- technical debt внутри области.

---

## Ownership не означает единоличное решение

Владелец координирует изменение, но cross-cutting решение может требовать RFC и согласования с другими owners.

---

## Пример

```text
Transport Module
    │
    └── owner: Transport team

Media Plane
    │
    └── owner: Media team
```

Если Media использует Camera Contract, изменение контракта координируется владельцем Camera Domain.

---

## Platform Core

Core имеет наиболее строгий ownership, потому что изменение фундаментального primitive влияет на многие модули.

```text
Core change
   │
   ▼
Architecture review required
```

---

## Unowned areas

Компонент без владельца постепенно:

- не обновляется;
- не документируется;
- накапливает risk;
- мешает migration.

Такие области должны быть явно назначены или выведены из эксплуатации.

---

## Инварианты

- Значимые architectural areas имеют владельца.
- Public contract имеет одного accountable owner.
- Cross-domain changes согласуются между owners.
- Core changes проходят усиленный review.
- Unowned production components считаются architectural debt.
- Ownership фиксируется в доступной форме и обновляется при изменении команды.

---

## Заключение

Даже при ownership система накапливает компромиссы.

Следующая страница определяет управление техническим долгом.
