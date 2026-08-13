---
title: Изоляция отказов
description: Circuit Breaker, bulkhead и правила предотвращения каскадных отказов.
---

# Изоляция отказов

## Статус

Accepted

## Введение

Если недоступную зависимость продолжать нагружать, локальный отказ способен распространиться на вызывающие компоненты.

## Circuit Breaker

```text
Closed
 │ failures
 ▼
Open
 │ cooldown
 ▼
Half-open
 ├── success → Closed
 └── failure → Open
```

В состоянии Open запросы fail-fast и не удерживают ресурсы на заведомо проблемной зависимости.

## Bulkhead

Разные типы нагрузки могут иметь отдельные ресурсы.

```text
Resources
 ├── Camera integration pool
 ├── Analytics pool
 └── General API pool
```

Перегрузка Camera Integration не должна исчерпать ресурсы Transport.

## Backpressure

Очередь не является бесконечным буфером.

```text
Producer >>> Consumer
       │
       ▼
     backlog ↑
```

При росте backlog необходимы ограничения производства, отказ от части работы или масштабирование consumer.

## Load shedding

При перегрузке менее критичные функции могут временно отключаться.

```text
Critical commands   ✔
Current state       ✔
Heavy analytics     X
Optional exports    X
```

## Инварианты

- Отказ зависимости не занимает бесконтрольно общие ресурсы.
- Circuit Breaker не заменяет timeout.
- Ресурсоёмкие области изолируются bulkhead-лимитами при необходимости.
- Очереди имеют конечную ёмкость и наблюдаемый lag.
- Существует backpressure/load-shedding strategy.
- Независимые интеграции не должны создавать общую failure domain без необходимости.

## Заключение

После локализации отказа система должна определить, какие функции остаются доступными. Это degraded mode.
