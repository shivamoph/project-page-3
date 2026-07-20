"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  X,
  ChevronDown,
  CreditCard,
  Heart,
  HelpCircle,
  Menu,
  Maximize2,
  Minus,
  PlayCircle,
  Plus,
  RefreshCcw,
  Rotate3D,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  UserRoundCheck,
} from "lucide-react";
import { formatPrice } from "./utils/formatPrice";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

const gallery = [
  {
    name: "Slate Mist",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=1100&q=85",
    thumb: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Indigo Core",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1100&q=85",
    thumb: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Emerald Halo",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=1100&q=85",
    thumb: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=240&q=80"
  },
  {
    name: "Studio White",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=1100&q=85",
    thumb: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=240&q=80"
  }
];

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='1100' viewBox='0 0 900 1100'%3E%3Crect width='900' height='1100' rx='48' fill='%23f8fafc'/%3E%3Crect x='260' y='170' width='380' height='760' rx='58' fill='%23ffffff' stroke='%23cbd5e1' stroke-width='18'/%3E%3Crect x='325' y='235' width='250' height='16' rx='8' fill='%23cbd5e1'/%3E%3Ccircle cx='450' cy='860' r='22' fill='%2310b981'/%3E%3Ctext x='450' y='1020' text-anchor='middle' font-family='Arial, sans-serif' font-size='42' font-weight='700' fill='%23475569'%3EProduct image%3C/text%3E%3C/svg%3E";

type GalleryImage = {
  image: string;
  name: string;
  thumb: string;
};

type Point = {
  x: number;
  y: number;
};

const zoomScale = 2.4;

function getZoomImage(src?: string) {
  return src ? src.replace("w=1100", "w=1800").replace("q=85", "q=95") : placeholderImage;
}

const features = [
  "Aerospace-grade slate aluminum shell",
  "Adaptive emerald status light",
  "18-hour fast-charge battery system",
  "Spatial microphone array with noise isolation",
  "Water resistant daily-carry build",
  "Companion app with privacy-first controls"
];

const specs = [
  ["Model", "AS-ONE-2026"],
  ["Material", "Anodized slate aluminum, ceramic glass"],
  ["Battery", "18 hours mixed use, 50% in 21 minutes"],
  ["Connectivity", "Bluetooth LE, Wi-Fi 7, USB-C"],
  ["Dimensions", "148 x 72 x 8.2 mm"],
  ["Weight", "182 g"],
  ["Warranty", "24 months limited international warranty"],
  ["Package", "Device, braided USB-C cable, care sleeve, quick guide"]
];

const faqs = [
  ["Does it include international warranty?", "Yes. AeroSlate One includes a 24-month limited warranty with official service coverage in supported regions."],
  ["Can I return it after opening?", "You can return it within 14 days if the device and accessories are undamaged and all packaging is included."],
  ["Is EMI available?", "Yes. EMI options are available through eligible bank cards and wallet partners at checkout."]
];

const reviews = [
  ["Riya M.", "Beautifully made and genuinely fast. The finish feels more premium than anything I have used this year.", "5.0"],
  ["Arjun K.", "The delivery, packaging and setup felt polished. Battery life is strong enough for travel days.", "4.8"],
  ["Maya S.", "Minimal design, excellent screen clarity and the emerald accent is subtle in the best way.", "5.0"]
];

function ProductImage({
  alt,
  className = "",
  loading = "eager",
  src
}: {
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  src?: string;
}) {
  return (
    <img
      alt={alt}
      className={`h-full w-full object-contain object-center ${className}`}
      draggable={false}
      loading={loading}
      onError={(event) => {
        event.currentTarget.src = placeholderImage;
      }}
      sizes="(max-width: 767px) 70vw, (max-width: 1023px) 34vw, 240px"
      src={src || placeholderImage}
      srcSet={src ? `${src} 240w, ${src.replace("w=240", "w=480").replace("q=80", "q=85")} 480w` : undefined}
    />
  );
}

