import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import bottle1 from "@/assets/bottle-1.jpg.asset.json";
import bottle2 from "@/assets/bottle-2.jpg.asset.json";
import bottle3 from "@/assets/bottle-3.jpg.asset.json";
import bottle4 from "@/assets/bottle-4.jpg.asset.json";
import bottle5 from "@/assets/bottle-5.jpg.asset.json";
import bottle6 from "@/assets/bottle-6.jpg.asset.json";
import bottle7 from "@/assets/bottle-7.jpg.asset.json";
import bottle8 from "@/assets/bottle-8.jpg.asset.json";
import bottle9 from "@/assets/bottle-9.jpg.asset.json";
import heroVideo from "@/assets/hero-video.mp4.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON NUR — عطور فاخرة | Luxury Parfums" },
      {
        name: "description",
        content:
          "MAISON NUR: دار عطور فاخرة تمزج العود والعنبر بروح فرنسية. Discover three signature extraits in an immersive 3D showcase.",
      },
      { property: "og:title", content: "MAISON NUR — عطور فاخرة | Luxury Parfums" },
      {
        property: "og:description",
        content:
          "ثلاث تحف عطرية تُروى بالضوء والذهب. Three signature extraits, presented in motion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCENES = [
  {
    img: bottle1.url,
    name: "Elysium",
    ar: "إليزيوم",
    notes: "Amber · Saffron · Vanilla",
    arNotes: "العنبر · الزعفران · الفانيليا",
  },
  {
    img: bottle2.url,
    name: "Émeraude",
    ar: "إميرود",
    notes: "Fig · Vetiver · Green Moss",
    arNotes: "التين · نبات الفيتيفر · الطحلب",
  },
  {
    img: bottle3.url,
    name: "Oud Majesté",
    ar: "عود ماجستيه",
    notes: "Oud · Rose · Sandalwood",
    arNotes: "العود · الورد · خشب الصندل",
  },
];

const DURATION = 5200;

