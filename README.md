# Digital Orbit — креативный сайт-визитка

Одностраничный сайт-визитка на **React + Vite** в тематике цифровой космической лаборатории.

## Что внутри
- интерактивный фон, реагирующий на курсор;
- стеклянные карточки (glassmorphism);
- анимируемая смена роли в hero-блоке;
- форма контактов, связанная с Netlify Function;
- готовая конфигурация для деплоя в Netlify.

## Запуск
```bash
npm install
npm run dev
```

## ENV
Скопируй `.env.example` в `.env` и задай значения:
- `VITE_SITE_OWNER` — имя на сайте;
- `VITE_CONTACT_EMAIL` — email для отображения;
- `CONTACT_RECEIVER` — email-получатель для serverless-функции.

## Деплой в Netlify
1. Подключи репозиторий в Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Functions directory: `netlify/functions`
5. Добавь переменные окружения из `.env.example` в Netlify UI.
