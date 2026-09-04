import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, Mic2, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0f13] text-[#f7f3ec]">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_72%_18%,#d7573f33,transparent_31%),radial-gradient(circle_at_12%_26%,#6b879122,transparent_28%)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Talk Flow AI home">
            <Image src="/images/logo.jpeg" alt="" width={42} height={42} className="h-10 w-10 rounded-xl object-cover" />
            <span className="text-lg font-semibold tracking-tight">Talk Flow <span className="text-[#f06b55]">AI</span></span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-[#b4b8b7] md:flex">
            <a href="#platform" className="transition hover:text-white">Platform</a>
            <a href="#outcomes" className="transition hover:text-white">Outcomes</a>
            <Link href="/login" className="rounded-full border border-white/15 px-5 py-2.5 text-white transition hover:border-[#f06b55] hover:text-[#f5a08f]">Sign in</Link>
          </div>
          <Link href="/login" className="rounded-full bg-[#e7644d] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_#e7644d33] transition hover:bg-[#f07861] md:hidden">Open app</Link>
        </nav>

        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-28 lg:pt-24">
          <div className="animate-[fade-up_.7s_ease-out_both]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f06b55]/30 bg-[#f06b55]/10 px-3.5 py-2 text-xs font-medium text-[#f5a08f]">
              <Sparkles className="h-3.5 w-3.5" /> Intelligent operations, made human
            </div>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">Turn every conversation into <span className="text-[#f06b55]">forward motion.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#aeb5b4] sm:text-lg">Talk Flow AI gives your team a clear view of every voice interaction, claim, and next step, all in one calm command center.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#e7644d] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_35px_#e7644d40] transition hover:-translate-y-0.5 hover:bg-[#f07861]">Explore the dashboard <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
              <a href="#platform" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-[#d9ddda] transition hover:border-white/35">See what it can do</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#9fa8a6]"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#f06b55]" /> Built for busy teams</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-[#f06b55]" /> One source of truth</span></div>
          </div>

          <div className="relative animate-[fade-up_.8s_.15s_ease-out_both]">
            <div className="absolute -inset-8 rounded-[40px] bg-[#e7644d]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-white/15 bg-[#131a1e] p-3 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#e7644d]" /><span className="text-xs text-[#b7bfbd]">Live operations</span></div><span className="text-[10px] uppercase tracking-[.18em] text-[#7d8987]">Talk Flow / 01</span></div>
              <Image src="/images/project.png" alt="Talk Flow AI analytics dashboard" width={900} height={600} className="mt-3 h-auto w-full rounded-2xl object-cover object-top opacity-90" />
              <div className="grid grid-cols-3 gap-2 p-2 pt-3"><div className="rounded-xl bg-white/5 p-3"><p className="text-[10px] text-[#899391]">Interactions</p><p className="mt-1 text-lg font-semibold">2,841</p><p className="text-[10px] text-[#70c49d]">+18.4%</p></div><div className="rounded-xl bg-white/5 p-3"><p className="text-[10px] text-[#899391]">Resolved</p><p className="mt-1 text-lg font-semibold">94.2%</p><p className="text-[10px] text-[#70c49d]">+6.8%</p></div><div className="rounded-xl bg-[#e7644d]/15 p-3"><p className="text-[10px] text-[#f5a08f]">In progress</p><p className="mt-1 text-lg font-semibold">128</p><p className="text-[10px] text-[#f5a08f]">Live now</p></div></div>
            </div>
          </div>
        </section>
      </div>

      <section id="platform" className="border-y border-white/10 bg-[#10161a] px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#f06b55]">The platform</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Clarity for the conversations that move your business.</h2></div><div className="mt-12 grid gap-4 md:grid-cols-3"><Feature icon={<Mic2 />} title="Hear the signal" text="Bring every AI-assisted call into one searchable, structured workspace." /><Feature icon={<BarChart3 />} title="See the story" text="Spot trends, bottlenecks, and opportunities with reporting your team can trust." /><Feature icon={<ShieldCheck />} title="Move with confidence" text="Keep people, claims, and decisions aligned with a secure admin experience." /></div></div></section>
      <section id="outcomes" className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 text-sm text-[#8f9a97] sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>Built for teams who would rather spend less time searching and more time solving.</p><Link href="/login" className="flex items-center gap-2 font-semibold text-[#f5a08f] hover:text-white">Enter Talk Flow AI <ArrowRight className="h-4 w-4" /></Link></section>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="border-l border-[#e7644d]/50 pl-5"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7644d]/10 text-[#f06b55]">{icon}</div><h3 className="text-lg font-semibold text-white">{title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-[#909b98]">{text}</p></article>;
}
