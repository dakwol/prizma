---
title: Модель отказов
description: Классификация отказов платформы «Призма» и правила определения их последствий.
---

# Модель отказов

## Статус

Accepted

## Введение

Неверная команда пользователя, таймаут внешнего API и падение базы данных — разные ситуации. Они не должны обрабатываться одинаково.

## Классы отказов

```text
Failure
 ├── Domain rejection
 ├── Authorization failure
 ├── Dependency failure
 ├── Communication failure
 ├── Resource exhaustion
 ├── Data inconsistency
 └── Infrastructure failure
```

## Domain rejection

Предметный отказ означает, что система работает корректно, но изменение недопустимо.

```text
Command → Domain Validation → X Invalid transition
```

Retry не исправляет предметное правило.

## Communication failure

При сетевом таймауте вызывающая сторона может не знать, была ли операция выполнена.

```text
A ───► B
      X response

B executed?
    ?
```

Поэтому timeout не доказывает отсутствие эффекта.

## Resource exhaustion

Компонент может исчерпать CPU, память, соединения, очередь, диск или лимит внешнего API. Такой отказ часто развивается постепенно и должен обнаруживаться до полной остановки.

## Stale data

Устаревшее состояние отличается от неизвестного и отсутствующего.

```text
Position
 ├── value: known
 └── freshness: stale
```

## Transient и persistent failures

```text
Failure
 ├── transient  → retry may help
 └── persistent → retry usually harmful
```

Неверные credentials или несовместимый контракт не исправляются немедленным повтором.

## Failure propagation

```text
C X
 │
 ▼
B degraded
 │
 ▼
A continues
```

Отказ нижней зависимости не обязан превращаться в полный отказ всей цепочки.

## Инварианты

- Domain rejection не считается инфраструктурной аварией.
- Timeout не доказывает отсутствие исполнения.
- Transient и persistent failures различаются.
- Stale, unknown и missing являются разными состояниями.
- Retry применяется только там, где повтор способен помочь.
- Нарушение внутреннего инварианта не маскируется как штатная недоступность.

## Заключение

После классификации отказа необходимо ограничить время ожидания зависимостей. Это задача таймаутов и отмены.
