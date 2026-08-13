---
title: Performance Testing
description: Проверка latency, throughput, capacity и клиентской производительности «Призмы».
---

# Performance Testing

## Статус

Accepted

---

## Введение

Performance requirement без повторяемого измерения является предположением.

Тестирование должно моделировать реальные workload patterns платформы.

---

## Виды проверки

```text
Performance
 ├── latency
 ├── load
 ├── stress
 ├── soak
 └── capacity
```

---

## Load test

Проверяет ожидаемую рабочую нагрузку.

```text
Expected workload
       │
       ▼
System
       │
       ▼
SLO maintained?
```

---

## Stress test

Нагрузка увеличивается до выхода за нормальные пределы.

Цель — понять:

- bottleneck;
- форму деградации;
- точку насыщения;
- recovery после перегрузки.

---

## Soak test

Долгий тест обнаруживает проблемы, которые не видны за несколько минут:

- memory leaks;
- connection leaks;
- growing queues;
- fragmentation;
- накопление stale state.

---

## GIS workload

Для карты тест должен учитывать:

- количество объектов;
- viewport changes;
- spatial queries;
- realtime updates;
- LOD transitions.

---

## Frontend performance

Проверяется отдельно:

```text
Frame time
Long tasks
Memory
GPU load
React renders
Network volume
```

Например, тысяча видимых автомобилей — это не только backend load test.

---

## Baseline

Результаты сравниваются с зафиксированным baseline.

```text
Before
  │
Change
  │
After
  │
Regression?
```

---

## Инварианты

- Performance tests моделируют реальный workload.
- Используются percentile latency metrics.
- Backend и frontend performance проверяются отдельно и end-to-end.
- Soak tests применяются к долгоживущим компонентам.
- Известна точка насыщения критических путей.
- Результаты сравниваются с baseline.
- Performance regression имеет определённый допустимый threshold.

---

## Заключение

Производительность проверяет систему при росте нагрузки.

Reliability требует проверить её поведение при отказах.

Следующая страница посвящена resilience testing.
