---
title: Окружения и конфигурация
description: Правила разделения окружений и управления конфигурацией платформы «Призма».
---

# Окружения и конфигурация

## Статус

Accepted

---

## Введение

Один и тот же код может работать в разных условиях.

Development использует тестовые интеграции.

Production использует реальные endpoints и инфраструктуру.

Эти различия должны задаваться конфигурацией, а не отдельными ветками поведения в исходном коде.

---

## Environment model

```text
Development
     │
Testing / Staging
     │
Production
```

Конкретное количество окружений может меняться.

Важно, чтобы назначение каждого было определено.

---

## Configuration

Конфигурацией являются параметры, которые изменяются между окружениями:

- endpoints;
- feature switches;
- resource limits;
- timeouts;
- storage locations;
- integration identifiers.

---

## Пример

Плохо:

```text
if production:
    use provider A
else:
    use fake provider
```

как разбросанная по Domain-коду логика.

Лучше:

```text
Integration Contract
       │
       ▼
Configured Adapter
```

Domain Model не знает имя окружения.

---

## Configuration validation

Ошибочная конфигурация должна обнаруживаться как можно раньше.

```text
Start
  │
  ▼
Validate configuration
  │
 ┌┴┐
 │ │
✔  X
│  │
Run Stop
```

Лучше не запустить компонент, чем запустить его в неизвестном состоянии.

---

## Dynamic configuration

Некоторые параметры могут изменяться без redeploy.

Но dynamic configuration создаёт новую форму runtime state.

Необходимо знать:

- кто изменил значение;
- когда;
- какое значение было раньше;
- какие компоненты его применили.

---

## Feature flags

Feature flag не должен становиться постоянным архитектурным слоем.

```text
Introduce
   │
Rollout
   │
Stabilize
   │
Remove flag
```

После завершения миграции временный flag удаляется.

---

## Environment parity

Staging полезен только тогда, когда достаточно похож на production по важным характеристикам.

Полная копия production не всегда экономически оправдана.

Но критические различия должны быть известны.

---

## Инварианты

- Domain Logic не зависит от имени окружения.
- Environment-specific values задаются конфигурацией.
- Конфигурация валидируется до готовности компонента.
- Dynamic configuration аудируется.
- Feature flags имеют lifecycle.
- Secrets не хранятся как обычная конфигурация.
- Критические различия окружений документированы.

---

## Заключение

Часть конфигурации содержит чувствительные значения. Следующая страница определяет управление secrets и credentials.
