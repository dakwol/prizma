---
title: Путь изменения цифрового мира
description: Сквозная архитектурная модель прохождения изменения через платформу.
---

# Путь изменения цифрового мира

## Статус

Accepted

---

## Введение

Изменение может начаться в разных местах:

- пользователь изменил объект;
- автомобиль прислал координату;
- камера изменила состояние;
- внешний сервис прислал событие;
- автоматический сценарий инициировал действие.

Источник различается.

Архитектурный путь изменения остаётся единым.

---

## Полная цепочка

```text
Source
  │
  ▼
Input Boundary
  │
  ▼
Normalization
  │
  ▼
Intent / Command
  │
  ▼
Authorization
  │
  ▼
Execution
  │
  ▼
Domain Validation
  │
  ▼
Transaction
  │
  ▼
Commit
  │
  ├── State
  ├── Version
  └── Events
          │
          ▼
      Propagation
          │
          ├── Projections
          ├── Realtime
          ├── Integrations
          └── Automation
```

---

## Пример: изменение статуса автомобиля

Пользователь переводит автомобиль в состояние `Maintenance`.

```text
UI
 │
 ▼
ChangeVehicleStatus
 │
 ▼
Authorization
 │
 ▼
Execution
 │
 ▼
Can current state transition to Maintenance?
 │
 ├── no → rejection
 │
 └── yes
       │
       ▼
    Transaction
       │
       ▼
    Commit
       │
       ├── new state
       └── VehicleStatusChanged
```

После commit:

```text
VehicleStatusChanged
       │
       ├── map projection
       ├── object list
       ├── analytics
       └── external consumers
```

---

## До commit и после commit

Это важная граница.

```text
Before Commit
──────────────
validation
authorization
domain execution

After Commit
────────────
propagation
projection update
notifications
external effects
```

Внешний side effect не должен случайно становиться частью незавершённого изменения мира.

---

## Ошибка до commit

```text
Command
  │
Validation X
  │
  ▼
World unchanged
```

---

## Ошибка после commit

```text
Commit ✔
   │
Projection update X
```

Мир уже изменился.

Задача reliability-механизмов — довести производное состояние до согласованности, а не отменить существование commit.

---

## Инварианты

- Все изменения проходят определённую execution boundary.
- Authorization выполняется до защищённого изменения.
- Domain Invariants проверяются до успешного commit.
- Commit является границей появления нового авторитетного состояния.
- Post-commit failure не делает вид, что commit не существовал.
- Производные consumers способны догнать авторитетное состояние.

---

## Заключение

После commit начинается вторая половина жизни изменения — его распространение.
