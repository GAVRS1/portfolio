import { useEffect, useMemo, useState } from 'react';

const roles = ['Frontend Engineer', 'UI Alchemist', 'Product Thinker', 'Creative Coder'];

const projects = [
  {
    title: 'Nova Commerce',
    desc: 'Интернет-платформа с умной персонализацией и визуально богатым UX.',
    stack: 'React · TypeScript · Motion'
  },
  {
    title: 'Pulse Dashboard',
    desc: 'Аналитическая панель в реальном времени с динамическими графиками и фильтрами.',
    stack: 'Vite · Recharts · Netlify Functions'
  },
  {
    title: 'Echo Brand Studio',
    desc: 'Креативный сайт-студия с акцентом на storytelling и micro-interactions.',
    stack: 'React · GSAP style effects · API'
  }
];

function App() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [sent, setSent] = useState(false);

  const owner = import.meta.env.VITE_SITE_OWNER || 'Твое Имя';
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
          Создаю сайты, где дизайн ощущается как опыт, а интерфейс работает как инструмент роста.
        </p>
        <p className="role">Сейчас в режиме: {roles[roleIndex]}</p>

        <div className="actions">
          <a href="#projects" className="btn btn-primary">
            Смотреть проекты
          </a>
          <a href="#contact" className="btn btn-ghost">
            Связаться
          </a>
        </div>
      </header>

      <section id="projects" className="section">
        <h2>Избранные проекты</h2>
        <div className="grid">
          {projects.map((project) => (
            <article key={project.title} className="card glass">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <small>{project.stack}</small>
            </article>
          ))}
        </div>
      </section>

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
