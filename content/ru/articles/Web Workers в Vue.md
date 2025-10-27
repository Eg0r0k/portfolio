---
title: "Web Workers в Vue: Создание, Типизация и Использование "
date: 27/10/2025
description: "В статье разберём Web Workers: их преимущества, типизацию в
  TypeScript, создание и использование в Vue.js"
tags:
  - Vue
  - "Typescript "
  - "Performance "
  - "Javascript "
  - Webworkers
  - ""
image: https://canvas.hrcd.fr/articles/launch-your-porfolio.jpg
readingTime: "10"
sitemap:
  images: []
  videos: []
ogImage:
  props: {}
schemaOrg: {}
head:
  script: []
seo:
  title: Web Workers в Vue
navigation:
  title: Web Workers в Vue
---

## Введение в Web workers

Web Workers — это мощный инструмент JavaScript, позволяющий выполнять скрипты в фоновом потоке, отдельно от основного потока браузера. Это означает, что тяжёлые вычисления, такие как обработка больших массивов данных, парсинг JSON или сложные математические операции, не будут блокировать пользовательский интерфейс (UI). В результате приложение остаётся отзывчивым, а пользователь не замечает "зависаний".

Почему Web Workers полезны для проектов?

Почему Web Workers полезны для проектов?

- **Улучшение производительности:** Они позволяют распараллеливать задачи, что критично для приложений с интенсивными вычислениями (например, игры, анализ данных или реал-тайм обработка).
- **Отзывчивость UI:** Основной поток остаётся свободным для обработки событий, анимаций и рендеринга.
- **Безопасность:** Workers не имеют доступа к DOM, что предотвращает случайные мутации UI и делает код более предсказуемым.
- **Масштабируемость:** В больших проектах, таких как SPA на Vue, Workers помогают избежать bottleneck'ов в производительности.

### Проверка поддержки Web Workers

Хоть и Webworker имеет большую поддержку браузерами документация MDN рекомендует перед использованием вебворкера проверять к нему доступ, и использовать fallback подсчета в основном потоке

```js
if(window.Worker){
// Инициация воркера
}
else{
// fallback
}
// Или другой варинат взято с https://github.com/morethanwords/tweb/blob/be9ceb7354565ec5b605f89be81b4ef3e2302211/src/helpers/context.ts#L9
export const IS_SERVICE_WORKER = typeof ServiceWorkerGlobalScope !== 'undefined' && self instanceof ServiceWorkerGlobalScope;
export const IS_WEB_WORKER = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && !IS_SERVICE_WORKER;
export const IS_WORKER = IS_WEB_WORKER || IS_SERVICE_WORKER;
//Позволяет сразу проверить какие воркеры поддерживаются в браузере  
```

## Типизация Web Workers с TypeScript

1. Определите интерфейсы для сообщений (например, `WorkerMessage` для входящих и `WorkerResponse` для исходящих).
2. Используйте `Worker` как тип для экземпляра worker'а.
3. Типизируйте обработчики событий с `MessageEvent`

Основные шаги:

```js [worker-types.ts]
export interface WorkerMessage {
  type: 'compute';
  data: number[]; // Массив чисел для обработки
}

export interface WorkerResponse {
  type: 'result';
  result: number; // Результат вычислений
}
```

## Создание Web Worker в Vue

В Vue.js Web Workers создаются как отдельные файлы (например, my-worker.ts), которые импортируются в компоненты. Vue не имеет встроенной поддержки Workers, но их легко интегрировать.

Шаги по созданию:

1. Создайте файл worker'а в директории `src/workers/` (или любой другой).
2. В файле worker'а обработайте сообщения с помощью `self.onmessage`.
3. В Vue-компоненте создайте экземпляр new `Worker()` с путём к файлу.

Важно: Если вы используете Vite (стандартный бандлер для Vue 3), добавьте ?worker в импорт, чтобы Vite правильно обработал worker как отдельный чанк.

Пример файла worker'а `src/workers/sum-worker.ts`):

```js [sum-worker.ts]
import type { WorkerMessage, WorkerResponse } from '../types/worker-types';

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  if (event.data.type === 'compute') {
    const sum = event.data.data.reduce((acc, val) => acc + val, 0);
    const response: WorkerResponse = { type: 'result', result: sum };
    self.postMessage(response);
  }
};
```

Этот worker будет суммирует массив чисел в фоне.

## Передача данных в Web Workers: Копирование vs. Transfer

При передаче данных в Web Worker через postMessage обычные данные (например, объекты, массивы, строки) копируются с помощью алгоритма structured clone. Это означает, что создаётся глубокая копия данных, что может быть ресурсоёмким для больших объёмов информации, но позволяет обоим потокам работать с данными независимо.

Однако для "битовых" данных, таких как ArrayBuffer, TypedArray (например, Float32Array) или другие transferable объекты (MessagePort, ImageBitmap и т.д.), можно использовать опцию transfer. В этом случае данные не копируются, а передаются: владение объектом переходит к worker'у, и он становится недоступным в основном потоке. Это экономит память и время, особенно для больших буферов данных (например, аудио или видео).

Пример передачи с transfer:

```js
// В основном потоке
const buffer = new Float32Array(1000000); // Большой буфер
worker.postMessage({ type: 'process', buffer }, [buffer]); // Передаём buffer без копирования

// В worker'е
self.onmessage = (event) => {
  const buffer = event.data.buffer; // Теперь buffer доступен только здесь
  // Обработка...
};
```

