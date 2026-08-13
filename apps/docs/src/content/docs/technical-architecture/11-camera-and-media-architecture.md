---
title: Camera и Media Architecture
description: Разделение предметной модели камер и тяжёлого медиапотока.
---

# Camera и Media Architecture

## Статус

Proposed

---

## Camera Domain

Camera Module владеет Camera Identity, capabilities, PTZ state, relations, availability и stream metadata.

---

## Media Plane

```text
Camera Domain
      │
      ▼
Stream Contract
      │
      ▼
Media Plane
      │
      ▼
Viewer
```

Media Plane отвечает за session lifecycle, video transport, buffering и provider/media integration.

---

## Первая версия

Media Plane может первоначально быть частью backend deployment.

Кодовая граница должна позволять выделить его позднее без переноса Camera Domain ownership.

---

## PTZ

```text
User
  │
ChangeCameraDirection
  │
Camera Module
  │
Provider Adapter
  │
Physical camera
```

---

## 3D Video

```text
Media Stream
     │
     ▼
Frontend media session
     │
     ▼
Three.js texture/material
```

Video texture — presentation state.

---

## Инварианты

- Camera Domain и Media Plane различаются.
- Media workload может масштабироваться независимо.
- Provider API заканчивается в adapter.
- PTZ проходит через Camera Module.
- Video texture не является Domain State.
- Camera ownership сохраняется при выделении media service.

---

## Заключение

Другие внешние системы подключаются через Integration Architecture.
