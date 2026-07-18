"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Box,
  Check,
  ChevronDown,
  CreditCard,
  Heart,
  HelpCircle,
  Minus,
  PackageCheck,
  PlayCircle,
  Plus,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UserRoundCheck,
  WalletCards
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

const gallery = [
  { name: "Slate Mist", tone: "from-slate-100 via-white to-indigo-100" },
  { name: "Indigo Core", tone: "from-indigo-950 via-slate-900 to-emerald-900" },
  { name: "Emerald Halo", tone: "from-emerald-100 via-white to-slate-100" },
  { name: "Studio White", tone: "from-white via-slate-100 to-slate-200" }
];

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

function ProductVisual({ tone, dark = false }: { tone: string; dark?: boolean }) {
  return (
    <div className={`relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${tone}`}>
      <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-white/40 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-36 w-36 rounded-full bg-emerald-300/25 blur-3xl" />
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`relative h-[72%] w-[58%] rounded-[2rem] border ${dark ? "border-white/10 bg-slate-950" : "border-white bg-white"} shadow-[0_34px_100px_rgba(15,23,42,.22)]`}
      >
        <div className={`absolute inset-3 rounded-[1.45rem] ${dark ? "bg-gradient-to-br from-slate-800 to-slate-950" : "bg-gradient-to-br from-slate-50 to-indigo-50"}`} />
        <div className="absolute left-1/2 top-7 h-1.5 w-20 -translate-x-1/2 rounded-full bg-slate-300/70" />
        <div className="absolute bottom-8 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,.9)]" />
      </motion.div>
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl bg-white p-6 shadow-soft ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ProductGallery() {
  const [active, setActive] = useState(0);
  const next = () => setActive((active + 1) % gallery.length);
  const prev = () => setActive((active - 1 + gallery.length) % gallery.length);

  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-48px)]">
      <div className="flex h-full flex-col gap-4 rounded-2xl p-4 glass">
        <div className="relative flex-1 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={gallery[active].name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="group h-full"
            >
              <div className="h-full transition duration-500 group-hover:scale-[1.035]">
                <ProductVisual tone={gallery[active].tone} dark={active === 1} />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4 rounded-full px-4 py-2 text-sm font-bold glass">{active + 1}/{gallery.length}</div>
          <div className="absolute right-4 top-4 flex gap-2">
            <button aria-label="Wishlist product" className="rounded-full p-3 glass transition hover:-translate-y-0.5"><Heart size={18} /></button>
            <button aria-label="Share product" className="rounded-full p-3 glass transition hover:-translate-y-0.5"><ArrowRight size={18} /></button>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <button aria-label="Previous image" onClick={prev} className="rounded-full p-3 glass"><ArrowLeft size={18} /></button>
            <button aria-label="Next image" onClick={next} className="rounded-full p-3 glass"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col">
          {gallery.map((item, index) => (
            <button
              key={item.name}
              aria-label={`Show ${item.name}`}
              onClick={() => setActive(index)}
              className={`flex min-w-28 items-center gap-3 rounded-2xl border p-2 text-left transition ${active === index ? "border-primary bg-white shadow-soft" : "border-line bg-white/60"}`}
            >
              <div className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${item.tone}`} />
              <span className="text-sm font-bold">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function OfferCard({ icon: Icon, title, text }: { icon: typeof Sparkles; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-slate-50 p-4">
      <Icon className="mb-3 text-primary" size={22} />
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}

function DeliveryCard() {
  return (
    <SectionCard>
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-secondary"><Truck /></div>
        <div>
          <h2 className="font-display text-2xl font-black">Delivery information</h2>
          <p className="mt-2 text-muted">Estimated delivery by <b className="text-ink">Wednesday, July 22</b>. Free express shipping and insured handling are included.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function SpecificationTable() {
  return (
    <SectionCard>
      <h2 className="font-display text-2xl font-black">Specifications</h2>
      <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {specs.map(([key, value]) => (
          <div key={key} className="grid gap-2 bg-white p-4 sm:grid-cols-[180px_1fr]">
            <dt className="font-bold text-accent">{key}</dt>
            <dd className="text-muted">{value}</dd>
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
      <h2 className="font-display text-2xl font-black">FAQs</h2>
      <div className="mt-4 divide-y divide-line">
        {faqs.map(([question, answer], index) => (
          <button key={question} onClick={() => setOpen(open === index ? -1 : index)} className="w-full py-5 text-left">
            <span className="flex items-center justify-between gap-4 font-bold">{question}<ChevronDown className={`transition ${open === index ? "rotate-180" : ""}`} /></span>
            {open === index && <p className="mt-3 leading-7 text-muted">{answer}</p>}
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
          <h2 className="font-display text-2xl font-black">Customer reviews</h2>
          <p className="mt-2 text-muted">4.9 average across verified buyers.</p>
        </div>
        <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
      </div>
      <div className="mt-6 space-y-4">
        {reviews.map(([name, quote, rating]) => (
          <article key={name} className="rounded-2xl bg-slate-50 p-5">
            <p className="font-bold">{name} <span className="text-primary">{rating}</span></p>
            <p className="mt-2 leading-7 text-muted">{quote}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function ProductInfo() {
  const [qty, setQty] = useState(1);
  return (
    <section className="product-scroll space-y-6 lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:overflow-y-auto lg:pr-2">
      <SectionCard>
        <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-primary">AeroWorks</p>
        <h1 className="font-display text-5xl font-black leading-tight text-ink">AeroSlate One</h1>
        <p className="mt-4 text-lg leading-8 text-muted">A premium connected everyday device with a slate aluminum body, emerald intelligence light and beautifully minimal interaction design.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 font-bold text-primary"><Star size={16} fill="currentColor" />4.9</span>
          <span className="text-muted">2,846 reviews</span>
          <span className="rounded-full bg-emerald-50 px-4 py-2 font-bold text-secondary">In stock</span>
          <span className="text-sm text-muted">SKU: AS-ONE-26</span>
        </div>
      </SectionCard>

      <SectionCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Inclusive launch price</p>
            <div className="mt-1 flex items-end gap-3"><span className="font-display text-5xl font-black">$749</span><span className="pb-2 text-xl text-muted line-through">$899</span></div>
            <p className="mt-2 text-sm text-muted">Inclusive of taxes. Financing and bank offers calculated at checkout.</p>
          </div>
          <span className="rounded-full bg-amber-100 px-4 py-2 font-black text-amber-700">17% off</span>
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-black">Short highlights</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {features.map((feature) => <p key={feature} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-muted"><Check className="shrink-0 text-secondary" size={18} />{feature}</p>)}
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-black">Choose your finish</h2>
        <div className="mt-5 flex gap-3">
          {["#334155", "#4F46E5", "#10B981", "#FFFFFF"].map((color) => <button key={color} aria-label={`Select color ${color}`} className="h-12 w-12 rounded-full border-4 border-white shadow-soft ring-1 ring-line" style={{ background: color }} />)}
        </div>
        <h3 className="mt-7 font-bold">Size / variant</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {["Core", "Plus", "Studio"].map((variant, index) => <button key={variant} className={`rounded-2xl border p-4 font-bold transition hover:-translate-y-0.5 ${index === 1 ? "border-primary bg-indigo-50 text-primary" : "border-line bg-white"}`}>{variant}</button>)}
        </div>
        <h3 className="mt-7 font-bold">Quantity</h3>
        <div className="mt-3 flex w-40 items-center justify-between rounded-full bg-slate-50 p-2">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full bg-white p-2 shadow-soft"><Minus size={16} /></button>
          <b>{qty}</b>
          <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="rounded-full bg-white p-2 shadow-soft"><Plus size={16} /></button>
        </div>
      </SectionCard>

      <DeliveryCard />

      <SectionCard>
        <h2 className="font-display text-2xl font-black">Offers & coupons</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <OfferCard icon={Banknote} title="Bank offer" text="10% instant savings with select cards up to $90." />
          <OfferCard icon={WalletCards} title="EMI option" text="No-cost EMI from $63/month for eligible buyers." />
          <OfferCard icon={Sparkles} title="Launch coupon" text="Use AERONEW for extra accessory credit." />
          <OfferCard icon={CreditCard} title="Secure payment" text="Encrypted checkout with trusted payment partners." />
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-black">Warranty, returns & seller</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <OfferCard icon={ShieldCheck} title="Warranty" text="24-month official warranty included." />
          <OfferCard icon={RefreshCcw} title="Returns" text="14-day replacement for manufacturing defects." />
          <OfferCard icon={UserRoundCheck} title="Seller" text="Sold by AeroWorks Official Store." />
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="font-display text-2xl font-black">About product</h2>
        <p className="mt-4 leading-8 text-muted">AeroSlate One is designed for people who want technology to feel quiet, precise and durable. Its slate shell is machined for a confident grip, while the emerald status light gives glanceable feedback without visual noise.</p>
      </SectionCard>

      <SpecificationTable />

      <SectionCard>
        <h2 className="font-display text-2xl font-black">Features</h2>
        <div className="mt-5 space-y-4">
          {["Privacy-first controls", "Travel-ready durability", "Premium packaging", "Related setup guides"].map((item) => <p key={item} className="rounded-2xl bg-slate-50 p-4 font-bold">{item}</p>)}
        </div>
      </SectionCard>

      <FAQ />
      <ReviewSection />
    </section>
  );
}

function PurchaseCard() {
  const [qty, setQty] = useState(1);
  return (
    <aside className="lg:sticky lg:top-6 lg:h-fit">
      <div className="rounded-2xl p-5 glass">
        <div className="flex items-start justify-between">
          <div><p className="text-sm text-muted">Your price</p><h2 className="font-display text-4xl font-black">${749 * qty}</h2></div>
          <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-700">17% off</span>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-full bg-white p-2 shadow-soft">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full bg-slate-100 p-3"><Minus size={16} /></button>
          <b>{qty}</b>
          <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="rounded-full bg-slate-100 p-3"><Plus size={16} /></button>
        </div>
        <button className="mt-5 w-full rounded-full bg-gradient-to-r from-primary to-blue-600 py-4 font-black text-white shadow-lift transition hover:-translate-y-0.5"><ShoppingBag className="mr-2 inline" />Add to Cart</button>
        <button className="mt-3 w-full rounded-full bg-accent py-4 font-black text-white transition hover:-translate-y-0.5">Buy Now</button>
        <button className="mt-3 w-full rounded-full bg-white py-4 font-black shadow-soft"><Heart className="mr-2 inline" />Wishlist</button>
        <label htmlFor="pincode" className="mt-6 block text-sm font-bold">Delivery pincode</label>
        <div className="mt-2 flex rounded-full bg-white p-2 shadow-soft">
          <input id="pincode" className="min-w-0 flex-1 bg-transparent px-3 outline-none" placeholder="Enter code" />
          <button className="rounded-full bg-primary px-4 text-sm font-bold text-white">Check</button>
        </div>
        <div className="mt-5 space-y-3 text-sm text-muted">
          <p><Sparkles className="mr-2 inline text-primary" size={18} /> Available launch offers applied</p>
          <p><ShieldCheck className="mr-2 inline text-secondary" size={18} /> Secure payment badge</p>
          <p><RefreshCcw className="mr-2 inline text-secondary" size={18} /> 14-day return policy</p>
          <p><HelpCircle className="mr-2 inline text-secondary" size={18} /> Priority customer support</p>
          <p><BadgeCheck className="mr-2 inline text-secondary" size={18} /> AeroWorks official seller</p>
        </div>
      </div>
    </aside>
  );
}

function ProductRail({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">Explore</p>
          <h2 className="font-display text-3xl font-black md:text-5xl">{title}</h2>
        </div>
        <ArrowRight className="text-primary" />
      </div>
      <div className="no-scrollbar flex gap-5 overflow-x-auto pb-6">
        {items.map((item, index) => (
          <motion.article key={item} whileHover={{ y: -6 }} className="min-w-[270px] rounded-2xl bg-white p-4 shadow-soft">
            <div className={`mb-4 aspect-square rounded-2xl bg-gradient-to-br ${gallery[index % gallery.length].tone}`} />
            <h3 className="font-display text-xl font-black">{item}</h3>
            <p className="mt-2 text-sm text-muted">Premium companion product</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function BrandInfo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="rounded-2xl bg-accent p-8 text-white shadow-soft md:p-12">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-emerald-300">Brand Story</p>
        <h2 className="max-w-4xl font-display text-4xl font-black md:text-6xl">Built for people who prefer their technology calm, capable and quietly beautiful.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {["Recycled aluminum program", "Carbon-aware shipping", "Official repair network"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5">{item}</div>)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl p-6 glass md:flex-row md:items-center md:justify-between">
        <div><b className="font-display text-2xl">AeroWorks</b><p className="text-muted">Product updates, offers and care guides.</p></div>
        <form className="flex max-w-md flex-1 rounded-full bg-white p-2 shadow-soft">
          <input aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-4 outline-none" placeholder="email@example.com" />
          <button className="rounded-full bg-gradient-to-r from-primary to-blue-600 px-5 py-3 font-bold text-white">Join</button>
        </form>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-black"><Sparkles className="text-primary" /> AeroWorks</a>
        <nav className="hidden gap-7 rounded-full px-5 py-3 text-sm text-muted glass md:flex">
          <a href="#product">Product</a><a href="#reviews">Reviews</a><a href="#brand">Brand</a>
        </nav>
        <a href="#buy" className="rounded-full bg-accent px-5 py-3 text-sm font-bold text-white">Buy</a>
      </header>

      <section id="product" className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:px-8 lg:grid-cols-[30fr_45fr_25fr]">
        <ProductGallery />
        <ProductInfo />
        <div id="buy"><PurchaseCard /></div>
      </section>

      <ProductRail title="Related Products Slider" items={["AeroSlate Dock", "Emerald Case", "Slate Stand", "Travel Sleeve", "Fast Charger"]} />
      <ProductRail title="Frequently Bought Together" items={["AeroSlate One", "Care Kit", "Wireless Dock", "Protection Plan"]} />
      <ProductRail title="Recommended Products" items={["AeroPad Mini", "AeroBand Loop", "AeroSound Slate", "AeroKey Pro"]} />
      <ProductRail title="Recently Viewed" items={["Slate Hub", "Emerald Tag", "Indigo Wallet", "AeroCable"]} />

      <section id="reviews" className="mx-auto grid max-w-7xl gap-6 px-4 py-14 md:px-8 lg:grid-cols-2">
        <ReviewSection />
        <SectionCard>
          <h2 className="font-display text-2xl font-black">Question & Answers</h2>
          <div className="mt-5 space-y-4">
            {["Is this product waterproof?", "Does it support international adapters?", "Can I extend warranty later?"].map((q) => <p key={q} className="rounded-2xl bg-slate-50 p-4 font-bold">{q}</p>)}
          </div>
        </SectionCard>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="grid min-h-[420px] place-items-center rounded-2xl bg-accent text-white shadow-soft"><PlayCircle size={72} /><span className="sr-only">Play product video</span></div>
          <SectionCard className="h-full">
            <h2 className="font-display text-4xl font-black">Product Videos</h2>
            <p className="mt-5 leading-8 text-muted">Watch the setup flow, finish details, durability testing and companion app walkthrough in a polished video gallery.</p>
            <div className="mt-6 grid gap-3">{["Unboxing", "Setup", "Daily use"].map((item) => <button key={item} className="rounded-2xl bg-slate-50 p-4 text-left font-bold">{item}</button>)}</div>
          </SectionCard>
        </div>
      </section>

      <BrandInfo />
      <ProductRail title="Similar Products" items={["Slate One Lite", "Indigo Max", "Emerald Air", "AeroSlate Studio"]} />
      <Footer />
    </main>
  );
}
