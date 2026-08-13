---
title: Производительность frontend
description: Архитектурная модель производительности клиентского приложения, карты и 3D-представления «Призмы».
---

# Производительность frontend

## Статус

Accepted

## Введение

Для пользователя backend с latency 20 ms бесполезен, если интерфейс рендерит результат несколько секунд или работает с 10 FPS.

Frontend является полноценной частью performance architecture.

## Main thread

Тяжёлая синхронная работа блокирует:

- input;
- rendering;
- React updates;
- map interaction.

```text
Long task
████████████████████
        │
        ▼
Dropped frames
```

## Rendering budget

Карта и 3D должны использовать LOD, culling и selective updates.

```text
Near → detailed
Mid  → simplified
Far  → minimal
Off-screen → no heavy work
```

## Data volume

Frontend не должен получать данные, которые не способен эффективно использовать.

```text
Backend can send 100 MB
        ≠
Browser should receive 100 MB
```

Server-side projection и interest filtering являются частью frontend performance.

## React updates

Высокочастотная телеметрия не должна заставлять всё React-дерево перерендериваться на каждое изменение.

Realtime rendering path может быть отделён от обычного UI state там, где это необходимо.

## Memory

Долгоживущая карта особенно чувствительна к:

- забытым listeners;
- timers;
- retained Three.js resources;
- textures;
- stale subscriptions;
- growing history buffers.

Performance tests должны включать длительные сессии.

## GPU

3D performance измеряется отдельно:

- draw calls;
- geometry complexity;
- textures;
- post-processing;
- shader cost;
- GPU memory.

## Инварианты

- Frontend входит в end-to-end performance budget.
- High-frequency updates не вызывают глобальные UI renders без необходимости.
- Off-screen и дальние объекты используют упрощённый путь.
- Неиспользуемые subscriptions и GPU resources освобождаются.
- Длительные сессии проверяются на memory growth.
- Server не передаёт клиенту заведомо ненужный объём данных.
- GPU и CPU bottlenecks измеряются раздельно.

## Заключение

Все performance-механизмы должны контролироваться общими инвариантами, чтобы локальная оптимизация не разрушала архитектуру.
