---
title: Пересмотр архитектурных решений
description: Критерии, по которым Accepted-решение «Призмы» должно быть пересмотрено.
---

# Пересмотр архитектурных решений

## Статус

Accepted

---

## Введение

Accepted не означает Eternal.

Решение остаётся правильным только пока сохраняются его исходные предпосылки.

---

## Triggers

Пересмотр необходим, если изменились:

- workload;
- scale;
- security requirements;
- team topology;
- infrastructure economics;
- external constraints;
- domain understanding.

---

## Пример

Решение:

> использовать модульный монолит.

Оно остаётся правильным, пока независимое deployment не даёт достаточной выгоды.

Если Media workload требует отдельного scaling и failure isolation, пересматривается deployment topology, но не обязательно Domain Module boundaries.

---

## Evidence

Пересмотр не должен начинаться с:

> теперь модно делать иначе.

Нужны новые факты.

```text
Old assumptions
      │
New evidence
      │
      ▼
Reconsider
```

---

## Review cadence

Не обязательно регулярно перепроектировать всю систему.

Полезнее:

- review при значимом RFC;
- review после крупных incidents;
- review при достижении scale threshold;
- периодический high-level architecture review.

---

## Superseding

Если решение заменено:

```text
ADR-001 Accepted
      │
      ▼
ADR-027 Supersedes ADR-001
```

История остаётся доступной.

---

## Инварианты

- Accepted decision может быть пересмотрено.
- Пересмотр основывается на изменении предпосылок или новых данных.
- Мода сама по себе не является основанием.
- Superseded decision сохраняется в истории.
- Review не требует постоянного переписывания стабильных областей.
- Incident может быть trigger архитектурного пересмотра, если выявил системную причину.

---

## Заключение

Чтобы архитектура не расползалась, важны не только решения, но и границы допустимых исключений.

Следующая страница определяет architecture exceptions.
