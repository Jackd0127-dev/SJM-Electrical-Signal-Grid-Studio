import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToBounded, useBoundedScroll } from "./useBoundedScroll.js";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Buildings,
  Car,
  Check,
  EnvelopeSimple,
  HandGrabbing,
  House,
  List,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
  Sparkle,
  WhatsappLogo,
  Wrench,
  X,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const A = "./assets/sjm";
const DEMO_EMAIL = "hello@sjm-electrical.example";
const DEMO_PHONE_DISPLAY = "01632 960 123";
const DEMO_PHONE_LINK = "+441632960123";
const WHATSAPP_URL =
  "https://wa.me/?text=Hello%20SJM%20Electrical%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const navItems = [
  ["01", "Home", "home"],
  ["02", "Approach", "about"],
  ["03", "Projects", "projects"],
  ["04", "Services", "services"],
  ["05", "Principles", "clients"],
];

const projects = [
  {
    name: "Whole-home lighting",
    kicker: "Residential concept",
    description:
      "A calm, layered lighting plan designed around how the kitchen, dining, and living spaces are used.",
    image: `${A}/project-residential-lighting.webp`,
    width: 1536,
    height: 1024,
    tags: ["Lighting", "Rewire", "Testing"],
  },
  {
    name: "Boutique fit-out",
    kicker: "Commercial concept",
    description:
      "Track lighting, feature pendants, power, and back-of-house essentials planned as one tidy system.",
    editorialTitle: "Designed around business.",
    editorialSubtitle:
      "Lighting and power planned as one tidy system for the way the space needs to work.",
    image: `${A}/project-boutique-lighting-user.webp`,
    width: 736,
    height: 981,
    objectPosition: "center 42%",
    tags: ["Fit-out", "Power", "Lighting"],
  },
  {
    name: "Home EV charging",
    kicker: "Smart mobility concept",
    description:
      "A discreet wall-mounted charger with a neat cable route and a clear handover for everyday use.",
    editorialTitle: "Charging, made simple.",
    editorialSubtitle:
      "A discreet home charger with a neat route and a clear everyday handover.",
    editorialTone: "dark",
    image: `${A}/project-home-ev-charging-user.webp`,
    width: 736,
    height: 736,
    tags: ["EV", "Survey", "Handover"],
  },
  {
    name: "Consumer unit upgrade",
    kicker: "Safety concept",
    description:
      "An orderly upgrade focused on clear circuit identification, careful checks, and straightforward documentation.",
    editorialTitle: "Safety made clear.",
    editorialSubtitle:
      "A methodical upgrade, carefully labelled, tested, and explained.",
    editorialTone: "dark",
    image: `${A}/project-consumer-unit-user.webp`,
    width: 664,
    height: 1000,
    objectPosition: "center 48%",
    tags: ["Upgrade", "Inspection", "Care"],
  },
];

const approachImages = [
  {
    src: `${A}/project-residential-lighting.webp`,
    alt: "Finished residential lighting installation",
  },
  {
    src: `${A}/project-boutique-lighting-user.webp`,
    alt: "Architectural linear lighting installation",
    width: 736,
    height: 981,
  },
  {
    src: `${A}/project-home-ev-charging-user.webp`,
    alt: "Home electric vehicle charger installation",
    width: 736,
    height: 736,
  },
  {
    src: `${A}/project-consumer-unit-user.webp`,
    alt: "Electrician testing a consumer unit",
    width: 664,
    height: 1000,
  },
  {
    src: `${A}/hero-electrician.webp`,
    alt: "SJM Electrical portfolio electrician",
  },
  {
    src: `${A}/hero-team-floating.webp`,
    alt: "SJM Electrical portfolio team",
    team: true,
    width: 1536,
    height: 1024,
  },
];

const approachSteps = [
  ["01", "Listen", "Understand the space and the outcome"],
  ["02", "Survey", "Check access, supply, and constraints"],
  ["03", "Plan", "Set out a clear scope and route"],
  ["04", "Install", "Work carefully and keep disruption down"],
  ["05", "Handover", "Test, explain, and leave things tidy"],
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
  {
    quote:
      "Treat every visible cable route, fitting, label, and final check as part of the finished result.",
    company: "Own the detail",
    person: "Portfolio service principle",
  },
];

