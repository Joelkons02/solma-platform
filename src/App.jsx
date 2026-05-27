import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';

// --- ICON GRID MODULES FOR THE STRUCTURAL CARDS ---
const BridgeIcon = () => (
  <svg className="w-6 h-6 text-deepCharcoal stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20h18" />
    <path d="M6 20v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
    <path d="M4 12h16" />
    <path d="M12 12v2" />
    <path d="M8 12v2" />
    <path d="M16 12v2" />
    <path d="m3 8 9-4 9 4" />
  </svg>
);

const ElevationIcon = () => (
  <svg className="w-6 h-6 text-deepCharcoal stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h16" />
    <path d="m4 16 6-6 4 4 6-6" />
    <path d="M16 8h4v4" />
  </svg>
);

const DrainageIcon = () => (
  <svg className="w-6 h-6 text-deepCharcoal stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <path d="m17 16-5 5-5-5" />
    <path d="m17 8-5 5-5-5" />
  </svg>
);

const MobilityIcon = () => (
  <svg className="w-6 h-6 text-deepCharcoal stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" />
    <path d="m9 22 2-6v-4l-2-1-1.5 2" />
    <path d="m13 22-2-6" />
    <path d="m12 10 4 1.5 2-1.5" />
    <path d="m17 22-2-6" />
  </svg>
);

