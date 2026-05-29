import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.hero-bg', 
          { scale: 1.1, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
        )
        .fromTo('.hero-content', 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 
          0.3
        )
        .fromTo('.hero-line', 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.8, ease: 'power2.out' }, 
          0.6
        )
        .fromTo('.hero-sub', 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
          0.8
        );

      // Section animations
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const direction = index % 2 === 0 ? -50 : 50;
        
        gsap.fromTo(section.querySelector('.section-image'),
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.fromTo(section.querySelector('.section-text'),
          { x: -direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate cards within section
        gsap.fromTo(section.querySelectorAll('.animate-card'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (index: number) => {
    if (index === 0) {
      heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sectionsRef.current[index - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-6 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-[rgba(245,242,236,0.05)]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="text-[#F5F2EC] text-2xl font-semibold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            KR8 Music 
          </div>
          <div className="hidden lg:flex gap-10">
            {['Home', 'About', 'Services', 'How It Works', 'Clients', 'Contact'].map((item, i) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(i)} 
                className="nav-link text-xs tracking-[0.15em]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <img 
            src="/images/dubai-skyline-night.jpg" 
            alt="Dubai Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 via-[#0A0A0C]/50 to-[#0A0A0C]" />
        </div>
        
        <div className="hero-content relative z-10 text-center px-8 max-w-4xl">
          <h1 className="text-[clamp(52px,8vw,96px)] font-bold text-[#F5F2EC] tracking-tighter leading-none mb-8" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}>
        
          </h1>
          <div className="hero-line w-32 h-px bg-[#C9A87C] mx-auto mb-8 origin-center" />
          <p className="hero-sub text-[clamp(16px,2vw,22px)] text-[#F5F2EC] tracking-wide mb-4 font-light">
            Curated Music Systems for Hotels & Premium Venues
          </p>
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#9A9590]">
            
          </p>
          <p
  className="mt-4 text-[clamp(24px,4vw,40px)] font-semibold tracking-tight text-[#F5F2EC]"
  style={{ fontFamily: 'Montserrat, sans-serif' }}
>
  KR8 Music 
</p>

        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A87C] to-transparent" />
        </div>
      </section>

      {/* SECTION 1: HOME - Value Proposition */}
      <section ref={el => { sectionsRef.current[0] = el; }} className="min-h-screen py-24 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div className="section-text">
              <p className="section-label mb-6">Home</p>
              <h2 className="text-[clamp(32px,4vw,52px)] font-light text-[#F5F2EC] leading-tight mb-8">
                The music that defines your space experience
              </h2>
              <div className="space-y-6">
                <p className="text-2xl text-[#F5F2EC] font-light">
                  No background music.<br />
                  <span className="text-[#C9A87C]">No generic solutions.</span>
                </p>
                <p className="text-[#9A9590] leading-relaxed text-lg">
                  KR8 Music designs and manages professional music systems for hotels and premium venues that understand music as a strategic part of their brand experience.
                </p>
                <p className="text-[#C9A87C] italic text-sm">
                  A solution designed for spaces where detail matters.
                </p>
              </div>
            </div>
            
            {/* Image Right */}
            <div className="section-image relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="/images/dubai-luxury-pool.jpg" 
                  alt="Luxury Space" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#141416] border border-[rgba(245,242,236,0.1)] p-6 max-w-xs">
                <p className="text-sm text-[#9A9590]">
                  KR8 Music is a complete ecosystem of musical curation and sound management.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-24">
            <div className="animate-card group p-8 border border-[rgba(245,242,236,0.08)] hover:border-[#C9A87C]/30 transition-all duration-300 bg-[#0A0A0C]">
              <div className="w-12 h-px bg-[#C9A87C] mb-6 group-hover:w-20 transition-all duration-300" />
              <h3 className="text-lg font-medium text-[#F5F2EC] mb-4">
                Music is not a detail. It's a strategic decision.
              </h3>
              <p className="text-sm text-[#9A9590] leading-relaxed">
                In premium spaces, music treated as secondary becomes inconsistent. Music directly influences how a space is perceived.
              </p>
            </div>

            <div className="animate-card group p-8 border border-[rgba(245,242,236,0.08)] hover:border-[#C9A87C]/30 transition-all duration-300 bg-[#0A0A0C]">
              <div className="w-12 h-px bg-[#C9A87C] mb-6 group-hover:w-20 transition-all duration-300" />
              <h3 className="text-lg font-medium text-[#F5F2EC] mb-4">
                The KR8 Music Solution
              </h3>
              <p className="text-sm text-[#9A9590] leading-relaxed">
                It's not about choosing songs, but designing a sound experience with professional criteria.
              </p>
            </div>

            <div className="animate-card group p-8 border border-[rgba(245,242,236,0.08)] hover:border-[#C9A87C]/30 transition-all duration-300 bg-[#0A0A0C]">
              <div className="w-12 h-px bg-[#C9A87C] mb-6 group-hover:w-20 transition-all duration-300" />
              <h3 className="text-lg font-medium text-[#F5F2EC] mb-4">
                A system aligned with the real rhythm
              </h3>
              <p className="text-sm text-[#9A9590] leading-relaxed">
                Each space evolves throughout the day. Music should naturally accompany that rhythm.
              </p>
              <p className="text-xs text-[#C9A87C] mt-4 font-mono uppercase tracking-wider">
                Nothing sounds out of place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS KR8 MUSIC */}
      <section ref={el => { sectionsRef.current[1] = el; }} className="min-h-screen py-24 flex items-center bg-[#0d0d0f]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Left */}
            <div className="section-image relative order-2 lg:order-1">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="/images/bg-turntable.jpg" 
                  alt="Turntable" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-[#C9A87C] text-[#0A0A0C] p-4">
                <p className="text-xs font-mono uppercase tracking-wider">Since 2015</p>
              </div>
            </div>

            {/* Text Right */}
            <div className="section-text order-1 lg:order-2">
              <p className="section-label mb-6">What is KR8 Music?</p>
              <h2 className="text-[clamp(28px,3.5vw,44px)] font-light text-[#F5F2EC] leading-tight mb-8">
                A professional music curation and sound management system
              </h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-[#9A9590]">It's not a generic platform.</p>
                <p className="text-[#9A9590]">It's not an automatic solution without criteria.</p>
                <p className="text-[#C9A87C] font-medium">It's a proposal designed for demanding environments.</p>
              </div>

              <div className="space-y-6">
                <div className="animate-card border-l-2 border-[#C9A87C] pl-6">
                  <h4 className="text-[#F5F2EC] font-medium mb-2">Music as part of the space identity</h4>
                  <p className="text-sm text-[#9A9590]">A tool capable of reinforcing brand identity and elevating the overall perception.</p>
                </div>
                <div className="animate-card border-l-2 border-[rgba(245,242,236,0.2)] pl-6 hover:border-[#C9A87C] transition-colors">
                  <h4 className="text-[#F5F2EC] font-medium mb-2">A system designed to accompany day-to-day</h4>
                  <p className="text-sm text-[#9A9590]">Musical structures adapted to the natural rhythm of each space.</p>
                </div>
                <div className="animate-card border-l-2 border-[rgba(245,242,236,0.2)] pl-6 hover:border-[#C9A87C] transition-colors">
                  <h4 className="text-[#F5F2EC] font-medium mb-2">Professional curation as a foundation</h4>
                  <p className="text-sm text-[#9A9590]">Nothing at KR8 Music is random. Content designed and supervised by professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES */}
      <section ref={el => { sectionsRef.current[2] = el; }} className="min-h-screen py-24 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="text-center mb-16">
            <p className="section-label mb-4">KR8 Music Services</p>
            <h2 className="text-[clamp(32px,4vw,52px)] font-light text-[#F5F2EC]">
              A complete musical solution,<br />
              <span className="text-[#C9A87C]">not just a service</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            {/* Large card */}
            <div className="lg:col-span-3 animate-card bg-[#141416] p-10 border border-[rgba(245,242,236,0.08)]">
              <h3 className="text-2xl font-light text-[#F5F2EC] mb-6">
                What all our services include
              </h3>
              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  'Professional musical curation aligned with space identity',
                  'Musical programming adapted to different moments',
                  'Access to the KR8 Music platform',
                  'Guided system management and control',
                  'Intelligent automation options',
                  'Periodic content updates',
                  'Dedicated Account Manager, based in Dubai'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#9A9590]">
                    <span className="text-[#C9A87C] mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Side cards */}
            <div className="lg:col-span-2 space-y-6">
              <div className="animate-card bg-[#141416] p-8 border border-[rgba(245,242,236,0.08)]">
                <h4 className="text-[#F5F2EC] font-medium mb-3">Structured services</h4>
                <p className="text-sm text-[#9A9590]">
                  Clear packages designed to adapt to different spaces and operational needs.
                </p>
              </div>
              <div className="animate-card bg-[#141416] p-8 border border-[rgba(245,242,236,0.08)]">
                <h4 className="text-[#F5F2EC] font-medium mb-3">Tailored solutions</h4>
                <p className="text-sm text-[#9A9590]">
                  Each proposal adjusted to the client's real context and audience type.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section ref={el => { sectionsRef.current[3] = el; }} className="min-h-screen py-24 flex items-center bg-[#0d0d0f]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="mb-16">
            <p className="section-label mb-4">How It Works</p>
            <h2 className="text-[clamp(32px,4vw,52px)] font-light text-[#F5F2EC] max-w-2xl">
              A flexible system, adapted to each space
            </h2>
            <p className="text-[#9A9590] mt-4">
              The difference is in how the ecosystem is deployed, not in the quality level.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Online */}
            <div className="animate-card group relative bg-[#141416] border border-[rgba(245,242,236,0.08)] p-10 hover:border-[#C9A87C]/30 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A87C] to-transparent" />
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-light text-[#C9A87C]">01</span>
                <h3 className="text-2xl font-light text-[#F5F2EC]">KR8 Music Online</h3>
              </div>
              <p className="text-[#9A9590] leading-relaxed mb-6">
                Designed for spaces seeking a professional, agile, and easy-to-implement solution. Access to the curation system, guided management, intelligent automation, and continuous accompaniment.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Cloud-based', 'Quick setup', 'Remote support'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[#0A0A0C] text-[#9A9590]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Offline */}
            <div className="animate-card group relative bg-[#141416] border border-[rgba(245,242,236,0.08)] p-10 hover:border-[#C9A87C]/30 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9A9590] to-transparent" />
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-light text-[#9A9590] group-hover:text-[#C9A87C] transition-colors">02</span>
                <h3 className="text-2xl font-light text-[#F5F2EC]">KR8 Music Offline</h3>
              </div>
              <p className="text-[#9A9590] leading-relaxed mb-6">
                For spaces that need maximum reliability, autonomy, and control. Designed for environments where operational continuity is critical.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Self-hosted', 'Zero downtime', 'Maximum control'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[#0A0A0C] text-[#9A9590]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Advanced option */}
          <div className="animate-card bg-gradient-to-r from-[#141416] to-[#0A0A0C] border border-[rgba(245,242,236,0.08)] p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[#C9A87C]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-[#C9A87C]">★</span>
              </div>
              <div>
                <h4 className="text-xl font-medium text-[#F5F2EC] mb-2">
                  Personalized sound immersion <span className="text-[#C9A87C]">(advanced option)</span>
                </h4>
                <p className="text-[#9A9590] leading-relaxed">
                  A professional DJ from the KR8 Music team works directly in your space, integrating into its real dynamics. The goal: understand the venue's rhythm, observe audience behavior, and refine the sound identity from direct experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLIENTS & VENUES */}
      <section ref={el => { sectionsRef.current[4] = el; }} className="min-h-screen py-24 flex items-center">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Text */}
            <div className="section-text">
              <p className="section-label mb-6">Clients & Venues</p>
              <h2 className="text-[clamp(32px,4vw,52px)] font-light text-[#F5F2EC] leading-tight mb-6">
                We work with spaces where the standard is high
              </h2>
              <p className="text-[#9A9590] leading-relaxed text-lg mb-6">
                KR8 Music works with spaces that understand experience as a whole and care for every detail of their identity.
              </p>
              <p className="text-[#F5F2EC]">
                Our clients share the same vision: <span className="text-[#C9A87C]">music is not a complement, it's an active part of the experience.</span>
              </p>
            </div>

            {/* Image */}
            <div className="section-image">
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src="/images/dubai-hotel-lobby.jpg" 
                  alt="Hotel Lobby" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Venue types */}
          <div className="animate-card bg-[#141416] border border-[rgba(245,242,236,0.08)] p-10 mb-8">
            <h3 className="text-lg font-medium text-[#F5F2EC] mb-6">Types of spaces we work with</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Boutique hotels', 'Luxury hotels', 'Lifestyle resorts',
                'Rooftops', 'Beach clubs', 'Premium restaurants',
                'Lounges', 'Social spaces', 'Lobby areas',
                'Spa', 'Pool areas', 'Transition zones'
              ].map((venue, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 border border-[rgba(245,242,236,0.15)] text-[#9A9590] text-sm hover:border-[#C9A87C] hover:text-[#F5F2EC] transition-all cursor-default"
                >
                  {venue}
                </span>
              ))}
            </div>
            <p className="text-[#C9A87C] mt-6 text-sm">
              Each space has its own rhythm. The system adapts to that rhythm.
            </p>
          </div>

          {/* Three columns */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-card">
              <div className="w-8 h-px bg-[#C9A87C] mb-4" />
              <h4 className="text-[#F5F2EC] font-medium mb-2">Projects with real needs</h4>
              <p className="text-sm text-[#9A9590]">Sound coherence, operational stability, and ability to adapt.</p>
            </div>
            <div className="animate-card">
              <div className="w-8 h-px bg-[#C9A87C] mb-4" />
              <h4 className="text-[#F5F2EC] font-medium mb-2">Trust based on experience</h4>
              <p className="text-sm text-[#9A9590]">Real understanding of how spaces work.</p>
            </div>
            <div className="animate-card">
              <div className="w-8 h-px bg-[#C9A87C] mb-4" />
              <h4 className="text-[#F5F2EC] font-medium mb-2">Each space is different</h4>
              <p className="text-sm text-[#9A9590]">No identical solutions. Each project from its context.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT */}
      <section ref={el => { sectionsRef.current[5] = el; }} className="min-h-screen py-24 flex items-center bg-[#0d0d0f]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Contact info */}
            <div className="section-text">
              <p className="section-label mb-6">Contact</p>
              <h2 className="text-[clamp(40px,5vw,64px)] font-light text-[#F5F2EC] leading-tight mb-8">
                Let's talk about<br />
                <span className="text-[#C9A87C]">your space</span>
              </h2>
              
              <p className="text-[#9A9590] leading-relaxed mb-12 max-w-md">
                KR8 Music works with projects that understand music as a strategic part of the experience. The first step is a direct conversation.
              </p>

              <div className="space-y-8 mb-12">
                <div className="group">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9A9590] mb-2">Email</p>
                  <a 
                    href="mailto:info@kr8music.com" 
                    className="text-2xl text-[#F5F2EC] hover:text-[#C9A87C] transition-colors"
                  >
                    info@kr8music.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9A9590] mb-2">Based in Dubai</p>
                  <p className="text-xl text-[#F5F2EC]">
                    Working with projects across the region
                  </p>
                </div>
              </div>

              <a 
                href="mailto:info@kr8music.com?subject=Project%20Inquiry"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A87C] text-[#0A0A0C] font-medium tracking-wider uppercase hover:bg-[#d4b48a] transition-colors"
              >
                Start a conversation
                <span>→</span>
              </a>
            </div>

            {/* Image */}
            <div className="section-image relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="/images/dubai-luxury-pool.jpg" 
                  alt="Dubai Luxury" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-8 left-8 right-8 bg-[#0A0A0C]/90 backdrop-blur-sm p-6">
                <p className="text-sm text-[#9A9590]">
                  "The music never falls behind."
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-[rgba(245,242,236,0.05)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#9A9590]">
              © KR8 Music 2026
            </p>
            <div className="flex gap-6">
              <span className="text-xs text-[#9A9590]">Dubai</span>
              <span className="text-xs text-[#9A9590]">Abu Dhabi</span>
              <span className="text-xs text-[#9A9590]">Middle East</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
