const makeImage = (id, alt) => ({
  alt,
  avif: `https://images.unsplash.com/${id}?fm=avif&fit=crop&w=1200&q=75`,
  webp: `https://images.unsplash.com/${id}?fm=webp&fit=crop&w=1200&q=80`,
  jpg: `https://images.unsplash.com/${id}?fm=jpg&fit=crop&w=1200&q=82`
});

const projects = [
  {
    type: 'telegram',
    title: 'Tic-Tac-Toe Telegram Web App',
    subtitle: 'Мини-игра в Telegram с мгновенным стартом и вирусным вовлечением.',
    description:
      'Web App внутри Telegram для быстрых матчей в крестики-нолики без установки. Пользователь заходит из бота, получает готовое поле и может сразу пригласить друга. Интерфейс адаптирован под мобильный сценарий, а логика партии синхронизируется между участниками.',
    stack: ['React', 'Telegram Web Apps SDK', 'Node.js', 'WebSocket', 'PostgreSQL'],
    features: [
      'Авторизация через Telegram и автоопределение профиля игрока',
      'Онлайн-матчи 1v1 с синхронизацией хода в реальном времени',
      'Лобби с одноразовой ссылкой для приглашения соперника',
      'Рейтинг игроков и история последних партий',
      'Адаптивный UI под iOS/Android внутри Telegram'
    ],
    links: {
      live: 'https://t.me/tictactoe_demo_bot',
      repo: 'https://github.com/gavrs/tictactoe-telegram-webapp'
    },
    media: {
      cover: makeImage('photo-1611996575749-79a3a250f948', 'Главный экран Telegram Web App с игровой сессией'),
      screenshots: [
        makeImage('photo-1511512578047-dfb367046420', 'Экран лобби с приглашением друга в матч'),
        makeImage('photo-1542751371-adc38448a05e', 'Онлайн-матч в реальном времени на мобильном устройстве')
      ],
      videoUrl: 'https://www.youtube.com/watch?v=9P4rOQW6JkE',
      caption: 'Короткое демо: запуск матча, приглашение и синхронизация ходов.'
    }
  },
  {
    type: 'dotnet',
    title: 'Blog-Platform / gavrs.online',
    subtitle: 'Контент-платформа для личного бренда с фокусом на скорость публикаций.',
    description:
      'Многостраничная блог-платформа для публикации статей, кейсов и заметок на домене gavrs.online. Проект объединяет удобную админку, SEO-структуру и быстрый рендер страниц для органического трафика. Дополнительно реализованы подписка на обновления и модуль аналитики поведения читателей.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare'],
    features: [
      'Редактор статей с поддержкой Markdown и превью перед публикацией',
      'SEO-модуль: мета-теги, OpenGraph и sitemap.xml',
      'Рубрики, теги и умный поиск по материалам',
      'Админ-панель с ролями автора и редактора',
      'Интеграция веб-аналитики и событий чтения'
    ],
    links: {
      live: 'https://gavrs.online',
      repo: 'https://github.com/gavrs/blog-platform',
      demo: 'https://demo.gavrs.online'
    },
    media: {
      cover: makeImage('photo-1488190211105-8b0e65b80b4e', 'Главная страница блог-платформы'),
      screenshots: [
        makeImage('photo-1455390582262-044cdead277a', 'Редактор статьи с превью и markdown-разметкой'),
        makeImage('photo-1504691342899-ae4f9a9f6f0f', 'Аналитика публикаций и поведения читателей')
      ],
      videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
      caption: 'Демо панели публикации, SEO-настроек и аналитики контента.'
    }
  },
  {
    type: 'ai',
    title: 'AI-ассистент в браузере',
    subtitle: 'Контекстный помощник, который ускоряет рутину в веб-интерфейсах.',
    description:
      'Браузерный AI-ассистент помогает пользователю писать ответы, суммировать страницы и автоматизировать повторяемые действия. Решение встраивается в существующие SaaS-интерфейсы и учитывает контекст открытой вкладки. За счет шаблонов и подсказок команда экономит время на коммуникациях и обработке данных.',
    stack: ['React', 'Plasmo', 'OpenAI API', 'FastAPI', 'Redis'],
    features: [
      'Боковая панель с AI-подсказками на любой странице',
      'Суммаризация статей и писем в 1 клик',
      'Набор готовых промптов для продаж, саппорта и контента',
      'Автозаполнение полей форм по выбранному шаблону',
      'История запросов и персональные настройки ассистента'
    ],
    links: {
      demo: 'https://www.loom.com/share/assistant-browser-demo',
      repo: 'https://github.com/gavrs/ai-browser-assistant'
    },
    media: {
      cover: makeImage('photo-1677442136019-21780ecad995', 'Панель AI-ассистента в браузере'),
      screenshots: [
        makeImage('photo-1518773553398-650c184e0bb3', 'Суммаризация страницы в один клик'),
        makeImage('photo-1526374965328-7f61d4dc18c5', 'Шаблоны промптов и автозаполнение форм')
      ],
      videoUrl: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
      caption: 'Показывает работу подсказок, шаблонов и автоматизацию сценариев.'
    }
  }
];

export default projects;
