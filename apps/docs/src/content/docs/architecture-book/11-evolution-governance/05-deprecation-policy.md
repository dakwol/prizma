---
title: Deprecation Policy
description: Правила управляемого вывода устаревших контрактов, функций и архитектурных решений.
---

# Deprecation Policy

## Статус

Accepted

---

## Введение

Платформа не может бесконечно поддерживать каждое когда-либо созданное API.

Но мгновенное удаление старого контракта также недопустимо.

---

## Lifecycle

```text
Active
  │
Deprecated
  │
Migration window
  │
Removed
```

---

## Deprecation announcement

Должно быть известно:

- что устаревает;
- почему;
- чем заменить;
- когда прекращается поддержка;
- какие consumers ещё используют контракт.

---

## Usage visibility

Нельзя безопасно удалить API, если неизвестно, кто им пользуется.

```text
Deprecated API
     │
     ▼
Usage metrics
     │
     ├── Consumer A
     └── Consumer B
```

Observability помогает доказать завершение migration.

---

## Internal deprecation

Правило применяется не только к публичным внешним API.

Старый internal contract также может иметь consumers.

---

## Emergency removal

Security vulnerability может потребовать ускоренного удаления.

Но это исключение с отдельной communication/migration policy.

---

## Инварианты

- Deprecated contract имеет replacement или объяснение отсутствия replacement.
- Определяется migration window.
- Usage наблюдаем до removal.
- Removal выполняется только после проверки оставшихся consumers.
- Deprecated code не остаётся бессрочно без владельца.
- Critical security reason может сократить lifecycle, но фиксируется явно.

---

## Заключение

Эволюция контрактов требует ясного ownership.

Следующая страница определяет ответственность за архитектурные области.
