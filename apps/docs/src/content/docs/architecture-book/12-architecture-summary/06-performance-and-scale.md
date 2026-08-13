---
title: Производительность и масштаб
description: Итоговая модель масштабирования «Призмы» без разрушения предметной архитектуры.
---

# Производительность и масштаб

## Статус

Accepted

---

## Введение

Масштабирование не должно начинаться с количества серверов.

Сначала определяется workload.

---

## Workload

Для «Призмы» разные нагрузки имеют разную природу:

```text
Workload
 ├── Domain writes
 ├── Read queries
 ├── Spatial queries
 ├── Realtime updates
 ├── Telemetry ingestion
 ├── Media
 └── Analytics
```

Один scaling mechanism не подходит всему.

---

## Пример

Рост количества автомобилей создаёт одновременно:

- больше телеметрии;
- больше spatial objects;
- больше realtime updates;
- больше исторических данных.

Но увеличение числа пользователей в UI создаёт другой профиль нагрузки.

---

## Scale independently where necessary

```text
Domain Core
   │
   ├── Read Projection → scale reads
   ├── Telemetry       → scale ingestion
   └── Media           → scale bandwidth/GPU/CPU
```

Физическое разделение оправдано измеряемым bottleneck.

---

## Frontend

Клиент также является частью performance architecture.

Для карты:

```text
10000 known objects
       │
       ▼
Viewport filtering
       │
       ▼
Visible subset
       │
       ▼
LOD / rendering
```

Нельзя бесконечно добавлять DOM/Three.js objects и надеяться только на backend scaling.

---

## Performance budgets

Критические пути имеют бюджеты:

- latency;
- throughput;
- memory;
- frame time;
- bandwidth.

---

## Инварианты

- Scaling начинается с workload model.
- Разные workload classes масштабируются независимо при необходимости.
- Bottleneck подтверждается измерением.
- Read optimization не меняет ownership Domain State.
- Frontend имеет собственные performance budgets.
- Capacity включает headroom.
- Оптимизация не нарушает Domain Invariants ради скорости.

---

## Заключение

Рост workload неизбежно создаёт рост данных. Поэтому масштабирование связано с Data Lifecycle.
