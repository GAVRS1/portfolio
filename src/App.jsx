import { useEffect, useMemo, useState } from 'react';
import ProjectsShowcase from './components/ProjectsShowcase';
import projects from './data/projects';

const roles = ['Frontend Engineer', 'UI Alchemist', 'Product Thinker', 'Creative Coder'];


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
