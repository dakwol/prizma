---
title: Масштабирование realtime
description: Архитектурная модель доставки обновлений цифрового мира большому количеству клиентов.
---

# Масштабирование realtime

## Статус

Accepted

## Введение

Realtime не означает «доставлять всем всё мгновенно».

Такой подход плохо масштабируется и создаёт ненужную работу на сервере, сети и frontend.

## Interest model

Клиент должен получать данные, которые относятся к его текущему интересу.

```text
Client
  │
  ├── viewport
  ├── selected objects
  ├── subscriptions
  └── permissions
```

## Fan-out

```text
1000 updates/sec
×
500 clients
=
potentially 500 000 deliveries/sec
```

Поэтому fan-out является самостоятельной нагрузкой.

## Visibility-based subscription

Для карты:

```text
World
  │
Spatial interest
  │
Visible objects
  │
Realtime subscription
```

Изменение viewport может менять набор подписок.

## Coalescing

Если объект обновился десять раз, а клиент способен визуально обработать только два состояния за этот период, промежуточные значения могут быть агрегированы там, где предметная семантика это допускает.

История при этом не обязана теряться.

```text
Authoritative events: 1 2 3 4 5
Realtime projection:  1   3   5
```

## Backpressure

Медленный клиент не должен бесконечно увеличивать серверную очередь.

Политика может включать:

- coalescing;
- bounded buffer;
- disconnect;
- resnapshot.

## Reconnect

После reconnect клиент восстанавливает актуальное состояние через snapshot/resume/reconciliation, а не предполагает отсутствие пропущенных событий.

## Инварианты

- Realtime delivery основана на interest/subscription model.
- Не каждый клиент получает все изменения мира.
- Fan-out измеряется отдельно.
- Медленный клиент не создаёт бесконечный backlog.
- Coalescing допускается только там, где не нарушает смысл данных.
- Reconnect имеет recovery strategy.
- Security scope применяется до доставки realtime данных.

## Заключение

Особый поток данных создают камеры и видео. Он требует отдельной модели масштабирования.
