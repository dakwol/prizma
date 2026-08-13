---
title: Architecture Tests
description: Автоматическая проверка структурных архитектурных правил платформы «Призма».
---

# Architecture Tests

## Статус

Accepted

---

## Введение

Часть архитектурных правил можно выразить как ограничения исходного кода.

Например:

> Domain не зависит от Infrastructure.

Если такое правило существует только в книге, со временем случайный import может его нарушить.

---

## Dependency rules

```text
Presentation
     │
Application
     │
Domain
```

Infrastructure реализует порты, но Domain не импортирует Infrastructure.

Architecture test может проверять запрещённые зависимости автоматически.

---

## Module boundaries

```text
Transport
Camera
Identity
```

Один модуль не должен обращаться к внутренним типам другого, если взаимодействие разрешено только через public contract.

---

## Frontend boundaries

Для frontend архитектурные тесты могут проверять правила слоёв и публичных API.

Например:

```text
shared
  ↑
entities
  ↑
features
  ↑
widgets
  ↑
pages
```

Конкретные правила должны соответствовать принятой архитектуре проекта, а не абстрактной схеме ради схемы.

---

## Naming не является архитектурой

Не каждое style rule должно становиться architecture test.

Проверяются ограничения, нарушение которых создаёт реальный architectural coupling.

---

## Dependency graph

Полезно периодически строить граф зависимостей.

```text
Module A ──► Module B
   │
   └──────► Module C
```

Неожиданные циклы становятся видимыми до того, как превратятся в серьёзную связанность.

---

## Инварианты

- Критические dependency rules автоматизируются там, где это возможно.
- Domain boundaries защищаются от запрещённых imports.
- Module public API отличается от internal implementation.
- Architecture tests проверяют значимые ограничения, а не косметику.
- Dependency cycles контролируются.
- Frontend и backend архитектурные правила проверяются независимо.

---

## Заключение

Проверки должны выполняться в определённом порядке и давать быстрый feedback разработчику.

Следующая страница определяет verification pipeline.
