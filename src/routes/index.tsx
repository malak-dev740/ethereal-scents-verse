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

function Collection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <header className="mb-16 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-5xl font-light">
          The <span className="text-gold">Collection</span>
        </h2>
        <p className="ar text-2xl font-light text-muted-foreground">المجموعة</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {SCENES.map((s) => (
          <article
            key={s.name}
            className="stage-3d group hairline relative overflow-hidden rounded-lg bg-card/40"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80" />
            </div>
            <div className="relative -mt-20 p-7">
              <h3 className="text-3xl font-light text-gold">{s.name}</h3>
              <p className="ar mt-1 text-lg text-foreground/70">{s.ar}</p>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.3em] text-muted-foreground">
                {s.notes}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-foreground/80">100 ml · 1,450 EGP</span>
                <span className="text-xs uppercase tracking-[0.3em] text-primary transition-all group-hover:tracking-[0.45em]">
                  Discover
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
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
