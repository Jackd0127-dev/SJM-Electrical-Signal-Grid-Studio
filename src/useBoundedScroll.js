import { useEffect } from "react";

const MAX_SCROLL_SPEED = 2600;
const MAX_WHEEL_IMPULSE = 320;
const MAX_WHEEL_LEAD = 1.35;
const BASE_EASING = 0.2;

let activeScrollTo = null;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function scrollToBounded(top, onComplete) {
  if (activeScrollTo) {
    activeScrollTo(top, onComplete);
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top,
    behavior: reduceMotion ? "auto" : "smooth",
  });
  if (onComplete) {
    if (reduceMotion) {
      window.requestAnimationFrame(onComplete);
    } else {
      window.setTimeout(onComplete, 700);
    }
  }
}

export function useBoundedScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduceMotion.matches || !finePointer.matches) return undefined;

    let current = window.scrollY;
    let target = current;
    let frameId = 0;
    let lastFrame = 0;
    let completionCallback = null;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const releaseCompletion = () => {
      const callback = completionCallback;
      completionCallback = null;
      callback?.();
    };

    const finish = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrame = 0;
      current = window.scrollY;
      target = current;
      document.body.classList.remove("is-scroll-gliding");
      releaseCompletion();
    };

    const frame = (now) => {
      frameId = 0;
      const elapsed = clamp(lastFrame ? now - lastFrame : 16.667, 8, 34);
      lastFrame = now;
      target = clamp(target, 0, maxScroll());

      const distance = target - current;
      const easing = 1 - Math.pow(1 - BASE_EASING, elapsed / 16.667);
      const easedStep = distance * easing;
      const maximumStep = MAX_SCROLL_SPEED * (elapsed / 1000);
      const step = clamp(easedStep, -maximumStep, maximumStep);

      current = Math.abs(distance) < 0.6 ? target : current + step;
      window.scrollTo(0, current);

      if (Math.abs(target - current) > 0.6) {
        frameId = window.requestAnimationFrame(frame);
      } else {
        current = target;
        window.scrollTo(0, current);
        lastFrame = 0;
        document.body.classList.remove("is-scroll-gliding");
        releaseCompletion();
      }
    };

    const start = () => {
      if (frameId) return;
      document.body.classList.add("is-scroll-gliding");
      frameId = window.requestAnimationFrame(frame);
    };

    const scrollTo = (nextTop, onComplete) => {
      releaseCompletion();
      current = window.scrollY;
      target = clamp(nextTop, 0, maxScroll());
      completionCallback = onComplete || null;
      start();
    };

    activeScrollTo = scrollTo;

    const onWheel = (event) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        document.body.classList.contains("menu-is-open") ||
        document.body.classList.contains("hero-intro-running") ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();
      releaseCompletion();

      if (!frameId) {
        current = window.scrollY;
        target = current;
      }

      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      const impulse = clamp(
        event.deltaY * unit,
        -MAX_WHEEL_IMPULSE,
        MAX_WHEEL_IMPULSE,
      );
      const maximumLead = window.innerHeight * MAX_WHEEL_LEAD;

      target = clamp(
        target + impulse,
        Math.max(0, current - maximumLead),
        Math.min(maxScroll(), current + maximumLead),
      );
      start();
    };

    const onScroll = () => {
      if (frameId) return;
      current = window.scrollY;
      target = current;
    };

    const onAnchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target instanceof Element
        ? event.target.closest('a[href^="#"]')
        : null;
      if (!link || link.classList.contains("skip-link")) return;

      const id = link.getAttribute("href")?.slice(1);
      const destination = id ? document.getElementById(id) : null;
      if (!destination) return;

      event.preventDefault();
      window.history.replaceState(null, "", `#${id}`);
      scrollTo(destination.getBoundingClientRect().top + window.scrollY);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    window.addEventListener("blur", finish);
    document.addEventListener("click", onAnchorClick);

    return () => {
      finish();
      if (activeScrollTo === scrollTo) activeScrollTo = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("blur", finish);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);
}
