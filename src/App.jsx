import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  Store, Trees, Dumbbell, Handshake, Banknote, ArrowUp, Calendar, Waves, Sun, Mountain, Eye
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "Комплекс апартаментов «Паруса Мечты» — Алушта, Профессорский уголок";

  const meta = [
    { name: "description", content: "«Паруса Мечты» в Алуште: апарт‑комплекс в Профессорском уголке, 3 корпуса по 12 этажей, 234 апартамента 36–96 м², подземный паркинг, кладовые, SPA/фитнес и прогулочные зоны. Сдача — I кв. 2027. ДДУ 214‑ФЗ, эскроу." },
    { property: "og:title", content: "Апартаменты «Паруса Мечты» — Алушта" },
    { property: "og:description", content: "Морские виды, хвойный лес, инфраструктура для отдыха и жизни. Планировки: студии, 1‑ и 2‑комнатные, опции white box/под ключ." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-parusa.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"; // море — заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#BFE0D3", backgroundColor: "#FFFFFF", color: "#0E1F17" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #059669 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#3F6A5C" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#BFE0D3", backgroundColor: "#F2FBF7", color: "#0E1F17" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F4FFF9", color: "#0E1F17", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: мягкие зелёные волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E4F7EE 0%, #F4FFF9 45%, #F4FFF9 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#BFE0D3" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#D3EFE5" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: просторные кнопки + grid */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(244,255,249,0.9)", borderColor: "#BFE0D3" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0E1F17", color: "#E4F7EE" }}>P</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">«Паруса Мечты»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#3F6A5C" }}>
                <MapPin size={12} className="inline mr-1" /> Алушта · Профессорский уголок, ул. Сусловой, 3
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О комплексе", "Форматы", "Инженерия", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#plans','#tech','#location','#status','#faq'][i]} className="hover:text-emerald-700 whitespace-nowrap transition-colors" style={{ color: "#3F6A5C" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A7D8C7", color: "#0E1F17" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#059669", color: "#F4FFF9" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#BFE0D3' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О комплексе','#about'],['Форматы','#plans'],['Инженерия','#tech'],['Локация','#location'],['Сроки','#status'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-emerald-50" style={{ color: '#3F6A5C' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#A7D8C7', color: '#0E1F17' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#059669', color: '#F4FFF9' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0E1F17", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Паруса Мечты» — апартаменты среди моря и сосен
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#3F6A5C", maxWidth: 700 }}>
              Три 12‑этажных корпуса в Профессорском уголке Алушты. Панорамы моря и гор, хвойный воздух, инфраструктура для отдыха и жизни: фитнес и SPA, детские и спортивные площадки, стрит‑ритейл. Продажи по ДДУ (214‑ФЗ) с эскроу.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["I кв. 2027 — сдача", <Calendar size={18} key="c" />],["234 апартамента · 36–96 м²", <Ruler size={18} key="r" />],["Подземный паркинг (≈78 мест)", <ParkingSquare size={18} key="p" />],["Кладовые (≈26) и колясочные", <Store size={18} key="s" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#BFE0D3", color: "#0E1F17" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#059669", color: "#F4FFF9" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A7D8C7", color: "#0E1F17" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#BFE0D3" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(191,224,211,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop" alt="Море рядом с комплексом" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="3 корпуса" label="Состав" sub="монолит‑каркас, 12 этажей" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="Проф. уголок" label="Локация" sub="в пешей доступности от моря" icon={<MapPin size={18} />} /></div>
          <div className="h-full"><Stat value="SPA/фитнес" label="Инфраструктура" sub="детские/спортплощадки, ритейл" icon={<Dumbbell size={18} />} /></div>
          <div className="h-full"><Stat value="214‑ФЗ" label="Формат" sub="ДДУ и эскроу‑счета" icon={<ShieldCheck size={18} />} /></div>
        </div>
      </section>

      {/* О КОМПЛЕКСЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О комплексе</h2>
            <p className="mt-4" style={{ color: '#3F6A5C' }}>
              Апарт‑комплекс «Паруса Мечты» расположен в одном из самых зелёных районов Алушты — Профессорском уголке. Хвойный массив и горный рельеф создают особый микроклимат и позволяют наслаждаться морскими видами с разных уровней. Внутри территории — зоны отдыха, детские и спортивные площадки, а также помещения под кафе и сервисы.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировки', t: 'Студии, 1‑ и 2‑комнатные решения 36–96 м²; варианты с большими балконами.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Современные лифты, системы безопасности и контроля доступа.', icon: <CircuitBoard size={18} /> },
                { h: 'Паркинг', t: 'Подземный паркинг с лифтовым доступом; кладовые и колясочные.', icon: <ParkingSquare size={18} /> },
                { h: 'Право и застройщик', t: 'ДДУ 214‑ФЗ, эскроу. Девелопер/оператор проекта — «Перспектива».', icon: <ShieldCheck size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#BFE0D3', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0E1F17' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#3F6A5C' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#D3EFE5', borderColor: '#BFE0D3' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Eye size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#3F6A5C' }}>
              <li><MapPin size={14} className="inline mr-2" /> Алушта, пос. Виноградное, ул. Сусловой, 3</li>
              <li><Calendar size={14} className="inline mr-2" /> Сдача: I квартал 2027</li>
              <li><Store size={14} className="inline mr-2" /> Коммерческие помещения на стилобате</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#059669', color: '#F4FFF9' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ИНЖЕНЕРИЯ И ДВОРЫ */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#E4F7EE' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Инженерия и общественные пространства</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3F6A5C' }}>
              {[
                { t: 'Панорамное остекление, виды на море и горы', icon: <Mountain size={16} /> },
                { t: 'SPA/фитнес‑зона, прогулочные и зелёные дворы', icon: <Dumbbell size={16} /> },
                { t: 'Системы безопасности и контроль доступа', icon: <ShieldCheck size={16} /> },
                { t: 'Коммерция у дома: кафе и полезные сервисы', icon: <Store size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0D3' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Waves size={18} /> Преимущества локации
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#3F6A5C' }}>
              {["Пешком до моря и набережной", "Хвойный лес и чистый воздух", "Тихий квартал без транзита", "Рядом центр Алушты"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F4FFF9', borderColor: '#BFE0D3' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ФОРМАТЫ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки</h2>
          <p className="mt-3" style={{ color: '#3F6A5C' }}>
            Студии, 1‑ и 2‑комнатные апартаменты с балконами/лоджиями. По запросу — PDF с планировками, этажами и типами видов.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные форматы с продуманными сценариями хранения", icon: <Home size={18} /> },
              { t: "1‑комнатные", d: "Кухни‑гостиные, панорамное остекление, балконы", icon: <Home size={18} /> },
              { t: "2‑комнатные", d: "Просторные гостиные, приватные спальни, угловые виды", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0D3' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0E1F17' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3F6A5C' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#047857' }}>Запросить PDF‑каталог планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#E4F7EE' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3F6A5C' }}>
              {[
                'Алушта, пос. Виноградное, ул. Сусловой, 3',
                '15–20 минут пешком до набережной и пляжей Профессорского уголка',
                'Поблизости — кафе, магазины, санаторно‑курортная инфраструктура',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Waves size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#BFE0D3' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%90%D0%BB%D1%83%D1%88%D1%82%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A1%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%D0%B9%2C%203&z=15" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СТАТУС И СРОКИ */}
      <section id="status" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><FileText size={22} /> Сроки и статус</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Срок сдачи", d: "I квартал 2027", icon: <Calendar size={18} /> },
            { t: "Этажность", d: "12 этажей в каждом корпусе", icon: <Building2 size={18} /> },
            { t: "Правовой формат", d: "ДДУ по 214‑ФЗ, расчёты через эскроу", icon: <ShieldCheck size={18} /> },
            { t: "Паркинг", d: "Подземный (около 78 мест) + кладовые (около 26)", icon: <ParkingSquare size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0D3' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#0E1F17' }}>{s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#3F6A5C' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#E4F7EE' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен комплекс?", a: "Республика Крым, г. Алушта, пос. Виноградное, ул. Сусловой, 3 (Профессорский уголок)." },
              { q: "Какие форматы апартаментов?", a: "Студии, 1‑ и 2‑комнатные решения площадью примерно 36–96 м²." },
              { q: "Какая отделка?", a: "White box/без отделки; по запросу — варианты «под ключ»." },
              { q: "Что по инфраструктуре?", a: "SPA/фитнес, детские и спортплощадки, прогулочные зоны, коммерция на первых этажах." },
              { q: "Какой формат сделки и сроки?", a: "ДДУ (214‑ФЗ) с эскроу; ориентир сдачи — I кв. 2027." },
              { q: "Есть ли паркинг и кладовые?", a: "Да, подземный паркинг (~78 мест) и кладовые (~26)." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#BFE0D3' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0E1F17' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#3F6A5C' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где расположен комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, Алушта, пос. Виноградное, ул. Сусловой, 3." } },
            { "@type": "Question", "name": "Какие форматы апартаментов?", "acceptedAnswer": { "@type": "Answer", "text": "Студии, 1‑ и 2‑комнатные решения 36–96 м²." } },
            { "@type": "Question", "name": "Какая отделка?", "acceptedAnswer": { "@type": "Answer", "text": "White box/без отделки; по запросу — «под ключ»." } },
            { "@type": "Question", "name": "Что по инфраструктуре?", "acceptedAnswer": { "@type": "Answer", "text": "SPA/фитнес, детские и спортивные площадки, прогулочные зоны, коммерция." } },
            { "@type": "Question", "name": "Какой формат сделки и сроки?", "acceptedAnswer": { "@type": "Answer", "text": "ДДУ (214‑ФЗ) с эскроу; сдача — I кв. 2027." } },
            { "@type": "Question", "name": "Есть ли паркинг и кладовые?", "acceptedAnswer": { "@type": "Answer", "text": "Подземный паркинг (~78 мест) и кладовые (~26)." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#3F6A5C' }}>
              Пришлём PDF с планировками и типами видов, действующие цены и условия сделки.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#A7D8C7', color: '#0E1F17' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFE0D3' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0E1F17' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#3F6A5C' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0E1F17' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#3F6A5C' }}>
                  Оставьте контакты — вышлем актуальные предложения по «Парусам Мечты».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0D3' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0D3' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0D3' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFE0D3' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#059669', color: '#F4FFF9' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#4C8470' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#4C8470' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#BFE0D3' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#3F6A5C' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0E1F17' }}>
              <Home size={16} /> Комплекс апартаментов «Паруса Мечты»
            </div>
            <p className="mt-2">Республика Крым, г. Алушта, пос. Виноградное, ул. Сусловой, 3</p>
            <p className="mt-1">ДДУ по 214‑ФЗ, расчёты через эскроу‑счета. Девелопер/оператор: «Перспектива».</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "Комплекс апартаментов «Паруса Мечты»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Сусловой, 3",
          "addressLocality": "Алушта",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#059669", color: "#F4FFF9", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
