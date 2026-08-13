---
title: Database migrations
description: Правила безопасного изменения persistent storage во время выпуска новых версий.
---

# Database migrations

## Статус

Accepted

---

## Введение

Код можно быстро заменить предыдущей версией.

Изменённые данные откатить значительно сложнее.

Поэтому database migration рассматривается отдельно от deployment приложения.

---

## Expand and contract

Предпочтительная стратегия:

```text
1. Expand schema
2. Deploy compatible code
3. Migrate data
4. Stop using old schema
5. Contract schema
```

---

## Пример

Нужно заменить поле:

```text
camera_name
```

новой структурой.

Нельзя сначала удалить старое поле, если работающие экземпляры v1 всё ещё его используют.

Сначала добавляется новая структура.

Затем версии сосуществуют.

Только после полного перехода старая удаляется.

---

## Blocking migrations

Операция, блокирующая большую таблицу на длительное время, может превратить deployment в outage.

Для крупных изменений используются:

- batches;
- online migration mechanisms;
- background backfill;
- controlled throttling.

---

## Migration ownership

Каждая migration принадлежит конкретной версии схемы и deployment process.

Нельзя выполнять неизвестный набор SQL вручную без отслеживания состояния.

---

## Forward compatibility

Иногда rollback к старому коду должен быть возможен после применения новой схемы.

Поэтому expand phase предпочтительно остаётся совместимой со старой версией.

---

## Data validation

После backfill проверяется:

```text
Source
  │
Migration
  │
Target
  │
Invariant validation
```

Количество строк не гарантирует сохранение предметного смысла.

---

## Инварианты

- Database migration является частью deployment design.
- Разрушающие изменения не выполняются до прекращения использования старого контракта.
- Крупные migration выполняются контролируемо и наблюдаемо.
- Schema version отслеживается.
- Backfill restartable при больших объёмах.
- Rollback strategy учитывает уже изменённые данные.
- После migration проверяются инварианты.

---

## Заключение

Даже при аккуратном rollout новая версия может оказаться ошибочной. Следующая страница определяет rollback и roll-forward.