function Hero() {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const scene = SCENES[active]!;

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % SCENES.length), DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      onMouseMove={(e) => {
        const r = stage.current?.getBoundingClientRect();
        if (!r) return;
        setTilt({
          y: ((e.clientX - r.left) / r.width - 0.5) * 26,
          x: -((e.clientY - r.top) / r.height - 0.5) * 18,
        });
      }}
      ref={stage}
    >
      <video
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="veil pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-background/55" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-primary/15" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-primary/10" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 pb-16 md:grid-cols-[1fr_auto_1fr]">
        <div className="animate-rise order-2 text-center md:order-1 md:text-left">
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
            Extrait de Parfum
          </p>
          <h1 className="mt-4 text-6xl font-light leading-[0.95] md:text-7xl">
            <span className="text-gold">{scene.name}</span>
          </h1>
          <p className="ar mt-3 text-3xl font-light text-foreground/80">
            {scene.ar}
          </p>
          <div className="shimmer-line mx-auto mt-7 h-px w-40 md:mx-0" />
          <p className="mt-5 text-sm tracking-[0.28em] text-muted-foreground uppercase">
            {scene.notes}
          </p>
          <p className="ar mt-2 text-base text-muted-foreground">
            {scene.arNotes}
          </p>
        </div>

        <div className="stage-3d order-1 flex h-[62svh] items-center justify-center md:order-2 md:h-[78svh]">
          <div
            className="relative h-full w-[min(80vw,420px)] transition-transform duration-500 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {SCENES.map((s, i) => (
              <div
                key={s.name}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: `bottle-in ${DURATION}ms ease-in-out infinite`,
                  animationDelay: `${(i - active) * DURATION}ms`,
                  opacity: 0,
                }}
              >
                <img
                  src={s.img}
                  alt={`${s.name} perfume bottle`}
                  width={1024}
                  height={1280}
                  className="h-full w-full animate-float object-contain mix-blend-screen"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="order-3 flex items-center justify-center gap-3 md:flex-col md:items-end md:justify-center">
          {SCENES.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              aria-label={s.name}
              className={`h-px w-12 transition-all duration-500 md:w-16 ${
                i === active ? "bg-primary md:w-24" : "bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type Gender = "men" | "women" | "unisex";
type Conc = "extrait" | "edp" | "edt";

type Product = {
  img: string;
  name: string;
  ar: string;
  notes: string;
  arNotes: string;
  gender: Gender;
  conc: Conc;
  size: number;
  price: number;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    img: bottle1.url,
    name: "Elysium",
    ar: "إليزيوم",
    notes: "Amber · Saffron · Vanilla",
    arNotes: "العنبر · الزعفران · الفانيليا",
    gender: "unisex",
    conc: "extrait",
    size: 100,
    price: 1450,
    badge: "Signature",
  },
  {
    img: bottle2.url,
    name: "Émeraude",
    ar: "إميرود",
    notes: "Fig · Vetiver · Green Moss",
    arNotes: "التين · الفيتيفر · الطحلب",
    gender: "women",
    conc: "edp",
    size: 75,
    price: 1180,
  },
  {
    img: bottle3.url,
    name: "Oud Majesté",
    ar: "عود ماجستيه",
    notes: "Oud · Rose · Sandalwood",
    arNotes: "العود · الورد · خشب الصندل",
    gender: "men",
    conc: "extrait",
    size: 100,
    price: 2100,
    badge: "Best Seller",
  },
  {
    img: bottle4.url,
    name: "Nuit Noire",
    ar: "ليل أسود",
    notes: "Black Pepper · Leather · Tonka",
    arNotes: "الفلفل الأسود · الجلد · التونكا",
    gender: "men",
    conc: "edp",
    size: 100,
    price: 1620,
  },
  {
    img: bottle5.url,
    name: "Rosé Éclat",
    ar: "روزيه إيكلا",
    notes: "Peony · Lychee · White Musk",
    arNotes: "الفاوانيا · الليتشي · المسك الأبيض",
    gender: "women",
    conc: "edt",
    size: 50,
    price: 890,
    badge: "New",
  },
  {
    img: bottle6.url,
    name: "Jardin d'Or",
    ar: "حديقة الذهب",
    notes: "Bergamot · Jasmine · Cedar",
    arNotes: "البرغموت · الياسمين · الأرز",
    gender: "unisex",
    conc: "edp",
    size: 75,
    price: 1340,
  },
  {
    img: bottle7.url,
    name: "Grenat",
    ar: "غرونا",
    notes: "Cherry · Almond · Benzoin",
    arNotes: "الكرز · اللوز · البنزوين",
    gender: "women",
    conc: "extrait",
    size: 50,
    price: 1750,
  },
  {
    img: bottle8.url,
    name: "Bleu Impérial",
    ar: "بلو إمبريال",
    notes: "Marine · Sage · Ambergris",
    arNotes: "البحرية · المريمية · العنبر",
    gender: "men",
    conc: "edt",
    size: 100,
    price: 960,
  },
  {
    img: bottle9.url,
    name: "Dhahab",
    ar: "ذهب",
    notes: "Saffron · Agarwood · Amber",
    arNotes: "الزعفران · دهن العود · العنبر",
    gender: "unisex",
    conc: "extrait",
    size: 50,
    price: 2850,
    badge: "Limited",
  },
];

const GENDERS: { id: Gender | "all"; en: string; ar: string }[] = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "men", en: "For Him", ar: "رجالي" },
  { id: "women", en: "For Her", ar: "حريمي" },
  { id: "unisex", en: "Unisex", ar: "للجنسين" },
];

const CONCS: { id: Conc | "all"; en: string; ar: string }[] = [
  { id: "all", en: "All", ar: "الكل" },
  { id: "extrait", en: "Extrait", ar: "مركّز" },
  { id: "edp", en: "Eau de Parfum", ar: "أو دو بارفان" },
  { id: "edt", en: "Eau de Toilette", ar: "أو دو تواليت" },
];

const CONC_LABEL: Record<Conc, string> = {
  extrait: "Extrait de Parfum",
  edp: "Eau de Parfum",
  edt: "Eau de Toilette",
};

type ViewMode = "grid" | "list" | "gallery";

function Chip({
  active,
  onClick,
  en,
  ar,
}: {
  active: boolean;
  onClick: () => void;
  en: string;
  ar: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group rounded-full border px-5 py-2 text-[0.7rem] uppercase tracking-[0.28em] transition-all duration-500 ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {en}
      <span className="ar ms-2 text-sm normal-case tracking-normal opacity-70">
        {ar}
      </span>
    </button>
  );
}

function Price({ v }: { v: number }) {
  return <>{v.toLocaleString("en-US")} EGP</>;
}

function ProductCard({ p, mode }: { p: Product; mode: ViewMode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  if (mode === "list") {
    return (
      <article className="hairline group flex items-center gap-6 rounded-lg bg-card/40 p-4 transition-colors duration-500 hover:bg-card/70">
        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-md">
          <img
            src={p.img}
            alt={p.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-2xl font-light text-gold">{p.name}</h3>
            <p className="ar text-base text-foreground/70">{p.ar}</p>
          </div>
          <p className="mt-2 truncate text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            {CONC_LABEL[p.conc]} · {p.notes}
          </p>
        </div>
        <div className="shrink-0 text-end">
          <p className="text-sm text-foreground/85">
            <Price v={p.price} />
          </p>
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            {p.size} ml
          </p>
        </div>
      </article>
    );
  }

  const tall = mode === "gallery";

  return (
    <article
      className="stage-3d group hairline relative overflow-hidden rounded-lg bg-card/40"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({
          y: ((e.clientX - r.left) / r.width - 0.5) * 12,
          x: -((e.clientY - r.top) / r.height - 0.5) * 10,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={`relative overflow-hidden ${tall ? "aspect-[3/5]" : "aspect-[4/5]"}`}
        >
          <img
            src={p.img}
            alt={`${p.name} — ${p.ar} luxury perfume bottle`}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-90" />
          {p.badge && (
            <span className="absolute start-4 top-4 rounded-full border border-primary/40 bg-background/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-primary backdrop-blur-sm">
              {p.badge}
            </span>
          )}
          <span className="absolute end-4 top-4 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            {p.conc}
          </span>
        </div>

        <div className="relative -mt-20 p-7">
          <h3 className="text-3xl font-light text-gold">{p.name}</h3>
          <p className="ar mt-1 text-lg text-foreground/70">{p.ar}</p>
          <div className="shimmer-line mt-4 h-px w-16" />
          <p className="mt-4 text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
            {p.notes}
          </p>
          <p className="ar mt-1 text-sm text-muted-foreground">{p.arNotes}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-foreground/85">
              {p.size} ml · <Price v={p.price} />
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-primary transition-all group-hover:tracking-[0.45em]">
              Discover
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Products() {
  const [gender, setGender] = useState<Gender | "all">("all");
  const [conc, setConc] = useState<Conc | "all">("all");
  const [sort, setSort] = useState<"featured" | "asc" | "desc">("featured");
  const [mode, setMode] = useState<ViewMode>("grid");

  const items = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (gender === "all" || p.gender === gender) &&
        (conc === "all" || p.conc === conc),
    );
    if (sort === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [gender, conc, sort]);

  const layout =
    mode === "list"
      ? "grid-cols-1"
      : mode === "gallery"
        ? "grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="products" className="relative mx-auto max-w-7xl px-6 py-28">
      <header className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
            Boutique
          </p>
          <h2 className="mt-4 text-5xl font-light">
            The <span className="text-gold">Collection</span>
          </h2>
        </div>
        <p className="ar text-2xl font-light text-muted-foreground">
          مجموعة العطور
        </p>
      </header>

      <div className="hairline mb-12 rounded-xl bg-card/30 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="me-2 text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
            Family / الفئة
          </span>
          {GENDERS.map((g) => (
            <Chip
              key={g.id}
              en={g.en}
              ar={g.ar}
              active={gender === g.id}
              onClick={() => setGender(g.id)}
            />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="me-2 text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
            Concentration / التركيز
          </span>
          {CONCS.map((c) => (
            <Chip
              key={c.id}
              en={c.en}
              ar={c.ar}
              active={conc === c.id}
              onClick={() => setConc(c.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            {items.length} Parfums
            <span className="ar ms-3 text-sm normal-case tracking-normal">
              {items.length} عطر
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              {(
                [
                  ["grid", "Grid", "شبكة"],
                  ["gallery", "Gallery", "معرض"],
                  ["list", "List", "قائمة"],
                ] as const
              ).map(([m, en, ar]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.25em] transition-all duration-500 ${
                    mode === m
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {en}
                  <span className="ar ms-1.5 text-xs normal-case tracking-normal">
                    {ar}
                  </span>
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-border bg-transparent px-4 py-2 text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary"
            >
              <option value="featured">Featured · مميز</option>
              <option value="asc">Price ↑ · الأقل سعرًا</option>
              <option value="desc">Price ↓ · الأعلى سعرًا</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`grid gap-8 ${layout}`}>
        {items.map((p, i) => (
          <div
            key={p.name}
            className="animate-rise"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <ProductCard p={p} mode={mode} />
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="ar py-20 text-center text-lg text-muted-foreground">
          لا توجد عطور مطابقة لاختيارك.
        </p>
      )}
    </section>
  );
}

function Story() {
  return (
    <section className="relative overflow-hidden border-y border-border py-32">
      <div className="veil absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">
            Our Craft
          </p>
          <h2 className="mt-5 text-5xl font-light leading-tight">
            Composed in <span className="text-gold">Grasse</span>, matured in Arabia
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every extrait is aged for one hundred and eighty days, blending French
            perfumery with the resins and woods of the Gulf.
          </p>
        </div>
        <div dir="rtl" className="ar md:text-right">
          <p className="text-xs tracking-[0.35em] text-muted-foreground">حرفتنا</p>
          <h2 className="ar mt-5 text-4xl font-light leading-snug">
            تُصاغ في <span className="text-gold">غراس</span>، وتنضج في الجزيرة
          </h2>
          <p className="mt-6 text-base leading-loose text-muted-foreground">
            كل عطر يُعتّق مئة وثمانين يومًا، ليجمع بين فن العطور الفرنسي وأجود الأخشاب
            والرّاتنجات العربية. رائحة تُحكى ولا تُوصف.
          </p>
        </div>
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <span className="text-xl tracking-[0.35em] text-gold">MAISON NUR</span>
        <span className="ar hidden text-lg text-muted-foreground sm:block">
          دار نور للعطور
        </span>
      </div>
      <div className="shimmer-line h-px w-full" />
    </nav>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Collection />
      <Story />
      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-14 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        <span>© 2026 Maison Nur</span>
        <span className="ar text-sm normal-case tracking-normal">
          صُنع بشغف — القاهرة · باريس
        </span>
      </footer>
    </main>
  );
}
