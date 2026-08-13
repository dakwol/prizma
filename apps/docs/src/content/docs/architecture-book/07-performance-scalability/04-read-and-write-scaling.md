---
title: Масштабирование чтения и записи
description: Архитектурное разделение read и write workload платформы «Призма».
---

# Масштабирование чтения и записи

## Статус

Accepted

## Введение

Чтение и изменение цифрового мира имеют разные требования.

Write path защищает согласованность.

Read path оптимизируется под способы потребления данных.

## Write path

```text
Command
  │
Authorization
  │
Validation
  │
Transaction
  │
Authoritative State
```

Масштабирование записи не должно создавать несколько неявных владельцев одного состояния.

## Read path

```text
Authoritative State
      │
      ▼
Projection
      │
 ┌────┼────┐
 ▼    ▼    ▼
Map  List Analytics
```

Проекции могут масштабироваться независимо.

## Read replicas

Если модель хранения допускает replicas, необходимо учитывать replication lag.

```text
Primary version 105
Replica version 103
```

Read replica не должна использоваться там, где операция требует гарантированно актуального состояния.

## Partitioning

Большой объём данных может делиться по естественной границе:

- world;
- organization;
- time;
- spatial region;
- object identity.

Partition key должен соответствовать реальным access patterns.

## Hot partitions

Неравномерное распределение создаёт hotspot.

```text
Partition A ██████████
Partition B ██
Partition C █
```

Поэтому partitioning оценивается по фактической нагрузке.

## Инварианты

- Write scaling сохраняет единственность владельца состояния.
- Read scaling допускает специализированные проекции.
- Replica lag учитывается в семантике чтения.
- Partitioning определяется access patterns.
- Hot partitions являются наблюдаемой характеристикой.

## Заключение

Особый read workload «Призмы» создаёт карта и пространственные запросы. Далее рассматривается spatial/GIS scaling.
