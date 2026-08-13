---
title: Security Verification
description: Проверка authentication, authorization, isolation и security invariants платформы.
---

# Security Verification

## Статус

Accepted

---

## Введение

Security rule должен проверяться как инвариант.

Недостаточно убедиться, что разрешённый пользователь может выполнить операцию.

Необходимо доказать, что запрещённый пользователь её выполнить не может.

---

## Positive и negative verification

```text
Authorized user   → ✔
Unauthorized user → X
```

Оба сценария обязательны.

---

## Object-level authorization

Особенно важны проверки доступа к конкретным объектам.

```text
User A
  │
  ├── Vehicle 1 ✔
  └── Vehicle 2 X
```

Наличие валидного токена не означает доступ ко всему цифровому миру.

---

## Realtime security

Подписка также является чтением данных.

```text
Realtime subscription
        │
Authorization
        │
        ▼
Allowed events only
```

Нельзя проверять доступ только при загрузке initial snapshot.

---

## Files

Проверяется не только metadata endpoint, но и binary content.

Случайный storage URL не должен обходить Access Policy.

---

## Fail closed

Security dependency failure тестируется отдельно.

```text
Authorization service unavailable
             │
             ▼
            deny
```

если архитектурный контракт требует fail closed.

---

## Secret scanning

Pipeline должен предотвращать попадание credentials в repository и artifacts настолько, насколько это возможно автоматизировать.

---

## Инварианты

- Authorization тестируется положительными и отрицательными сценариями.
- Object-level access проверяется отдельно.
- Realtime delivery применяет тот же security scope.
- File content не обходит authorization metadata.
- Security-critical failures проверяются на fail-closed behavior.
- Secrets проверяются на случайное попадание в source/artifacts.
- Security verification входит в release process.

---

## Заключение

Кроме runtime security, необходимо проверять саму структуру архитектуры: зависимости модулей и запрещённые направления связей.

Это задача architecture tests.
