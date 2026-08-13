---
title: Architecture Definition of Done
description: Критерии завершённости архитектурно значимого изменения платформы «Призма».
---

# Architecture Definition of Done

## Статус

Accepted

---

## Введение

Архитектурное изменение не завершено только потому, что новый код работает.

Может оставаться:

- старый contract;
- deprecated path;
- migration;
- feature flag;
- двойная запись;
- технический debt.

---

## Done

```text
Decision
  │
Implementation
  │
Migration
  │
Verification
  │
Old path removed
  │
Documentation updated
  │
Done
```

---

## Критерии

Для значимого изменения проверяется:

- решение зафиксировано;
- ownership определён;
- contract обновлён;
- compatibility проверена;
- migration завершена;
- observability добавлена;
- tests обновлены;
- rollback/roll-forward известен;
- deprecated path удалён;
- временные flags удалены;
- документация отражает новое состояние.

---

## Пример

Переезд Media workload в отдельный deployment unit не завершён, если:

```text
New Media Service ✔
Old media path still active ✔
Feature flag permanent ✔
Unknown owners X
```

Это transition state.

---

## Migration completion

Должно существовать измеримое условие:

```text
Old consumer count = 0
Old data migrated = 100%
Old endpoint traffic = 0
```

Тогда старый путь можно удалить.

---

## Инварианты

- Architectural change включает migration completion.
- Временный compatibility code удаляется.
- Feature flag не считается финальным состоянием без причины.
- Documentation обновляется после изменения постоянной модели.
- Verification подтверждает новое состояние.
- Незавершённый transition явно помечается и имеет owner.

---

## Заключение

Последняя страница раздела собирает governance в единый набор инвариантов.