const ComplianceIcon = () => (
  <svg className="w-6 h-6 text-deepCharcoal stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// --- SMOOTH FADE IN ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- CINEMATIC FILM GRAIN OVERLAY ---
const GrainOverlay = () => (
  <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

// --- VIDEO MODAL COMPONENT ---
const VideoModal = ({ isOpen, onClose, videoId, closeText = "Close" }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 lg:p-16 backdrop-blur-md">
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="relative w-full z-10 flex flex-col items-center justify-center max-w-xl md:max-w-3xl lg:max-w-5xl max-h-[80vh]"
        >
          <button 
            onClick={onClose}
            className="absolute -top-10 right-0 md:right-2 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest p-2 z-20"
          >
            <span>{closeText}</span>
            <svg className="w-4 h-4 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="w-full aspect-video bg-black overflow-hidden rounded-lg shadow-2xl border border-white/5 dynamic-video-container">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&checkmark=0`}
              title="SOLMA Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeModalId, setActiveModalId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // --- LANGUAGE STATE TRACKING ---
  const [language, setLanguage] = useState('en');
  const t = translations[language] || translations['en'];

  const toggleLanguage = () => setLanguage((lang) => (lang === 'en' ? 'fr' : 'en'));

  // --- FORM STATE MANAGEMENT ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1b44b13c-2b74-4af8-bf8d-55c5e5f59c70",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Operational Message from SOLMA Website"
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('idle');
        alert("Message routing failed. Please verify your connection and try again.");
      }
    } catch (error) {
      setFormStatus('idle');
      alert("Network error. Please check your connection and try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Static tracking mapping for public YouTube deliverables
  const videoIds = {
    docEvidence: "4s9ZxVcjVD4",
    communityMobility: "zm7PlLTpquc"
  };

  return (
    <div className="min-h-screen bg-warmOffWhite text-deepCharcoal font-sans antialiased selection:bg-solmaBlue/20 overflow-x-hidden">
      
      {/* 1. STICKY HEADER WITH ANTI-FLICKER TRANSITION MASKS */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-[80px] md:h-[80px] will-change-transform transform-gpu ${
        isScrolled 
          ? 'bg-warmOffWhite/95 backdrop-blur-md border-b border-concreteGray/40 shadow-[0_4px_30px_rgba(0,0,0,0.04)]' 
          : 'bg-black/10 backdrop-blur-sm border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.15)]'
      }`}>
        {/* Anti-Glitch Canvas Mask */}
        {!isScrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none opacity-40 transform-gpu" />
        )}

        <div className="max-w-[1400px] h-full mx-auto px-6 flex items-center justify-between relative z-10">
          <div className="flex flex-col cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex items-center gap-3">
              <img src="/images/solma_logo.png" alt="SOLMA Foundation" className="h-8 md:h-10 object-contain transition-all duration-300" />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden xl:flex items-center gap-8 text-[13px] font-semibold uppercase tracking-widest transition-colors duration-300 ${isScrolled ? 'text-deepCharcoal/90' : 'text-white/90'}`}>
            {['about', 'problem', 'project', 'phases', 'governance', 'documentation', 'contact'].map((section) => (
              <button 
                key={section} 
                onClick={() => scrollToSection(section)}
                className="hover:text-solmaBlue transition-colors duration-200 relative py-1"
              >
                {t?.[`nav_${section}`] || (section === 'problem' ? 'The Problem' : section)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center">
              <a 
                href="https://chuffed.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-solmaBlue text-white text-[13px] font-semibold tracking-wider uppercase px-7 py-3 rounded-full hover:bg-solmaBlue/90 transition-all shadow-sm"
              >
                {t?.support_project || t?.support_initiative || "Support The Project"}
              </a>
            </div>

            <button 
              className="xl:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`h-0.5 w-6 transition-transform duration-300 ${isScrolled ? 'bg-deepCharcoal' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-2 !bg-deepCharcoal' : ''}`} />
              <span className={`h-0.5 w-6 transition-opacity duration-300 ${isScrolled ? 'bg-deepCharcoal' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-6 transition-transform duration-300 ${isScrolled ? 'bg-deepCharcoal' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-2 !bg-deepCharcoal' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-[80px] left-0 right-0 bg-warmOffWhite border-b border-concreteGray shadow-xl px-6 py-8 flex flex-col gap-6 xl:hidden"
            >
              {['about', 'problem', 'project', 'phases', 'governance', 'documentation', 'contact'].map((section) => (
                <button 
                  key={section} 
                  onClick={() => scrollToSection(section)}
                  className="text-left font-medium uppercase tracking-widest text-sm text-deepCharcoal/90 border-b border-concreteGray/40 pb-2"
                >
                  {t?.[`nav_${section}`] || (section === 'problem' ? 'The Problem' : section)}
                </button>
              ))}
              {/* Mobile Language Switcher button Row */}
              <button 
                onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                className="text-left font-bold uppercase tracking-widest text-sm text-solmaBlue border-b border-concreteGray/40 pb-2"
              >
                {t?.mobile_lang_toggle || "Français"}
              </button>
              <a 
                href="https://chuffed.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-solmaBlue text-white text-center text-sm font-semibold tracking-wider uppercase py-4 px-8 rounded-full w-full md:hidden sm:w-max sm:self-center"
              >
                {t?.support_project || t?.support_initiative || "Support The Project"}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen min-h-[650px] w-full bg-deepCharcoal overflow-hidden flex items-center">
        <GrainOverlay />
        <div className="absolute inset-0 bg-black/30 z-10" />
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none origin-center" 
          style={{ backgroundImage: "url('/images/girl_heroShot_web.jpg')" }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
        />
        
        <div className="relative z-20 max-w-[1400px] mx-auto w-full px-6 pt-20">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4 block">
                {t?.hero_small_label || "COMMUNITY INFRASTRUCTURE REHABILITATION INITIATIVE"}
              </span>
              <h1 className="text-[32px] sm:text-[42px] md:text-[64px] font-bold text-white tracking-[-0.02em] leading-[1.1] mb-6 drop-shadow-lg">
                {t?.hero_title || "Restoring Safe Mobility for the Mewoulou Community"}
              </h1>
              <p className="text-base md:text-lg text-white/90 font-normal leading-[1.8] mb-10 max-w-2xl drop-shadow-md">
                {t?.hero_paragraph || "SOLMA Foundation is coordinating a community-driven infrastructure rehabilitation initiative focused on drainage restoration, bridge reconstruction, road safety, and public mobility resilience in Mewoulou, Yaoundé VI."}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="https://chuffed.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-solmaBlue text-white font-semibold text-[13px] tracking-wider uppercase px-8 py-4 rounded-full text-center hover:bg-solmaBlue/90 transition-all shadow-lg"
                >
                  {t?.support_initiative || "Support the Initiative"}
                </a>
                <button 
                  onClick={() => setActiveModalId(videoIds.docEvidence)}
                  className="bg-white/10 border border-white/30 text-white font-semibold text-[13px] tracking-wider uppercase px-8 py-4 rounded-full text-center hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  {t?.hero_button_watch || "Watch Documentary"}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. APRIL RAINS ALERT SECTION */}
      <section className="py-20 md:py-24 bg-concreteGray/40 border-b border-concreteGray/70">
        <FadeIn className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold tracking-[0.15em] text-earthBrown uppercase block mb-4">{t?.seasonal_risk_label || "Seasonal Emergency Risk"}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-deepCharcoal mb-6">{t?.seasonal_risk_title || "April is only the beginning"}</h2>
          <p className="text-textSecondary text-base md:text-[18px] leading-[1.8] font-normal mb-8">
            {t?.seasonal_risk_p1 || "These images were documented during April rain conditions. In Yaoundé, heavier seasonal rains can intensify flooding, drainage overflow, erosion, unsafe school access, road instability, and mobility challenges for residents, traders, students, pedestrians, and public transport routes."}
          </p>
          <p className="text-textSecondary text-base md:text-[18px] leading-[1.8] font-normal mb-8">
            {t?.seasonal_risk_p2 || "Without early rehabilitation planning, the September rainy period may place greater pressure on community infrastructure and daily movement across the area."}
          </p>
          <p className="text-deepCharcoal font-semibold text-sm italic mb-8">
            {t?.seasonal_risk_p3 || "Early support helps SOLMA move from documentation to technical preparation before conditions worsen."}
          </p>
          <div className="h-[2px] w-16 bg-earthBrown/40 mx-auto" />
        </FadeIn>
      </section>

      {/* 4. ABOUT SOLMA */}
      <section id="about" className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 scroll-mt-20">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-solmaBlue">{t?.about_small_label || "Institutional Identity"}</span>
              <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight">{t?.about_title || "About SOLMA Foundation"}</h2>
              <div className="space-y-4 text-textSecondary text-base md:text-[18px] leading-[1.8]">
                <p>
                  {t?.about_p1 || "SOLMA Foundation is a nonprofit community initiative focused on infrastructure rehabilitation, public mobility, drainage restoration, environmental resilience, and civic coordination within vulnerable urban communities."}
                </p>
                <p>
                  {t?.about_p2 || "The current operational focus is the Mewoulou infrastructure rehabilitation initiative in Yaoundé VI."}
                </p>
                <p>
                  {t?.about_p3 || "The organization works through community participation, administrative coordination, engineering consultation, and transparent project planning to support long-term public infrastructure improvement."}
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-concreteGray rounded-[18px] aspect-square shadow-docMedia flex items-center justify-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/p2_child_motocycle_web.jpg')" }}>
                <span className="text-[11px] text-textSecondary/90 font-medium px-4 py-3 absolute bottom-0 left-0 bg-warmOffWhite/95 backdrop-blur w-full text-center border-t border-concreteGray/50 uppercase tracking-widest">
                  {t?.about_image_caption || "Mewoulou, Yaoundé VI — April 2026"}
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. THE PROBLEM SECTION */}
      <section id="problem" className="py-24 md:py-32 bg-white scroll-mt-20 border-y border-concreteGray/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
              <div className="lg:col-span-5">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-earthBrown mb-3 block">{t?.problem_small_label || "Documentary Evidence"}</span>
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight mb-6 leading-tight">{t?.problem_title || "Infrastructure & Environmental Challenges"}</h2>
                <div className="space-y-4 text-textSecondary text-base md:text-[18px] leading-[1.8]">
                  <p>
                    {t?.problem_p1 || "Flooding, blocked drainage systems, erosion, roadway degradation, and unmanaged waste accumulation continue to affect mobility and environmental conditions in parts of Mewoulou during seasonal rain periods."}
                  </p>
                  <p>
                    {t?.problem_p2 || "Residents, school routes, pedestrians, traders, motorcycles, and local transport circulation are increasingly affected by unstable road access and water overflow conditions."}
                  </p>
                  <div className="mt-8 p-6 border-l-2 border-earthBrown/50 bg-warmOffWhite/40 rounded-r-lg text-sm text-textSecondary/90 space-y-3">
                    <p>{t?.problem_note_p1 || "The current bridge and drainage structure contribute to flooding overflow, road erosion, mobility instability, and difficult pedestrian circulation during rainy conditions."}</p>
                    <p>{t?.problem_note_p2 || "The steep elevation surrounding the infrastructure area has also contributed to safety concerns and reported mobility accidents affecting residents and transport users."}</p>
                  </div>
                </div>
              </div>
              
              {/* Staggered CSS Grid Multi-Column Realism Layout */}
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="rounded-[18px] overflow-hidden shadow-docMedia relative bg-concreteGray aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url('/images/p1_flood_people_web.jpg')` }}>
                     <span className="absolute bottom-4 left-4 text-[10px] text-white/90 font-medium px-3 py-1.5 bg-black/40 backdrop-blur rounded uppercase tracking-widest">{t?.problem_card1_tag || "Flooding Overflow"}</span>
                  </div>
                  <div className="p-6 bg-warmOffWhite/50 border border-concreteGray/50 rounded-[18px]">
                    <h3 className="font-bold text-deepCharcoal mb-2">{t?.problem_card2_title || "School Access Pressure"}</h3>
                    <p className="text-sm text-textSecondary leading-[1.6]">{t?.problem_card2_desc || "Erosion paths directly impacting primary community school foot traffic and local youth movement vectors."}</p>
                  </div>
                  <div className="p-6 bg-warmOffWhite/50 border border-concreteGray/50 rounded-[18px]">
                    <h3 className="font-bold text-deepCharcoal mb-2">{t?.problem_card3_title || "Drainage Obstruction"}</h3>
                    <p className="text-sm text-textSecondary leading-[1.6]">{t?.problem_card3_desc || "Accumulated environmental waste choking standard runoff escape channels and redirecting currents."}</p>
                  </div>
                </div>
                <div className="space-y-6 md:pt-16">
                  <div className="p-6 bg-warmOffWhite/50 border border-concreteGray/50 rounded-[18px]">
                    <h3 className="font-bold text-deepCharcoal mb-2">{t?.problem_card4_title || "Unsafe Public Mobility"}</h3>
                    <p className="text-sm text-textSecondary leading-[1.6]">{t?.problem_card4_desc || "Pedestrians forced onto shifting terrain and steep, slippery slope vectors next to open channels."}</p>
                  </div>
                  <div className="rounded-[18px] overflow-hidden shadow-docMedia relative bg-concreteGray aspect-[4/5] bg-cover bg-center" style={{ backgroundImage: `url('/images/p4_long_road_garbage_web.jpg')` }}>
                     <span className="absolute bottom-4 left-4 text-[10px] text-white/90 font-medium px-3 py-1.5 bg-black/40 backdrop-blur rounded uppercase tracking-widest">{t?.problem_card5_tag || "Waste Accumulation"}</span>
                  </div>
                  <div className="p-6 bg-warmOffWhite/50 border border-concreteGray/50 rounded-[18px]">
                    <h3 className="font-bold text-deepCharcoal mb-2">{t?.problem_card6_title || "Roadway Degradation"}</h3>
                    <p className="text-sm text-textSecondary leading-[1.6]">{t?.problem_card6_desc || "Deep structural degradation restricting local transport circulation, goods exchange, and emergency vehicle access."}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. HUMAN IMPACT */}
      <section className="py-24 md:py-32 bg-warmOffWhite scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-[4/3] bg-concreteGray rounded-[18px] shadow-docMedia bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/p3_woman_walking_web.jpg')" }}>
                  <span className="text-[11px] text-white/90 font-medium p-4 absolute bottom-0 left-0 bg-black/30 backdrop-blur-md w-full text-center uppercase tracking-widest">
                    {t?.human_impact_caption || "Mewoulou, Yaoundé VI — Daily pedestrian navigation"}
                  </span>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6 lg:pl-12">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-solmaBlue">{t?.human_impact_small_label || "Civic Reality"}</span>
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-deepCharcoal leading-tight">{t?.human_impact_title || "Human Impact & Daily Mobility"}</h2>
                <div className="space-y-4 text-textSecondary text-base md:text-[18px] leading-[1.8]">
                  <p>
                    {t?.human_impact_p1 || "Residents continue adapting to difficult environmental and roadway conditions during rainy periods, often navigating unstable pedestrian routes, flooded access points, erosion zones, and compromised mobility corridors."}
                  </p>
                  <p>
                    {t?.human_impact_p2 || "Children, students, traders, and families are among those most directly affected by deteriorating drainage and transportation conditions across these vital community lifelines."}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7 & 8. DOCUMENTARY EVIDENCE & VIDEO SYSTEM */}
      <section id="documentation" className="py-24 md:py-32 bg-deepCharcoal text-white relative overflow-hidden scroll-mt-20">
        <GrainOverlay />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[11px] font-bold tracking-[0.2em] text-earthBrown uppercase block">{t?.doc_evidence_small_label || "Video Manifest 01"}</span>
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight leading-tight">{t?.doc_evidence_title || "Documentary Evidence"}</h2>
                <p className="text-white/70 leading-[1.8] text-base md:text-lg font-light">
                  {t?.doc_evidence_paragraph || "Visual documentation from Mewoulou highlighting environmental, mobility, drainage, and infrastructure conditions affecting surrounding communities. Each segment presents raw, un-embellished tracking frames of daily logistics."}
                </p>
                <button 
                  onClick={() => setActiveModalId(videoIds.docEvidence)}
                className="bg-solmaBlue text-white text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-lg hover:bg-solmaBlue/90 transition-all mt-4"
                >
                  {t?.doc_evidence_button || "Documentary Evidence — 1:12"}
                </button>
              </div>
              <div className="lg:col-span-7">
                <div 
                  className="aspect-video bg-black rounded-xl shadow-2xl relative group cursor-pointer overflow-hidden border border-white/10"
                  onClick={() => setActiveModalId(videoIds.docEvidence)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-solmaBlue flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="w-full h-full bg-cover bg-center mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('/images/thumb-evidence.jpg')" }} />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 order-last lg:order-first">
                <div 
                  className="aspect-video bg-black rounded-xl shadow-2xl relative group cursor-pointer overflow-hidden border border-white/10"
                  onClick={() => setActiveModalId(videoIds.communityMobility)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="w-full h-full bg-cover bg-center mix-blend-luminosity transform group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('/images/thumb-mobility.jpg')" }} />
                </div>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[11px] font-bold tracking-[0.2em] text-earthBrown uppercase block">{t?.community_engagement_small_label || "Video Manifest 02"}</span>
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight leading-tight">{t?.community_engagement_title || "Community Engagement & Local Action"}</h2>
                <p className="text-white/70 leading-[1.8] text-base md:text-lg font-light">
                  {t?.community_engagement_paragraph || "SOLMA works alongside residents, community representatives, and local stakeholders to support documentation, awareness, coordination, and rehabilitation preparation efforts around environmental and infrastructure challenges."}
                </p>
                <button 
                  onClick={() => setActiveModalId(videoIds.communityMobility)}
                className="border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/10 transition-all mt-4 backdrop-blur-sm"
                >
                  {t?.community_engagement_button || "Community Mobility — 1:03"}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. CURRENT PROJECT */}
      <section id="project" className="py-24 md:py-32 max-w-[1400px] mx-auto px-6 scroll-mt-20">
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-solmaBlue mb-3 block">{t?.project_small_label || "Technical Blueprint"}</span>
            <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight mb-6 leading-tight">{t?.project_title || "Mewoulou Bridge & Drainage Rehabilitation Initiative"}</h2>
            <div className="space-y-4 text-textSecondary text-base md:text-[18px] leading-[1.8]">
              <p>
                {t?.project_p1 || "SOLMA Foundation is coordinating an early-stage infrastructure rehabilitation initiative focused on drainage improvement, bridge rehabilitation planning, safer pedestrian mobility, environmental recovery, and roadway stabilization in Mewoulou, Yaoundé VI."}
              </p>
              <p>
                {t?.project_p2 || "The initiative is designed to encourage structured collaboration between community stakeholders, municipal authorities, technical construction professionals, and local administrative structures to support safe and sustainable implementation."}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BridgeIcon />, tag: "01", title: t?.project_c1_title || "New Bridge Construction", desc: t?.project_c1_desc || "Raised reinforced public bridge structure designed to withstand severe runoff pressure points." },
              { icon: <ElevationIcon />, tag: "02", title: t?.project_c2_title || "2.5m Road Elevation", desc: t?.project_c2_desc || "Reducing dangerous slope instability and optimizing safer traffic transitions across structural paths." },
              { icon: <DrainageIcon />, tag: "03", title: t?.project_c3_title || "Drainage Rehabilitation", desc: t?.project_c3_desc || "Expanding internal channel dimensions to resolve long-term water backing and structural flooding." },
              { icon: <MobilityIcon />, tag: "04", title: t?.project_c4_title || "Mobility Safety", desc: t?.project_c4_desc || "Targeted corridor safety reinforcements explicitly sheltering schools, pedestrians, and transport users." }
            ].map((component, idx) => (
              <div key={idx} className="bg-white border border-concreteGray/60 p-8 rounded-[18px] shadow-sm flex flex-col justify-between group hover:shadow-docMedia hover:border-concreteGray transition-all duration-500">
                <div>
                  <div className="flex items-center justify-between border-b border-concreteGray/40 pb-5 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-warmOffWhite flex items-center justify-center text-deepCharcoal group-hover:bg-solmaBlue/10 group-hover:text-solmaBlue transition-colors duration-500">
                      {component.icon}
                    </div>
                    <span className="text-[11px] font-bold text-textSecondary/50 tracking-[0.2em]">{component.tag}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-deepCharcoal group-hover:text-solmaBlue transition-colors duration-500">{component.title}</h3>
                  <p className="text-sm text-textSecondary leading-[1.7]">{component.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16 p-8 md:p-12 bg-white border border-concreteGray/50 rounded-[18px] shadow-sm">
            <h3 className="text-2xl font-bold tracking-tight text-deepCharcoal mb-6">{t?.project_note_title1 || "Road Safety & Elevation Concerns"}</h3>
            <div className="space-y-4 text-textSecondary text-base leading-[1.8]">
              <p>{t?.project_note_p1 || "Current roadway and bridge access conditions in parts of Mewoulou present mobility and safety challenges during rainy periods, particularly around steep slope transitions, erosion zones, and flooded pedestrian access routes."}</p>
              <p>{t?.project_note_p1_2 || t?.project_note_p2 || "Proposed rehabilitation considerations include safer elevation transitions, improved drainage flow, and more stable mobility access intended to reduce roadway and environmental safety risks affecting residents, schools, pedestrians, motorcycles, and local transport circulation."}</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 10. IMPLEMENTATION PHASES */}
      <section id="phases" className="py-24 md:py-32 bg-white scroll-mt-20 border-t border-concreteGray/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-earthBrown mb-3 block">{t?.phases_small_label || "Project Lifecycle"}</span>
              <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight mb-6 leading-tight">{t?.phases_title || "Phased Implementation Framework"}</h2>
              <p className="text-textSecondary text-base md:text-[18px] leading-[1.8]">
                {t?.phases_paragraph || "Infrastructure rehabilitation activities requiring structural engineering standards, bridge planning, and public roadway safety considerations are split across independent verification milestones."}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-8 max-w-5xl">
            {[
              { 
                phase: "Phase 1", 
                title: t?.phase1_title || "Assessment, Coordination & Technical Preparation", 
                status: t?.phase1_status || "Active Focus", 
                timeline: t?.phase1_time || "MAY — JUNE 2026", 
                items: t?.phase1_items || ["environmental documentation", "drainage assessment", "technical consultations", "preliminary bridge planning", "mobility assessment", "institutional coordination", "administrative preparation", "operational structuring", "community engagement"], 
                style: "border-l-[3px] border-solmaBlue bg-warmOffWhite/40" 
              },
              { 
                phase: "Phase 2", 
                title: t?.phase2_title || "Rehabilitation Mobilization & Site Preparation", 
                status: t?.phase2_status || "Planned", 
                timeline: t?.phase2_time || "JULY — AUGUST 2026", 
                items: t?.phase2_items || ["environmental clearing coordination", "temporary mobility preparation", "municipal logistics coordination", "equipment preparation", "rehabilitation scheduling", "community mobilization support"], 
                style: "border-l-[3px] border-concreteGray bg-transparent" 
              },
              { 
                phase: "Phase 3", 
                title: t?.phase3_title || "Infrastructure Rehabilitation Execution", 
                status: t?.phase3_status || "Future Implementation", 
                timeline: t?.phase3_time || "SEPTEMBER 2026 — JANUARY 2027", 
                items: t?.phase3_items || ["bridge rehabilitation implementation", "roadway stabilization", "drainage rehabilitation", "erosion mitigation support", "safer mobility improvements"], 
                note: t?.phase3_note || "Technical implementation activities are expected to involve qualified construction and engineering coordination aligned with public infrastructure safety considerations.",
                style: "border-l-[3px] border-concreteGray bg-transparent" 
              }
            ].map((p, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className={`p-8 md:p-10 rounded-r-[18px] border-y border-r border-concreteGray/40 ${p.style}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <span className="text-sm font-bold uppercase tracking-widest text-deepCharcoal">{p.phase} — {p.title}</span>
                    <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded w-fit ${idx === 0 ? 'bg-solmaBlue/10 text-solmaBlue' : 'bg-concreteGray/50 text-textSecondary'}`}>{p.status}</span>
                  </div>
                  {/* Dynamic Timeline Subheader row */}
                  <div className="text-xs font-mono text-earthBrown font-bold uppercase tracking-wider mt-1 mb-5">
                    <span>{t?.phases_timeline_label || "Timeline"}: {p.timeline}</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-textSecondary leading-[1.6]">
                    {p.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-earthBrown/40 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {p.note && (
                    <div className="mt-8 p-5 bg-concreteGray/20 border border-concreteGray/50 rounded-lg text-sm text-textSecondary leading-[1.7] italic">
                      {p.note}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 p-6 bg-solmaBlue/5 border-l-2 border-solmaBlue text-sm text-deepCharcoal/90 max-w-4xl leading-[1.7] rounded-r-lg">
              <span className="font-bold uppercase tracking-wider text-[11px] block mb-2 text-solmaBlue">{t?.phases_donation_statement_label || "Donation Execution Statement:"}</span>
              {t?.phases_donation_statement_text || "SOLMA Foundation is currently focused on early-stage project preparation, documentation, technical coordination, and community mobilization to support long-term infrastructure rehabilitation efforts. Support contributions help sustain operational preparation activities and future implementation readiness."}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 11. TECHNICAL & INSTITUTIONAL COORDINATION */}
      <section className="py-24 md:py-32 bg-warmOffWhite border-t border-concreteGray/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-deepCharcoal mb-6">{t?.coord_title1 || "Municipal & Administrative Coordination"}</h3>
                <div className="space-y-4 text-textSecondary text-base leading-[1.8]">
                  <p>{t?.coord_p1_1 || "The initiative is developed with awareness of local administrative procedures and community governance structures within Yaoundé VI."}</p>
                  <p>{t?.coord_p1_2 || "SOLMA seeks collaborative coordination with municipal stakeholders, quarter heads, local representatives, and relevant administrative authorities to encourage transparent and responsible implementation processes."}</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-deepCharcoal mb-6">{t?.coord_title2 || "Technical Infrastructure Planning"}</h3>
                <div className="space-y-4 text-textSecondary text-base leading-[1.8]">
                  <p>{t?.coord_p2_1 || "Infrastructure rehabilitation activities requiring structural engineering standards, bridge planning, and public roadway safety considerations are intended to involve qualified technical construction professionals and recognized public works expertise."}</p>
                  <p>{t?.coord_p2_2 || "SOLMA aims to collaborate with experienced construction and engineering actors during later implementation phases to support compliance with infrastructure safety expectations and sustainable execution practices."}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 12. GOVERNANCE & TRANSPARENCY */}
      <section id="governance" className="py-24 md:py-32 bg-white border-t border-concreteGray/50 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-solmaBlue flex items-center gap-2">
                  <ComplianceIcon /> {t?.governance_small_label || "Civic Integrity"}
                </span>
                <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight leading-tight">{t?.governance_title || "Governance & Operational Transparency"}</h2>
                <div className="space-y-4 text-textSecondary text-base md:text-[18px] leading-[1.8]">
                  <p>
                    {t?.governance_p1 || t?.governance_paragraph || "SOLMA Foundation operates as a formally structured nonprofit association with active administrative compliance, banking structure, and community-centered coordination processes intended to support responsible project management and transparent rehabilitation efforts."}
                  </p>
                  <p>
                    {t?.governance_p2 || "The initiative is structured around: nonprofit association governance, administrative compliance, financial organization, project documentation, institutional coordination, engineering consultation, and community participation."}
                  </p>
                  <p>
                    {t?.governance_p3 || "The project approach also includes communication with local administrative stakeholders, community representatives, and neighborhood leadership structures to support responsible infrastructure planning and public trust."}
                  </p>
                </div>
                
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-textSecondary font-medium">
                  {[
                    t?.governance_items?.[0] || "Association Legal Registration", 
                    t?.governance_items?.[1] || "NIU / Tax Compliance Identity", 
                    t?.governance_items?.[2] || "Official Bank Attestation Structures", 
                    t?.governance_items?.[3] || "Institutional Consultation Paths"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-warmOffWhite/50 border border-concreteGray/60 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-solmaBlue flex-shrink-0" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 lg:pl-10">
                <div className="p-10 bg-warmOffWhite border border-concreteGray rounded-[18px] shadow-sm space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-solmaBlue/5 rounded-bl-full" />
                  <h4 className="text-[11px] font-bold tracking-[0.15em] text-earthBrown uppercase relative z-10">{t?.governance_note_title || "Municipal & Administrative Balance"}</h4>
                  <p className="text-base text-deepCharcoal/90 leading-[1.8] relative z-10 font-medium">
                    {t?.governance_note_p1 || "The initiative is developed with full awareness of local administrative procedures and community governance structures within Yaoundé VI. SOLMA seeks collaborative coordination with municipal stakeholders, quarter heads, local representatives, and relevant administrative authorities to encourage transparent and responsible implementation processes."}
                  </p>
                  <div className="h-[1px] bg-concreteGray w-full my-6 relative z-10" />
                  <p className="text-sm text-textSecondary/80 italic relative z-10 leading-[1.7]">
                    <span className="font-semibold text-deepCharcoal not-italic">{t?.governance_note_p2 || "Verification Record Note:"}</span> {t?.governance_note_p2_text || "No political endorsements or non-public agreements are integrated within the governance structures of this foundation."}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 13. SDG ALIGNMENT */}
      <section className="py-24 bg-concreteGray/20 border-y border-concreteGray/50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-[11px] font-bold tracking-[0.15em] text-textSecondary uppercase block mb-4">{t?.sdg_small_label || "Global Alignment"}</span>
            <h2 className="text-[32px] font-bold tracking-tight text-deepCharcoal mb-6">{t?.sdg_title || "Sustainable Development Goals"}</h2>
            <p className="text-textSecondary max-w-2xl mx-auto text-base leading-[1.8] mb-16">
              {t?.sdg_paragraph || "The Mewoulou infrastructure rehabilitation initiative directly maps to the United Nations framework for urban resilience, systemic public safety tracking, and humanitarian mobility parameters."}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto justify-items-center items-center">
              {[
                { 
                  inv: language === 'en' ? "/images/E_WEB_INVERTED_03.png" : "/images/F_SDG_inverted_WEB-03.png", 
                  col: language === 'en' ? "/images/E_WEB_03.png" : "/images/F-WEB-Goal-03.png", 
                  alt: "SDG 3 — Good Health & Wellbeing" 
                },
                { 
                  inv: language === 'en' ? "/images/E_WEB_INVERTED_06.png" : "/images/F_SDG_inverted_WEB-06.png", 
                  col: language === 'en' ? "/images/E_WEB_06.png" : "/images/F-WEB-Goal-06.png", 
                  alt: "SDG 6 — Clean Water & Sanitation" 
                },
                { 
                  inv: language === 'en' ? "/images/E_WEB_INVERTED_09.png" : "/images/F_SDG_inverted_WEB-09.png", 
                  col: language === 'en' ? "/images/E_WEB_09.png" : "/images/F-WEB-Goal-09.png", 
                  alt: "SDG 9 — Industry, Innovation & Infrastructure" 
                }
              ].map((sdg, idx) => (
                <div key={idx} className="w-full max-w-[220px] aspect-square p-4 border border-concreteGray rounded-[18px] bg-white flex items-center justify-center shadow-sm cursor-pointer relative group transition-all duration-300 hover:border-solmaBlue/30 hover:shadow-md">
                  <img 
                    src={sdg.inv} 
                    alt={sdg.alt} 
                    className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0 pointer-events-none"
                  />
                  <img 
                    src={sdg.col} 
                    alt={`${sdg.alt} Color`} 
                    className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-20 max-w-xl mx-auto">
              <img 
                src={language === 'en' ? "/images/E_SDG_logo_Square_Transparent_WEB.png.png" : "/images/F_SDG_logo_Square_Transparent_WEB.png.png"} 
                alt="UN Sustainable Development Goals Framework" 
                className="h-14 mx-auto object-contain"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 14. FUTURE VISION */}
      <section className="py-24 bg-white text-center">
        <FadeIn className="max-w-3xl mx-auto px-6">
          <span className="text-[11px] font-bold tracking-[0.15em] text-earthBrown uppercase block mb-4">{t?.vision_small_label || "Long Term Outlook"}</span>
          <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight mb-6">{t?.vision_title || "The Evolution of SOLMA"}</h2>
          <p className="text-textSecondary text-base md:text-[18px] leading-[1.8]">
            {t?.vision_paragraph || "Beyond the current rehabilitation initiative, SOLMA aims to support future community-centered efforts related to sanitation, environmental resilience, safer public infrastructure, and sustainable mobility conditions in vulnerable urban environments across the sub-region."}
          </p>
        </FadeIn>
      </section>

      {/* 15. CONTACT / SUPPORT */}
      <section id="contact" className="py-24 md:py-32 bg-warmOffWhite scroll-mt-20 border-t border-concreteGray/50">
        <div className="max-w-[1400px] mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-solmaBlue block mb-3">{t?.contact_small_label || "Communications Control"}</span>
                  <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-deepCharcoal leading-tight">{t?.contact_title || "Contact SOLMA"}</h2>
                </div>
                <p className="text-textSecondary leading-[1.8] text-base md:text-lg font-normal">
                  {t?.contact_paragraph || "For administrative inquiries, institutional coordination protocols, or high-fidelity asset verification requests, use the verified channels below."}
                </p>
                <div className="space-y-4 text-base text-deepCharcoal pt-4">
                  <p className="flex items-center gap-3">
                    <span className="font-bold text-[11px] tracking-widest uppercase text-textSecondary w-32">{t?.contact_email_label || "Email Contact"}</span> 
                    <a href="mailto:support@solmafoundation.org" className="hover:text-solmaBlue transition-colors font-medium">support@solmafoundation.org</a>
                  </p>
                  <div className="h-[1px] w-full bg-concreteGray/60" />
                  <p className="flex items-center gap-3">
                    <span className="font-bold text-[11px] tracking-widest uppercase text-textSecondary w-32">{t?.contact_registry_label || "Registry Info"}</span> 
                    <a href="mailto:info@solmafoundation.org" className="hover:text-solmaBlue transition-colors font-medium">info@solmafoundation.org</a>
                  </p>
                  <div className="h-[1px] w-full bg-concreteGray/60" />
                  <p className="flex items-start gap-3">
                    <span className="font-bold text-[11px] tracking-widest uppercase text-textSecondary w-32 pt-0.5">{t?.contact_hq_label || "HQ Location"}</span> 
                    <span className="font-medium leading-relaxed text-textSecondary">{t?.contact_hq_val || "Yaoundé VI, Center Region, Cameroon"}</span>
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="bg-white p-8 md:p-10 rounded-[18px] border border-concreteGray/80 shadow-sm">
                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-solmaBlue/10 flex items-center justify-center text-solmaBlue mb-2">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-deepCharcoal">{t?.form_success_title || "Message Received"}</h3>
                      <p className="text-sm text-textSecondary max-w-sm">{t?.form_success_msg || "Your operational message has been successfully routed to the SOLMA Foundation registry. We will review and respond shortly."}</p>
                      <button onClick={() => setFormStatus('idle')} className="mt-4 text-[11px] font-bold uppercase tracking-widest text-solmaBlue hover:text-deepCharcoal transition-colors">
                        {t?.form_submit_another || "Submit Another Inquiry"}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] font-bold tracking-widest uppercase text-deepCharcoal/80">{t?.form_name_label || "Full Name"}</label>
                          <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="p-4 border border-concreteGray/80 rounded bg-warmOffWhite/20 text-sm outline-none focus:border-solmaBlue transition-colors" placeholder={t?.form_name_placeholder || "Enter your full identity details..."} />
                        </div>
                        <div className="flex flex-col gap-2.5">
                          <label className="text-[11px] font-bold tracking-widest uppercase text-deepCharcoal/80">{t?.form_email_label || "Email Address"}</label>
                          <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="p-4 border border-concreteGray/80 rounded bg-warmOffWhite/20 text-sm outline-none focus:border-solmaBlue transition-colors" placeholder={t?.form_email_placeholder || "Enter your contact vector..."} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-end">
                          <label className="text-[11px] font-bold tracking-widest uppercase text-deepCharcoal/80">{t?.form_message_label || "Message Body"}</label>
                          <span className={`text-[10px] font-bold tracking-widest ${formData.message.length > 1900 ? 'text-red-500' : 'text-textSecondary/60'}`}>{formData.message.length} / 2000</span>
                        </div>
                        <textarea required maxLength={2000} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="p-4 border border-concreteGray/80 rounded bg-warmOffWhite/20 text-sm outline-none focus:border-solmaBlue resize-none transition-colors" placeholder={t?.form_message_placeholder || "Type your official communication content here..."}></textarea>
                      </div>
                      <button disabled={formStatus === 'submitting'} type="submit" className="w-full bg-deepCharcoal text-white text-[12px] font-bold uppercase tracking-widest py-4 rounded hover:bg-solmaBlue disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm">
                        {formStatus === 'submitting' ? (t?.form_routing || 'Routing Message...') : (t?.form_submit || 'Submit Operational Message')}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-deepCharcoal text-white py-20 relative overflow-hidden">
        <GrainOverlay />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Centered Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-[12px] uppercase tracking-widest font-bold text-white mb-12">
            {['about', 'project', 'governance', 'contact'].map((link) => (
              <button key={link} onClick={() => scrollToSection(link)} className="hover:text-concreteGray/60 transition-colors">{t?.[`nav_${link}`] || link}</button>
            ))}
            <a href="https://chuffed.org" target="_blank" rel="noopener noreferrer" className="hover:text-concreteGray/60 transition-colors">{t?.nav_donate || "Donate"}</a>
          </div>

          {/* Scaled Social Logos */}
          <div className="flex items-center justify-center gap-8 mb-16">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <img src="/images/InBug-White.png" alt="LinkedIn" className="h-6 md:h-7 object-contain" />
            </a>
            <a href="https://www.youtube.com/@Solmafoundation" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <img src="/images/yt_icon_white_digital.png" alt="YouTube" className="h-6 md:h-7 object-contain" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <img src="/images/Facebook_Logo_Secondary.png" alt="Facebook" className="h-6 md:h-7 object-contain" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <img src="/images/Instagram_Glyph_White.png" alt="Instagram" className="h-6 md:h-7 object-contain" />
            </a>
          </div>

          <div className="h-[1px] bg-white/10 w-full max-w-4xl mb-16" />

          {/* Bottom Center Logo & Copyright */}
          <img 
            src="/images/solma_logo_darkmode.png" 
            alt="SOLMA Foundation" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-10 md:h-12 object-contain cursor-pointer hover:opacity-70 transition-opacity mb-8" 
          />

          <div className="space-y-2 max-w-lg">
            <p className="text-sm text-white leading-[1.8] font-light mb-4">
              {t?.footer_tagline || "Community-centered infrastructure rehabilitation and environmental mobility resilience initiative."}
            </p>
            <p className="text-xs text-white/90 font-semibold tracking-wider">
              Solution Optimale et Libre pour un Mewoulou Assaini
            </p>
            <p className="text-[11px] text-white/90 italic tracking-wider">
              An optimal initiative for a safer, cleaner, and healthier Mewoulou
            </p>
            <p className="text-[10px] text-white uppercase tracking-widest font-semibold mt-12 pt-4">
              {t?.footer_copyright || "© 2026 SOLMA Foundation. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>

      {/* GLOBAL MOUNTED VIDEO PORTAL LAYER */}
      <VideoModal 
        isOpen={activeModalId !== null} 
        onClose={() => setActiveModalId(null)} 
        videoId={activeModalId} 
        closeText={t?.modal_close || "Close"}
      />

      {/* FLOATING LANGUAGE TOGGLE SWITCH */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        onClick={toggleLanguage}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-deepCharcoal/95 backdrop-blur-md text-white border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-full px-5 py-3 flex items-center justify-center gap-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-solmaBlue hover:border-solmaBlue transition-all duration-300 group"
      >
        <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{language === 'en' ? 'FRANÇAIS' : 'ENGLISH'}</span>
      </motion.button>

    </div>
  );
}