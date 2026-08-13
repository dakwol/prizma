---
title: Disaster Recovery
description: Архитектурная модель резервного восстановления «Призмы» после крупных инфраструктурных отказов.
---

# Disaster Recovery

## Статус

Accepted

## Введение

Крупный отказ может означать потерю хранилища, сервера, кластера или площадки. Disaster Recovery определяет восстановление после событий за пределами обычного restart/retry.

## RPO

Recovery Point Objective определяет допустимый объём потери данных во времени.

```text
Failure 12:00
RPO 5 min
Recovery point ≥ 11:55
```

## RTO

Recovery Time Objective определяет целевое время восстановления требуемой функции.

```text
Failure 12:00
Recovery 12:30
RTO 30 min
```

## Критичность состояния

```text
Authoritative state → strict protection
Projection          → rebuild
Cache               → recreate
```

Чем меньше авторитетных состояний, тем проще надёжно восстанавливать платформу.

## Backup и replication

Репликация не заменяет backup. Ошибочное удаление может немедленно попасть на replica.

Backup должен позволять восстановить состояние из прошлого.

## Restore tests

```text
Backup exists
    │
Restore test
    │
Verified recovery
```

Непроверенный backup не считается доказанной recovery capability.

## Failover

Failover требует решения вопросов актуальности, split brain, маршрутизации и последующего возврата на primary.

## Edge

Потеря центральной площадки не делает edge глобальным владельцем данных автоматически. Разрешённая автономность определяется заранее, после восстановления выполняется reconciliation.

## Инварианты

- Для критического состояния определяются RPO/RTO.
- Производное состояние восстанавливается rebuild, где это возможно.
- Backup и replication различаются.
- Restore регулярно проверяется.
- Failover учитывает split brain.
- Traffic возвращается после проверки корректности.
- Edge autonomy не расширяет владение неявно.

## Заключение

Последняя страница раздела собирает reliability-модель в единый набор обязательных инвариантов.
