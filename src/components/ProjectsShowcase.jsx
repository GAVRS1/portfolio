import { useEffect, useMemo, useState } from 'react';

const STICKY_STEPS = 2.6;

const themeClassByType = {
  telegram: 'theme-telegram',
  dotnet: 'theme-dotnet',
  ai: 'theme-ai'
};

function MediaPicture({ image, className = 'project-cover', loading = 'lazy' }) {
  return (
    <picture>
      <source srcSet={image.avif} type="image/avif" />
      <source srcSet={image.webp} type="image/webp" />
      <img className={className} src={image.jpg} alt={image.alt} loading={loading} decoding="async" />
    </picture>
  );
}

function ProjectCard({ project, className, compact = false }) {
  const mediaItems = [
    { type: 'image', image: project.media.cover, label: 'Cover' },
    ...project.media.screenshots.map((image, index) => ({ type: 'image', image, label: `Скрин ${index + 1}` })),
    ...(project.media.videoUrl ? [{ type: 'video', label: 'Видео', caption: project.media.caption, url: project.media.videoUrl }] : [])
  ];

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = mediaItems[activeMediaIndex];

  return (
    <article className={className}>
      <div className="project-media-frame">
        {activeMedia.type === 'image' ? (
          <MediaPicture image={activeMedia.image} />
        ) : (
          <div className="project-video-preview">
            <p>{project.media.caption}</p>
            <a href={project.media.videoUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
              Смотреть демо
            </a>
          </div>
        )}
      </div>

      <div className="media-thumbnails" role="tablist" aria-label={`Медиа ${project.title}`}>
        {mediaItems.map((item, index) => (
          <button
            key={`${project.title}-${item.label}`}
            type="button"
            role="tab"
            aria-selected={index === activeMediaIndex}
            className={`thumb-btn ${index === activeMediaIndex ? 'is-active' : ''}`}
            onClick={() => setActiveMediaIndex(index)}
            title={item.label}
          >
            {item.type === 'image' ? (
              <MediaPicture image={item.image} className="thumb-image" />
            ) : (
              <span className="thumb-video">▶</span>
            )}
          </button>
        ))}
      </div>

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

        {!compact && (
          <>
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
          </>
        )}
      </div>
    </article>
  );
}

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
          const themeClass = themeClassByType[project.type] || 'theme-default';

          return (
            <ProjectCard
              key={project.title}
              project={project}
              className={`project-stage ${side} ${stateClass} ${themeClass} glass`}
            />
          );
        })}
      </div>

      <div className="showcase-mobile-stack">
        {projects.map((project) => {
          const themeClass = themeClassByType[project.type] || 'theme-default';

          return <ProjectCard key={project.title} project={project} compact className={`card ${themeClass} glass`} />;
        })}
      </div>
    </section>
  );
}

export default ProjectsShowcase;
