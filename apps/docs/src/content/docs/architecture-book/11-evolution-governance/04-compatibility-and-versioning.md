---
title: Совместимость и версионирование
description: Правила эволюции публичных контрактов и совместимости компонентов платформы.
---

# Совместимость и версионирование

## Статус

Accepted

---

## Введение

Independent deployment и edge version skew означают, что разные версии системы могут работать одновременно.

Поэтому compatibility является частью архитектуры.

---

## Виды совместимости

```text
Backward compatibility
Forward compatibility
Data compatibility
Protocol compatibility
```

---

## Additive change

Предпочтительное изменение — добавление без разрушения старого потребителя.

```text
v1:
id
position

v2:
id
position
quality?
```

Старый consumer способен продолжить работу.

---

## Breaking change

Пример:

```text
speed: m/s
```

меняется на:

```text
speed: km/h
```

Тип поля остался `number`, но семантика сломана.

Версионирование учитывает смысл, а не только schema shape.

---

## Compatibility window

Для edge и rolling deployment определяется поддерживаемое окно версий.

```text
Server v12
supports clients v10-v12
```

Конкретный диапазон зависит от продукта.

---

## Data compatibility

Долгоживущие события и архивы могут пережить runtime version.

Reader должен понимать сохранённый формат или иметь migration path.

---

## Versioning не лечит плохой контракт

Создание `v2`, `v3`, `v4` вместо аккуратной эволюции быстро создаёт permanent complexity.

Новая версия появляется только при реальной несовместимости.

---

## Инварианты

- Compatibility рассматривается до rollout.
- Семантические изменения считаются breaking даже при одинаковом типе данных.
- Additive evolution предпочтительнее разрушения.
- Edge имеет определённый version compatibility window.
- Persistent formats versioned.
- Новая major версия контракта создаётся только при необходимости.
- Старые версии имеют deprecation lifecycle.

---

## Заключение

Совместимость не означает вечную поддержку старых контрактов.

Следующая страница определяет deprecation policy.
