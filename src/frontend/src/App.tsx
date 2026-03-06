import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Droplets,
  Footprints,
  Heart,
  Menu,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Star,
  Thermometer,
  Video,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ---------- Intersection Observer Hook ----------
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ---------- Sparkline SVG ----------
function Sparkline({ color = "#0ea5e9" }: { color?: string }) {
  return (
    <svg
      width="80"
      height="28"
      viewBox="0 0 80 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 20 L10 16 L20 18 L30 10 L40 14 L50 8 L60 12 L70 6 L80 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="sparkline-path"
      />
    </svg>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features", ocid: "nav.features.link" },
    {
      label: "How It Works",
      href: "#how-it-works",
      ocid: "nav.howitworks.link",
    },
    { label: "Dashboard", href: "#dashboard", ocid: "nav.dashboard.link" },
    { label: "Chat", href: "#chat", ocid: "nav.chat.link" },
    {
      label: "Testimonials",
      href: "#testimonials",
      ocid: "nav.testimonials.link",
    },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-blur border-b border-border shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-display font-bold text-xl tracking-tight"
          >
            <span className="text-navy dark:text-white">
              <span className="text-teal">Flip</span>Watch
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-navy transition-colors rounded-lg hover:bg-sky-light"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-ocid="nav.getstarted.link"
              onClick={() => scrollTo("#get-started")}
              className="ml-2 px-4 py-2 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy-dark transition-colors shadow-xs"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-sky-light transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={20} className="text-navy" />
            ) : (
              <Menu size={20} className="text-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden nav-blur border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.ocid}
                href={link.href}
                data-ocid={link.ocid}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-navy rounded-lg hover:bg-sky-light transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              data-ocid="nav.getstarted.link"
              onClick={() => scrollTo("#get-started")}
              className="block w-full px-4 py-3 text-sm font-semibold text-white bg-navy rounded-lg text-center mt-2"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ---------- Hero Section ----------
function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden hero-gradient min-h-screen flex items-center pt-16">
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-teal/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-navy/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div
            className="order-2 lg:order-1 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-teal/20 shadow-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-semibold text-navy tracking-wide uppercase">
                Medical-Grade Wearable Tech
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-navy-dark mb-6">
              Your Health,{" "}
              <span className="relative">
                <span className="text-teal">Always</span>
              </span>{" "}
              in Hand
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed mb-8 max-w-lg">
              VitalSync monitors your vitals 24/7 and connects you directly with
              your doctor — all from your wrist.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "5+", label: "Vitals tracked" },
                { value: "24/7", label: "Monitoring" },
                { value: "<30s", label: "Doctor connect" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-navy">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/55 font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                data-ocid="hero.primary_button"
                className="bg-navy hover:bg-navy-dark text-white font-semibold px-8 h-12 rounded-xl shadow-navy-lg transition-all hover:shadow-navy-lg hover:-translate-y-0.5"
                onClick={() => scrollTo("#get-started")}
              >
                Get Early Access
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.secondary_button"
                className="border-navy/20 text-navy hover:bg-sky-light font-semibold px-8 h-12 rounded-xl transition-all hover:-translate-y-0.5"
                onClick={() => scrollTo("#how-it-works")}
              >
                See How It Works
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-2 mt-8 text-sm text-foreground/50">
              <ShieldCheck size={14} className="text-teal" />
              <span>FDA-cleared • HIPAA compliant • CE marked</span>
            </div>
          </div>

          {/* Device image */}
          <div
            className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-up"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full bg-teal/10 blur-3xl scale-110" />
              <div className="absolute inset-0 rounded-full bg-navy/5 blur-2xl scale-125" />

              {/* Device image */}
              <img
                src="/assets/generated/flipwatch-hero-device.dim_800x700.png"
                alt="VitalSync medical smartwatch"
                className="relative w-[320px] sm:w-[380px] lg:w-[440px] xl:w-[480px] animate-float drop-shadow-2xl"
                style={{
                  filter:
                    "drop-shadow(0 30px 60px oklch(0.26 0.065 240 / 0.25))",
                }}
              />

              {/* Floating cards */}
              <div
                className="absolute top-8 -left-8 glass-card rounded-2xl px-4 py-3 shadow-card animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-red-500 animate-heartbeat" />
                  <div>
                    <div className="text-xs text-foreground/50 font-medium">
                      Heart Rate
                    </div>
                    <div className="font-display font-bold text-navy text-sm">
                      72 BPM
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-16 -right-8 glass-card rounded-2xl px-4 py-3 shadow-card animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <Droplets size={16} className="text-teal" />
                  <div>
                    <div className="text-xs text-foreground/50 font-medium">
                      SpO₂
                    </div>
                    <div className="font-display font-bold text-navy text-sm">
                      98%
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-1/2 -right-12 glass-card rounded-2xl px-4 py-3 shadow-card animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="text-xs font-semibold text-navy">
                    Dr. Chen online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 64L1440 64L1440 32C1200 0 960 0 720 32C480 64 240 64 0 32Z"
            fill="oklch(0.99 0.003 240)"
          />
        </svg>
      </div>
    </section>
  );
}

