import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { profile, projects, skills } from './data/profile'
import './styles.css'

const nav = [['خانه', 'home'], ['درباره من', 'about'], ['تجربه', 'experience'], ['پروژه‌ها', 'projects'], ['مهارت‌ها', 'skills'], ['تماس', 'contact']] as const
const Icon = ({ children }: { children: string }) => <span aria-hidden="true" className="icon">{children}</span>

function Header() {
  const [open, setOpen] = useState(false); const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -55%' })
    nav.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el) }); return () => observer.disconnect()
  }, [])
  return <header className="header"><a className="brand" href="#home" aria-label="صفحه اصلی سیدامین حسینی"><span className="brand-mark">A</span><span>{profile.latinName}</span></a><button className="menu-button" aria-label="باز کردن منو" aria-expanded={open} onClick={() => setOpen(!open)}><i></i><i></i></button><nav className={open ? 'nav open' : 'nav'} aria-label="ناوبری اصلی">{nav.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}</nav></header>
}

const SectionTitle = ({ title, copy }: { title: string; copy?: string }) => <div className="section-heading"><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
const Pills = ({ items }: { items: string[] }) => <div className="pills">{items.map(x => <span key={x}>{x}</span>)}</div>

function App() {
  const personSchema = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.latinName,
    alternateName: profile.name, jobTitle: profile.title, url: 'https://aminhosseini.com/',
    email: profile.email, telephone: profile.phone, address: { '@type': 'PostalAddress', addressLocality: 'تهران', addressCountry: 'IR' }
  }
  return <><Header/><main>
    <section id="home" className="hero container"><div className="hero-copy"><h1>{profile.name}<small>{profile.latinName}</small></h1><p className="hero-title">{profile.title}</p><p className="lede">{profile.summary}</p><div className="actions"><a className="button primary" href="#projects">مشاهده پروژه‌ها <Icon>←</Icon></a><a className="button ghost" href="#contact">تماس با من</a></div><Pills items={['SEO', 'Development', 'AI']}/></div><div className="terminal" aria-label="نمایش زمینه تخصصی"><div className="terminal-top"><span></span><span></span><span></span><em>amin@portfolio:~</em></div><p><b>$</b> craft --with seo + web + ai</p><p className="muted">Building websites made to perform.</p><div className="terminal-grid"></div></div></section>
    <section className="stats container" aria-label="آمار حرفه‌ای">{[['3+', 'سال تجربه'], ['15+', 'وب‌سایت تحت مدیریت'], ['SEO + Web', 'تخصص اصلی'], ['AI', 'تکنولوژی مکمل']].map(([n,l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</section>
    <section id="about" className="section container about"><div><SectionTitle title="درباره من"/><div className="about-text"><p>من سیدامین حسینی، متخصص SEO و توسعه وب هستم و حدود ۳ سال است در حوزه سئو، توسعه و بهینه‌سازی وب‌سایت فعالیت می‌کنم.</p><p>در شرکت فناوران فراسو نامدار در حوزه SEO، Web Development و AI فعالیت داشته‌ام و هم‌زمان روی پروژه‌های مختلف وب کار کرده‌ام. تمرکز من ترکیب سئو و توسعه وب برای ساخت وب‌سایت‌هایی است که هم از نظر فنی قدرتمند باشند و هم قابلیت رشد در موتورهای جست‌وجو را داشته باشند.</p></div></div><aside className="what"><span>تمرکز کاری</span><h3>What I Do</h3>{['SEO Strategy', 'Web Development', 'Technical SEO', 'Website Optimization', 'WordPress Development', 'AI-assisted Development'].map(x => <div key={x}>↙ <b>{x}</b></div>)}</aside></section>
    <section id="experience" className="section container"><SectionTitle title="تجربه کاری"/><article className="experience-card"><div className="experience-meta"><span className="company-dot"></span><div><h3>فناوران فراسو نامدار</h3><p>SEO &amp; Web Development &amp; AI Specialist</p></div><strong>3+ Years</strong></div><p className="experience-copy">فعالیت در حوزه سئو، توسعه وب و فناوری‌های هوش مصنوعی با مسئولیت اجرای پروژه‌ها، مدیریت فرآیندهای فنی و سئویی و توسعه و نگهداری وب‌سایت‌ها.</p><div className="work-columns"><Pills items={['Technical SEO', 'On-Page SEO', 'Keyword Research', 'Content Strategy', 'Core Web Vitals', 'Schema Markup']}/><Pills items={['Website Development', 'WordPress Development', 'Custom Coding', 'Performance Optimization', 'Bug Fixing', 'Maintenance']}/><Pills items={['AI-assisted SEO', 'AI-assisted Development', 'Prompt Engineering', 'Workflow Automation']}/></div></article></section>
    <section id="projects" className="section container"><SectionTitle title="پروژه‌ها و وب‌سایت‌های تحت مدیریت" copy="تجربه فعالیت حرفه‌ای روی پروژه‌های مختلف در حوزه‌های گوناگون و مدیریت، توسعه، بهینه‌سازی و نگهداری حدود ۱۵ وب‌سایت."/><div className="project-grid">{projects.map((project, i) => <article className="project-card" key={project}><span>0{i + 1}</span><h3>{project}</h3><p>مدیریت، توسعه و بهینه‌سازی وب‌سایت</p><i>↙</i></article>)}</div></section>
    <section className="section container"><SectionTitle title="دستاوردها"/><div className="achievement-grid">{['ارتقای کلمات کلیدی به صفحه اول گوگل', 'افزایش Organic Traffic', 'بهبود Visibility و حضور در جست‌وجو', 'بهینه‌سازی Performance وب‌سایت', 'راه‌اندازی وب‌سایت از صفر', 'مدیریت هم‌زمان حدود ۱۵ پروژه'].map((x,i) => <div className="achievement" key={x}><span>0{i+1}</span><h3>{x}</h3></div>)}</div></section>
    <section id="skills" className="section container"><SectionTitle title="مهارت‌ها"/><div className="skill-groups">{Object.entries(skills).map(([title, items]) => <article key={title}><h3>{title}</h3><Pills items={items}/></article>)}</div></section>
    <section className="section container split"><div><SectionTitle title="ابزارهای تخصصی"/><div className="tool-list"><p><b>SEO &amp; Analytics</b>Google Search Console · GA4 · GTM · Ahrefs · Semrush · Screaming Frog · PageSpeed Insights · GTmetrix · Google Trends</p><p><b>Development</b>Git · GitHub · cPanel · Hosting &amp; Server Tools · Browser DevTools</p></div></div><div><SectionTitle title="تحصیلات و دوره‌ها"/><div className="education"><b>دانشگاه آزاد اسلامی — تهران</b><span>کارشناسی پیوسته مهندسی کامپیوتر · در حال تحصیل</span><hr/><b>دوره‌ها و گواهینامه‌ها</b><span>گواهینامه‌های فنی‌وحرفه‌ای SEO و Web Development · دوره توسعه وب میلاد بهرامی · دوره SEO سیاوش پیری · دوره هوش مصنوعی امین حسینی</span></div></div></section>
    <section className="section container"><div className="languages"><b>زبان‌ها</b><span>فارسی — Native</span><span>English — Professional</span><span>ترکی آذربایجانی — Professional</span></div></section>
    <section className="statement container"><span>SEO + DEVELOPMENT + AI</span><h2>تقاطع رشد، تکنولوژی و عملکرد.</h2><p>تمرکز من ایجاد یک نقطه اتصال بین سئو، توسعه وب و هوش مصنوعی است؛ از تحلیل و طراحی اولیه تا توسعه، بهینه‌سازی فنی، رشد ارگانیک و نگهداری بلندمدت وب‌سایت.</p></section>
    <section id="contact" className="contact container"><SectionTitle title="بیایید با هم کار کنیم"/><p>اگر برای سئو، توسعه وب، بهینه‌سازی سایت یا یک پروژه جدید به متخصصی نیاز دارید، خوشحال می‌شوم درباره پروژه شما صحبت کنیم.</p><div className="contact-actions"><a className="button primary" href={'mailto:' + profile.email}>Email Me <Icon>←</Icon></a><a className="button ghost" href={'tel:' + profile.phone}>Call Me</a></div><div className="details"><a href={'mailto:' + profile.email}>✉ {profile.email}</a><a href={'tel:' + profile.phone}>☎ {profile.phoneDisplay}</a><span>⌖ تهران، ایران</span><span>◌ {profile.website}</span></div></section>
  </main><footer className="footer container"><span>© 2026 {profile.latinName}</span><span>SEO &amp; Web Development Specialist</span><div>{nav.map(([n,id]) => <a href={'#'+id} key={id}>{n}</a>)}</div></footer><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}/></>
}

createRoot(document.getElementById('root')!).render(<App />)