function FittedProductImage({
  alt,
  className = "",
  loading = "eager",
  src
}: {
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  src?: string;
}) {
  return (
    <img
      alt={alt}
      className={`max-h-full max-w-full object-contain object-center ${className}`}
      draggable={false}
      loading={loading}
      onError={(event) => {
        event.currentTarget.src = placeholderImage;
      }}
      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 86vw, 52vw"
      src={src || placeholderImage}
      srcSet={src ? `${src} 1100w, ${getZoomImage(src)} 1800w` : undefined}
    />
  );
}

function ZoomPanel({
  active,
  image,
  panelRef
}: {
  active: boolean;
  image: string;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={panelRef}
      aria-hidden={!active}
      className={`pointer-events-none absolute left-[calc(100%+1rem)] top-0 z-50 hidden h-[520px] w-[min(520px,46vw)] rounded-2xl border border-line bg-white bg-no-repeat shadow-lift transition-opacity duration-150 xl:block ${active ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage: `url(${getZoomImage(image)})`,
        backgroundSize: `${zoomScale * 100}%`
      }}
    />
  );
}

function Magnifier({
  alt,
  image,
  onMobileOpen
}: {
  alt: string;
  image: string;
  onMobileOpen: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastPointRef = useRef<Point>({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    if (lensRef.current) {
      lensRef.current.style.opacity = "0";
    }
  }, [image]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const updateMagnifier = () => {
    rafRef.current = null;
    const frame = frameRef.current;
    const imageElement = imageRef.current;
    const lens = lensRef.current;
    const panel = panelRef.current;

    if (!frame || !imageElement || !lens || !panel || !imageElement.naturalWidth || !imageElement.naturalHeight) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    const imageAspect = imageElement.naturalWidth / imageElement.naturalHeight;
    const frameAspect = bounds.width / bounds.height;
    const renderedWidth = imageAspect > frameAspect ? bounds.width : bounds.height * imageAspect;
    const renderedHeight = imageAspect > frameAspect ? bounds.width / imageAspect : bounds.height;
    const offsetX = (bounds.width - renderedWidth) / 2;
    const offsetY = (bounds.height - renderedHeight) / 2;
    const localX = lastPointRef.current.x - offsetX;
    const localY = lastPointRef.current.y - offsetY;
    const clampedX = Math.max(0, Math.min(renderedWidth, localX));
    const clampedY = Math.max(0, Math.min(renderedHeight, localY));
    const percentX = renderedWidth ? (clampedX / renderedWidth) * 100 : 50;
    const percentY = renderedHeight ? (clampedY / renderedHeight) * 100 : 50;
    const lensSize = Math.min(150, Math.max(104, renderedWidth * 0.34));

    lens.style.width = `${lensSize}px`;
    lens.style.height = `${lensSize}px`;
    lens.style.opacity = "1";
    lens.style.transform = `translate3d(${offsetX + clampedX - lensSize / 2}px, ${offsetY + clampedY - lensSize / 2}px, 0)`;
    panel.style.backgroundImage = `url(${getZoomImage(image)})`;
    panel.style.backgroundSize = `${zoomScale * 100}%`;
    panel.style.backgroundPosition = `${percentX}% ${percentY}%`;
  };

  const scheduleUpdate = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateMagnifier);
    }
  };

  const isFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      ref={frameRef}
      className="relative grid h-[320px] touch-pan-y place-items-center rounded-2xl bg-white p-5 sm:h-[460px] sm:p-6 xl:h-[520px] xl:p-8"
      onClick={() => {
        if (!isFinePointer()) {
          onMobileOpen();
        }
      }}
      onMouseEnter={() => {
        if (isFinePointer()) {
          setActive(true);
          scheduleUpdate();
        }
      }}
      onMouseLeave={() => {
        setActive(false);
        if (lensRef.current) {
          lensRef.current.style.opacity = "0";
        }
      }}
      onMouseMove={(event) => {
        if (!isFinePointer()) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        lastPointRef.current = {
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top
        };
        scheduleUpdate();
      }}
    >
      <div className="grid h-full w-full place-items-center overflow-hidden rounded-2xl">
        <img
          ref={imageRef}
          alt={alt}
          className="h-full w-full object-contain object-center"
          draggable={false}
          loading="eager"
          onError={(event) => {
            event.currentTarget.src = placeholderImage;
          }}
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 86vw, (max-width: 1439px) 44vw, 550px"
          src={image || placeholderImage}
          srcSet={image ? `${image} 1100w, ${getZoomImage(image)} 1800w` : undefined}
        />
      </div>
      <div
        ref={lensRef}
        aria-hidden="true"
        className="magnifier-lens pointer-events-none absolute left-0 top-0 z-40 hidden rounded-xl border border-primary/45 bg-indigo-200/20 opacity-0 shadow-soft backdrop-blur-[1px] xl:block"
      />
      <ZoomPanel active={active} image={image} panelRef={panelRef} />
    </div>
  );
}

function ImageLightbox({
  active,
  images,
  onClose,
  onSelect,
  open
}: {
  active: number;
  images: GalleryImage[];
  onClose: () => void;
  onSelect: (index: number) => void;
  open: boolean;
}) {
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const next = () => onSelect((active + 1) % images.length);
  const prev = () => onSelect((active - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] grid bg-slate-950/95 p-4 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Product image gallery"
      onTouchStart={(event) => {
        touchStartRef.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartRef.current === null) {
          return;
        }

        const endX = event.changedTouches[0]?.clientX ?? touchStartRef.current;
        const delta = endX - touchStartRef.current;
        if (Math.abs(delta) > 48) {
          delta > 0 ? prev() : next();
        }
        touchStartRef.current = null;
      }}
    >
      <button aria-label="Close gallery" onClick={onClose} className="absolute right-4 top-4 min-h-11 min-w-11 rounded-full bg-white/10 p-3 backdrop-blur transition hover:bg-white/20">
        <X size={22} />
      </button>
      <button aria-label="Previous image" onClick={prev} className="absolute left-3 top-1/2 min-h-11 min-w-11 rounded-full bg-white/10 p-3 backdrop-blur sm:left-4">
        <ArrowLeft size={22} />
      </button>
      <button aria-label="Next image" onClick={next} className="absolute right-3 top-1/2 min-h-11 min-w-11 rounded-full bg-white/10 p-3 backdrop-blur sm:right-4">
        <ArrowRight size={22} />
      </button>
      <div className="grid min-h-0 place-items-center px-8 py-14 sm:px-10">
        <FittedProductImage alt={images[active].name} className="max-h-[82vh] touch-pinch-zoom" src={images[active].image} />
      </div>
      <div className="no-scrollbar mx-auto flex max-w-full gap-3 overflow-x-auto pb-2">
        {images.map((item, index) => (
          <button
            key={item.name}
            aria-label={`Show ${item.name}`}
            onClick={() => onSelect(index)}
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl border bg-white p-1 ${active === index ? "border-primary" : "border-white/40"}`}
          >
            <ProductImage alt={`${item.name} thumbnail`} loading="lazy" src={item.thumb || item.image} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={fadeUp}
      initial={false}
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl bg-white p-4 shadow-soft sm:p-5 md:p-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ProductGallery() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const next = () => setActive((active + 1) % gallery.length);
  const prev = () => setActive((active - 1 + gallery.length) % gallery.length);
  const openFullscreen = () => {
    previewRef.current?.requestFullscreen?.();
  };

  return (
    <section className="w-full lg:max-w-[550px]">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-soft sm:p-4">
        <div
          ref={previewRef}
          className="relative rounded-2xl bg-white"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={gallery[active].name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="group h-full"
            >
              <Magnifier alt={`AeroSlate One ${gallery[active].name}`} image={gallery[active].image} onMobileOpen={() => setLightboxOpen(true)} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-bold glass">{active + 1}/{gallery.length}</div>
          <div className="absolute right-4 top-4 flex gap-2">
            <button aria-label="Wishlist product" className="min-h-11 min-w-11 rounded-full p-3 glass transition hover:-translate-y-0.5"><Heart size={18} /></button>
            <button aria-label="View image fullscreen" onClick={openFullscreen} className="min-h-11 min-w-11 rounded-full p-3 glass transition hover:-translate-y-0.5"><Maximize2 size={18} /></button>
            <button aria-label="View product in 360 degrees" className="hidden min-h-11 min-w-11 rounded-full p-3 glass transition hover:-translate-y-0.5 sm:grid"><Rotate3D size={18} /></button>
            <button aria-label="Share product" className="hidden min-h-11 min-w-11 rounded-full p-3 glass transition hover:-translate-y-0.5 sm:grid"><ArrowRight size={18} /></button>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <button aria-label="Previous image" onClick={prev} className="min-h-11 min-w-11 rounded-full p-3 glass"><ArrowLeft size={18} /></button>
            <button aria-label="Next image" onClick={next} className="min-h-11 min-w-11 rounded-full p-3 glass"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          {gallery.map((item, index) => (
            <button
              key={item.name}
              aria-label={`Show ${item.name}`}
              onClick={() => setActive(index)}
              className={`flex min-h-16 min-w-[118px] items-center gap-2 rounded-2xl border p-2 text-left transition sm:min-w-[132px] sm:gap-3 ${active === index ? "border-primary bg-white shadow-soft" : "border-line bg-white/60"}`}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white">
                <ProductImage alt={`${item.name} thumbnail`} className="p-1" src={item.thumb || item.image} />
              </span>
              <span className="text-xs font-bold sm:text-sm">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <ImageLightbox active={active} images={gallery} onClose={() => setLightboxOpen(false)} onSelect={setActive} open={lightboxOpen} />
    </section>
  );
}

function SpecificationTable() {
  return (
    <SectionCard>
      <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Specifications</h2>
      <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {specs.map(([key, value]) => (
          <div key={key} className="grid gap-1 bg-white p-3 sm:grid-cols-[180px_1fr]">
            <dt className="text-[13px] font-semibold uppercase tracking-[1px] text-accent">{key}</dt>
            <dd className="text-[15px] leading-[1.7] text-[#555] md:text-base">{value}</dd>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <SectionCard>
      <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">FAQs</h2>
      <div className="mt-2 divide-y divide-line">
        {faqs.map(([question, answer], index) => (
          <button key={question} onClick={() => setOpen(open === index ? -1 : index)} className="w-full py-3 text-left">
            <span className="flex items-center justify-between gap-4 font-semibold">{question}<ChevronDown className={`transition ${open === index ? "rotate-180" : ""}`} /></span>
            {open === index && <p className="mt-2 text-[15px] leading-[1.7] text-[#555] md:text-base">{answer}</p>}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

function ReviewSection() {
  return (
    <SectionCard>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Customer reviews</h2>
          <p className="mt-1 text-[15px] leading-[1.7] text-[#555] md:text-base">4.9 average across verified buyers.</p>
        </div>
        <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
      </div>
      <div className="mt-4 space-y-3">
        {reviews.map(([name, quote, rating]) => (
          <article key={name} className="rounded-2xl bg-slate-50 p-4">
            <p className="font-semibold">{name} <span className="text-primary">{rating}</span></p>
            <p className="mt-2 text-[15px] leading-[1.7] text-[#555] md:text-base">{quote}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function ProductSummary() {
  const [qty, setQty] = useState(1);
  return (
    <section className="space-y-4">
      <SectionCard className="h-fit">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[1px] text-primary md:text-[13px]">AeroWorks</p>
        <h1 className="mb-3 font-display text-[clamp(2rem,7vw,3rem)] font-bold leading-[1.12] text-ink md:text-[40px] xl:text-5xl">AeroSlate One</h1>
        <p className="mt-3 text-[15px] leading-[1.7] text-[#555] md:text-[17px]">A premium connected everyday device with a slate aluminum body, emerald intelligence light and beautifully minimal interaction design.</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 font-bold text-primary"><Star size={16} fill="currentColor" />4.9</span>
          <span className="text-[15px] text-[#555]">2,846 reviews</span>
          <span className="rounded-full bg-emerald-50 px-4 py-2 font-bold text-secondary">In stock</span>
          <span className="text-[12px] font-semibold uppercase tracking-[1px] text-muted md:text-[13px]">SKU: AS-ONE-26</span>
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Short highlights</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
          {features.map((feature) => <p key={feature} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-[15px] leading-[1.7] text-[#555]"><Check className="shrink-0 text-secondary" size={18} />{feature}</p>)}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Choose your finish</h2>
        <div className="mt-3 flex gap-3">
          {["#334155", "#4F46E5", "#10B981", "#FFFFFF"].map((color) => <button key={color} aria-label={`Select color ${color}`} className="h-12 w-12 rounded-full border-4 border-white shadow-soft ring-1 ring-line" style={{ background: color }} />)}
        </div>
        <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[1px]">Size / variant</h3>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {["Core", "Plus", "Studio"].map((variant, index) => <button key={variant} className={`min-h-11 rounded-2xl border p-3 text-base font-semibold transition hover:-translate-y-0.5 ${index === 1 ? "border-primary bg-indigo-50 text-primary" : "border-line bg-white"}`}>{variant}</button>)}
        </div>
        <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[1px]">Quantity</h3>
        <div className="mt-2 flex w-full max-w-40 items-center justify-between rounded-full bg-slate-50 p-2">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full bg-white p-2 shadow-soft"><Minus size={16} /></button>
          <b>{qty}</b>
          <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="rounded-full bg-white p-2 shadow-soft"><Plus size={16} /></button>
        </div>
      </SectionCard>
    </section>
  );
}

function ProductDetails() {
  return (
    <section className="space-y-4">
      <SectionCard>
        <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">About product</h2>
        <p className="mt-3 text-[15px] leading-[1.7] text-[#555] md:text-base">AeroSlate One is designed for people who want technology to feel quiet, precise and durable. Its slate shell is machined for a confident grip, while the emerald status light gives glanceable feedback without visual noise.</p>
      </SectionCard>

      <SpecificationTable />

      <SectionCard>
        <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Features</h2>
        <div className="mt-3 space-y-3">
          {["Privacy-first controls", "Travel-ready durability", "Premium packaging", "Related setup guides"].map((item) => <p key={item} className="rounded-2xl bg-slate-50 p-3 text-[18px] font-semibold md:text-[20px]">{item}</p>)}
        </div>
      </SectionCard>

      <FAQ />
      <ReviewSection />
    </section>
  );
}

function ProductContent() {
  return (
    <div className="min-h-0 xl:h-[calc(100vh-5.25rem)]">
      <div className="grid min-h-0 items-start gap-4 lg:grid-cols-[minmax(380px,46%)_minmax(0,1fr)] xl:h-full 2xl:grid-cols-[minmax(460px,50%)_minmax(0,1fr)]">
        <ProductGallery />
        <div className="min-h-0 space-y-4 xl:h-full xl:overflow-y-auto xl:pr-1 product-scroll">
          <ProductSummary />
          <ProductDetails />
        </div>
      </div>
    </div>
  );
}

function PurchaseCard() {
  const [qty, setQty] = useState(1);
  return (
    <aside className="xl:sticky xl:top-6 xl:h-fit">
      <div className="rounded-2xl p-4 glass">
        <div className="flex items-start justify-between">
          <div><p className="text-[12px] font-semibold uppercase tracking-[1px] text-muted md:text-[13px]">Your price</p><h2 className="font-display text-[38px] font-bold leading-[1.1] md:text-[42px]">{formatPrice(749 * qty)}</h2><p className="mt-1 text-[15px] text-[#555]"><span className="text-lg text-muted line-through">{formatPrice(899)}</span> inclusive of taxes</p></div>
          <span className="rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-700">17% off</span>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-full bg-white p-2 shadow-soft">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full bg-slate-100 p-3"><Minus size={16} /></button>
          <b>{qty}</b>
          <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="rounded-full bg-slate-100 p-3"><Plus size={16} /></button>
        </div>
        <button className="mt-4 min-h-11 w-full rounded-full bg-gradient-to-r from-primary to-blue-600 py-3.5 text-base font-semibold text-white shadow-lift transition hover:-translate-y-0.5 md:text-lg"><ShoppingBag className="mr-2 inline" />Add to Cart</button>
        <button className="mt-2 min-h-11 w-full rounded-full bg-accent py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 md:text-lg">Buy Now</button>
        <button className="mt-2 min-h-11 w-full rounded-full bg-white py-3.5 text-base font-semibold shadow-soft md:text-lg"><Heart className="mr-2 inline" />Wishlist</button>
        <label htmlFor="pincode" className="mt-4 block text-[13px] font-semibold uppercase tracking-[1px]">Delivery pincode</label>
        <div className="mt-2 flex rounded-full bg-white p-2 shadow-soft">
          <input id="pincode" className="min-w-0 flex-1 bg-transparent px-3 outline-none" placeholder="Enter code" />
          <button className="min-h-11 rounded-full bg-primary px-4 text-base font-semibold text-white">Check</button>
        </div>
        <div className="mt-4 space-y-2 text-[15px] leading-[1.7] text-[#555]">
          <p><Sparkles className="mr-2 inline text-primary" size={18} /> Available launch offers applied</p>
          <p><ShieldCheck className="mr-2 inline text-secondary" size={18} /> Secure payment badge</p>
          <p><RefreshCcw className="mr-2 inline text-secondary" size={18} /> 14-day return policy</p>
          <p><HelpCircle className="mr-2 inline text-secondary" size={18} /> Priority customer support</p>
          <p><BadgeCheck className="mr-2 inline text-secondary" size={18} /> AeroWorks official seller</p>
        </div>
        <div className="mt-4 grid gap-2 border-t border-white/70 pt-4 text-[15px] leading-[1.7] text-[#555]">
          <p><UserRoundCheck className="mr-2 inline text-secondary" size={18} /> Sold by AeroWorks Official Store</p>
          <p><ShieldCheck className="mr-2 inline text-secondary" size={18} /> 24-month official warranty</p>
          <p><CreditCard className="mr-2 inline text-primary" size={18} /> Encrypted secure checkout</p>
        </div>
      </div>
    </aside>
  );
}

function ProductRail({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-8 md:px-8 md:py-10">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[1px] text-primary md:text-[13px]">Explore</p>
          <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[32px]">{title}</h2>
        </div>
        <ArrowRight className="text-primary" />
      </div>
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4 xl:flex">
        {items.map((item, index) => (
          <motion.article key={item} whileHover={{ y: -6 }} className="min-w-[76vw] snap-start rounded-2xl bg-white p-3 shadow-soft sm:min-w-[42vw] md:min-w-0 xl:min-w-[250px]">
            <div className="mb-3 grid aspect-square place-items-center overflow-hidden rounded-2xl bg-slate-50 p-3">
              <ProductImage alt={item} loading="lazy" src={gallery[index % gallery.length].thumb} />
            </div>
            <h3 className="font-display text-[18px] font-semibold md:text-[20px]">{item}</h3>
            <p className="mt-1 text-[15px] leading-[1.7] text-[#555]">Premium companion product</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function BrandInfo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <div className="rounded-2xl bg-accent p-6 text-white shadow-soft md:p-8">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-[1px] text-emerald-300 md:text-[13px]">Brand Story</p>
        <h2 className="max-w-4xl font-display text-[26px] font-bold leading-[1.2] md:text-[34px]">Built for people who prefer their technology calm, capable and quietly beautiful.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Recycled aluminum program", "Carbon-aware shipping", "Official repair network"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[18px] font-semibold md:text-[20px]">{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl p-5 glass md:flex-row md:items-center md:justify-between">
        <div><b className="font-display text-[20px] font-semibold">AeroWorks</b><p className="text-[15px] leading-[1.7] text-[#555]">Product updates, offers and care guides.</p></div>
        <form className="flex w-full max-w-md flex-1 rounded-full bg-white p-2 shadow-soft">
          <input aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-4 outline-none" placeholder="email@example.com" />
          <button className="min-h-11 rounded-full bg-gradient-to-r from-primary to-blue-600 px-5 py-3 text-base font-semibold text-white">Join</button>
        </form>
      </div>
    </footer>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="overflow-x-hidden">
      <header className="relative mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 md:px-8">
        <a href="#" className="flex items-center gap-2 font-display text-[20px] font-semibold"><Sparkles className="text-primary" /> AeroWorks</a>
        <nav className="hidden gap-6 rounded-full px-5 py-2.5 text-sm text-muted glass md:flex">
          <a href="#product">Product</a><a href="#reviews">Reviews</a><a href="#brand">Brand</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href="#buy" className="min-h-11 rounded-full bg-accent px-5 py-2.5 text-base font-semibold text-white">Buy</a>
        </div>
        <button aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="grid min-h-11 min-w-11 place-items-center rounded-full glass md:hidden">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="absolute inset-x-4 top-full z-50 mt-2 grid gap-2 rounded-2xl p-3 text-base font-semibold glass md:hidden">
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3" href="#product">Product</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3" href="#reviews">Reviews</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3" href="#brand">Brand</a>
            <a onClick={() => setMenuOpen(false)} className="rounded-xl bg-accent px-3 py-3 text-white" href="#buy">Buy</a>
          </nav>
        )}
      </header>

      <section id="product" className="mx-auto grid max-w-[1500px] gap-4 px-4 pb-10 md:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
        <ProductContent />
        <div id="buy"><PurchaseCard /></div>
      </section>

      <ProductRail title="Related Products Slider" items={["AeroSlate Dock", "Emerald Case", "Slate Stand", "Travel Sleeve", "Fast Charger"]} />
      <ProductRail title="Frequently Bought Together" items={["AeroSlate One", "Care Kit", "Wireless Dock", "Protection Plan"]} />
      <ProductRail title="Recommended Products" items={["AeroPad Mini", "AeroBand Loop", "AeroSound Slate", "AeroKey Pro"]} />
      <ProductRail title="Recently Viewed" items={["Slate Hub", "Emerald Tag", "Indigo Wallet", "AeroCable"]} />

      <section id="reviews" className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:px-8 md:py-10 lg:grid-cols-2">
        <ReviewSection />
        <SectionCard>
          <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Question & Answers</h2>
          <div className="mt-3 space-y-3">
            {["Is this product waterproof?", "Does it support international adapters?", "Can I extend warranty later?"].map((q) => <p key={q} className="rounded-2xl bg-slate-50 p-3 text-[18px] font-semibold md:text-[20px]">{q}</p>)}
          </div>
        </SectionCard>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="grid min-h-[260px] place-items-center rounded-2xl bg-accent text-white shadow-soft sm:min-h-[340px] lg:min-h-[420px]"><PlayCircle size={72} /><span className="sr-only">Play product video</span></div>
          <SectionCard className="h-full">
            <h2 className="font-display text-[24px] font-bold leading-[1.2] md:text-[30px]">Product Videos</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-[#555] md:text-base">Watch the setup flow, finish details, durability testing and companion app walkthrough in a polished video gallery.</p>
            <div className="mt-4 grid gap-2">{["Unboxing", "Setup", "Daily use"].map((item) => <button key={item} className="rounded-2xl bg-slate-50 p-3 text-left text-base font-semibold">{item}</button>)}</div>
          </SectionCard>
        </div>
      </section>

      <BrandInfo />
      <ProductRail title="Similar Products" items={["Slate One Lite", "Indigo Max", "Emerald Air", "AeroSlate Studio"]} />
      <Footer />
    </main>
  );
}
