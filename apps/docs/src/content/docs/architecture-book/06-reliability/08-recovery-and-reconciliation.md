---
title: Восстановление и reconciliation
description: Правила восстановления процессов, проекций и интеграций после временных отказов.
---

# Восстановление и reconciliation

## Статус

Accepted

## Введение

Restart процесса не означает полного восстановления системы. Проекция может отставать, сообщения могли накопиться, а локальное состояние — разойтись с авторитетным.

## Resume и replay

Consumer должен знать точку продолжения.

```text
Processed through 1052
       │
     restart
       │
       ▼
Resume 1053
```

## Rebuild

Производная проекция может быть полностью пересоздана из авторитетного источника.

```text
Projection X
    │
    X
    │
Authoritative Source
    │
    ▼
Rebuild
```

## Reconciliation

```text
Authoritative state
        │
        ├── compare
        │
Observed state
        │
        ▼
Difference
        │
Resolution policy
```

Разрешение конфликта основывается на владении и предметных правилах.

## Realtime reconnect

После разрыва SignalR нельзя предполагать отсутствие потерянных обновлений.

```text
disconnect
   │
reconnect
   │
snapshot / resume token
   │
reconcile local projection
   │
continue realtime
```

## Poison messages

Одно проблемное сообщение не должно незаметно навсегда останавливать consumer. После ограниченной обработки оно переводится в наблюдаемое состояние согласно политике потока.

## Readiness

```text
Process started ≠ Fully recovered
```

Компонент должен учитывать lag, checkpoint и необходимые зависимости перед объявлением готовности.

## Инварианты

- Restart не считается автоматически recovery.
- Проекции имеют resume или rebuild strategy.
- Realtime reconnect учитывает разрыв данных.
- Consumer имеет checkpoint, если поток требует продолжения.
- Reconciliation опирается на владельца состояния.
- Конфликты не разрешаются случайно.
- Recovery progress наблюдаем.
- Readiness учитывает необходимое восстановление состояния.

## Заключение

Локальные механизмы не покрывают потерю хранилища или площадки. Для этого существует Disaster Recovery.
