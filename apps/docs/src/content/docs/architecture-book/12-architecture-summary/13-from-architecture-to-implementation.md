---
title: От архитектуры к реализации
description: Граница между архитектурной моделью «Призмы» и конкретной технической реализацией.
---

# От архитектуры к реализации

## Статус

Accepted

---

## Введение

Архитектурная книга отвечает на вопрос:

> какой должна быть система?

Следующий уровень документации должен отвечать:

> как именно мы реализуем эту систему сейчас?

Это разные уровни.

---

## Архитектурная модель

Например, книга говорит:

```text
Projection is rebuildable
```

Но она не обязана фиксировать конкретную технологию хранения projection.

Реализация может выбрать её исходя из текущих требований.

---

## Техническая архитектура

На этом уровне появляются конкретные решения:

```text
Backend runtime
Database
Message broker
Object storage
Realtime transport
Frontend architecture
GIS rendering
Edge runtime
Deployment platform
```

---

## Пример

Архитектура:

```text
Vehicle position
      │
      ▼
Digital World / Telemetry
      │
      ▼
Map Projection
```

Техническая реализация может быть:

```text
C# service
   │
PostgreSQL/PostGIS
   │
Projection worker
   │
Realtime transport
   │
React + MapLibre + Three.js
```

Но если через несколько лет меняется конкретная database или transport, фундаментальная архитектура не обязана меняться.

---

## Implementation Decision

Технологический выбор должен ссылаться на архитектурное требование.

```text
Requirement
   │
   ▼
Constraints
   │
   ▼
Technology choice
```

а не:

```text
Interesting technology
   │
   ▼
Invent requirement
```

---

## Следующий уровень документации

После Architecture Book логично создать отдельный набор:

```text
Technical Architecture
   │
   ├── System topology
   ├── Backend
   ├── Frontend
   ├── Storage
   ├── Realtime
   ├── GIS
   ├── Media
   ├── Edge
   ├── Infrastructure
   └── Repository structure
```

Он будет конкретнее и сможет обновляться чаще.

---

## Инварианты

- Architecture Book не привязывает фундаментальные concepts к конкретному framework без необходимости.
- Technical Architecture реализует требования книги.
- Technology choice имеет объяснимые constraints.
- Замена технологии не требует переписывания Domain Model, если предметная семантика не изменилась.
- Implementation documentation может эволюционировать быстрее Architecture Book.

---

## Заключение

Архитектурная книга определяет фундамент.

Техническая архитектура превращает этот фундамент в конкретный план строительства.
