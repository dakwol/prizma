---
title: Инварианты тестирования и верификации
description: Итоговые правила доказательства корректности архитектуры платформы «Призма».
---

# Инварианты тестирования и верификации

## Статус

Accepted

---

## Основной принцип

```text
Requirement
   │
   ▼
Invariant
   │
   ▼
Verification
   │
   ▼
Evidence
```

Архитектурное решение считается сильнее, если существует воспроизводимый способ доказать его свойства.

---

## Обязательные правила

### Domain Invariants проверяются непосредственно

Тест ориентируется на допустимое состояние мира, а не на внутренний вызов функции.

### Инфраструктура проверяется интеграционно

Mock не доказывает transaction semantics реальной базы данных.

### Контракты проверяются на совместимость

API, events, realtime и edge protocols имеют version-aware verification.

### E2E используется для критических путей

Полный пользовательский сценарий проверяется от действия до наблюдаемого результата.

### Performance имеет baseline

```text
Before → Change → After
```

Regression измеряется, а не оценивается визуально.

### Failure modes тестируются

Timeout, retry, circuit breaker, degradation, restart и reconciliation должны иметь проверяемое поведение.

### Concurrency проверяется конкурентно

Последовательная имитация не заменяет реальную гонку.

### Security проверяет запрет

Неавторизованный сценарий является таким же обязательным, как разрешённый.

### Архитектурные зависимости защищаются автоматически

Критические module/layer boundaries имеют architecture tests.

### Test data воспроизводимы

Результат не зависит от случайного состояния среды.

### Flaky test является дефектом

Его нельзя бесконечно игнорировать.

### Verification продолжается после deployment

```text
Pre-production tests
        │
        ▼
Controlled rollout
        │
        ▼
Production signals
```

### Recovery также требует доказательства

Backup без restore test и retry без failure test не считаются полностью проверенными механизмами.

---

## Пример полного verification flow

Изменяется логика назначения автомобиля маршруту.

```text
Domain test
  │
  ├── valid assignment ✔
  └── invalid assignment X
  │
  ▼
Concurrency test
  │
  └── competing assignment
  │
  ▼
Integration test
  │
  └── transaction persisted
  │
  ▼
Contract test
  │
  └── API/event compatible
  │
  ▼
E2E
  │
  └── UI shows new route
  │
  ▼
Deployment
  │
  ▼
Production metrics
```

Один тест не пытается доказать всё.

Каждый уровень подтверждает своё свойство.

---

## Проверка новой возможности

Перед выпуском необходимо ответить:

1. Какие Domain Invariants затрагиваются?
2. Какие запрещённые состояния возможны?
3. Какие integration boundaries используются?
4. Какие публичные contracts меняются?
5. Нужен ли E2E critical flow?
6. Как функция ведёт себя под concurrency?
7. Как она ведёт себя при duplicate delivery?
8. Какие failure modes существуют?
9. Как выглядит degraded mode?
10. Какие security boundaries затрагиваются?
11. Какова performance expectation?
12. Нужен ли soak/load test?
13. Какие architecture dependencies появились?
14. Как создаются test data?
15. Как результат проверяется после deployment?

---

## Архитектурное значение

Testing & Verification превращает архитектурные заявления в проверяемые свойства.

```text
Architecture
     │
     ▼
Rules
     │
     ▼
Tests + Runtime verification
     │
     ▼
Evidence
```

Это не гарантирует отсутствие всех ошибок.

Но позволяет систематически доказывать, что наиболее важные свойства цифрового мира сохраняются при изменении платформы.

---

## Заключение

Теперь архитектура определяет не только то, как система должна работать, но и как доказать её корректность.

Остаётся решить следующий вопрос:

> как сама архитектура будет изменяться годами, не превращаясь в набор устаревших решений?

Следующий раздел книги — **Evolution & Governance**.

Он определит правила ADR, совместимости, deprecation, архитектурных границ, технического долга и управляемой эволюции «Призмы».
