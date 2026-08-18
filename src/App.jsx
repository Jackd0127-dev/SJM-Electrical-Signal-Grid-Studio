import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { initialiseBoundedScroll, scrollToBounded } from "./useBoundedScroll.js";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Buildings,
  Car,
  Check,
  HandGrabbing,
  House,
  List,
  PaperPlaneTilt,
  ShieldCheck,
  Sparkle,
  WhatsappLogo,
  Wrench,
  X,
} from "@phosphor-icons/react";

const A = "./assets/sjm";
const DEMO_EMAIL = "hello@sjm-electrical.example";
const DEMO_PHONE_DISPLAY = "01632 960 123";
const DEMO_PHONE_LINK = "+441632960123";
const WHATSAPP_URL =
  "https://wa.me/?text=Hello%20SJM%20Electrical%2C%20I%27d%20like%20to%20discuss%20a%20project.";

const navItems = [
  ["01", "Home", "home"],
  ["02", "Projects", "projects"],
  ["03", "Approach", "about"],
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

const servicesStatement =
  "Careful planning, precise installation, and clear communication combined — turning your electrical plans into safe, considered work that feels effortless.";
const servicesStatementWords = servicesStatement.split(" ");

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
  const cinematicNavigationRef = useRef(new Map());
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const mobileLayoutRef = useRef(window.matchMedia("(max-width: 620px)").matches);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    const landing = cinematicNavigationRef.current.get(id)?.();
    if (landing) {
      scrollToBounded(landing.top, landing.release);
      return;
    }

    scrollToBounded(element.getBoundingClientRect().top + window.scrollY);
  };

  useEffect(() => {
    const sources = projects.map((project) => project.image);
    const uniqueSources = [...new Set(sources)];
    let cancelled = false;

    const decodeImages = () => {
      if (cancelled) return;
      uniqueSources.forEach((source) => {
        const image = new Image();
        image.decoding = "async";
        image.src = source;
        image.decode?.().catch(() => undefined);
      });
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(decodeImages, { timeout: 1200 })
      : window.setTimeout(decodeImages, 250);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  const updateProjectIndex = (next) => {
    if (projectIndexRef.current === next) return;
    projectIndexRef.current = next;
    rootRef.current?.querySelectorAll(".project-card").forEach((card, index) => {
      card.classList.toggle("is-current", index === next);
      card.classList.toggle("is-past", index < next);
    });
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
        if (!visible) return;
        rootRef.current?.querySelectorAll(".desktop-nav button").forEach((button) => {
          button.classList.toggle(
            "is-active",
            button.dataset.section === visible.target.id,
          );
        });
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = rootRef.current?.querySelector(".approach-background-video");
    const section = rootRef.current?.querySelector(".about-section");
    if (!video || !section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileLayout = window.matchMedia("(max-width: 620px)");
    let sectionIsNear = false;

    const syncPlayback = () => {
      const shouldPlay =
        sectionIsNear &&
        !document.hidden &&
        !reducedMotion.matches &&
        !mobileLayout.matches;
      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionIsNear = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    reducedMotion.addEventListener("change", syncPlayback);
    mobileLayout.addEventListener("change", syncPlayback);

    return () => {
      video.pause();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      mobileLayout.removeEventListener("change", syncPlayback);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobilePerformanceMode = window.matchMedia("(max-width: 620px)").matches;
    if (reduceMotion || mobilePerformanceMode) return undefined;

    let cancelled = false;
    let ctx;
    let ScrollTrigger;
    let syncProcessPaths;
    let syncMorphTargets;
    let measurePrinciplesLayout;
    let measureProjectPositions;
    let destroyBoundedScroll;
    const cinematicControllers = [];

    const initialiseDesktopAnimations = async () => {
      const [{ default: gsap }, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.config({
        ignoreMobileResize: true,
        limitCallbacks: true,
      });
      destroyBoundedScroll = await initialiseBoundedScroll({
        gsap,
        ScrollTrigger,
      });
      if (cancelled) {
        destroyBoundedScroll?.();
        return;
      }
      document.body.classList.add("hero-intro-running");

      ctx = gsap.context(() => {
      const createCinematicScrollDriver = (
        timeline,
        scrollTriggerConfig,
        maxProgressPerSecond = 0.36,
      ) => {
        const state = {
          active: false,
          current: 0,
          target: 0,
          navigationProgress: null,
        };
        const configuredUpdate = scrollTriggerConfig.onUpdate;
        timeline.pause(0);

        const tick = (_time, deltaTime) => {
          const distance = state.target - state.current;
          const isBoundary = state.target === 0 || state.target === 1;
          if (!state.active && state.navigationProgress === null && isBoundary) {
            if (Math.abs(distance) >= 0.0001) {
              state.current = state.target;
              timeline.progress(state.current);
            }
            return;
          }
          if (Math.abs(distance) < 0.0001) {
            if (state.current !== state.target) {
              state.current = state.target;
              timeline.progress(state.current);
            }
            return;
          }

          const frameSeconds = Math.min(deltaTime, 50) / 1000;
          const maximumStep = maxProgressPerSecond * frameSeconds;
          state.current += gsap.utils.clamp(-maximumStep, maximumStep, distance);
          timeline.progress(state.current);
        };

        gsap.ticker.add(tick);
        const scrollTrigger = ScrollTrigger.create({
          ...scrollTriggerConfig,
          scrub: false,
          onUpdate: (self) => {
            if (state.navigationProgress === null) {
              state.target = self.progress;
              state.active = self.isActive;
            }
            configuredUpdate?.(self);
          },
        });

        const controller = {
          navigationLanding: (progress) => {
            const landingProgress = gsap.utils.clamp(0, 1, progress);
            state.navigationProgress = landingProgress;
            state.current = landingProgress;
            state.target = landingProgress;
            timeline.progress(landingProgress);

            return {
              top:
                scrollTrigger.start +
                (scrollTrigger.end - scrollTrigger.start) * landingProgress,
              release: () => {
                state.navigationProgress = null;
                state.current = landingProgress;
                state.target = scrollTrigger.progress;
                state.active = scrollTrigger.isActive;
                timeline.progress(landingProgress);
              },
            };
          },
          kill: () => {
            gsap.ticker.remove(tick);
            scrollTrigger.kill();
          },
        };
        cinematicControllers.push(controller);
        return controller;
      };

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
          scrub: true,
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

      const getOffsetWithin = (element, ancestor) => {
        let x = 0;
        let y = 0;
        let node = element;
        while (node && node !== ancestor) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent;
        }
        return { x, y, width: element.offsetWidth };
      };
      const measureWordTargets = (words, guides, stage) =>
        words.map((word, index) => {
          const source = getOffsetWithin(word, stage);
          const target = getOffsetWithin(guides[index], stage);
          return {
            x: target.x - source.x,
            y: target.y - source.y,
            scale: target.width / Math.max(1, source.width),
          };
        });

      const approachWords = gsap.utils.toArray(".approach-word");
      const approachGuides = gsap.utils.toArray(".approach-title-guide span");
      const approachTitleStage = document.querySelector(".approach-title-stage");
      const approachVideoStage = document.querySelector(".approach-video-stage");
      const processNodes = gsap.utils.toArray(".process-node");
      const processLines = gsap.utils.toArray(".process-line");
      const processSvg = document.querySelector(".process-lines");
      let approachMorphTargets = measureWordTargets(
        approachWords,
        approachGuides,
        approachTitleStage,
      );
      syncProcessPaths = () => {
        const svgRect = processSvg.getBoundingClientRect();
        const dots = processNodes.map((node) =>
          node.querySelector(".process-node-dot").getBoundingClientRect(),
        );
        const previousProgress = processLines.map((line) => {
          const styles = getComputedStyle(line);
          const dash = Number.parseFloat(styles.strokeDasharray);
          const offset = Number.parseFloat(styles.strokeDashoffset);
          return Number.isFinite(dash) && dash > 0 && Number.isFinite(offset)
            ? gsap.utils.clamp(0, 1, 1 - offset / dash)
            : 0;
        });
        const points = dots.map((dot) => ({
          x: dot.left + dot.width / 2 - svgRect.left,
          y: dot.top + dot.height / 2 - svgRect.top,
        }));

        processLines.forEach((line, index) => {
          const start = points[index];
          const end = points[index + 1];
          const distance = end.x - start.x;
          const control = distance * 0.38;
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
        });
        const lengths = processLines.map((line) => line.getTotalLength());
        processLines.forEach((line, index) => {
          const length = lengths[index];
          line.style.strokeDasharray = `${length} ${length}`;
          line.style.strokeDashoffset = `${length * (1 - previousProgress[index])}`;
        });
      };
      syncProcessPaths();
      ScrollTrigger.addEventListener("refreshInit", syncProcessPaths);
      gsap.set(".approach-content", { y: 44, autoAlpha: 0 });
      gsap.set(approachVideoStage, { scale: 1.035, autoAlpha: 0 });
      gsap.set(approachWords, {
        y: 54,
        scale: 0.82,
        rotate: (index) => (index % 2 === 0 ? -3 : 3),
        opacity: 0,
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

      const approachTl = gsap.timeline({ paused: true });
      const approachController = createCinematicScrollDriver(
        approachTl,
        {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom bottom",
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
        0.16,
      );

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
          x: (index) => approachMorphTargets[index].x,
          y: (index) => approachMorphTargets[index].y,
          scale: (index) => approachMorphTargets[index].scale,
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
        .to(approachVideoStage, {
          scale: 1,
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.out",
        }, "-=0.7")
        .to(approachWords, {
          color: "#ffffff",
          duration: 0.65,
          ease: "power2.out",
        }, "<+0.14")
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
      approachTl.addLabel("navigationComplete");
      cinematicNavigationRef.current.set("about", () =>
        approachController.navigationLanding(
          approachTl.labels.navigationComplete / approachTl.duration(),
        ));

      const serviceWords = gsap.utils.toArray(".services-word");
      const serviceGuides = gsap.utils.toArray(".services-title-guide span");
      const servicesTitleStage = document.querySelector(".services-title-stage");
      const serviceCards = gsap.utils.toArray(".service-card");
      const serviceStatementChars = gsap.utils.toArray(".services-statement-char");
      let serviceMorphTargets = measureWordTargets(
        serviceWords,
        serviceGuides,
        servicesTitleStage,
      );
      syncMorphTargets = () => {
        approachMorphTargets = measureWordTargets(
          approachWords,
          approachGuides,
          approachTitleStage,
        );
        serviceMorphTargets = measureWordTargets(
          serviceWords,
          serviceGuides,
          servicesTitleStage,
        );
      };
      ScrollTrigger.addEventListener("refreshInit", syncMorphTargets);
      gsap.set(serviceWords, {
        y: 58,
        scale: 0.84,
        rotate: (index) => (index % 2 === 0 ? -3 : 3),
        autoAlpha: 0,
      });
      gsap.set(".services-summary", { y: 20, autoAlpha: 0 });
      gsap.set(serviceCards, { y: 58, scale: 0.95, autoAlpha: 0 });
      gsap.set(serviceStatementChars, {
        color: "#c9c2b8",
        filter: "blur(0px)",
        opacity: 0.1,
        y: 5,
      });

      const servicesTl = gsap.timeline({ paused: true });
      const servicesController = createCinematicScrollDriver(
        servicesTl,
        {
          trigger: ".services-section",
          start: "top bottom",
          end: "bottom bottom",
          refreshPriority: -2,
          invalidateOnRefresh: true,
        },
        0.14,
      );

      servicesTl
        .to(serviceWords, {
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.15,
          stagger: 0.22,
          ease: "expo.out",
        })
        .to({}, { duration: 0.45 })
        .to(serviceWords, {
          x: (index) => serviceMorphTargets[index].x,
          y: (index) => serviceMorphTargets[index].y,
          scale: (index) => serviceMorphTargets[index].scale,
          duration: 1.8,
          stagger: 0.07,
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
        .to(serviceStatementChars, {
          color: "#ffffff",
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          force3D: true,
          duration: 0.5,
          stagger: 0.025,
          ease: "power1.out",
        }, "+=0.08")
        .addLabel("navigationComplete")
        .to({}, { duration: 0.3 })
        .to(".services-scene", {
          xPercent: -108,
          yPercent: -108,
          scale: 0.92,
          rotate: -3,
          borderBottomRightRadius: 64,
          autoAlpha: 0.04,
          duration: 6.8,
          ease: "power3.inOut",
        });
      cinematicNavigationRef.current.set("services", () =>
        servicesController.navigationLanding(
          servicesTl.labels.navigationComplete / servicesTl.duration(),
        ));

      const principleLines = gsap.utils.toArray(".principles-line > span");
      const testimonialsTrack = document.querySelector(".testimonials-track");
      const testimonialsViewport = document.querySelector(".testimonials");
      const lastPrincipleCard = document.querySelector(".testimonial-card:last-child");
      const principlesTakeover = document.querySelector(".principles-takeover");
      const principlesTakeoverContent = gsap.utils.toArray(
        ".testimonial-index, .quote-mark, blockquote, .principles-takeover > div",
        principlesTakeover,
      );
      let testimonialsDistance = 0;
      let principleTakeoverState = {
        finalLeft: 0,
        finalTop: 0,
        width: 1,
        height: 1,
        targetX: 0,
        targetY: 0,
        scale: 1,
      };
      measurePrinciplesLayout = () => {
        testimonialsDistance = Math.max(
          0,
          testimonialsTrack.scrollWidth - window.innerWidth + 48,
        );
        const finalLeft =
          testimonialsViewport.offsetLeft +
          lastPrincipleCard.offsetLeft -
          testimonialsDistance;
        const finalTop = testimonialsViewport.offsetTop + lastPrincipleCard.offsetTop;
        const width = lastPrincipleCard.offsetWidth;
        const height = lastPrincipleCard.offsetHeight;
        const scale = Math.max(
          window.innerWidth / width,
          window.innerHeight / height,
        ) * 1.06;
        principleTakeoverState = {
          finalLeft,
          finalTop,
          width,
          height,
          targetX: window.innerWidth / 2 - width / 2,
          targetY: window.innerHeight / 2 - height / 2,
          scale,
        };
      };
      measurePrinciplesLayout();
      ScrollTrigger.addEventListener("refreshInit", measurePrinciplesLayout);
      gsap.set(principleLines, {
        y: 28,
        autoAlpha: 0,
        force3D: true,
      });
      gsap.set(".principles-work-underline", { scaleX: 0 });
      gsap.set(".principles-summary", { y: 18, autoAlpha: 0 });
      gsap.set(testimonialsTrack, {
        x: 0,
        y: 30,
        autoAlpha: 0,
        force3D: true,
      });
      gsap.set(principlesTakeover, {
        autoAlpha: 0,
        transformOrigin: "center center",
        force3D: true,
      });

      const principlesTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".clients-section",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
          refreshPriority: -3,
          invalidateOnRefresh: true,
        },
      });

      principlesTl
        .addLabel("principlesIn")
        .to(principleLines, {
          y: 0,
          autoAlpha: 1,
          duration: 0.56,
          stagger: 0.08,
          ease: "power4.out",
        }, "principlesIn")
        .to(".principles-work-underline", {
          scaleX: 1,
          duration: 0.46,
          ease: "power3.out",
        }, "principlesIn+=0.16")
        .to(".principles-summary", {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: "power3.out",
        }, "principlesIn+=0.2")
        .to(testimonialsTrack, {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          ease: "power3.out",
        }, "principlesIn+=0.12")
        .addLabel("navigationComplete", "principlesIn+=0.76")
        .to(testimonialsTrack, {
          x: () => -testimonialsDistance,
          duration: 4.4,
          force3D: true,
          ease: "none",
        }, "+=0.04")
        .to(".clients-heading", {
          y: -18,
          autoAlpha: 0,
          duration: 0.46,
          ease: "power2.inOut",
        }, "-=0.36")
        .set(principlesTakeover, {
          autoAlpha: 1,
          x: () => principleTakeoverState.finalLeft,
          y: () => principleTakeoverState.finalTop,
          width: () => principleTakeoverState.width,
          height: () => principleTakeoverState.height,
          scale: 1,
          borderRadius: 18,
        })
        .to(principlesTakeover, {
          x: () => principleTakeoverState.targetX,
          y: () => principleTakeoverState.targetY,
          scale: () => principleTakeoverState.scale,
          borderRadius: 0,
          duration: 1.72,
          force3D: true,
          ease: "power4.inOut",
        }, "+=0.02")
        .to(principlesTakeoverContent, {
          autoAlpha: 0,
          duration: 0.48,
          stagger: 0.016,
          ease: "power2.inOut",
        }, "<+0.2")
        .to(testimonialsTrack, {
          autoAlpha: 0,
          duration: 0.72,
          ease: "power2.inOut",
        }, "<+0.5");
      cinematicNavigationRef.current.set("clients", () => {
        const landingProgress =
          principlesTl.labels.navigationComplete / principlesTl.duration();
        const principlesScrollTrigger = principlesTl.scrollTrigger;

        return {
          top:
            principlesScrollTrigger.start +
            (principlesScrollTrigger.end - principlesScrollTrigger.start) *
              landingProgress,
          release: () => {
            principlesScrollTrigger.update();
            principlesScrollTrigger.getTween()?.progress(1);
            principlesTl.progress(landingProgress);
          },
        };
      });

      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      footerTl
        .addLabel("footerIn")
        .from(".footer-kicker", {
          y: 24,
          autoAlpha: 0,
          duration: 0.46,
          ease: "power3.out",
        }, "footerIn")
        .from(".footer-heading-line > span", {
          yPercent: 120,
          rotate: 2,
          autoAlpha: 0,
          transformOrigin: "center bottom",
          duration: 0.68,
          stagger: 0.08,
          ease: "power4.out",
        }, "footerIn+=0.04")
        .from(".footer-contact-intro", {
          y: 18,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.out",
        }, "footerIn+=0.1")
        .from(".contact-form-field", {
          y: 20,
          autoAlpha: 0,
          duration: 0.42,
          stagger: 0.045,
          ease: "power3.out",
        }, "footerIn+=0.12")
        .from(".contact-form-actions", {
          y: 16,
          scale: 0.98,
          autoAlpha: 0,
          duration: 0.44,
          ease: "power3.out",
        }, "footerIn+=0.2")
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
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const desktop = window.matchMedia("(min-width: 800px)");
      if (desktop.matches && trackRef.current && workRef.current) {
        const introSidebar = workRef.current.querySelector(".work-sidebar--attached");
        const introNumber = workRef.current.querySelector(".project-card--intro .project-number");
        const projectMedias = gsap.utils.toArray(".project-media", workRef.current);
        let mediaOffsets = [];
        let trackBaseLeft = 0;
        let projectMetrics = {
          distance: 0,
          sidebarWidth: 0,
          fullSizeAt: 0,
          approachFrom: 0,
          focusLine: 0,
        };
        const previousDepth = projectMedias.map(() => ({
          scale: Number.NaN,
          opacity: Number.NaN,
        }));
        const setProjectOpacity = projectMedias.map((media) =>
          gsap.quickSetter(media, "opacity"),
        );
        measureProjectPositions = () => {
          const distance = Math.max(
            0,
            trackRef.current.scrollWidth - window.innerWidth + 32,
          );
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
          projectMetrics = {
            distance,
            sidebarWidth: introSidebar?.offsetWidth || 0,
            fullSizeAt: Math.min(320, window.innerWidth * 0.22),
            approachFrom: window.innerWidth * 0.94,
            focusLine: Math.min(window.innerWidth * 0.5, 720),
          };
        };
        const updateProjectDepth = (trackPhase = 0) => {
          const trackX = -projectMetrics.distance * trackPhase;

          projectMedias.forEach((media, index) => {
            if (index === 0) return;
            const left = trackBaseLeft + mediaOffsets[index] + trackX;
            const progress = gsap.utils.clamp(
              0,
              1,
              (projectMetrics.approachFrom - left) /
                Math.max(1, projectMetrics.approachFrom - projectMetrics.fullSizeAt),
            );
            const eased = progress * progress * (3 - 2 * progress);
            const depthScale = 0.76 + eased * 0.24;
            const depthOpacity = 0.62 + eased * 0.38;

            if (
              !Number.isFinite(previousDepth[index].scale) ||
              Math.abs(previousDepth[index].scale - depthScale) > 0.0015
            ) {
              previousDepth[index].scale = depthScale;
              media.style.transform =
                `translate3d(0, 0, 0) scale(${depthScale})`;
            }
            if (
              !Number.isFinite(previousDepth[index].opacity) ||
              Math.abs(previousDepth[index].opacity - depthOpacity) > 0.0015
            ) {
              previousDepth[index].opacity = depthOpacity;
              setProjectOpacity[index](depthOpacity);
            }
          });
        };

        projectMedias.slice(1).forEach((media) => {
          const index = projectMedias.indexOf(media);
          media.style.transform = "translate3d(0, 0, 0) scale(0.76)";
          setProjectOpacity[index](0.62);
          media.style.transformOrigin = "left center";
        });
        measureProjectPositions();
        ScrollTrigger.addEventListener("refreshInit", measureProjectPositions);

        const tween = gsap.timeline({
          onUpdate: () => {
            const trackPhase = gsap.utils.clamp(0, 1, tween.time());
            updateProjectDepth(trackPhase);

            const trackX = -projectMetrics.distance * trackPhase;
            let next = 0;
            for (let index = 1; index < mediaOffsets.length; index += 1) {
              if (
                trackBaseLeft + mediaOffsets[index] + trackX <=
                projectMetrics.focusLine
              ) {
                next = index;
              }
            }
            updateProjectIndex(next);
          },
          scrollTrigger: {
            id: "projectsTrack",
            trigger: workRef.current,
            start: "top top",
            end: () => `+=${projectMetrics.distance}`,
            pin: true,
            scrub: 1,
            refreshPriority: 2,
            invalidateOnRefresh: true,
          },
        });
        updateProjectDepth(0);
        tween
          .to(
            trackRef.current,
            {
              x: () => -projectMetrics.distance,
              duration: 1,
              ease: "none",
            },
            0,
          )
          .to(
            introSidebar,
            {
              x: () => projectMetrics.sidebarWidth,
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
          );
        workScrollRef.current = tween.scrollTrigger;
      }
      }, rootRef);
    };

    void initialiseDesktopAnimations();

    return () => {
      cancelled = true;
      workScrollRef.current = null;
      cinematicNavigationRef.current.clear();
      cinematicControllers.forEach((controller) => controller.kill());
      if (ScrollTrigger && syncProcessPaths) {
        ScrollTrigger.removeEventListener("refreshInit", syncProcessPaths);
      }
      if (ScrollTrigger && syncMorphTargets) {
        ScrollTrigger.removeEventListener("refreshInit", syncMorphTargets);
      }
      if (ScrollTrigger && measurePrinciplesLayout) {
        ScrollTrigger.removeEventListener("refreshInit", measurePrinciplesLayout);
      }
      if (ScrollTrigger && measureProjectPositions) {
        ScrollTrigger.removeEventListener("refreshInit", measureProjectPositions);
      }
      document.body.classList.remove("hero-intro-running");
      destroyBoundedScroll?.();
      ctx?.revert();
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
              className={id === "home" ? "is-active" : ""}
              data-section={id}
              onClick={() => scrollToSection(id)}
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
                window.setTimeout(() => scrollToSection(id), 120);
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
                scrollToBounded(
                  drag.startScroll - (event.clientX - drag.startX) * 2.2,
                  undefined,
                  { immediate: true },
                );
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
                      index === 0 ? "is-current" : "",
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
                        className="project-image"
                        src={project.image}
                        alt={`${project.name} — illustrative SJM Electrical portfolio concept`}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        width={project.width}
                        height={project.height}
                        style={{ objectPosition: project.objectPosition || "center" }}
                      />
                      <div className="project-scrim" />
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
                <span className="drag-line__desktop">
                  <HandGrabbing weight="bold" /> Drag to explore concepts
                </span>
                <span className="drag-line__mobile">
                  <HandGrabbing weight="bold" /> Scroll to explore concepts
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="approach-sticky">
            <div className="approach-video-stage" aria-hidden="true">
              <img
                className="approach-background-poster"
                src={`${A}/approach-background-poster.webp`}
                alt=""
                width="1920"
                height="1080"
                loading="lazy"
                decoding="async"
              />
              {!mobileLayoutRef.current && (
                <video
                  className="approach-background-video"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={`${A}/approach-background-poster.webp`}
                >
                  <source src={`${A}/approach-background.mp4`} type="video/mp4" />
                </video>
              )}
              <div className="approach-video-scrim" />
            </div>

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

                <p className="services-statement" aria-label={servicesStatement}>
                  <span className="services-statement-visual" aria-hidden="true">
                    {servicesStatementWords.map((word, wordIndex) => (
                      <span className="services-statement-token" key={`${word}-${wordIndex}`}>
                        <span className="services-statement-word">
                          {[...word].map((character, characterIndex) => (
                            <span
                              className="services-statement-char"
                              key={`${character}-${characterIndex}`}
                            >
                              {character}
                            </span>
                          ))}
                        </span>
                        {wordIndex < servicesStatementWords.length - 1 && (
                          " "
                        )}
                      </span>
                    ))}
                  </span>
                </p>
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
            <div className="principles-takeover" aria-hidden="true">
              <span className="testimonial-index">05</span>
              <span className="quote-mark">“</span>
              <blockquote>{testimonials[testimonials.length - 1].quote}</blockquote>
              <div>
                <img src={`${A}/logo-icon.svg`} alt="" width="42" height="42" />
                <p>
                  <strong>{testimonials[testimonials.length - 1].company}</strong>
                  <span>{testimonials[testimonials.length - 1].person}</span>
                </p>
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
