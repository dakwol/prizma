---
title: Infrastructure as Code
description: Правила воспроизводимого управления инфраструктурой и deployment topology платформы.
---

# Infrastructure as Code

## Статус

Accepted

---

## Введение

Инфраструктура, созданная только ручными действиями, постепенно становится неизвестным состоянием.

```text
Documentation
      ≠
Actual infrastructure
```

Поэтому значимая конфигурация инфраструктуры должна быть воспроизводима.

---

## Desired state

```text
Versioned definition
        │
        ▼
Provisioning
        │
        ▼
Infrastructure
```

Изменение проходит через контролируемый процесс.

---

## Drift

Ручное изменение может создать расхождение:

```text
Desired state
      │
      X
Actual state
```

Drift должен обнаруживаться и устраняться.

---

## Review

Infrastructure change может повлиять на всю платформу не меньше изменения кода.

Поэтому он проходит:

- version control;
- review;
- validation;
- deployment;
- verification.

---

## Environment differences

IaC не означает полную идентичность окружений.

Различия задаются параметрами и topology, но остаются явными.

---

## Secrets

IaC описывает ссылки и permissions, но не должен содержать secret values в открытом виде.

---

## Disaster Recovery

Воспроизводимая инфраструктура сокращает recovery time.

```text
Site lost
   │
   ▼
Recreate infrastructure
   │
   ▼
Restore state
   │
   ▼
Verify
```

---

## Инварианты

- Критическая инфраструктура имеет versioned definition.
- Ручные изменения минимизируются.
- Drift обнаруживается.
- Infrastructure changes проходят review.
- Secret values не хранятся открыто в IaC.
- Environment differences остаются явными.
- IaC является частью Disaster Recovery capability.

---

## Заключение

Последняя страница раздела собирает deployment и operations в единый архитектурный контракт.