Если не использовать transfer для transferable объектов, они всё равно скопируются, но transfer оптимизирует процесс. Это особенно полезно в сценариях с реал-тайм обработкой данных, как в проекте TunA с аудио-буферами. Данный способ используется в веб версии телеграмма для обработки WAV форматов и видео форматов.

## Обход троттлинга таймеров с помощью Web Workers

В браузерах функции setTimeout и setInterval в основном потоке подвержены троттлингу (throttling) в неактивных вкладках (background tabs). Это сделано для экономии ресурсов CPU и батареи: если вкладка не видима, браузер может увеличивать минимальный интервал таймера до 1 секунды или больше. Со временем троттлинг усиливается — интервал может расти до 2 секунд, 3 секунд и т.д., что приводит к неточным срабатываниям. Это проблема для приложений, требующих точного тайминга, таких как реал-тайм обновления, анимации или мониторинг.

Однако, если вынести таймеры в Web Worker, они продолжают работать с высокой точностью, независимо от активности вкладки. Workers не зависят от видимости страницы и не подвержены такому троттлингу, обеспечивая постоянные и точные интервалы. Это делает их идеальными для фоновых задач, требующих стабильного расписания.

Пример в worker'е для точного таймера:

```js [timer-worker.ts]
self.onmessage = (event) => {
  if (event.data === 'start') {
    setInterval(() => {
      self.postMessage('tick'); // Отправляем сигнал каждую секунду точно
    }, 1000);
  }
};
```

В основном потоке слушайте сообщения от worker'а для обработки "тиков". Это решает проблему в сценариях, где точность критична, например, в часах, уведомлениях или реал-тайм данных.

## Использование Web Worker в Vue-компоненте

Механизм работы достаточно схож с WebSocket.

1. Импортируйте worker.
2. Создайте экземпляр.
3. Отправляйте сообщения с `postMessage`.
4. Обработайте ответы с `onmessage` .
5. Не забудьте завершить worker с `terminate()`, когда он не нужен (например, в `onUnmounted`) чтобы избежать memory leaks.

Тут представлен механиз работы, не самый чистый но достаточно понятный.

```vue
<template>
  <div>
    <button @click="computeSum">Вычислить сумму</button>
    <p>Результат: {{ result }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import type { WorkerMessage, WorkerResponse } from './types/worker-types';
// В воркер передаем ссылку того где он находится (конкретно этот пример с Vite)
const WorkerConstructor = () => new Worker(new URL('./workers/sum-worker.ts', import.meta.url), { type: 'module' });
// Если требуется реактивность класса Worker его можно обернуть в shadllowRef чтобы не делать всю структуру реактивной
const worker = WorkerConstructor();
const result = ref<number | null>(null);

// ждем ответа от воркера
worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
  if (event.data.type === 'result') {
    result.value = event.data.result;
  }
};
// отправляем данные для подсчета
const computeSum = () => {
  const data: number[] = Array.from({ length: 1000000 }, () => Math.random() * 100);
  const message: WorkerMessage = { type: 'compute', data };
  worker.postMessage(message);
};
// отчищаем память
onUnmounted(() => {
  worker.terminate();
});
</script>
```

## Реальный кейс: Проект TunA

В проекте TunA возникла проблема с производительностью и блокировкой UI из-за частых расчётов частоты (frequency calculations), даже при использовании debounce. Эти расчёты выполнялись в основном потоке, что приводило к "зависаниям" интерфейса, особенно при обработке реал-тайм данных или больших объёмов информации.

Чтобы решить эту проблему, было принято решение добавить Web Worker. Расчёты частоты были вынесены в отдельный поток, что позволило основному потоку оставаться свободным для рендеринга и обработки пользовательских взаимодействий. В результате UI стал более отзывчивым, а производительность значительно улучшилась. Это отличный пример, как Web Workers могут спасти проект от bottleneck'ов в реальных сценариях, связанных с интенсивными вычислениями.

Реализация вебворкера на этом проекте:

```js [pitchWorker.ts]
import { PitchDetector } from "pitchy";
import { TUNER_CONFIG } from "@/constants/tuner";
import { PitchWorkerInput } from "@/types/worker";

let detector: PitchDetector<Float32Array> | null = null;

const isValidPitch = (pitch: number, clarity: number): boolean => {
  return (
    clarity > TUNER_CONFIG.MIN_CLARITY &&
    pitch >= TUNER_CONFIG.MIN_FREQUENCY &&
    pitch <= TUNER_CONFIG.MAX_FREQUENCY
  );
};

self.onmessage = (e: MessageEvent<PitchWorkerInput>) => {
  const { buffer, sampleRate } = e.data;

  if (!detector) {
    detector = PitchDetector.forFloat32Array(buffer.length);
  }
  const [pitch, clarity] = detector.findPitch(buffer, sampleRate);

  if (isValidPitch(pitch, clarity)) {
    self.postMessage({ pitch, clarity });
  }
};

// Отчистка памяти
self.onclose = () => {
  detector = null;
};
```

В этом примере worker обрабатывает аудио-буфер для определения pitch (частоты тона) с помощью библиотеки `pitchy`, фильтруя результаты по валидности и отправляя только релевантные данные обратно в основной поток.

## Преимущества в реальных проектах

В проектах Web Workers особенно полезны для:

- Обработки больших данных (например, в дашбордах с графиками).
- Реал-тайм приложений (чаты, игры), где нужно обрабатывать события без задержек.
