---
title: Lifecycle Operations
description: Наблюдаемость, восстановление и эксплуатация процессов архивирования, retention, удаления и миграции.
---

# Lifecycle Operations

## Статус

Accepted

---

## Введение

Архивирование миллиона записей — это не единичная функция.

Это долгоживущий operational process.

То же относится к:

- retention cleanup;
- physical deletion;
- migration;
- media cleanup;
- tier movement;
- projection rebuild.

---

## Batch processing

Большие объёмы обрабатываются порциями.

```text
Dataset
  │
  ├── batch 1 ✔
  ├── batch 2 ✔
  ├── batch 3 X
  └── batch 4
```

После restart процесс должен продолжить с известной позиции.

---

## Checkpoint

```text
processedThrough = 300000
```

Checkpoint позволяет не начинать всю работу заново.

---

## Idempotency

Повтор batch не должен повреждать данные.

```text
Batch 42
 ├── first execution
 └── retry
```

Lifecycle operations подчиняются тем же reliability principles, что и другие процессы.

---

## Metrics

Необходимо наблюдать:

- processed items;
- remaining items;
- errors;
- throughput;
- duration;
- storage reclaimed;
- migration version;
- archive backlog.

---

## Failure handling

```text
Operation
   │
Failure
   │
Retry / quarantine
   │
Resume
```

Persistent failure конкретной записи не должен незаметно блокировать весь процесс.

---

## Throttling

Lifecycle jobs не должны вытеснять production workload.

```text
User traffic → priority
Lifecycle job → bounded resources
```

Скорость фоновой обработки регулируется.

---

## Инварианты

- Массовые lifecycle operations выполняются restartable batches.
- Используются checkpoint и idempotency.
- Progress наблюдаем.
- Background jobs имеют resource limits.
- Persistent failures выводятся в контролируемое состояние.
- Lifecycle jobs не должны бесконтрольно ухудшать основной workload.
- Завершение операции подтверждается проверкой результата.

---

## Заключение

Остаётся собрать весь раздел в единый набор обязательных правил жизненного цикла данных.
