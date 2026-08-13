---
title: Contract Testing
description: Архитектурная модель проверки совместимости API, событий и межкомпонентных контрактов.
---

# Contract Testing

## Статус

Accepted

---

## Введение

Распределённая система ломается не только тогда, когда компонент работает неправильно.

Она ломается и тогда, когда два корректных по отдельности компонента перестают понимать друг друга.

---

## Контракт

Контракт определяет наблюдаемое взаимодействие:

```text
Producer
   │
 Contract
   │
Consumer
```

Это может быть:

- HTTP API;
- event schema;
- realtime message;
- file format;
- edge protocol.

---

## Provider verification

Producer должен доказать, что продолжает выполнять опубликованный контракт.

```text
Contract
   │
   ▼
Provider implementation
   │
   ▼
Verification
```

---

## Consumer assumptions

Consumer также имеет ожидания.

Например:

```text
VehicleUpdated
 ├── vehicleId
 ├── position
 └── version
```

Если consumer требует `version`, удаление поля является breaking change независимо от того, компилируется ли producer.

---

## Compatibility

Контрактные тесты особенно важны при:

- rolling deployment;
- независимом release;
- edge version skew;
- внешних интеграциях.

```text
v1 consumer
v2 producer
     │
     ▼
Compatible?
```

---

## Event contracts

Событие уже могло быть сохранено в очереди или истории.

Поэтому изменение event schema должно учитывать старые сообщения.

---

## Schema validation

Формальная schema полезна, но не заменяет семантику.

```text
speed: number
```

не говорит, измеряется ли скорость в `m/s` или `km/h`.

Контракт включает смысл данных.

---

## Инварианты

- Публичные API и message contracts имеют проверяемое описание.
- Producer и consumer compatibility проверяются до rollout.
- Contract включает семантику, а не только типы полей.
- Event evolution учитывает уже существующие сообщения.
- Edge compatibility проверяется для поддерживаемого version window.
- Breaking changes выполняются через versioning или migration strategy.

---

## Заключение

Контракты проверяют границы компонентов. Но необходимо также доказать работу целого пользовательского сценария.

Следующая страница посвящена system и end-to-end testing.
