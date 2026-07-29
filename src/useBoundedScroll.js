const SCROLL_DURATION = 0.4;
const SCROLL_EASING = (progress) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * progress));

let activeController = null;

export function scrollToBounded(top, onComplete, options = {}) {
  if (activeController) {
    activeController.scrollTo(top, onComplete, options);
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top,
    behavior: reduceMotion || options.immediate ? "auto" : "smooth",
  });

  if (!onComplete) return;
  if (reduceMotion || options.immediate) {
    window.requestAnimationFrame(onComplete);
  } else {
    window.setTimeout(onComplete, 700);
  }
}

export async function initialiseBoundedScroll({ gsap, ScrollTrigger }) {
  if (activeController) return activeController.destroy;

  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({
    duration: SCROLL_DURATION,
    easing: SCROLL_EASING,
    lerp: 0.1,
    smoothWheel: true,
    autoRaf: false,
  });

  const updateScrollTrigger = () => ScrollTrigger.update();
  const tick = (time) => lenis.raf(time * 1000);
  const unsubscribeScroll = lenis.on("scroll", updateScrollTrigger);

  gsap.ticker.add(tick);

  const scrollTo = (top, onComplete, options = {}) => {
    lenis.scrollTo(top, {
      duration: SCROLL_DURATION,
      easing: SCROLL_EASING,
      immediate: Boolean(options.immediate),
      force: true,
      onComplete,
    });
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

  document.addEventListener("click", onAnchorClick);

  const destroy = () => {
    if (activeController?.destroy !== destroy) return;
    activeController = null;
    document.removeEventListener("click", onAnchorClick);
    unsubscribeScroll();
    gsap.ticker.remove(tick);
    lenis.destroy();
  };

  activeController = { destroy, scrollTo };
  return destroy;
}
