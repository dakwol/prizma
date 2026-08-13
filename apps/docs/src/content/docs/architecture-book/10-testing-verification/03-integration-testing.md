---
title: Integration Testing
description: Проверка взаимодействия компонентов «Призмы» с реальной инфраструктурой и адаптерами.
---

# Integration Testing

## Статус

Accepted

---

## Введение

Mock способен доказать только то, что код правильно взаимодействует с mock.

Он не доказывает совместимость с реальной:

- базой данных;
- broker;
- object storage;
- authentication infrastructure;
- serialization;
- network protocol.

---

## Integration boundary

```text
Application
    │
    ▼
Real adapter
    │
    ▼
Real infrastructure
```

Тест должен использовать реальное поведение той технологии, свойства которой важны для результата.

---

## Пример с базой данных

Если production использует конкретную СУБД, in-memory collection не доказывает:

- transaction semantics;
- constraints;
- indexes;
- isolation;
- SQL translation;
- concurrency behavior.

Для таких свойств используется реальная database engine.

---

## Test isolation

Integration tests должны быть независимыми.

```text
Test A → own data
Test B → own data
Test C → own data
```

Порядок запуска не должен определять результат.

---

## Infrastructure lifecycle

Тестовая инфраструктура должна быть воспроизводимой.

```text
Create
  │
Migrate
  │
Test
  │
Destroy
```

Это уменьшает зависимость от вручную настроенного общего стенда.

---

## External systems

Для внешнего provider реальная интеграция может быть дорогой или нестабильной.

Тогда используются несколько уровней:

```text
Adapter tests
Contract simulation
Limited real-provider verification
```

Mock внешней системы не заменяет периодическую проверку реального контракта.

---

## Инварианты

- Инфраструктурные свойства проверяются на реальной или эквивалентной реализации.
- Integration tests изолированы по данным.
- Test infrastructure воспроизводима.
- Database migrations применяются в integration environment.
- Mock не используется как доказательство поведения внешней технологии.
- Критические внешние интеграции имеют способ проверки реального контракта.

---

## Заключение

Когда два компонента развиваются независимо, важна не только реализация каждого, но и совместимость их границы.

Эту задачу решает Contract Testing.
