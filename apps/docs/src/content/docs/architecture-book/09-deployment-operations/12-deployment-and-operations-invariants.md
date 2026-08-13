---
title: Инварианты развёртывания и эксплуатации
description: Итоговые обязательные правила поставки и эксплуатации платформы «Призма».
---

# Инварианты развёртывания и эксплуатации

## Статус

Accepted

---

## Основной принцип

```text
Build
  │
Deploy
  │
Verify
  │
Operate
  │
Recover
```

Каждый этап является частью архитектуры работающей системы.

---

## Обязательные правила

### Deployment topology не определяет Domain boundaries

Логическая архитектура существует независимо от количества процессов и серверов.

### Artifact воспроизводим

Одна собранная версия идентифицируется однозначно и не изменяется незаметно между окружениями.

### Configuration отделена от кода

Domain Logic не знает имя environment.

### Secrets отделены от configuration

Credentials имеют scope, rotation и revocation.

### Deployment учитывает coexistence версий

Rolling/canary deployment не должен ломать контракты между v1 и v2.

### Database migrations проектируются вместе с release

```text
Expand → Migrate → Contract
```

### Rollback не считается безопасным автоматически

Изменение persistent data может потребовать roll-forward.

### Edge является самостоятельной operational boundary

Узел имеет Identity, version, configuration и offline update strategy.

### Started не означает Ready

```text
Started ≠ Ready ≠ Recovered
```

### Health отражает архитектурную критичность

Отказ опциональной зависимости не превращает автоматически весь Core в unhealthy.

### Scaling сохраняет ownership

Добавление экземпляров не создаёт несколько авторитетных владельцев одного Domain State.

### Shutdown является управляемым

Компонент прекращает приём новой работы, завершает текущую и сохраняет необходимый checkpoint.

### Infrastructure versioned

Критическая topology воспроизводится из контролируемого определения.

### Operations наблюдаемы

Deployment, migration, configuration change, scaling и recovery доступны в observability timeline.

---

## Полный release flow

```text
Source
  │
  ▼
Tests
  │
  ▼
Build immutable artifact
  │
  ▼
Deploy candidate
  │
  ▼
Configuration validation
  │
  ▼
Database compatibility
  │
  ▼
Readiness
  │
  ▼
Limited traffic
  │
  ▼
Observe
  │
  ├── regression → rollback / roll-forward
  │
  └── healthy
          │
          ▼
      Full rollout
```

---

## Проверка нового deployment unit

Перед выделением нового компонента необходимо ответить:

1. Зачем он должен разворачиваться независимо?
2. Какую failure domain создаёт?
3. Где находится его state?
4. Какие dependencies критичны?
5. Как он получает configuration?
6. Какие secrets использует?
7. Как определяется readiness?
8. Как выполняется graceful shutdown?
9. Как масштабируется?
10. Как обновляется?
11. Совместимы ли соседние версии?
12. Как выполняется rollback?
13. Нужны ли database migrations?
14. Как он восстанавливается?
15. Какие operational metrics обязательны?

---

## Архитектурное значение

Deployment & Operations превращает архитектуру из схемы компонентов в реально работающую систему.

```text
Architecture
     │
     ▼
Deployable artifacts
     │
     ▼
Runtime topology
     │
     ▼
Observable operation
     │
     ▼
Controlled evolution
```

---

## Заключение

Теперь определено, как платформа строится, разворачивается, обновляется и эксплуатируется.

Но архитектурные правила имеют ценность только тогда, когда их можно проверить.

Следующий раздел книги — **Testing & Verification**.

Он определит, как «Призма» доказывает корректность Domain Invariants, контрактов, интеграций, производительности, надёжности и deployment-процессов до того, как ошибка попадёт в работающий цифровой мир.
