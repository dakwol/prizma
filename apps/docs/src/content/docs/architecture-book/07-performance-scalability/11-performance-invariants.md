---
title: Инварианты производительности
description: Итоговые обязательные правила производительности и масштабирования платформы «Призма».
---

# Инварианты производительности

## Статус

Accepted

## Основной принцип

```text
Measure → Understand → Optimize → Verify
```

Не:

```text
Guess → Add complexity
```

## Обязательные правила

### Производительность измеряется end-to-end

Backend, сеть, frontend и rendering входят в один пользовательский путь.

### Оптимизируется bottleneck

Архитектурная сложность не добавляется без измеренной причины.

### Workload имеет модель

Reads, writes, realtime, GIS, media и analytics имеют отдельные характеристики.

### Read и write path разделяются по ответственности

Read optimization не обходит authoritative Domain State.

### Карта использует spatial interest

Клиент не загружает весь цифровой мир без необходимости.

### Realtime использует subscriptions

```text
Relevant changes → Client
All other changes → not delivered
```

### Media workload изолирован

Видео не должно вытеснять ресурсы основных Domain operations.

### Cache не становится источником истины

Freshness и invalidation являются частью cache contract.

### Backpressure обязателен для ограниченных consumers

Бесконечная очередь не считается scaling strategy.

### Capacity имеет headroom

Критические компоненты не планируются для постоянной работы у физического предела.

### Frontend является частью архитектуры производительности

FPS, frame time, memory, CPU и GPU являются такими же измеряемыми ресурсами, как backend CPU и database IOPS.

### Performance regression проверяется

Для критических путей существуют baseline и повторяемые измерения.

## Пример полного пути карты

```text
User moves map
      │
      ▼
Viewport changes
      │
      ▼
Spatial query
      │
      ▼
Relevant projection
      │
      ▼
Realtime subscriptions updated
      │
      ▼
Only relevant objects delivered
      │
      ▼
LOD / culling
      │
      ▼
Frame rendered
```

Каждый этап уменьшает работу до реально необходимого объёма.

## Проверка новой возможности

Перед выпуском необходимо ответить:

1. Какой workload создаёт функция?
2. Каков ожидаемый peak?
3. Какой end-to-end latency target?
4. Какой компонент является потенциальным bottleneck?
5. Можно ли ограничить данные областью интереса?
6. Требуется ли отдельная projection?
7. Как масштабируется read path?
8. Как масштабируется write path?
9. Есть ли realtime fan-out?
10. Нужен ли cache?
11. Как работает backpressure?
12. Какой resource limit ожидается?
13. Как функция влияет на frontend frame time?
14. Как измеряется regression?
15. Какой запас capacity необходим?

## Архитектурное значение

Производительность «Призмы» строится не на попытке сделать каждый компонент максимально быстрым.

Она строится на сокращении ненужной работы.

```text
All data
   │
Interest filtering
   │
Projection
   │
LOD / aggregation
   │
Relevant work only
```

Это позволяет системе расти без постоянного усложнения Domain Model.

## Заключение

После определения того, как платформа выдерживает рост нагрузки, необходимо определить жизненный цикл накопленных данных.

Объекты меняются годами.

История растёт.

События, версии, вложения и медиаданные имеют разные сроки хранения.

Следующий раздел книги — **Data Lifecycle**.