function scrollToId(id) {
  const element = document.getElementById(id);
  if (!element) return;
  scrollToBounded(element.getBoundingClientRect().top + window.scrollY);
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
        width="1208"
        height="165"
      />
      <img className="logo__icon" src={`${A}/logo-icon.svg`} alt="" width="42" height="42" />
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
  const projectIndexRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [projectIndex, setProjectIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useBoundedScroll();

  const updateProjectIndex = (next) => {
    if (projectIndexRef.current === next) return;
    projectIndexRef.current = next;
    setProjectIndex(next);
  };

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

    document.body.classList.add("hero-intro-running");
    let syncProcessPaths;
    let measureProjectPositions;

    const ctx = gsap.context(() => {
      const heading = document.querySelector(".hero-copy h1");
      const headingLines = gsap.utils.toArray(".hero-reveal");
      const copyDetails = gsap.utils.toArray(
        ".hero-copy > .eyebrow, .hero-copy > .hero-copy__rule, .hero-copy > .hero-intro, .hero-copy > .hero-actions",
      );
      const gridLines = gsap.utils.toArray(".hero-grid, .hero-cell");
      const headingRect = heading.getBoundingClientRect();
      const introScale = window.innerWidth <= 620 ? 0.94 : 1.22;
      const introX =
        (window.innerWidth - headingRect.width * introScale) / 2 - headingRect.left;
      const introY =
        (window.innerHeight - headingRect.height * introScale) / 2 - headingRect.top;

      gsap.set(heading, {
        x: introX,
        y: introY,
        scale: introScale,
        transformOrigin: "top left",
      });
      gsap.set(headingLines, { yPercent: 118, rotate: 3, opacity: 0 });
      gsap.set(copyDetails, { y: 22, autoAlpha: 0 });
      gsap.set(".site-header", { y: -24, autoAlpha: 0 });
      gsap.set(".hero-portrait__team", { x: 70, scale: 0.94, autoAlpha: 0 });
      gsap.set(".hero-stats", { x: 46, autoAlpha: 0 });
      gsap.set(".hero-word", { x: 30, autoAlpha: 0 });
      gsap.set(".trusted-strip", { y: 30, autoAlpha: 0 });
      gsap.set(".floating-whatsapp", { y: 28, scale: 0.82, autoAlpha: 0 });
      gsap.set(gridLines, { borderColor: "rgba(255, 255, 255, 0)" });

      const introTl = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          document.body.classList.remove("hero-intro-running");
          ScrollTrigger.refresh();
        },
      });

      introTl
        .to(headingLines, {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.13,
          ease: "expo.out",
        })
        .to({}, { duration: 0.32 })
        .to(heading, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.25,
          ease: "expo.inOut",
        })
        .to(
          gridLines,
          {
            borderColor: "rgba(255, 255, 255, 0.16)",
            duration: 0.85,
            ease: "power2.out",
          },
          "-=0.72",
        )
        .to(
          ".site-header",
          { y: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" },
          "-=0.64",
        )
        .to(
          copyDetails,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.68,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.54",
        )
        .to(
          ".hero-portrait__team",
          { x: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "power3.out" },
          "-=0.65",
        )
        .to(
          ".hero-stats",
          { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
          "-=0.78",
        )
        .to(
          ".hero-word",
          { x: 0, autoAlpha: 1, duration: 0.72, ease: "power3.out" },
          "-=0.64",
        )
        .to(
          ".trusted-strip",
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          "-=0.54",
        )
        .to(
          ".floating-whatsapp",
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: "back.out(1.55)" },
          "-=0.5",
        );

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

      const approachWords = gsap.utils.toArray(".approach-word");
      const approachGuides = gsap.utils.toArray(".approach-title-guide span");
      const approachImageCards = gsap.utils.toArray(".approach-image-card");
      const processNodes = gsap.utils.toArray(".process-node");
      const processLines = gsap.utils.toArray(".process-line");
      const processSvg = document.querySelector(".process-lines");
      syncProcessPaths = () => {
        const svgRect = processSvg.getBoundingClientRect();
        const dots = processNodes.map((node) =>
          node.querySelector(".process-node-dot").getBoundingClientRect(),
        );
        const points = dots.map((dot) => ({
          x: dot.left + dot.width / 2 - svgRect.left,
          y: dot.top + dot.height / 2 - svgRect.top,
        }));

        processLines.forEach((line, index) => {
          const start = points[index];
          const end = points[index + 1];
          const distance = end.x - start.x;
          const control = distance * 0.38;
          const previousDash = Number.parseFloat(getComputedStyle(line).strokeDasharray);
          const previousOffset = Number.parseFloat(getComputedStyle(line).strokeDashoffset);
          const previousProgress =
            Number.isFinite(previousDash) && previousDash > 0 && Number.isFinite(previousOffset)
              ? gsap.utils.clamp(0, 1, 1 - previousOffset / previousDash)
              : 0;
          const endsAtRaisedNode = index === 0 || index === 2;

          if (endsAtRaisedNode) {
            const swooshX = end.x - Math.min(88, distance * 0.32);
            const swooshY = Math.max(4, end.y - 30);
            line.setAttribute(
              "d",
              `M ${start.x} ${start.y} C ${start.x + distance * 0.28} ${start.y}, ${
                swooshX - distance * 0.12
              } ${swooshY}, ${swooshX} ${swooshY} C ${
                swooshX + distance * 0.12
              } ${swooshY}, ${end.x - distance * 0.1} ${end.y}, ${end.x} ${end.y}`,
            );
          } else {
            line.setAttribute(
              "d",
              `M ${start.x} ${start.y} C ${start.x + control} ${start.y}, ${
                end.x - control
              } ${end.y}, ${end.x} ${end.y}`,
            );
          }
          const length = line.getTotalLength();
          line.style.strokeDasharray = `${length} ${length}`;
          line.style.strokeDashoffset = `${length * (1 - previousProgress)}`;
        });
      };
      syncProcessPaths();
      ScrollTrigger.addEventListener("refreshInit", syncProcessPaths);
      gsap.set(".approach-content", { y: 44, autoAlpha: 0 });
      gsap.set(approachWords, {
        y: 54,
        scale: 0.82,
        rotate: (index) => (index % 2 === 0 ? -3 : 3),
        opacity: 0,
      });
      gsap.set(approachImageCards, {
        y: 90,
        scale: 0.72,
        rotate: (index) => (index % 2 === 0 ? -5 : 5),
        autoAlpha: 0,
      });
      gsap.set(processNodes, { opacity: 0.18, visibility: "visible" });
      processLines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: `${length} ${length}`,
          strokeDashoffset: length,
          opacity: 0,
        });
      });

      const approachTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.62,
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
      });

      approachTl
        .to(approachWords, {
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.14,
          ease: "expo.out",
        })
        .to({}, { duration: 0.24 })
        .to(approachWords, {
          x: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = approachGuides[index].getBoundingClientRect();
            return target.left - source.left;
          },
          y: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = approachGuides[index].getBoundingClientRect();
            return target.top - source.top;
          },
          scale: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = approachGuides[index].getBoundingClientRect();
            return target.width / source.width;
          },
          duration: 1.18,
          stagger: 0.035,
          ease: "expo.inOut",
        })
        .to(".approach-content", {
          y: 0,
          autoAlpha: 1,
          duration: 0.82,
          ease: "power3.out",
        }, "-=0.2")
        .to(approachImageCards, {
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.68,
          stagger: 0.17,
          ease: "back.out(1.3)",
        }, "-=0.42")
        .to(processNodes[0], {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        }, "+=0.1");

      processLines.forEach((line, index) => {
        approachTl
          .set(line, { opacity: 1 })
          .to(line, {
            strokeDashoffset: 0,
            duration: 0.56,
            ease: "none",
          })
          .to(processNodes[index + 1], {
            opacity: 1,
            duration: 0.24,
            ease: "power2.out",
          });
      });

      const serviceWords = gsap.utils.toArray(".services-word");
      const serviceGuides = gsap.utils.toArray(".services-title-guide span");
      const serviceCards = gsap.utils.toArray(".service-card");
      const serviceContactPills = gsap.utils.toArray(".service-contact-pill");
      gsap.set(serviceWords, {
        y: 58,
        scale: 0.84,
        rotate: (index) => (index % 2 === 0 ? -3 : 3),
        autoAlpha: 0,
      });
      gsap.set(".services-summary", { y: 20, autoAlpha: 0 });
      gsap.set(serviceCards, { y: 58, scale: 0.95, autoAlpha: 0 });
      gsap.set(".services-cta", { y: 36, scale: 0.94, autoAlpha: 0 });
      gsap.set(".services-contact-row", { y: 22, autoAlpha: 0 });
      gsap.set(serviceContactPills, {
        x: (index) => (index === 0 ? -42 : 42),
        y: 24,
        scale: 0.88,
        rotate: (index) => (index === 0 ? -2.5 : 2.5),
        autoAlpha: 0,
      });

      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.62,
          refreshPriority: -2,
          invalidateOnRefresh: true,
        },
      });

      servicesTl
        .to(serviceWords, {
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.78,
          stagger: 0.14,
          ease: "expo.out",
        })
        .to({}, { duration: 0.22 })
        .to(serviceWords, {
          x: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = serviceGuides[index].getBoundingClientRect();
            return target.left - source.left;
          },
          y: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = serviceGuides[index].getBoundingClientRect();
            return target.top - source.top;
          },
          scale: (index, element) => {
            const source = element.getBoundingClientRect();
            const target = serviceGuides[index].getBoundingClientRect();
            return target.width / source.width;
          },
          duration: 1.12,
          stagger: 0.035,
          ease: "expo.inOut",
        })
        .to(".services-summary", {
          y: 0,
          autoAlpha: 1,
          duration: 0.44,
          ease: "power3.out",
        }, "-=0.18")
        .to(serviceCards, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.56,
          stagger: 0.13,
          ease: "power3.out",
        })
        .to(".services-cta", {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.72,
          ease: "back.out(1.2)",
        }, "+=0.08")
        .to(".services-contact-row", {
          y: 0,
          autoAlpha: 1,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.18")
        .to(serviceContactPills, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.66,
          stagger: 0.11,
          ease: "back.out(1.55)",
        }, "-=0.2")
        .to({}, { duration: 0.3 })
        .to(".services-scene", {
          xPercent: () => (window.innerWidth <= 620 ? -9 : -14),
          yPercent: () => (window.innerWidth <= 620 ? -8 : -13),
          scale: () => (window.innerWidth <= 620 ? 0.985 : 0.97),
          rotate: () => (window.innerWidth <= 620 ? -0.45 : -0.8),
          borderBottomRightRadius: () => (window.innerWidth <= 620 ? 24 : 48),
          autoAlpha: 0.16,
          duration: 1.08,
          ease: "power3.inOut",
        });

      const principleLines = gsap.utils.toArray(".principles-line > span");
      const testimonialsTrack = document.querySelector(".testimonials-track");
      const testimonialsViewport = document.querySelector(".testimonials");
      const lastPrincipleCard = document.querySelector(".testimonial-card:last-child");
      const lastPrincipleContent = gsap.utils.toArray(
        ".testimonial-index, .quote-mark, blockquote, .testimonial-card:last-child > div",
        lastPrincipleCard,
      );
      const getTestimonialsDistance = () =>
        Math.max(0, testimonialsTrack.scrollWidth - window.innerWidth + 48);
      const getPrincipleCardScale = () =>
        Math.max(
          window.innerWidth / lastPrincipleCard.offsetWidth,
          window.innerHeight / lastPrincipleCard.offsetHeight,
        ) * 1.06;
      const getPrincipleCardX = () => {
        const finalLeft =
          testimonialsViewport.offsetLeft +
          lastPrincipleCard.offsetLeft -
          getTestimonialsDistance();
        return window.innerWidth / 2 - (finalLeft + lastPrincipleCard.offsetWidth / 2);
      };
      const getPrincipleCardY = () => {
        const finalTop = testimonialsViewport.offsetTop + lastPrincipleCard.offsetTop;
        return window.innerHeight / 2 - (finalTop + lastPrincipleCard.offsetHeight / 2);
      };
      gsap.set(principleLines, { yPercent: 118, rotate: 2, autoAlpha: 0 });
      gsap.set(".principles-work-underline", { scaleX: 0 });
      gsap.set(".principles-summary", { y: 18, autoAlpha: 0 });
      gsap.set(testimonialsTrack, { y: 46, autoAlpha: 0 });

      const principlesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".clients-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          refreshPriority: -3,
          invalidateOnRefresh: true,
        },
      });

      principlesTl
        .to(principleLines, {
          yPercent: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.72,
          stagger: 0.12,
          ease: "expo.out",
        }, "-=0.12")
        .to(".principles-work-underline", {
          scaleX: 1,
          duration: 0.52,
          ease: "expo.out",
        }, "-=0.28")
        .to(".principles-summary", {
          y: 0,
          autoAlpha: 1,
          duration: 0.42,
          ease: "power3.out",
        }, "-=0.22")
        .to(testimonialsTrack, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(testimonialsTrack, {
          x: () => -getTestimonialsDistance(),
          duration: 4.2,
          ease: "none",
        }, "+=0.08")
        .to(".clients-heading", {
          y: -28,
          autoAlpha: 0,
          duration: 0.34,
          ease: "power2.in",
        })
        .to(lastPrincipleCard, {
          x: getPrincipleCardX,
          y: getPrincipleCardY,
          scale: getPrincipleCardScale,
          borderRadius: 0,
          zIndex: 40,
          transformOrigin: "center center",
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(lastPrincipleContent, {
          autoAlpha: 0,
          duration: 0.38,
          stagger: 0.025,
          ease: "power2.out",
        }, "-=0.72");

      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      footerTl
        .from(".footer-kicker", {
          y: 24,
          autoAlpha: 0,
          duration: 0.55,
          ease: "power3.out",
        })
        .from(".footer-heading-line > span", {
          yPercent: 120,
          rotate: 2,
          autoAlpha: 0,
          transformOrigin: "center bottom",
          duration: 0.82,
          stagger: 0.12,
          ease: "power4.out",
        }, "-=0.22")
        .from(".footer-contact-intro", {
          y: 18,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power3.out",
        }, "-=0.3")
        .from(".contact-form-field", {
          y: 28,
          autoAlpha: 0,
          duration: 0.54,
          stagger: 0.07,
          ease: "power3.out",
        }, "-=0.2")
        .from(".contact-form-actions", {
          y: 22,
          scale: 0.96,
          autoAlpha: 0,
          duration: 0.58,
          ease: "back.out(1.35)",
        }, "-=0.18")
        .from(".footer-directory > *", {
          y: 22,
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
        }, "-=0.28")
        .from(".footer-meta", {
          y: 18,
          autoAlpha: 0,
          duration: 0.48,
          ease: "power3.out",
        }, "-=0.22");

      gsap.to(".footer-hero", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      const desktop = window.matchMedia("(min-width: 800px)");
      if (desktop.matches && trackRef.current && workRef.current) {
        const introSidebar = workRef.current.querySelector(".work-sidebar--attached");
        const introNumber = workRef.current.querySelector(".project-card--intro .project-number");
        const lastProjectCard = workRef.current.querySelector(".project-card:last-child");
        const lastProjectMedia = lastProjectCard?.querySelector(".project-media");
        const lastProjectImage = lastProjectCard?.querySelector(".project-media img");
        const lastProjectWash = lastProjectCard?.querySelector(".project-transition-wash");
        const lastProjectChrome = lastProjectCard
          ? gsap.utils.toArray(
            ".project-number, .project-editorial, .project-tags, .project-copy, .project-link",
            lastProjectCard,
          )
          : [];
        const projectMedias = gsap.utils.toArray(".project-media", workRef.current);
        let mediaOffsets = [];
        let trackBaseLeft = 0;
        const getDistance = () =>
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 32);
        const getZoomDistance = () =>
          Math.min(1320, Math.max(900, window.innerHeight * 1.25));
        const getSidebarWidth = () => introSidebar?.offsetWidth || 0;
        const getLastCardScale = () =>
          Math.max(
            window.innerWidth / lastProjectCard.offsetWidth,
            window.innerHeight / lastProjectCard.offsetHeight,
          ) * 1.22;
        const getApproachPaper = () =>
          getComputedStyle(document.querySelector(".about-section")).backgroundColor;
        const getLastCardX = () => {
          const paddingLeft = parseFloat(getComputedStyle(workRef.current).paddingLeft);
          const finalLeft = paddingLeft + lastProjectCard.offsetLeft - getDistance();
          return window.innerWidth / 2 - (finalLeft + lastProjectCard.offsetWidth / 2);
        };
        const getLastCardY = () => {
          const paddingTop = parseFloat(getComputedStyle(workRef.current).paddingTop);
          const finalTop = paddingTop + lastProjectCard.offsetTop;
          return window.innerHeight / 2 - (finalTop + lastProjectCard.offsetHeight / 2);
        };
        measureProjectPositions = () => {
          const trackX = Number(gsap.getProperty(trackRef.current, "x")) || 0;
          trackBaseLeft = trackRef.current.getBoundingClientRect().left - trackX;
          mediaOffsets = projectMedias.map((media) => {
            let offset = 0;
            let node = media;
            while (node && node !== trackRef.current) {
              offset += node.offsetLeft;
              node = node.offsetParent;
            }
            return offset;
          });
        };
        const updateProjectDepth = (scrollProgress = 0) => {
          const fullSizeAt = Math.min(320, window.innerWidth * 0.22);
          const approachFrom = window.innerWidth * 0.94;
          const trackX = Number(gsap.getProperty(trackRef.current, "x")) || 0;
          const trackDistance = getDistance();
          const zoomStart =
            trackDistance / Math.max(1, trackDistance + getZoomDistance());
          const finalCardDepth = gsap.utils.clamp(
            0,
            1,
            (scrollProgress - (zoomStart - 0.06)) / 0.06,
          );

          projectMedias.forEach((media, index) => {
            if (index === 0) return;
            const left = trackBaseLeft + mediaOffsets[index] + trackX;
            const progress = gsap.utils.clamp(
              0,
              1,
              (approachFrom - left) / Math.max(1, approachFrom - fullSizeAt),
            );
            const eased = progress * progress * (3 - 2 * progress);
            const depthScale =
              media === lastProjectMedia
                ? Math.max(0.76 + eased * 0.24, 0.76 + finalCardDepth * 0.24)
                : 0.76 + eased * 0.24;
            const depthOpacity =
              media === lastProjectMedia
                ? Math.max(0.62 + eased * 0.38, 0.62 + finalCardDepth * 0.38)
                : 0.62 + eased * 0.38;

            media.style.setProperty("--depth-scale", String(depthScale));
            media.style.opacity = String(depthOpacity);
          });
        };

        projectMedias.slice(1).forEach((media) => {
          media.style.setProperty("--depth-scale", "0.76");
          media.style.opacity = "0.62";
          media.style.transformOrigin = "left center";
        });
        measureProjectPositions();
        ScrollTrigger.addEventListener("refreshInit", measureProjectPositions);

        const tween = gsap.timeline({
          scrollTrigger: {
            id: "projectsTrack",
            trigger: workRef.current,
            start: "top top",
            end: () => `+=${getDistance() + getZoomDistance()}`,
            pin: true,
            scrub: 0.42,
            refreshPriority: 2,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              updateProjectDepth(self.progress);
              const focusLine = Math.min(window.innerWidth * 0.5, 720);
              const trackX = Number(gsap.getProperty(trackRef.current, "x")) || 0;
              const next = mediaOffsets.reduce(
                (active, offset, index) =>
                  trackBaseLeft + offset + trackX <= focusLine ? index : active,
                0,
              );
              updateProjectIndex(next);
            },
          },
        });
        updateProjectDepth(0);
        tween
          .to(
            trackRef.current,
            {
              x: () => -getDistance(),
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(
            introSidebar,
            {
              x: () => getSidebarWidth(),
              duration: 0.12,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            introNumber,
            {
              autoAlpha: 0,
              y: -8,
              duration: 0.09,
              ease: "power2.out",
            },
            0.02,
          )
          .to(
            lastProjectCard,
            {
              x: getLastCardX,
              y: getLastCardY,
              scale: getLastCardScale,
              rotate: 0,
              zIndex: 20,
              transformOrigin: "center center",
              duration: () => getZoomDistance() / Math.max(1, getDistance()),
              ease: "power2.inOut",
            },
            1,
          )
          .to(
            lastProjectMedia,
            {
              borderRadius: 0,
              duration: () => getZoomDistance() / Math.max(1, getDistance()),
              ease: "power2.inOut",
            },
            1,
          )
          .to(
            lastProjectImage,
            {
              scale: 1.12,
              filter: "blur(20px)",
              autoAlpha: 0.38,
              transformOrigin: "center center",
              duration: () => getZoomDistance() / Math.max(1, getDistance()),
              ease: "power2.inOut",
            },
            1,
          )
          .to(
            lastProjectWash,
            {
              backgroundColor: getApproachPaper,
              opacity: 1,
              duration: () => getZoomDistance() / Math.max(1, getDistance()),
              ease: "sine.inOut",
            },
            1,
          )
          .to(
            lastProjectChrome,
            {
              autoAlpha: 0,
              duration: 0.13,
              stagger: 0.012,
              ease: "power2.out",
            },
            1.035,
          );
        workScrollRef.current = tween.scrollTrigger;
      } else if (trackRef.current && workRef.current) {
        const projectViewport = workRef.current.querySelector(".project-viewport");
        const getMobileProjectDistance = () =>
          Math.max(0, trackRef.current.scrollWidth - projectViewport.clientWidth);

        const mobileProjectTween = gsap.to(trackRef.current, {
          x: () => -getMobileProjectDistance(),
          ease: "none",
          scrollTrigger: {
            id: "projectsTrackMobile",
            trigger: workRef.current,
            start: "top top",
            end: () => `+=${getMobileProjectDistance()}`,
            pin: true,
            scrub: 0.48,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              updateProjectIndex(
                Math.min(
                  projects.length - 1,
                  Math.round(self.progress * (projects.length - 1)),
                ),
              );
            },
          },
        });
        workScrollRef.current = mobileProjectTween.scrollTrigger;
      }
    }, rootRef);

    return () => {
      workScrollRef.current = null;
      if (syncProcessPaths) {
        ScrollTrigger.removeEventListener("refreshInit", syncProcessPaths);
      }
      if (measureProjectPositions) {
        ScrollTrigger.removeEventListener("refreshInit", measureProjectPositions);
      }
      document.body.classList.remove("hero-intro-running");
      ctx.revert();
    };
  }, []);

  const submitDemoContact = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div ref={rootRef}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <a
        className="floating-whatsapp"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp to start an SJM Electrical enquiry"
      >
        <WhatsappLogo weight="fill" aria-hidden="true" />
        <span>WhatsApp</span>
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
                className="hero-portrait__team"
                src={`${A}/hero-team-floating.webp`}
                alt="Five SJM Electrical team members wearing hard hats and high-visibility workwear"
                width="1536"
                height="1024"
                decoding="async"
                fetchPriority="high"
              />
            </figure>

            <div className="hero-stats hero-cell">
              <div className="hero-stat hero-stat--projects">
                <strong>200+</strong>
                <span>Projects Delivered</span>
              </div>
              <div className="hero-stat hero-stat--years">
                <strong>15+</strong>
                <span>Years of experience</span>
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
                  updateProjectIndex(
                    Math.min(
                      projects.length - 1,
                      Math.round((track.scrollLeft / distance) * (projects.length - 1)),
                    ),
                  );
                }}
              >
                {projects.map((project, index) => (
                  <article
                    className={[
                      "project-card",
                      index === 0 ? "project-card--intro" : "",
                      index === projectIndex ? "is-current" : "",
                      index < projectIndex ? "is-past" : "",
                    ].filter(Boolean).join(" ")}
                    key={project.name}
                    data-project={index}
                  >
                    {index === 0 && (
                      <aside className="work-sidebar work-sidebar--attached">
                        <p className="section-tag">Concept projects</p>
                        <h2 className="section-heading">
                          <span className="line-mask"><span className="line-inner">Details that</span></span>
                          <span className="line-mask"><span className="line-inner">feel finished.</span></span>
                        </h2>
                        <p>
                          Four illustrative project directions showing how SJM Electrical could
                          present residential, commercial, EV, and electrical safety work.
                        </p>
                      </aside>
                    )}
                    <div className="project-media">
                      <img
                        src={project.image}
                        alt={`${project.name} — illustrative SJM Electrical portfolio concept`}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        width={project.width}
                        height={project.height}
                        style={{ objectPosition: project.objectPosition || "center" }}
                      />
                      <div className="project-scrim" />
                      {index === projects.length - 1 && (
                        <div className="project-transition-wash" aria-hidden="true" />
                      )}
                      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                      {index > 0 && (
                        <div
                          className={`project-editorial${
                            project.editorialTone === "dark" ? " project-editorial--dark" : ""
                          }`}
                        >
                          <h3>{project.editorialTitle}</h3>
                          <p>{project.editorialSubtitle}</p>
                        </div>
                      )}
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
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="approach-sticky">
            <div className="approach-title-stage">
              <h2 className="approach-words" aria-label="Clear from the start">
                {["CLEAR", "FROM", "THE", "START"].map((word) => (
                  <span className="approach-word" key={word}>{word}</span>
                ))}
              </h2>
              <div className="approach-title-guide" aria-hidden="true">
                {["CLEAR", "FROM", "THE", "START"].map((word) => <span key={word}>{word}</span>)}
              </div>
            </div>

            <div className="approach-content">
              <div className="approach-image-stack" aria-label="A selection of SJM Electrical portfolio work">
                {approachImages.map((image, index) => (
                  <figure className="approach-image-slot" key={`${image.src}-${index}`}>
                    <div className={`approach-image-card${image.team ? " approach-image-card--team" : ""}`}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        width={image.width || (image.src.includes("hero-electrician") ? 1024 : 1536)}
                        height={image.height || (image.src.includes("hero-electrician") ? 1536 : 1024)}
                      />
                    </div>
                  </figure>
                ))}
              </div>

              <div className="process-flow" aria-label="SJM Electrical concept project journey">
                <svg
                  className="process-lines"
                  aria-hidden="true"
                >
                  <path className="process-line" />
                  <path className="process-line" />
                  <path className="process-line" />
                  <path className="process-line" />
                </svg>

                {approachSteps.map(([number, title, copy], index) => (
                  <article className={`process-node process-node--${index + 1}`} key={number}>
                    <i className="process-node-dot" aria-hidden="true" />
                    <span>{number}</span>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <div className="services-sticky">
            <div className="services-next-reveal" aria-hidden="true" />
            <div className="services-scene">
              <div className="services-title-stage">
                <h2 className="services-words" aria-label="Useful expertise. Neatly delivered.">
                  {["USEFUL", "EXPERTISE", "NEATLY", "DELIVERED"].map((word) => (
                    <span className="services-word" key={word}>{word}</span>
                  ))}
                </h2>
                <div className="services-title-guide" aria-hidden="true">
                  {["USEFUL", "EXPERTISE", "NEATLY", "DELIVERED"].map((word) => (
                    <span key={word}>{word}</span>
                  ))}
                </div>
              </div>

              <div className="services-content">
                <p className="services-summary">
                  A focused range of electrical services for homes and smaller commercial spaces.
                </p>

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

                <div className="services-cta">
                  <ArrowLink href="#contact" inverse>Discuss your project</ArrowLink>
                </div>

                <div className="services-contact-row" aria-label="Contact options">
                  <a
                    className="service-contact-pill service-contact-pill--email"
                    href={`mailto:${DEMO_EMAIL}`}
                  >
                    <span className="service-contact-pill__icon" aria-hidden="true">
                      <EnvelopeSimple weight="bold" />
                    </span>
                    <span className="service-contact-pill__copy">
                      <small>Email</small>
                      <strong>Send an email</strong>
                    </span>
                    <ArrowUpRight className="service-contact-pill__arrow" weight="bold" aria-hidden="true" />
                  </a>

                  <a
                    className="service-contact-pill service-contact-pill--call"
                    href={`tel:${DEMO_PHONE_LINK}`}
                    aria-label={`Call SJM Electrical on ${DEMO_PHONE_DISPLAY}`}
                  >
                    <span className="service-contact-pill__icon" aria-hidden="true">
                      <Phone weight="fill" />
                    </span>
                    <span className="service-contact-pill__copy">
                      <small>Call</small>
                      <strong>{DEMO_PHONE_DISPLAY}</strong>
                    </span>
                    <ArrowUpRight className="service-contact-pill__arrow" weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="clients-section" id="clients">
          <div className="clients-sticky">
            <div className="clients-heading">
              <h2 className="principles-title" aria-label="Work should feel like.">
                <span className="principles-line principles-work-line">
                  <span className="principles-work">
                    WORK
                    <span className="principles-work-underline" aria-hidden="true" />
                  </span>
                </span>
                <span className="principles-line"><span>should feel like.</span></span>
              </h2>
              <p className="principles-summary">
                Principles for the experience — not customer reviews or third-party endorsements.
              </p>
            </div>

            <div className="testimonials">
              <div className="testimonials-track">
                {testimonials.map((testimonial, index) => (
                  <article className="testimonial-card" key={testimonial.company}>
                    <span className="testimonial-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="quote-mark">“</span>
                    <blockquote>{testimonial.quote}</blockquote>
                    <div>
                      <img src={`${A}/logo-icon.svg`} alt="" width="42" height="42" />
                      <p><strong>{testimonial.company}</strong><span>{testimonial.person}</span></p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="footer-hero">
          <div className="footer-brand">
            <p className="footer-kicker">Installations &amp; maintenance</p>
            <h2>
              <span className="footer-heading-line"><span>Ready to make your</span></span>
              <span className="footer-heading-line"><span>next project clear?</span></span>
            </h2>
            <p className="footer-contact-intro">
              Tell us what you need. We’ll make the next step straightforward.
            </p>
          </div>

          <form
            className="footer-contact-form"
            onSubmit={submitDemoContact}
            onChange={() => formSubmitted && setFormSubmitted(false)}
          >
            <div className="contact-form-grid">
              <label className="contact-form-field">
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
              </label>
              <label className="contact-form-field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="contact-form-field">
                <span>Phone number</span>
                <input type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" />
              </label>
              <label className="contact-form-field contact-form-field--message">
                <span>What do you need help with?</span>
                <textarea
                  name="project"
                  rows="2"
                  placeholder="Tell us a little about the work"
                  required
                />
              </label>
            </div>

            <div className="contact-form-actions">
              <p aria-live="polite">
                {formSubmitted
                  ? "Demo enquiry complete — no details were transmitted."
                  : "Portfolio demo — this form does not transmit personal data."}
              </p>
              <button type="submit" className={formSubmitted ? "is-complete" : ""}>
                <span>{formSubmitted ? "Enquiry ready" : "Submit enquiry"}</span>
                {formSubmitted ? <Check weight="bold" /> : <PaperPlaneTilt weight="bold" />}
              </button>
            </div>
          </form>
        </div>

        <div className="footer-underlay">
          <div className="footer-brandmark">
            <img
              src={`${A}/logo-horizontal.svg`}
              alt="SJM Electrical"
              width="1208"
              height="165"
              decoding="async"
            />
          </div>

          <div className="footer-directory">
            <nav className="footer-column" aria-label="Footer navigation">
              <span>Explore</span>
              <a href="#home">Home</a>
              <a href="#projects">Projects</a>
              <a href="#about">Approach</a>
              <a href="#services">Services</a>
              <a href="#clients">Principles</a>
            </nav>
            <div className="footer-column">
              <span>Contact</span>
              <a href={`mailto:${DEMO_EMAIL}`}>{DEMO_EMAIL}</a>
              <a href={`tel:${DEMO_PHONE_LINK}`}>{DEMO_PHONE_DISPLAY}</a>
              <p>Service area to be confirmed</p>
              <p>Domestic · Commercial · EV</p>
            </div>
            <div className="footer-column footer-column--disclosure" id="portfolio-disclosure">
              <span>Portfolio concept</span>
              <p>
                Portfolio concept by Novas Agency. Projects, service principles, photography, and
                contact details are illustrative and are not customer testimonials, accreditations,
                or evidence of completed work. No enquiry is submitted from this demo.
              </p>
            </div>
          </div>

          <div className="footer-meta">
            <span>© {new Date().getFullYear()} SJM Electrical concept</span>
            <a
              className="footer-credit"
              href="https://novasagency.com"
              target="_blank"
              rel="noreferrer"
            >
              Website made by <strong>Novas Agency</strong>
            </a>
            <span>Installations &amp; maintenance · Planned with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
