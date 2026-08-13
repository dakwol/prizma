---
title: Стратегии развёртывания
description: Архитектурные правила безопасного выпуска новых версий платформы «Призма».
---

# Стратегии развёртывания

## Статус

Accepted

---

## Введение

Deployment создаёт период, когда старая и новая версии системы могут существовать одновременно.

Архитектура должна учитывать этот переход.

---

## Rolling deployment

```text
v1 v1 v1
   │
   ▼
v2 v1 v1
   │
   ▼
v2 v2 v1
   │
   ▼
v2 v2 v2
```

Во время rollout обе версии должны быть совместимы по используемым контрактам и данным.

---

## Blue-Green

```text
Blue  v1 ← traffic
Green v2

verify Green

Blue  v1
Green v2 ← traffic
```

Стратегия упрощает переключение, но требует достаточной инфраструктуры.

---

## Canary

Новая версия сначала получает ограниченную долю workload.

```text
95% → v1
 5% → v2
```

После проверки доля постепенно увеличивается.

---

## Выбор стратегии

Не существует единственной стратегии для всей платформы.

Выбор зависит от:

- statefulness;
- traffic;
- стоимости инфраструктуры;
- migration compatibility;
- risk;
- deployment unit.

---

## Verification

После deployment проверяются не только процессы.

```text
Process running
      │
      ▼
Health
      │
      ▼
Readiness
      │
      ▼
Synthetic / real signals
      │
      ▼
Deployment accepted
```

---

## Инварианты

- Deployment strategy учитывает coexistence версий.
- Новая версия не получает production traffic до readiness.
- Rollout имеет измеримые критерии успеха.
- Ошибки deployment наблюдаемы.
- Стратегия выбирается по характеристикам deployment unit.
- Выпуск может быть остановлен до полного rollout.

---

## Заключение

Особенно сложный deployment возникает, когда новая версия изменяет persistent data. Следующая страница посвящена database migrations.
