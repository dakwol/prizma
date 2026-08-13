---
title: Capacity Planning
description: Архитектурная модель оценки ресурсов и пределов масштабирования платформы «Призма».
---

# Capacity Planning

## Статус

Accepted

## Введение

Масштабирование после полной перегрузки является реакцией на инцидент.

Capacity planning позволяет понимать запас системы до достижения предела.

## Capacity dimensions

Для разных компонентов предел определяется разным ресурсом:

```text
API        → CPU / connections
Database   → IOPS / CPU / storage
Realtime   → connections / fan-out
Media      → bandwidth / encoding
Frontend   → CPU / GPU / memory
Queue      → throughput / lag
```

## Headroom

Работа на 100% устойчивой ёмкости оставляет системе нулевой запас для всплеска или отказа одного узла.

```text
Capacity 100%
Normal load 60%
Headroom 40%
```

Конкретный target зависит от компонента.

## Horizontal scaling

```text
Load
 │
 ├── Instance A
 ├── Instance B
 └── Instance C
```

Горизонтальное масштабирование полезно только если bottleneck действительно масштабируется добавлением экземпляров.

## Vertical scaling

Иногда увеличение CPU/RAM проще и экономически эффективнее распределения системы.

Архитектура не должна считать horizontal scaling единственно правильным вариантом.

## Load testing

Тест должен моделировать реальный workload:

- количество объектов;
- update frequency;
- spatial queries;
- concurrent users;
- streams;
- burst behavior.

Абстрактные запросы в пустой API дают слабую информацию.

## Growth forecast

Capacity plan учитывает ожидаемый рост данных и пользователей.

```text
Today
  │
3 months
  │
1 year
```

Прогноз пересматривается по фактическим метрикам.

## Инварианты

- Для критических компонентов известен limiting resource.
- Система имеет измеримый headroom.
- Load tests моделируют реальные workload patterns.
- Horizontal scaling применяется только к масштабируемым bottleneck.
- Capacity forecast регулярно сверяется с фактическими метриками.
- Storage growth учитывается отдельно от request throughput.

## Заключение

Backend capacity — только половина платформы. Для «Призмы» существенная часть вычислений выполняется непосредственно в браузере.
