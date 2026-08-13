---
title: Жизненный цикл файлов и медиаданных
description: Архитектурные правила хранения вложений, файлов, изображений и медиаматериалов.
---

# Жизненный цикл файлов и медиаданных

## Статус

Accepted

---

## Введение

Файл состоит не только из binary content.

Платформе также необходимы:

- identity;
- metadata;
- owner;
- access policy;
- processing state;
- storage location;
- checksum;
- lifecycle state.

---

## Metadata и content

```text
Attachment
   │
   ├── Metadata
   └── Content
```

Metadata может находиться в Domain/Projection storage, а binary content — в object storage.

---

## Upload lifecycle

```text
Created
   │
Uploading
   │
Processing
   │
Available
   │
Archived / Deleted
```

Пользователь не должен видеть незавершённый upload как готовый файл.

---

## Пример

К объекту камеры прикреплена схема монтажа.

```text
Camera
  │
  └── AttachmentId
          │
          ▼
      File metadata
          │
          ▼
      Object storage
```

Domain relation ссылается на identity файла, а не на случайный URL.

---

## Orphaned files

Возможен сценарий:

```text
File uploaded
    │
    X
Object relation was never created
```

Такие временные файлы должны иметь cleanup policy.

---

## Deletion

Удаление связи с файлом и физическое удаление binary content — разные операции.

```text
Relation removed
      │
      ▼
Any references left?
   ┌──┴──┐
  yes    no
   │      │
retain  lifecycle deletion
```

---

## Media recordings

Записанное видео может иметь существенно больший объём, чем обычные attachments.

Для него отдельно определяются:

- retention;
- segmentation;
- archival;
- access;
- deletion;
- indexing.

Live stream сам по себе не обязан сохраняться.

---

## Инварианты

- File identity отделена от storage URL.
- Metadata и binary content имеют согласованный lifecycle.
- Незавершённый upload не считается доступным вложением.
- Orphaned uploads очищаются.
- Физическое удаление учитывает существующие ссылки.
- Live stream и recording являются разными сущностями.
- Media retention определяется отдельно от обычных attachments.

---

## Заключение

Иногда данные необходимо не архивировать, а окончательно удалить. Следующая страница определяет deletion model.
