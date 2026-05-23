const WORKS = [
  {
    category: 'Fashion',
    title: 'Campaign Shoots',
    image: '/portfolio/works/anaya.jpg',
    placeholder: '#2a2520',
  },
  {
    category: 'F&B',
    title: 'Cinematic Content',
    image: '/portfolio/works/the-pour.jpg',
    placeholder: '#1e1a17',
  },
  {
    category: 'Lifestyle',
    title: 'Spatial Identity',
    image: '/portfolio/works/heritage-objects.jpg',
    placeholder: '#252018',
  },
  {
    category: 'Product',
    title: 'Brand Storytelling',
    image: '/portfolio/works/still.jpg',
    placeholder: '#1a1e20',
  },
] as const

export function OurWorkSection() {
  return (
    <section
      aria-label="Our work"
      style={{
        background: '#111111',
        padding: '5rem 4% 6rem',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: '#f5f0e8',
          marginBottom: '3rem',
          paddingLeft: '1rem',
        }}
      >
        Our Work
      </h2>

      <div className="our-work-carousel">
        {WORKS.map((work) => (
          <article
            key={work.title}
            className="our-work-item"
            style={{ background: work.placeholder }}
          >
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="our-work-image"
            />

            <div className="our-work-overlay">
              <p className="our-work-category">{work.category}</p>
              <h3 className="our-work-title">{work.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
