---
title: Архитектурные исключения
description: Правила временного отклонения от принятых архитектурных инвариантов.
---

# Архитектурные исключения

## Статус

Accepted

---

## Введение

Иногда бизнес-ограничение, migration или legacy integration требуют временно нарушить preferred architecture.

Запретить все исключения нереалистично.

Но исключение должно оставаться исключением.

---

## Exception record

```text
Architecture rule
      │
      X
Temporary exception
      │
      ├── reason
      ├── scope
      ├── owner
      └── expiration/trigger
```

---

## Пример

Legacy provider не поддерживает idempotency key.

Временный adapter может использовать собственный deduplication mechanism.

Это фиксируется как ограничение конкретной integration boundary.

Нельзя объявить из этого:

> idempotency больше не нужна в платформе.

---

## Scope

Исключение должно быть минимальным.

```text
One adapter exception
        ≠
Global architecture change
```

---

## Expiration

Исключение должно иметь:

- дату;
- migration milestone;
- replacement event;
- иной trigger пересмотра.

---

## Visibility

Скрытое исключение опаснее явного.

Команда должна видеть, где правила сознательно нарушены.

---

## Инварианты

- Исключение фиксируется явно.
- Исключение имеет owner и reason.
- Scope минимален.
- Есть trigger пересмотра или удаления.
- Локальное исключение не меняет глобальное правило.
- Permanent exception требует отдельного architecture decision.

---

## Заключение

Governance должен работать в реальном процессе разработки.

Следующая страница определяет architecture review workflow.
