import { useEffect, useMemo, useState } from 'react';

const STICKY_STEPS = 2.6;

function ProjectsShowcase({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('projects');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(section.offsetHeight - viewportHeight, 1);
      const traveled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = traveled / totalScrollable;
      const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      setActiveIndex(nextIndex);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [projects.length]);

  const sectionStyle = useMemo(
    () => ({
      '--project-steps': projects.length,
      '--sticky-steps': STICKY_STEPS
    }),
    [projects.length]
  );

  return (
    <section id="projects" className="section projects-showcase" style={sectionStyle}>
      <h2>Избранные проекты</h2>

      <div className="showcase-scroll-zone" aria-hidden="true" />

      <div className="showcase-sticky-frame">
        <div className="showcase-centerline" />

        {projects.map((project, index) => {
          const side = index % 2 === 0 ? 'left' : 'right';
          const isActive = index === activeIndex;
          const stateClass = isActive ? 'is-active' : index < activeIndex ? 'is-past' : 'is-future';

          return (
            <article key={project.title} className={`project-stage ${side} ${stateClass} glass`}>
              <img className="project-cover" src={project.media.cover} alt={project.title} loading="lazy" />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p className="subtitle">{project.subtitle}</p>
                <p>{project.description}</p>

                <div className="stack-chips">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="actions project-links">
                  {Object.entries(project.links).map(([label, href]) => (
                    <a key={label} href={href} className="btn btn-ghost" target="_blank" rel="noreferrer">
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="showcase-mobile-stack">
        {projects.map((project) => (
          <article key={project.title} className="card glass">
            <img className="project-cover" src={project.media.cover} alt={project.title} loading="lazy" />
            <div className="card-content">
              <h3>{project.title}</h3>
              <p className="subtitle">{project.subtitle}</p>
              <p>{project.description}</p>

              <div className="stack-chips">
                {project.stack.map((tech) => (
                  <span key={tech} className="stack-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsShowcase;
