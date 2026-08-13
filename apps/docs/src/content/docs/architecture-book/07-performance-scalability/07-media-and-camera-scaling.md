---
title: Масштабирование камер и медиапотоков
description: Архитектурная модель масштабирования видеопотоков и камер платформы «Призма».
---

# Масштабирование камер и медиапотоков

## Статус

Accepted

## Введение

Видео принципиально отличается от обычных Domain Data.

Медиапоток создаёт постоянную нагрузку на:

- сеть;
- CPU/GPU;
- transcoding;
- session management;
- клиентский decoder.

Поэтому media plane не должен масштабироваться как обычный JSON API.

## Control Plane и Media Plane

```text
Camera Domain
     │
     ▼
Control Plane
     │
     └── metadata / commands

Camera Stream
     │
     ▼
Media Plane
     └── video transport
```

Эти пути имеют разные эксплуатационные характеристики.

## Session-driven load

Нагрузка зависит не только от количества камер.

```text
1000 registered cameras
        ≠
1000 active streams
```

Важно число одновременно активных сессий и зрителей.

## Fan-out видео

```text
Camera
  │
Media Node
  │
 ├── Viewer A
 ├── Viewer B
 └── Viewer C
```

Повторное получение одного upstream-потока для каждого viewer может быть неоптимально. Конкретная media architecture выбирается отдельно от Domain Model.

## Quality adaptation

При ограничениях сети media layer может менять bitrate/resolution, если это соответствует требованиям сценария.

Это не должно изменять предметное состояние камеры.

## Isolation

Media overload не должен забирать ресурсы у основных команд цифрового мира.

```text
Media overloaded X

Domain commands ✔
Map state       ✔
History         ✔
```

## Инварианты

- Media Plane отделён от обычного Domain API.
- Масштабирование учитывает active streams и viewers.
- Media workload имеет отдельные resource limits.
- Перегрузка видео не останавливает независимый Core.
- Изменение качества потока не меняет Domain State.
- Сессии и их lifecycle наблюдаемы.

## Заключение

Следующий механизм снижения нагрузки — кэширование. Оно полезно только при явно определённой семантике актуальности.