// ---------- Features Section ----------
function FeaturesSection() {
  const { ref, inView } = useInView();

  const features = [
    {
      icon: <Heart className="text-red-400" size={28} />,
      title: "Vitals Tracking",
      description:
        "Continuous monitoring of heart rate, blood pressure, SpO₂, body temperature, and daily steps — all with clinical-grade accuracy.",
      bg: "bg-red-50",
      accent: "border-red-100",
    },
    {
      icon: <MessageCircle className="text-teal" size={28} />,
      title: "Doctor Chat",
      description:
        "Instant in-app messaging with your physician. Share vital readings, ask questions, and receive guidance without waiting for an appointment.",
      bg: "bg-sky-light",
      accent: "border-teal/10",
    },
    {
      icon: <Video className="text-navy" size={28} />,
      title: "Video Consultations",
      description:
        "High-definition live video and audio calls with your care team. Connect with your doctor from anywhere, any time.",
      bg: "bg-navy/5",
      accent: "border-navy/10",
    },
    {
      icon: <BarChart3 className="text-amber-500" size={28} />,
      title: "Health Dashboard",
      description:
        "Real-time data visualization with trend analysis, health score tracking, and smart alerts when readings fall outside your normal range.",
      bg: "bg-amber-50",
      accent: "border-amber-100",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-widest uppercase mb-4">
              Core Features
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-dark mb-4">
              Everything You Need to Stay Healthy
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed">
              One wristband. Infinite peace of mind. VitalSync brings
              hospital-quality monitoring to your daily life.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className={`w-14 h-14 ${feature.bg} border ${feature.accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-navy-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- How It Works Section ----------
function HowItWorksSection() {
  const { ref, inView } = useInView();

  const steps = [
    {
      number: "01",
      icon: <Smartphone size={20} className="text-white" />,
      title: "Set Up Your VitalSync",
      description:
        "Charge the device fully, download the VitalSync app on iOS or Android, and create your secure health account.",
    },
    {
      number: "02",
      icon: <Activity size={20} className="text-white" />,
      title: "Pair & Personalize",
      description:
        "Enable Bluetooth and pair your watch in seconds. Enter your health profile, medications, and set personalized alert thresholds.",
    },
    {
      number: "03",
      icon: <Heart size={20} className="text-white" />,
      title: "Monitor Your Vitals",
      description:
        "View live heart rate, SpO₂, blood pressure, temperature, and steps right on the app's real-time dashboard.",
    },
    {
      number: "04",
      icon: <MessageCircle size={20} className="text-white" />,
      title: "Connect with Your Doctor",
      description:
        "Tap the Chat icon to message your physician directly, or schedule a live video consultation anytime it's convenient.",
    },
    {
      number: "05",
      icon: <Bell size={20} className="text-white" />,
      title: "Respond to Health Alerts",
      description:
        "Receive smart notifications when a vital reading is outside your normal range. Tap to view details and contact your doctor instantly.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-sky-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/10 text-navy font-semibold text-xs tracking-widest uppercase mb-4">
              Getting Started
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-dark mb-4">
              Getting Started is Simple
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed">
              From unboxing to your first doctor consultation in under 10
              minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5 bg-gradient-to-r from-teal/20 via-teal/60 to-teal/20" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step circle */}
                  <div className="relative mb-5">
                    <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center shadow-navy-lg z-10 relative">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold shadow-teal-md z-20">
                      {i + 1}
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-navy-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Vitals Dashboard Preview ----------
function DashboardSection() {
  const { ref, inView } = useInView();

  const vitals = [
    {
      icon: <Heart size={16} className="text-red-400" />,
      label: "Heart Rate",
      value: "72",
      unit: "BPM",
      status: "Normal",
      statusColor: "text-green-400",
      sparkColor: "#f87171",
    },
    {
      icon: <Activity size={16} className="text-blue-400" />,
      label: "Blood Pressure",
      value: "118/76",
      unit: "mmHg",
      status: "Optimal",
      statusColor: "text-green-400",
      sparkColor: "#60a5fa",
    },
    {
      icon: <Droplets size={16} className="text-sky-400" />,
      label: "SpO₂",
      value: "98",
      unit: "%",
      status: "Excellent",
      statusColor: "text-green-400",
      sparkColor: "#38bdf8",
    },
    {
      icon: <Thermometer size={16} className="text-orange-400" />,
      label: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "Normal",
      statusColor: "text-green-400",
      sparkColor: "#fb923c",
    },
    {
      icon: <Footprints size={16} className="text-teal-400" />,
      label: "Steps Today",
      value: "8,432",
      unit: "steps",
      status: "84% of goal",
      statusColor: "text-teal-400",
      sparkColor: "#2dd4bf",
    },
  ];

  return (
    <section id="dashboard" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-widest uppercase mb-4">
                Live Dashboard
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-dark mb-5">
                Your Health at a Glance
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                The VitalSync app delivers a real-time health dashboard that
                updates every second. Track trends, spot anomalies, and share
                data directly with your care team.
              </p>

              <ul className="space-y-3">
                {[
                  "Continuous 24/7 vital sign monitoring",
                  "7-day and 30-day trend graphs",
                  "Personalized normal range baselines",
                  "Instant doctor data sharing",
                  "Automated health reports",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-foreground/70"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-teal" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="phone-frame w-64 sm:w-72">
                {/* Phone notch */}
                <div className="phone-screen">
                  {/* App header */}
                  <div className="px-4 pt-8 pb-4 bg-gradient-to-b from-[oklch(0.15_0.045_240)] to-[oklch(0.12_0.04_235)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/50 text-xs">9:41 AM</span>
                      <div className="flex gap-1">
                        <span className="w-4 h-2 bg-white/30 rounded-sm" />
                        <span className="w-3 h-2 bg-green-400 rounded-sm" />
                      </div>
                    </div>
                    <h3 className="text-white font-display font-bold text-lg">
                      Health Dashboard
                    </h3>
                    <p className="text-white/40 text-xs mt-0.5">
                      Today's Summary · Tue, Mar 4
                    </p>

                    {/* Health score */}
                    <div className="mt-4 bg-white/10 rounded-2xl p-3 flex items-center justify-between">
                      <div>
                        <div className="text-white/50 text-xs mb-1">
                          Health Score
                        </div>
                        <div className="text-white font-display font-bold text-3xl">
                          92
                        </div>
                        <div className="text-green-400 text-xs font-medium">
                          ↑ 3 from yesterday
                        </div>
                      </div>
                      <div className="relative w-16 h-16">
                        <svg
                          viewBox="0 0 64 64"
                          className="w-full h-full -rotate-90"
                          aria-hidden="true"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="5"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="oklch(0.55 0.14 210)"
                            strokeWidth="5"
                            strokeDasharray="176"
                            strokeDashoffset="14"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          92%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vitals grid */}
                  <div className="bg-[oklch(0.12_0.04_235)] px-3 pb-6">
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {vitals.slice(0, 4).map((vital) => (
                        <div
                          key={vital.label}
                          className="bg-white/5 rounded-2xl p-3 vital-card-glow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1">
                              {vital.icon}
                              <span className="text-white/40 text-xs">
                                {vital.label}
                              </span>
                            </div>
                          </div>
                          <div className="font-display font-bold text-white text-lg leading-none">
                            {vital.value}
                            <span className="text-white/40 text-xs font-normal ml-1">
                              {vital.unit}
                            </span>
                          </div>
                          <div
                            className={`text-xs font-medium mt-1 ${vital.statusColor}`}
                          >
                            {vital.status}
                          </div>
                          <div className="mt-2">
                            <Sparkline color={vital.sparkColor} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Steps full width */}
                    <div className="bg-white/5 rounded-2xl p-3 vital-card-glow mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {vitals[4].icon}
                          <span className="text-white/40 text-xs">
                            {vitals[4].label}
                          </span>
                        </div>
                        <span
                          className={`text-xs font-semibold ${vitals[4].statusColor}`}
                        >
                          {vitals[4].status}
                        </span>
                      </div>
                      <div className="font-display font-bold text-white text-xl mt-1">
                        {vitals[4].value}
                        <span className="text-white/40 text-xs font-normal ml-1">
                          {vitals[4].unit}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal rounded-full"
                          style={{ width: "84%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Doctor Chat Preview ----------
function ChatSection() {
  const { ref, inView } = useInView();

  const messages = [
    {
      sender: "patient",
      name: "You",
      text: "Hi Dr. Chen, my heart rate has been elevated today — hitting 105 BPM this afternoon.",
      time: "2:14 PM",
    },
    {
      sender: "doctor",
      name: "Dr. Chen",
      text: "Thanks for the update. I can see your readings in the dashboard. Have you had any chest discomfort or shortness of breath?",
      time: "2:16 PM",
    },
    {
      sender: "patient",
      name: "You",
      text: "No chest pain, but I've felt a bit anxious. Could that be causing it?",
      time: "2:18 PM",
    },
    {
      sender: "doctor",
      name: "Dr. Chen",
      text: "Yes, anxiety is a common cause of elevated heart rate. Try some deep breathing exercises. If it stays above 100 BPM for more than 2 hours, message me again.",
      time: "2:20 PM",
    },
    {
      sender: "patient",
      name: "You",
      text: "Thank you, Doctor. I'll keep an eye on it and try to relax.",
      time: "2:22 PM",
    },
  ];

  return (
    <section id="chat" className="py-20 lg:py-28 bg-sky-light/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Chat mockup */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="w-full max-w-sm bg-white rounded-3xl shadow-navy-lg overflow-hidden border border-border">
                {/* Chat header */}
                <div className="bg-navy px-5 py-4 flex items-center gap-3">
                  {/* Doctor avatar */}
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">EC</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm truncate">
                      Dr. Emily Chen
                    </div>
                    <div className="text-white/50 text-xs truncate">
                      Cardiologist
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-500/20 px-2.5 py-1 rounded-full flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-300 text-xs font-medium">
                      Online
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="px-4 py-4 space-y-3 bg-sky-light/30 min-h-72 max-h-80 overflow-y-auto">
                  {/* Date divider */}
                  <div className="text-center">
                    <span className="text-xs text-foreground/40 bg-white/70 px-3 py-1 rounded-full">
                      Today
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={`${msg.sender}-${msg.time}`}
                      className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] ${msg.sender === "patient" ? "" : "flex gap-2 items-end"}`}
                      >
                        {msg.sender === "doctor" && (
                          <div className="w-6 h-6 rounded-full bg-navy flex-shrink-0 flex items-center justify-center mb-1">
                            <span className="text-white text-xs font-bold">
                              E
                            </span>
                          </div>
                        )}
                        <div>
                          <div
                            className={`px-4 py-2.5 text-sm leading-relaxed ${
                              msg.sender === "patient"
                                ? "chat-bubble-patient"
                                : "chat-bubble-doctor"
                            }`}
                          >
                            {msg.text}
                          </div>
                          <div
                            className={`text-xs text-foreground/35 mt-1 ${msg.sender === "patient" ? "text-right" : "text-left ml-1"}`}
                          >
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input area */}
                <div className="px-4 py-3 bg-white border-t border-border flex items-center gap-2">
                  <div className="flex-1 bg-sky-light rounded-full px-4 py-2 text-sm text-foreground/40 select-none">
                    Message Dr. Chen...
                  </div>
                  <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-teal flex items-center justify-center flex-shrink-0"
                    aria-label="Send message"
                  >
                    <ArrowRight size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Text content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/10 text-navy font-semibold text-xs tracking-widest uppercase mb-4">
                Doctor Chat
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-dark mb-5">
                Talk to Your Doctor Instantly
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                No waiting rooms. No phone tag. VitalSync's secure messaging
                connects you directly with your physician — with your real-time
                vitals automatically shared in every conversation.
              </p>

              <ul className="space-y-3">
                {[
                  "End-to-end encrypted messaging",
                  "Automatic vital data sharing",
                  "Average response time under 30 minutes",
                  "Schedule video calls from chat",
                  "Prescription requests & refills",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-foreground/70"
                  >
                    <span className="w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-navy" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials Section ----------
function TestimonialsSection() {
  const { ref, inView } = useInView();

  const testimonials = [
    {
      quote:
        "VitalSync has completely changed how I manage my heart condition. I feel safe knowing my doctor can see my vitals in real time. I haven't had a single scary episode without immediate support.",
      name: "Maria T.",
      role: "Patient · Heart Condition",
      initials: "MT",
      bg: "bg-rose-100",
      stars: 5,
    },
    {
      quote:
        "As a cardiologist, having continuous patient vitals between appointments has dramatically improved my care quality. I can intervene before a minor issue becomes a major one.",
      name: "Dr. James Okafor",
      role: "Cardiologist · 18 years experience",
      initials: "JO",
      bg: "bg-sky-mid",
      stars: 5,
    },
    {
      quote:
        "I used to worry about my blood pressure every single day. Now I just check the app and message my doctor if something looks off. It's peace of mind I never thought I'd have.",
      name: "Robert K.",
      role: "Patient · Hypertension Management",
      initials: "RK",
      bg: "bg-teal/20",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-widest uppercase mb-4">
              Testimonials
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-dark mb-4">
              Trusted by Patients and Doctors
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed">
              Real voices from real users who've transformed their healthcare
              journey with VitalSync.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].slice(0, t.stars).map((n) => (
                    <Star
                      key={n}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed text-foreground/70 flex-1 mb-6">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-navy font-bold text-sm">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy-dark text-sm">
                      {t.name}
                    </div>
                    <div className="text-foreground/50 text-xs mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
            {[
              { icon: <ShieldCheck size={18} />, label: "HIPAA Compliant" },
              { icon: <Check size={18} />, label: "FDA-Cleared Sensors" },
              { icon: <Activity size={18} />, label: "Clinical Accuracy" },
              { icon: <Star size={18} />, label: "4.9/5 App Store Rating" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-foreground/50 text-sm font-medium"
              >
                <span className="text-teal">{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA / Get Started Section ----------
function CTASection() {
  const { ref, inView } = useInView();
  const { actor } = useActor();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please fill in all fields.");
      setStatus("error");
      return;
    }
    if (!actor) {
      setErrorMsg("Unable to connect. Please try again.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      await actor.submitSignup(name.trim(), email.trim());
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section
      id="get-started"
      className="py-20 lg:py-28 bg-navy relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/3 blur-3xl" />
        {/* Geometric grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="600"
              stroke="white"
              strokeWidth="1"
            />
          ))}
          {[0, 100, 200, 300, 400, 500, 600].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className={`section-fade ${inView ? "visible" : ""}`}>
          <div className="max-w-2xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal/20 text-teal-light font-semibold text-xs tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Early Access
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Be the First to Experience VitalSync
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Join our early access waitlist and get notified when VitalSync
              launches. Priority access, exclusive pricing, and 3 months free
              premium for waitlist members.
            </p>

            {status === "success" ? (
              <div
                data-ocid="cta.success_state"
                className="bg-teal/20 border border-teal/30 rounded-2xl px-8 py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-teal-light" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  You're on the list!
                </h3>
                <p className="text-white/60 text-sm">
                  We'll notify you as soon as VitalSync launches. Watch your
                  inbox for exclusive updates and early access details.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <Input
                  type="text"
                  placeholder="First Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="cta.name.input"
                  disabled={status === "loading"}
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-teal focus-visible:border-teal"
                  autoComplete="given-name"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="cta.email.input"
                  disabled={status === "loading"}
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus-visible:ring-teal focus-visible:border-teal"
                  autoComplete="email"
                  required
                />
                <Button
                  type="submit"
                  data-ocid="cta.submit_button"
                  disabled={status === "loading"}
                  className="h-12 px-6 bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl shadow-teal-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    <>
                      Join Waitlist
                      <ChevronRight size={16} className="ml-1" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p
                data-ocid="cta.error_state"
                className="text-red-300 text-sm mt-3 text-center"
              >
                {errorMsg}
              </p>
            )}

            <p className="text-white/35 text-xs mt-4">
              No spam, ever. Unsubscribe anytime. We protect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Dashboard", href: "#dashboard" },
    { label: "Chat", href: "#chat" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-2xl text-white mb-3">
              <span className="text-teal">Flip</span>Watch
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Medical-grade wearable technology connecting patients and doctors
              for better health outcomes.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <ShieldCheck size={14} className="text-teal" />
              <span className="text-white/40 text-xs">
                HIPAA Compliant · FDA-Cleared
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs uppercase tracking-widest mb-4">
              Contact & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@flipwatch.health"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  contact@flipwatch.health
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {year} VitalSync. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">
            Built with <span className="text-teal">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ---------- Main App ----------
export default function App() {
  return (
    <div className="min-h-screen font-body antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DashboardSection />
        <ChatSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
