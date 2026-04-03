import { useEffect, useMemo, useState } from 'react';
import ProjectsShowcase from './components/ProjectsShowcase';

const roles = ['Frontend Engineer', 'UI Alchemist', 'Product Thinker', 'Creative Coder'];

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
      repo: 'https://github.com/gavrs/tictactoe-telegram-webapp',
      video: 'https://www.youtube.com/watch?v=9P4rOQW6JkE'
    },
    media: {
      cover: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80']
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
      cover: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80',
      video: 'https://www.youtube.com/watch?v=5qap5aO4i9A'
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
      repo: 'https://github.com/gavrs/ai-browser-assistant',
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    media: {
      cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80'],
      video: 'https://www.youtube.com/watch?v=oHg5SJYRHA0'
    }
  }
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [sent, setSent] = useState(false);

  const owner = 'Тимур';
  const contact = import.meta.env.VITE_CONTACT_EMAIL || 'you@example.com';

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const styleVars = useMemo(
    () => ({
      '--mx': `${mouse.x}%`,
      '--my': `${mouse.y}%`
    }),
    [mouse]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSent(true);
      e.currentTarget.reset();
    } catch {
      setSent(true);
    }
  };

  return (
    <div className="page" style={styleVars}>
      <div className="ambient" />

      <header className="hero glass">
        <p className="chip">✦ Digital Orbit Identity</p>
        <h1>
          Привет, я <span>{owner}</span>
        </h1>
        <p className="lead">
          Full-stack developer: .NET/React + Telegram Web Apps. Запускаю продукты с понятной бизнес-логикой,
          быстрым фронтендом и устойчивым real-time бэкендом.
        </p>
        <div className="stack-chips hero-facts">
          <span className="stack-chip">3+ крупных pet-проекта</span>
          <span className="stack-chip">.NET + React</span>
          <span className="stack-chip">WebSocket/SignalR</span>
          <span className="stack-chip">PostgreSQL/Redis</span>
        </div>
        <p className="role">Сейчас в режиме: {roles[roleIndex]}</p>

        <div className="actions">
          <a href="#projects" className="btn btn-primary">
            Смотреть кейсы
          </a>
          <a href="https://tttoeonl.netlify.app" target="_blank" rel="noreferrer" className="btn btn-ghost">
            Открыть Telegram-игру
          </a>
          <a href="https://gavrs.online" target="_blank" rel="noreferrer" className="btn btn-ghost">
            Посмотреть соцсеть
          </a>
          <a href="#contact" className="btn btn-ghost">
            Связаться
          </a>
        </div>

        <div className="hero-materials">
          <p className="materials-title">Доступные материалы:</p>
          <div className="stack-chips">
            <span className="stack-chip">demo</span>
            <span className="stack-chip">видео</span>
            <span className="stack-chip">скриншоты</span>
          </div>
        </div>
      </header>

      <ProjectsShowcase projects={projects} />

      <section id="contact" className="section glass form-wrap">
        <h2>Контакт</h2>
        <p>
          Email: <a href={`mailto:${contact}`}>{contact}</a>
        </p>

        <form onSubmit={onSubmit} className="form">
          <input name="name" placeholder="Ваше имя" required />
          <input type="email" name="email" placeholder="Ваш email" required />
          <textarea name="message" rows="4" placeholder="Коротко о задаче" required />
          <button type="submit" className="btn btn-primary">
            Отправить
          </button>
          {sent && <span className="status">Сообщение отправлено 🚀</span>}
        </form>
      </section>
    </div>
  );
}

export default App;
