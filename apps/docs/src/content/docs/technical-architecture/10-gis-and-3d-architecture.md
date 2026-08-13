---
title: GIS и 3D Architecture
description: Техническая архитектура MapLibre/Three.js представления цифрового мира.
---

# GIS и 3D Architecture

## Статус

Proposed

---

## Общая модель

```text
Map Projection
      │
      ▼
Frontend Spatial Store
      │
      ├── MapLibre layers
      └── Three.js custom rendering
```

MapLibre отвечает за geographic context.

Three.js — за 3D objects и специализированную визуализацию.

---

## Domain не живёт в сцене

Three.js `Object3D` не является Domain Entity.

```text
Vehicle Projection
      │
      ▼
Render Representation
```

Удаление GPU representation не удаляет Vehicle из мира.

---

## Spatial State

Frontend получает ObjectId, Lng/Lat, Altitude, Heading, Visual State и Version.

Преобразование в rendering coordinates выполняется внутри GIS presentation layer.

---

## LOD

```text
Far  → lightweight
Mid  → simplified 3D
Near → full model
```

Focused object может получать отдельную LOD policy.

---

## Culling

```text
World objects
    │
Viewport
    │
Visibility
    │
LOD
    │
GPU objects
```

---

## Update path

```text
SignalR
  │
Spatial projection state
  │
Interpolation
  │
Render loop
```

React не перерендеривает всю страницу на каждый animation update.

---

## Инварианты

- MapLibre и Three.js являются presentation technologies.
- GPU object не является Domain object.
- Spatial projection минимальна.
- LOD/culling обязательны при росте объектов.
- Animation path отделён от обычного React render.
- Presentation correction не записывается в Domain без предметного смысла.

---

## Заключение

Камеры требуют разделения Domain и Media Plane.
