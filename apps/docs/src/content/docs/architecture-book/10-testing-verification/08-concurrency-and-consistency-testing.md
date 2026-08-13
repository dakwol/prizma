---
title: Concurrency и Consistency Testing
description: Проверка конкурентных изменений, транзакций и согласованности цифрового мира.
---

# Concurrency и Consistency Testing

## Статус

Accepted

---

## Введение

Многие ошибки невозможно воспроизвести последовательным вызовом операций.

Два пользователя, worker и внешний источник могут одновременно работать с одним состоянием.

---

## Lost update

```text
A reads v10
B reads v10

A writes v11
B writes v11

A change lost
```

Если такой сценарий недопустим, concurrency control должен быть проверен.

---

## Optimistic concurrency

```text
Command
 expectedVersion = 10
        │
        ▼
Current version = 10?
    ┌───┴───┐
   yes      no
    │        │
 commit    conflict
```

Тест должен запускать конкурирующие операции, а не только проверять условие в mock.

---

## Transaction boundaries

Если операция меняет несколько связанных частей:

```text
A
B
C
```

после failure не должно остаться:

```text
A ✔
B ✔
C X
```

если Domain Transaction требует атомарности.

---

## Duplicate delivery

Concurrency testing пересекается с idempotency.

Одно сообщение может одновременно обрабатываться несколькими workers.

```text
Event #42
 ├── Worker A
 └── Worker B
```

Итоговый эффект всё равно должен соответствовать контракту.

---

## Ordering

Если порядок имеет предметный смысл, тестируются перестановки:

```text
101 → 102 → 103
```

и:

```text
101 → 103 → 102
```

Система должна иметь определённое поведение для late updates.

---

## Инварианты

- Критические concurrent operations тестируются параллельно.
- Lost update предотвращается там, где он нарушает Domain Model.
- Transaction atomicity проверяется с failure injection.
- Duplicate concurrent delivery не создаёт некорректный эффект.
- Ordering assumptions проверяются явно.
- Тесты используют реальный concurrency mechanism, а не только последовательную имитацию.

---

## Заключение

Корректность состояния не гарантирует безопасность доступа.

Следующая страница определяет security verification.
