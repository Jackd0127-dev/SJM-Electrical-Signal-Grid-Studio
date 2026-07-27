import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Buildings,
  Car,
  Check,
  Clipboard,
  HandGrabbing,
  House,
  List,
  Plus,
  ShieldCheck,
  Sparkle,
  Wrench,
  X,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const A = "/assets/sjm";
const DEMO_EMAIL = "hello@sjm-electrical.example";

const navItems = [
  ["01", "Home", "home"],
  ["02", "Approach", "about"],
  ["03", "Projects", "projects"],
  ["04", "Services", "services"],
  ["05", "Principles", "clients"],
  ["06", "FAQ", "faq"],
];

const projects = [
  {
    name: "Whole-home lighting",
    kicker: "Residential concept",
    description:
      "A calm, layered lighting plan designed around how the kitchen, dining, and living spaces are used.",
    image: `${A}/project-residential-lighting.jpg`,
    tags: ["Lighting", "Rewire", "Testing"],
  },
  {
    name: "Boutique fit-out",
    kicker: "Commercial concept",
    description:
      "Track lighting, feature pendants, power, and back-of-house essentials planned as one tidy system.",
    image: `${A}/project-commercial-fitout.jpg`,
    tags: ["Fit-out", "Power", "Lighting"],
  },
  {
    name: "Home EV charging",
    kicker: "Smart mobility concept",
    description:
      "A discreet wall-mounted charger with a neat cable route and a clear handover for everyday use.",
    image: `${A}/project-ev-charger.jpg`,
    tags: ["EV", "Survey", "Handover"],
  },
  {
    name: "Consumer unit upgrade",
    kicker: "Safety concept",
    description:
      "An orderly upgrade focused on clear circuit identification, careful checks, and straightforward documentation.",
    image: `${A}/project-consumer-unit.jpg`,
    tags: ["Upgrade", "Inspection", "Care"],
  },
];

const services = [
  {
    Icon: House,
    title: "Domestic electrical",
    copy: "Practical installations, upgrades, alterations, and fault finding for the home.",
  },
  {
    Icon: Buildings,
    title: "Small commercial",
    copy: "Considered power and lighting solutions for shops, offices, and hospitality spaces.",
  },
  {
    Icon: Car,
    title: "EV charging",
    copy: "Home charging concepts planned around the property, parking, and everyday routine.",
  },
  {
    Icon: ShieldCheck,
    title: "Inspection & testing",
    copy: "Methodical checks, plain-English findings, and documentation appropriate to the work.",
  },
  {
    Icon: Wrench,
    title: "Repairs & upgrades",
    copy: "Focused fault finding and sensible improvements without unnecessary disruption.",
  },
];

const testimonials = [
  {
    quote:
      "Arrive prepared, explain the work clearly, and leave the space as carefully as it was found.",
    company: "Care in the home",
    person: "Portfolio service principle",
  },
  {
    quote:
      "Set out the options in plain language so the right decision can be made without pressure.",
    company: "Clear communication",
    person: "Portfolio service principle",
  },
  {
    quote:
      "Plan every visible detail — from switch position to cable route — with the finished room in mind.",
    company: "Considered finish",
    person: "Portfolio service principle",
  },
  {
    quote:
      "Finish with a tidy handover and a clear explanation of what was completed.",
    company: "Confident handover",
    person: "Portfolio service principle",
  },
];

const faqs = [
  [
    "What kind of work is covered?",
    "This concept presents domestic electrical work, small commercial fit-outs, EV charging, inspection, testing, repairs, and upgrades. Final live services should be confirmed directly with SJM Electrical.",
  ],
  [
    "Can you help plan lighting and power?",
    "Yes. The proposed approach starts with how the space will be used, then maps fittings, controls, sockets, and cable routes around the final room.",
  ],
  [
    "Do you offer EV charger installation?",
    "EV charging is included as a concept service. A property survey, supply details, charger choice, and any required permissions would be confirmed before real work.",
  ],
  [
    "How does a project begin?",
    "Start with a short conversation about the property and the work. Any site visit, survey, scope, programme, and price would then be agreed clearly.",
  ],
  [
    "Will the work be tested?",
    "Testing and documentation should be appropriate to the work completed. Exact certification claims must be confirmed before this concept becomes a live trading website.",
  ],
  [
    "Are scheme memberships shown here?",
    "No accreditation or trade-scheme membership is claimed in this portfolio concept. Verified memberships can be added only when supplied and authorised.",
  ],
  [
    "Can I request an emergency call-out?",
    "Emergency availability is not represented in this concept. Any urgent service, hours, or response-time promise would need to be confirmed directly.",
  ],
  [
    "Is this a live SJM Electrical website?",
    "No. This is a Novas Agency portfolio concept created to demonstrate a possible digital direction. The contact details and projects shown here are illustrative.",
  ],
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ inverse = false }) {
  return (
    <button
      className={`logo${inverse ? " logo--inverse" : ""}`}
      onClick={() => scrollToId("home")}
      aria-label="Back to top"
    >
      <img
        className="logo__horizontal"
        src={`${A}/logo-horizontal.svg`}
        alt="SJM Electrical"
      />
      <img className="logo__icon" src={`${A}/logo-icon.svg`} alt="" />
    </button>
  );
}

