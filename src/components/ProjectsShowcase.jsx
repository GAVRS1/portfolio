import { useEffect, useMemo, useRef, useState } from 'react';

function ProjectsShowcase({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const nextIndex = Number(entry.target.getAttribute('data-step-index'));
          if (Number.isNaN(nextIndex)) return;
          setActiveIndex(nextIndex);
        });
      },
      {
        root: null,
        threshold: 0.55,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));

    return () => observer.disconnect();
  }, []);

  const stageItems = useMemo(
    () =>
      projects.map((project, index) => {
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
      }),
    [activeIndex, projects]
  );

  return (
    <section id="projects" className="section projects-showcase">
      <h2>Избранные проекты</h2>

      <div className="showcase-desktop">
        <div className="showcase-sticky-frame">
          <div className="showcase-centerline" />
          {stageItems}
        </div>

        <div className="showcase-step-track" aria-hidden="true">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="showcase-step"
              data-step-index={index}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
            />
          ))}
        </div>
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
