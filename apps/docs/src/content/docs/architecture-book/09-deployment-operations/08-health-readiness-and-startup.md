---
title: Health, readiness и startup
description: Правила определения жизнеспособности и готовности компонентов платформы.
---

# Health, readiness и startup

## Статус

Accepted

---

## Введение

Запущенный процесс не обязательно способен обслуживать запросы.

```text
Started ≠ Ready
```

После старта компонент может:

- загружать конфигурацию;
- восстанавливать checkpoint;
- подключаться к БД;
- прогревать projection;
- выполнять recovery.

---

## Liveness

Liveness отвечает:

> способен ли процесс продолжать существование?

Если нет, runtime может перезапустить его.

---

## Readiness

Readiness отвечает:

> можно ли сейчас направлять сюда рабочий traffic?

```text
Process
  │
  ├── alive ✔
  └── ready X
```

Такой экземпляр не нужно обязательно убивать.

Ему просто не следует выдавать workload.

---

## Startup

Для медленно запускающихся компонентов отдельная startup semantics предотвращает преждевременные рестарты.

---

## Dependency health

Не каждая недоступная зависимость делает компонент not-ready.

```text
Analytics provider X
Core API          ✔
```

Readiness зависит от критичности зависимости.

Иначе degraded mode станет невозможен.

---

## Recovery-aware readiness

После restart consumer может быть alive, но иметь огромный lag.

```text
Process alive
Lag: 5 000 000 events
```

Если его данные критичны для запросов, readiness может учитывать допустимый lag.

---

## Инварианты

- Liveness и readiness имеют разную семантику.
- Некритическая dependency failure не делает весь компонент unhealthy автоматически.
- Startup state отделяется от permanent failure при необходимости.
- Readiness соответствует реальной способности обслуживать workload.
- Health endpoint не выполняет чрезмерно дорогую работу.
- Recovery state учитывается там, где влияет на корректность.

---

## Заключение

Развёрнутую систему необходимо масштабировать и планировать относительно реальной нагрузки. Следующая страница связывает operations с capacity management.
