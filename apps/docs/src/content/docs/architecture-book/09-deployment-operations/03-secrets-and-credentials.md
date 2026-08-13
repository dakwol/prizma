---
title: Secrets и credentials
description: Архитектурные правила хранения, выдачи и ротации секретов платформы «Призма».
---

# Secrets и credentials

## Статус

Accepted

---

## Введение

Пароли, private keys, API tokens и connection credentials не являются обычной конфигурацией.

Их компрометация может дать доступ к данным или внешним системам.

---

## Основной принцип

```text
Application
    │
    ▼
Secret reference
    │
    ▼
Secret storage
```

Исходный код и deployment artifact не должны содержать production secrets.

---

## Scope

Credential выдаётся минимально необходимой области.

```text
Camera Adapter
     │
     └── Camera Provider credential
```

Он не должен автоматически иметь доступ к другим системам.

---

## Rotation

Secret имеет lifecycle.

```text
Create
  │
Use
  │
Rotate
  │
Revoke
```

Архитектура должна позволять ротацию без длительной остановки платформы.

---

## Logging

Secrets никогда не должны попадать в:

- logs;
- traces;
- metrics labels;
- exception dumps;
- frontend bundles.

---

## Edge

Edge-узел требует особого внимания, поскольку физически может находиться вне центральной инфраструктуры.

Credential edge-узла должен иметь ограниченный scope и возможность отзыва.

```text
Edge compromised
      │
      ▼
Revoke Edge Identity
      │
      ▼
Other nodes remain trusted
```

---

## Инварианты

- Production secrets отсутствуют в исходном коде.
- Secrets не встраиваются в frontend artifact.
- Credential имеет минимальный scope.
- Secrets поддерживают rotation/revocation.
- Secrets не попадают в observability data.
- Edge identities могут быть отозваны независимо.
- Доступ к secret storage контролируется и аудируется.

---

## Заключение

После подготовки artifact и configuration новая версия должна быть безопасно доставлена в production. Следующая страница определяет deployment strategies.
