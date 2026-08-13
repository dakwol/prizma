---
title: Edge deployment
description: Архитектурная модель поставки и эксплуатации локальных узлов платформы «Призма».
---

# Edge deployment

## Статус

Accepted

---

## Введение

Часть интеграций может находиться непосредственно на предприятии.

Например, локальный узел может взаимодействовать с:

- камерами;
- GPS-оборудованием;
- локальными системами;
- устройствами внутри закрытой сети.

Такой узел нельзя эксплуатировать как обычный центральный сервер.

---

## Edge identity

Каждый edge-узел имеет собственную Identity.

```text
Central Platform
       │
       ▼
Authenticated Edge Node
       │
       ▼
Local systems
```

Узел не доверяется только потому, что находится в локальной сети.

---

## Version management

Центр должен знать:

```text
Edge A → v12
Edge B → v12
Edge C → v10
```

Разные версии могут существовать одновременно из-за временной недоступности площадки.

Контракты должны учитывать допустимое compatibility window.

---

## Offline deployment

Edge может не иметь постоянной связи.

Обновление должно учитывать:

- прерывание download;
- повтор;
- проверку artifact;
- безопасную установку;
- rollback.

---

## Local configuration

Конфигурация edge может зависеть от площадки:

```text
Edge
 ├── local camera endpoints
 ├── local network
 └── site identity
```

Она отделяется от общего application artifact.

---

## Local state

Если edge хранит локальное состояние, его lifecycle и ownership должны быть определены.

```text
Central unavailable
      │
      ▼
Edge continues permitted work
      │
      ▼
Central restored
      │
      ▼
Reconciliation
```

---

## Security

Физический доступ к edge считается реалистичным риском.

Поэтому:

- secrets ограничены;
- identity отзывается;
- artifact проверяется;
- локальные данные защищаются по необходимости.

---

## Инварианты

- Каждый edge имеет отдельную Identity.
- Версия каждого edge известна центральной платформе.
- Edge update устойчив к разрыву связи.
- Artifact проверяется перед запуском.
- Site-specific configuration не встраивается в общий build.
- Offline behavior и reconciliation определены заранее.
- Компрометация одного edge не должна автоматически компрометировать остальные узлы.

---

## Заключение

После deployment система должна доказать, что она готова принимать traffic. Это задача health и readiness.
