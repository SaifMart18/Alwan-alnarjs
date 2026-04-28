/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Gift, 
  Flower2, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Sparkles,
  Ghost
} from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';
import { translations, Language, Translations } from './translations';

const LanguageContext = createContext<{
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

const useLanguage = () => useContext(LanguageContext);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#' },
    { name: t.nav.collections, href: '#collections' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-lavender-300 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm overflow-hidden">
            <Flower2 size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold text-slate-800 leading-tight">{t.brandName}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-lavender-400 font-medium tracking-widest uppercase">{t.brandNameAr}</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-sans text-sm font-medium text-slate-600 hover:text-lavender-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLang}
            className="flex items-center gap-1 font-sans text-xs font-bold text-slate-500 hover:text-lavender-400 transition-colors px-3 py-1 rounded-full border border-slate-200"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          <a 
            href="https://wa.me/966552109482" 
            target="_blank" 
            rel="no-referrer"
            className="bg-lavender-300 hover:bg-lavender-400 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span>{t.nav.orderNow}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 flex flex-col items-center gap-6 md:hidden border-t border-slate-100"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-lg font-medium text-slate-600 hover:text-lavender-400"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
              className="font-sans text-lg font-bold text-lavender-400"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <a 
              href="https://wa.me/966552109482" 
              target="_blank" 
              rel="no-referrer"
              className="bg-lavender-300 text-white px-8 py-3 rounded-full text-base font-semibold shadow-md flex items-center gap-2"
            >
              <MessageCircle size={20} />
              <span>{t.nav.orderNow}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-50">
      {/* Background Image / Decoration */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Flowers Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${t.dir === 'rtl' ? 'from-white/0 via-white/50 to-white/90' : 'from-white/90 via-white/50 to-transparent'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: t.dir === 'rtl' ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-100 text-lavender-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>{t.hero.tag}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            {t.hero.title1} <br />
            <span className="text-gradient">{t.hero.title2}</span>
          </h1>
          <p className="font-sans text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            {t.hero.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/966552109482" 
              className="bg-lavender-300 hover:bg-lavender-400 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group text-center"
            >
              {t.hero.ctaPrimary}
              <ChevronRight size={18} className={`group-hover:translate-x-1 transition-transform ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
            </a>
            <a 
              href="#collections" 
              className="bg-white border border-slate-200 hover:border-lavender-300 text-slate-800 px-10 py-4 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center justify-center text-center"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
             <div className={`flex ${t.dir === 'rtl' ? 'space-x-reverse -space-x-3' : '-space-x-3'}`}>
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                 </div>
               ))}
             </div>
             <div className="text-sm">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <p className="text-slate-500 font-medium">{t.hero.happyCustomers}</p>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1563241527-3004b7be0fab?q=80&w=1000&auto=format&fit=crop" 
              alt="Beautiful bouquet" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Decorative floating elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-lavender-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Categories = () => {
  const { t } = useLanguage();
  const categories = [
    {
      title: t.collections.items.giftBags.title,
      description: t.collections.items.giftBags.desc,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      color: 'bg-lavender-50'
    },
    {
      title: t.collections.items.flowerBoxes.title,
      description: t.collections.items.flowerBoxes.desc,
      image: 'https://lh3.googleusercontent.com/d/1rQEybS2FBrU4vsgjJgZpIMC9tXruIkdK',
      color: 'bg-pink-50'
    },
    {
      title: t.collections.items.vases.title,
      description: t.collections.items.vases.desc,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop',
      color: 'bg-purple-50'
    },
    {
      title: t.collections.items.balloons.title,
      description: t.collections.items.balloons.desc,
      image: 'https://lh3.googleusercontent.com/d/1oSb-Ggp8VyX0EzJ4EWvqW8jfJ78JZDe3',
      color: 'bg-blue-50'
    },
    {
      title: t.collections.items.candles.title,
      description: t.collections.items.candles.desc,
      image: 'https://lh3.googleusercontent.com/d/1a7xQ5X8RbXI7mjBzwXtZyFz7OaQBPjFB',
      color: 'bg-lavender-50'
    },
    {
      title: t.collections.items.cakes.title,
      description: t.collections.items.cakes.desc,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=600&auto=format&fit=crop',
      color: 'bg-orange-50'
    },
  ];

  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t.collections.title}</h2>
          <div className="w-24 h-1 bg-lavender-300 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto font-sans">
            {t.collections.desc}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group overflow-hidden rounded-3xl ${cat.color} border border-transparent hover:border-lavender-200 transition-all shadow-sm hover:shadow-xl`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">{cat.title}</h3>
                <p className="font-sans text-slate-600 text-sm mb-6 leading-relaxed">
                  {cat.description}
                </p>
                <a 
                  href={`https://wa.me/966552109482?text=I'm interested in ${cat.title}`} 
                  target="_blank"
                  rel="no-referrer"
                  className="inline-flex items-center gap-2 text-lavender-400 font-bold hover:text-lavender-600 transition-colors"
                >
                  {t.collections.explore}
                  <ChevronRight size={18} className={t.dir === 'rtl' ? 'rotate-180' : ''} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const features = [
    { title: t.features[0].title, desc: t.features[0].desc, icon: <Flower2 className="text-lavender-400" size={32} /> },
    { title: t.features[1].title, desc: t.features[1].desc, icon: <Sparkles className="text-lavender-400" size={32} /> },
    { title: t.features[2].title, desc: t.features[2].desc, icon: <CheckCircle2 className="text-lavender-400" size={32} /> },
    { title: t.features[3].title, desc: t.features[3].desc, icon: <Gift className="text-lavender-400" size={32} /> },
  ];

  return (
    <section id="about" className="py-24 bg-lavender-50/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center text-center border border-slate-100"
            >
              <div className="w-16 h-16 bg-lavender-50 rounded-full flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="font-sans text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const reviews = t.testimonials.reviews.map((r, i) => ({ ...r, stars: 5 }));

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">{t.testimonials.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="flex text-amber-400 mb-4">
                {[...Array(r.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="font-sans text-slate-600 mb-8 italic leading-relaxed">"{r.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-lavender-100 flex items-center justify-center uppercase font-bold text-lavender-400 text-xs">
                  {r.name.charAt(0)}
                </div>
                <span className="font-sans font-bold text-slate-800">{r.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  const { t } = useLanguage();
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: t.dir === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10 border-8 border-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" 
                alt="About Alwan Al Narjis" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Graphic Element */}
            <div className={`absolute -bottom-10 ${t.dir === 'rtl' ? '-left-10' : '-right-10'} z-20 w-48 h-48 bg-lavender-300 p-1 rounded-full shadow-2xl flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0 duration-500 overflow-hidden`}>
              <div className="w-full h-full rounded-full border-4 border-dashed border-white/30 flex flex-col items-center justify-center text-white font-serif text-center p-6">
                <Flower2 size={32} className="mb-2" />
                <span className="text-[10px] font-bold leading-tight uppercase tracking-widest">Handcrafted with Heart</span>
              </div>
            </div>
            
            {/* Subtle floating circles */}
            <div className={`absolute -top-10 ${t.dir === 'rtl' ? '-right-10' : '-left-10'} w-32 h-32 bg-lavender-100 rounded-full blur-2xl opacity-50`}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: t.dir === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-50 text-lavender-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>{t.nav.about}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.aboutSection.title}</h2>
            <h4 className="font-sans text-xl font-medium text-lavender-400 mb-8">{t.aboutSection.subtitle}</h4>
            <div className={`w-20 h-1 bg-lavender-300 rounded-full mb-10 ${t.dir === 'rtl' ? 'ml-auto' : ''}`}></div>
            <p className="font-sans text-slate-600 text-lg leading-relaxed mb-10">
              {t.aboutSection.description}
            </p>

            <div className="space-y-8">
              {(t.aboutSection.features as any[]).map((f, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-lavender-50 flex items-center justify-center text-lavender-400 shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-slate-900 mb-1">{f.title}</h5>
                    <p className="font-sans text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a 
                href="https://wa.me/966552109482" 
                target="_blank" 
                className="inline-flex items-center gap-2 bg-lavender-300 hover:bg-lavender-400 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all group"
              >
                <span>{t.nav.orderNow}</span>
                <ChevronRight size={18} className={`group-hover:translate-x-1 transition-transform ${t.dir === 'rtl' ? 'rotate-180' : ''}`} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative element */}
      <div className={`absolute top-0 ${t.dir === 'rtl' ? 'left-0' : 'right-0'} w-96 h-96 bg-lavender-50 rounded-full blur-3xl -z-10 ${t.dir === 'rtl' ? '-translate-x-1/2' : 'translate-x-1/2'} -translate-y-1/2`}></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t.contact.title}</h2>
          <p className="font-sans text-slate-600 mb-10 text-lg leading-relaxed">
            {t.contact.desc}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-lavender-50 rounded-full flex items-center justify-center text-lavender-300 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 mb-1 leading-snug">{t.contact.call}</h4>
                <p className="font-sans text-slate-600 leading-snug">0552109482</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-lavender-50 rounded-full flex items-center justify-center text-lavender-300 shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 mb-1 leading-snug">{t.contact.whatsapp}</h4>
                <p className="font-sans text-slate-600 leading-snug">0552109482</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-lavender-50 rounded-full flex items-center justify-center text-lavender-300 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-slate-900 mb-1 leading-snug">{t.contact.visit}</h4>
                <p className="font-sans text-slate-600 leading-snug">{t.contact.visitDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 relative">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1 font-sans">{t.contact.form.name}</label>
              <input 
                type="text" 
                placeholder={t.contact.form.namePlaceholder} 
                className="w-full bg-slate-50 border-transparent focus:border-lavender-200 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1 font-sans">{t.contact.form.phone}</label>
              <input 
                type="tel" 
                placeholder={t.contact.form.phonePlaceholder}
                className="w-full bg-slate-50 border-transparent focus:border-lavender-200 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 ml-1 font-sans">{t.contact.form.message}</label>
              <textarea 
                rows={4} 
                placeholder={t.contact.form.messagePlaceholder}
                className="w-full bg-slate-50 border-transparent focus:border-lavender-200 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all resize-none font-sans"
              ></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-colors shadow-lg font-sans">
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-serif text-3xl font-bold text-center mb-12">{t.location}</h2>
        <div className="w-full h-[500px] rounded-[40px] overflow-hidden shadow-xl border-4 border-white">
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.3284061559815!2d46.7214736!3d24.6811444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x66f4cd4e062c3e44!2sAlwan%20Al%20Narjis!5e0!3m2!1s${t.dir === 'rtl' ? 'ar' : 'en'}!2ssa!4v1714210000000!5m2!1s${t.dir === 'rtl' ? 'ar' : 'en'}!2ssa`} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-lavender-300 rounded-full flex items-center justify-center text-white border-2 border-slate-800 shadow-xl overflow-hidden">
                  <Flower2 size={24} />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight">{t.brandName}</span>
             </div>
             <p className="font-sans text-slate-400 text-sm leading-relaxed mb-8 max-w-md">
               {t.footer.desc}
             </p>
             <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/flowerinlife" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-lavender-300 hover:border-lavender-300 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="https://www.snapchat.com/add/roselifehywrd" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-lavender-300 hover:border-lavender-300 transition-all">
                  <Ghost size={18} />
                </a>
                <a href="https://wa.me/966552109482" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-lavender-300 hover:border-lavender-300 transition-all">
                  <MessageCircle size={18} />
                </a>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-lavender-300 font-sans">{t.footer.quickLinks}</h4>
            <ul className="font-sans space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">{t.nav.home}</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">{t.nav.collections}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-lavender-300 font-sans">{t.footer.services}</h4>
            <ul className="font-sans space-y-4 text-slate-400 text-sm">
              {t.footer.serviceList.map(s => (
                <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

        </div>
      </div>
        
        <div className="pt-12 border-t border-slate-800 text-center text-slate-500 text-[10px] sm:text-xs">
          <p>© {new Date().getFullYear()} {t.brandName}. {t.footer.rights}</p>
        </div>
      
      {/* Background Graphic */}
      <div className={`absolute -bottom-20 ${t.dir === 'rtl' ? '-left-20' : '-right-20'} w-80 h-80 bg-lavender-300/5 rounded-full blur-3xl`}></div>
    </footer>
  );
};

const WhatsAppButton = () => {
  const { t } = useLanguage();
  return (
    <motion.a 
      href="https://wa.me/966552109482" 
      target="_blank" 
      rel="no-referrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 ${t.dir === 'rtl' ? 'left-6' : 'right-6'} z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] transition-all`}
    >
      <MessageCircle size={32} />
      <span className={`absolute -top-1 ${t.dir === 'rtl' ? '-left-1' : '-right-1'} w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold`}>1</span>
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic as requested earlier

  useEffect(() => {
    document.documentElement.dir = translations[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div className={`font-sans text-slate-900 bg-white selection:bg-lavender-100 ${lang === 'ar' ? 'rtl-grid' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <Categories />
          <Features />
          <Testimonials />
          <AboutUs />
          <Contact />
          <Location />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageContext.Provider>
  );
}