function ArrowLink({ href, children, inverse = false }) {
  return (
    <a className={`arrow-link${inverse ? " arrow-link--inverse" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight weight="bold" aria-hidden="true" />
    </a>
  );
}

export function App() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const workRef = useRef(null);
  const workScrollRef = useRef(null);
  const projectDragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const testimonialsRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projectIndex, setProjectIndex] = useState(0);
  const [openFaqs, setOpenFaqs] = useState(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.12,
      });
      gsap.from(".hero-cell", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      heroTl
        .to(".hero-portrait img", { scale: 1.12, yPercent: 5, ease: "none" }, 0)
        .to(".hero-word span", { yPercent: -18, rotate: -3, ease: "none" }, 0)
        .to(".hero-stat", { y: -42, stagger: 0.08, ease: "none" }, 0)
        .to(".hero-copy", { y: -32, opacity: 0.28, ease: "none" }, 0);

      gsap.utils.toArray(".section-heading .line-inner").forEach((line) => {
        gsap.from(line, {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 88%" },
        });
      });

      gsap.from(".timeline-ring", {
        scale: 0.72,
        rotate: -24,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".journey-map", start: "top 76%" },
      });

      gsap.from(".service-card", {
        y: 56,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 82%" },
      });

      const desktop = window.matchMedia("(min-width: 800px)");
      if (desktop.matches && trackRef.current && workRef.current) {
        const getDistance = () =>
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 32);
        const tween = gsap.to(trackRef.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            id: "projectsTrack",
            trigger: workRef.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(
                projects.length - 1,
                Math.round(self.progress * (projects.length - 1)),
              );
              setProjectIndex(next);
            },
          },
        });
        workScrollRef.current = tween.scrollTrigger;
      }
    }, rootRef);

    return () => {
      workScrollRef.current = null;
      ctx.revert();
    };
  }, []);

  const goToProject = (index) => {
    setProjectIndex(index);
    const trigger = workScrollRef.current;
    if (trigger) {
      const ratio = index / (projects.length - 1);
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * ratio, behavior: "smooth" });
      return;
    }
    document.querySelector(`[data-project="${index}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const toggleFaq = (index) => {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(DEMO_EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const moveTestimonials = (direction) => {
    const viewport = testimonialsRef.current;
    if (!viewport) return;
    const card = viewport.querySelector(".testimonial-card");
    viewport.scrollBy({
      left: direction * ((card?.getBoundingClientRect().width || 320) + 12),
      behavior: "smooth",
    });
  };

  return (
    <div ref={rootRef}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([number, label, id]) => (
            <button
              key={id}
              className={activeSection === id ? "is-active" : ""}
              onClick={() => scrollToId(id)}
            >
              <span>{number}</span>
              {label}
            </button>
          ))}
        </nav>
        <ArrowLink href="#contact">Request a quote</ArrowLink>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
        </button>
      </header>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([number, label, id]) => (
            <button
              key={id}
              onClick={() => {
                setMenuOpen(false);
                window.setTimeout(() => scrollToId(id), 120);
              }}
            >
              <span>{number}</span>
              {label}
              <ArrowRight aria-hidden="true" />
            </button>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <span>Portfolio concept · Enquiries disabled</span>
          <button onClick={() => scrollToId("contact")}>Contact details</button>
        </div>
      </div>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-copy hero-cell">
              <p className="eyebrow">Installations &amp; maintenance.<br />Planned with care.</p>
              <div className="hero-copy__rule" />
              <h1>
                <span className="line-mask"><span className="hero-reveal">Electrical,</span></span>
                <span className="line-mask"><span className="hero-reveal hero-reveal--accent">made</span></span>
                <span className="line-mask"><span className="hero-reveal">clear.</span></span>
              </h1>
              <p className="hero-intro">
                A considered approach to domestic, commercial, and EV electrical work — from the
                first conversation to a tidy handover.
              </p>
              <div className="hero-actions">
                <ArrowLink href="#contact">Request a quote</ArrowLink>
                <button className="outline-button" onClick={() => scrollToId("about")}>
                  Our approach <ArrowDown weight="bold" />
                </button>
              </div>
            </div>

            <figure className="hero-portrait hero-cell">
              <img
                src={`${A}/hero-electrician.jpg`}
                alt="Fictional SJM Electrical contractor in a modern renovation setting"
              />
            </figure>

            <div className="hero-stats hero-cell">
              <div className="hero-stat hero-stat--projects">
                <Sparkle weight="fill" aria-hidden="true" />
                <strong>04</strong>
                <span>Core service areas</span>
              </div>
              <div className="hero-stat hero-stat--years">
                <strong>01</strong>
                <span>Clear point of contact</span>
              </div>
              <ul className="hero-values" aria-label="Working values">
                {["Clear", "Careful", "Practical", "Tidy", "Considered"].map((item) => (
                  <li key={item}><Sparkle weight="fill" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="hero-word hero-cell" aria-hidden="true">
              <span>SJM</span>
            </div>
          </div>
          <div className="trusted-strip">
            <span>Electrical services, clearly presented</span>
            {["Domestic", "Commercial", "Lighting", "EV charging", "Testing", "Repairs"].map((service) => (
              <strong key={service}>{service}</strong>
            ))}
          </div>
        </section>

        <section className="work-section" id="projects">
          <div className="work-pin" ref={workRef}>
            <aside className="work-sidebar">
              <p className="section-tag">Concept projects</p>
              <h2 className="section-heading">
                <span className="line-mask"><span className="line-inner">Details that</span></span>
                <span className="line-mask"><span className="line-inner">feel finished.</span></span>
              </h2>
              <p>
                Four illustrative project directions showing how SJM Electrical could present
                residential, commercial, EV, and safety-focused work.
              </p>
              <a href="#projects-track" className="text-link">
                <span>Explore the concepts</span><ArrowRight weight="bold" />
              </a>
              <div className="project-index" aria-label="Choose project">
                {projects.map((project, index) => (
                  <button
                    key={project.name}
                    className={projectIndex === index ? "is-active" : ""}
                    onClick={() => goToProject(index)}
                    aria-label={`Show ${project.name}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i />
                  </button>
                ))}
              </div>
            </aside>

            <div
              className="project-viewport"
              id="projects-track"
              onPointerDown={(event) => {
                if (window.innerWidth < 800 || event.target.closest("a, button")) return;
                projectDragRef.current = {
                  active: true,
                  startX: event.clientX,
                  startScroll: window.scrollY,
                };
                event.currentTarget.setPointerCapture(event.pointerId);
                event.currentTarget.classList.add("is-dragging");
              }}
              onPointerMove={(event) => {
                const drag = projectDragRef.current;
                if (!drag.active || !workScrollRef.current) return;
                window.scrollTo(0, drag.startScroll - (event.clientX - drag.startX) * 2.2);
              }}
              onPointerUp={(event) => {
                projectDragRef.current.active = false;
                event.currentTarget.releasePointerCapture(event.pointerId);
                event.currentTarget.classList.remove("is-dragging");
              }}
              onPointerCancel={(event) => {
                projectDragRef.current.active = false;
                event.currentTarget.classList.remove("is-dragging");
              }}
            >
              <div
                className="project-track"
                ref={trackRef}
                onScroll={(event) => {
                  if (window.innerWidth >= 800) return;
                  const track = event.currentTarget;
                  const distance = track.scrollWidth - track.clientWidth;
                  if (distance <= 0) return;
                  setProjectIndex(
                    Math.min(
                      projects.length - 1,
                      Math.round((track.scrollLeft / distance) * (projects.length - 1)),
                    ),
                  );
                }}
              >
                {projects.map((project, index) => (
                  <article className="project-card" key={project.name} data-project={index}>
                    <div className="project-media">
                      <img
                        src={project.image}
                        alt={`${project.name} — illustrative SJM Electrical portfolio concept`}
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      <div className="project-scrim" />
                      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                      <div className="project-tags">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <div className="project-copy">
                        <p>{project.kicker}</p>
                        <h3>{project.name}</h3>
                        <span>{project.description}</span>
                      </div>
                      <a
                        href="#contact"
                        aria-label={`Discuss a project like ${project.name}`}
                        className="project-link"
                      >
                        <ArrowUpRight weight="bold" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <div className="drag-line" aria-hidden="true">
                <span><HandGrabbing weight="bold" /> Drag to explore concepts</span>
                <i><b style={{ width: `${((projectIndex + 1) / projects.length) * 100}%` }} /></i>
                <em>{String(projectIndex + 1).padStart(2, "0")} — {String(projects.length).padStart(2, "0")}</em>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-intro">
            <p className="section-tag section-tag--dark">The approach</p>
            <h2 className="section-heading">
              <span className="line-mask"><span className="line-inner">Clear from the start.</span></span>
              <span className="line-mask"><span className="line-inner">Careful to the finish.</span></span>
            </h2>
            <p>
              A calm five-step route keeps the work understandable, the decisions visible, and
              the final handover straightforward.
            </p>
            <button className="outline-button outline-button--dark" onClick={() => scrollToId("services")}>
              Explore services <ArrowDown weight="bold" />
            </button>
          </div>

          <div className="journey-map" aria-label="SJM Electrical concept project journey">
            <div className="timeline-ring">
              <img
                src={`${A}/hero-electrician.jpg`}
                alt=""
              />
            </div>
            <div className="timeline-node timeline-node--one">
              <strong>01 · Listen</strong><span>Understand the space and the outcome</span>
            </div>
            <div className="timeline-node timeline-node--two">
              <strong>02 · Survey</strong><span>Check access, supply, and constraints</span>
            </div>
            <div className="timeline-node timeline-node--three">
              <strong>03 · Plan</strong><span>Set out a clear scope and route</span>
            </div>
            <div className="timeline-node timeline-node--four">
              <strong>04 · Install</strong><span>Work carefully and keep disruption down</span>
            </div>
            <div className="timeline-node timeline-node--five">
              <strong>05 · Handover</strong><span>Test, explain, and leave things tidy</span>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="services-intro">
            <p className="section-tag">Services</p>
            <h2 className="section-heading">
              <span className="line-mask"><span className="line-inner">Useful expertise.</span></span>
              <span className="line-mask"><span className="line-inner">Neatly delivered.</span></span>
            </h2>
            <p>
              A focused range of electrical services for homes and smaller commercial spaces,
              presented here as a portfolio concept.
            </p>
            <ArrowLink href="#contact" inverse>Discuss your project</ArrowLink>
          </div>
          <div className="services-grid">
            {services.map(({ Icon, title, copy }, index) => (
              <article className="service-card" key={title}>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <Icon weight="bold" aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <ArrowUpRight weight="bold" aria-hidden="true" className="service-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="clients-section" id="clients">
          <div className="clients-heading">
            <p className="section-tag section-tag--dark">Service principles</p>
            <h2 className="section-heading">
              <span className="line-mask"><span className="line-inner">What good work</span></span>
              <span className="line-mask"><span className="line-inner">should feel like.</span></span>
            </h2>
            <p>Principles for the experience — not customer reviews or third-party endorsements.</p>
            <div className="client-controls">
              <button onClick={() => moveTestimonials(-1)} aria-label="Previous principle"><ArrowLeft /></button>
              <button onClick={() => moveTestimonials(1)} aria-label="Next principle"><ArrowRight /></button>
            </div>
          </div>
          <div className="testimonials" ref={testimonialsRef}>
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.company}>
                <span className="quote-mark">“</span>
                <blockquote>{testimonial.quote}</blockquote>
                <div>
                  <img src={`${A}/logo-icon.svg`} alt="" />
                  <p><strong>{testimonial.company}</strong><span>{testimonial.person}</span></p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="faq-heading">
            <p className="section-tag">FAQ</p>
            <h2 className="section-heading">
              <span className="line-mask"><span className="line-inner">Got any</span></span>
              <span className="line-mask"><span className="line-inner">questions?</span></span>
            </h2>
            <p>Useful context for reviewing this SJM Electrical portfolio direction.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaqs.has(index);
              return (
                <article className={`faq-item${isOpen ? " is-open" : ""}`} key={question}>
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{question}</span>
                    <Plus weight="bold" />
                  </button>
                  <div id={`faq-answer-${index}`} className="faq-answer" aria-hidden={!isOpen}>
                    <p>{answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-top">
          <Logo inverse />
          <p>Installations &amp; maintenance.<br />Planned with care.</p>
          <button className="copy-email" onClick={copyEmail}>
            <span>{copied ? "Copied to clipboard" : DEMO_EMAIL}</span>
            {copied ? <Check weight="bold" /> : <Clipboard weight="bold" />}
          </button>
          <ArrowLink href="#portfolio-disclosure">Concept details</ArrowLink>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} SJM Electrical concept</span>
          <span>Installations &amp; maintenance · Service area to be confirmed</span>
          <div>
            <a href="#home">Top</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <p className="portfolio-disclosure" id="portfolio-disclosure">
          Portfolio concept by Novas Agency. Projects, service principles, photography, and contact
          details are illustrative and are not customer testimonials, accreditations, or evidence
          of completed work. No enquiry is submitted from this demo.
        </p>
        <p className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</p>
      </footer>
    </div>
  );
}
