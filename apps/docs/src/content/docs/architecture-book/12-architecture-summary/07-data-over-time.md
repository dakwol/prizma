---
title: Данные во времени
description: Итоговая модель истории, retention, архивирования и удаления данных цифрового мира.
---

# Данные во времени

## Статус

Accepted

---

## Введение

Цифровой мир существует долго.

Поэтому данные проходят собственный жизненный цикл.

---

## Модель

```text
Created
  │
Active
  │
Historical
  │
Archived
  │
Deleted
```

Не каждый класс проходит все состояния.

---

## Разные данные — разные lifecycle

```text
Current Domain State → protected
Domain History       → long-lived
Raw Telemetry        → high-volume retention
Projection           → rebuildable
Cache                → disposable
Media                → own retention
Logs                 → operational retention
```

---

## Пример

Автомобиль существует пять лет.

Его текущая запись может занимать килобайты.

Но история координат — гигабайты.

```text
Current
   │
Recent telemetry → Hot
   │
Older history    → Warm
   │
Archive          → Cold
```

---

## Schema evolution

Данные переживают версии приложения.

```text
Runtime v1
Runtime v2
Runtime v3
    │
    ▼
Long-lived data
```

Поэтому persistent formats должны иметь migration/versioning strategy.

---

## Deletion

```text
Logical removal
       ≠
Physical erasure
```

Удалённый из активного мира автомобиль может оставаться частью исторического контекста, если это допускают требования.

---

## Инварианты

- Lifecycle определяется смыслом данных.
- Current и Historical State имеют разные access patterns.
- Телеметрия имеет отдельную retention policy.
- Projection и cache не получают защиту source of truth без причины.
- Архив остаётся читаемым.
- Schema evolution учитывает долгоживущие данные.
- Physical deletion выполняется контролируемо.

---

## Заключение

Все эти механизмы должны существовать в реальной инфраструктуре и переживать обновления. Следующая страница связывает архитектуру с operations.
