---
title: Latency и performance budgets
description: Правила распределения допустимого времени и ресурсов между компонентами платформы.
---

# Latency и performance budgets

## Статус

Accepted

## Введение

Требование «должно работать быстро» невозможно проверить.

Критические пользовательские пути должны иметь измеримые бюджеты.

## End-to-end latency

```text
User action
   │
   ▼
Network
   │
API
   │
Storage
   │
Response
   │
Render
   │
   ▼
Visible result
```

Пользователь воспринимает полный путь.

## Percentiles

Среднее значение скрывает хвост распределения.

```text
p50 → normal user
p95 → slow requests
p99 → tail latency
```

Для интерактивной платформы tail latency часто важнее среднего.

## Budget decomposition

Например, если целевой путь должен завершаться за 500 ms:

```text
Network       80ms
API          120ms
Storage      100ms
Serialization 50ms
Frontend     150ms
-----------------
Total        500ms
```

Это не фиксированные числа для всей «Призмы», а модель распределения ответственности.

## Frontend frame budget

Для плавного интерфейса тяжёлая работа не должна постоянно блокировать main thread.

При 60 FPS один кадр имеет примерно:

```text
16.7 ms
```

Не вся эта величина доступна JavaScript — браузеру также нужны layout, paint и compositing.

## Инварианты

- Критические пути имеют измеримые performance targets.
- Используются percentile metrics, а не только average.
- End-to-end budget включает frontend.
- Один компонент не должен незаметно потреблять весь бюджет.
- Performance regression измеряется относительно зафиксированного baseline.

## Заключение

Большая часть пользовательской нагрузки приходится на чтение. Далее определяется масштабирование read path.
