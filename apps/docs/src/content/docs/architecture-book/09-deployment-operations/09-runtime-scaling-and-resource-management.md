---
title: Runtime scaling и управление ресурсами
description: Эксплуатационные правила масштабирования и ограничения ресурсов работающей платформы.
---

# Runtime scaling и управление ресурсами

## Статус

Accepted

---

## Введение

Performance architecture определяет, как система масштабируется концептуально.

Operations определяет, как это происходит в работающей инфраструктуре.

---

## Resource requests и limits

Компонент должен иметь понятную модель потребления:

```text
Service
 ├── CPU
 ├── Memory
 ├── Connections
 └── Storage / bandwidth
```

Случайные значения limits способны создавать искусственные outages.

---

## Horizontal scaling

```text
Load
  │
  ├── instance A
  ├── instance B
  └── instance C
```

Работает только для workload, который допускает распределение.

---

## Autoscaling

Autoscaling может опираться не только на CPU.

Для разных компонентов полезны:

- request rate;
- queue lag;
- active sessions;
- connection count;
- media workload.

```text
Queue lag ↑
    │
    ▼
Workers ↑
```

---

## Scale-down

Уменьшение количества экземпляров также требует корректного lifecycle.

Компонент должен:

- перестать принимать новую работу;
- завершить или передать текущую;
- сохранить checkpoint;
- корректно закрыться.

---

## Graceful shutdown

```text
SIGTERM
  │
Stop accepting
  │
Drain
  │
Persist state
  │
Exit
```

Жёсткое завершение остаётся fallback после ограниченного времени.

---

## Noisy neighbor

Один workload не должен бесконтрольно вытеснять другой.

Это особенно важно для:

- media;
- analytics;
- lifecycle jobs;
- bulk imports.

---

## Инварианты

- Resource limits основаны на измерениях.
- Autoscaling использует метрику, связанную с реальным bottleneck.
- Scale-down выполняется graceful.
- Background workload имеет отдельные resource boundaries.
- Масштабирование не создаёт нового владельца Domain State.
- Capacity headroom сохраняется при отказе части экземпляров там, где это требуется SLO.

---

## Заключение

Работающая инфраструктура неизбежно переживает инциденты. Следующая страница определяет operational incident model.
