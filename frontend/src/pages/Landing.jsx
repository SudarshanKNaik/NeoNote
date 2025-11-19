import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import { Rocket, Play, Brain, Film, Languages, UserCog, BookOpen, FileText, Sparkles, Video, ArrowRight, GraduationCap } from 'lucide-react';

const Landing = () => {
  const featureCardsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe feature cards
    featureCardsRef.current.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      }
    });


    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 dark:bg-gold/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text                                                                   -gold" />
              <span className="text-sm font-semibold text-gold">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-navy dark:text-white leading-tight">
              Where Learning Finds Meaning
              <span className="block text-gold mt-2">|</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Convert your text, notes, and documents into personalized explainer videos in your preferred language. 
              <span className="block mt-2 font-medium text-navy dark:text-white">Learning made simple, fast, and engaging.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/get-started">
                <Button variant="primary" className="w-full sm:w-auto text-lg px-8 py-4 group">
                  <Rocket className="w-5 h-5 inline mr-2 group-hover:translate-x-1 transition-transform" />
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Educational Animation Container - Desktop */}
          <div className="relative hidden lg:flex items-center justify-center h-[600px]">
            <div className="relative w-full max-w-[700px] h-full">
              
              {/* Step 1: Notebook/Document Input */}
              <div className="absolute left-0 top-20 w-64 bg-white dark:bg-navy rounded-2xl shadow-2xl p-6 animate-float border-2 border-gold/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-gold/20 rounded w-24 mb-2"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {['Introduction to...', 'Key Concepts:', 'Examples:', 'Summary:'].map((text, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 font-medium flex-1 truncate">{text}</div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${60 + i * 8}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span>Your Notes</span>
                </div>
              </div>

              {/* Step 2: AI Processing Center with Educational Elements */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                {/* Main AI Brain */}
                <div className="relative w-40 h-40 bg-gradient-to-br from-gold via-gold-light to-gold rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <Brain className="w-20 h-20 text-navy z-10" />
                  
                  {/* Rotating Educational Icons */}
                  <div className="absolute inset-0 animate-rotate-slow">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-white dark:bg-navy rounded-lg flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-white dark:bg-navy rounded-lg flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-white dark:bg-navy rounded-lg flex items-center justify-center shadow-lg">
                        <Languages className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                      <div className="w-8 h-8 bg-white dark:bg-navy rounded-lg flex items-center justify-center shadow-lg">
                        <Film className="w-5 h-5 text-gold" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Pulsing Rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                {/* Processing Text */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gold font-semibold">
                    <Sparkles className="w-4 h-4 animate-sparkle" />
                    <span>AI Processing...</span>
                    <Sparkles className="w-4 h-4 animate-sparkle" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>

              {/* Step 3: Video Output */}
              <div className="absolute right-0 bottom-16 w-72 bg-white dark:bg-navy rounded-2xl shadow-2xl overflow-hidden animate-float-delayed border-2 border-gold/20">
                {/* Video Player Header */}
                <div className="bg-gradient-to-r from-navy to-navy-light p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-gold" />
                    <span className="text-white text-sm font-semibold">Explainer Video</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                  </div>
                </div>
                
                {/* Video Screen */}
                <div className="h-40 bg-gradient-to-br from-navy via-navy-light to-navy relative overflow-hidden">
                  {/* Animated Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      <Play className="w-8 h-8 text-navy ml-1" />
                    </div>
                  </div>
                  
                  {/* Educational Elements Overlay */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 bg-gold rounded-full animate-sparkle"></div>
                    <div className="w-2 h-2 bg-gold rounded-full animate-sparkle" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-2 h-2 bg-gold rounded-full animate-sparkle" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-navy-light">
                    <div className="h-full bg-gold animate-pulse" style={{ width: '45%' }}></div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Languages className="w-3 h-3" />
                    <span>Your Preferred Language</span>
                  </div>
                </div>
              </div>

              {/* Connection Arrows */}
              <div className="absolute left-64 top-32 w-32 h-0.5 bg-gradient-to-r from-gold to-transparent opacity-50"></div>
              <ArrowRight className="absolute left-96 top-28 w-8 h-8 text-gold animate-slide-in" style={{ animationDelay: '0.5s' }} />
              
              <div className="absolute right-72 top-1/2 w-32 h-0.5 bg-gradient-to-l from-gold to-transparent opacity-50 transform -translate-y-1/2"></div>
              <ArrowRight className="absolute right-96 top-1/2 w-8 h-8 text-gold transform -translate-y-1/2 animate-slide-in" style={{ animationDelay: '1s' }} />

              {/* Floating Educational Particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gold/40 rounded-full animate-sparkle"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Educational Animation Container - Mobile/Tablet */}
          <div className="relative lg:hidden flex items-center justify-center h-[400px] mt-8">
            <div className="relative w-full max-w-md h-full">
              {/* Simplified Mobile Animation */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Notebook */}
                <div className="absolute -left-24 -top-12 w-48 bg-white dark:bg-navy rounded-xl shadow-xl p-4 animate-float border-2 border-gold/20">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-gold" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Your Notes</span>
                  </div>
                  <div className="space-y-1.5">
                    {[70, 85, 60].map((width, i) => (
                      <div key={i} className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded" style={{ width: `${width}%` }}></div>
                    ))}
                  </div>
                </div>

                {/* AI Processor */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-gold via-gold-light to-gold rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow z-10">
                  <Brain className="w-16 h-16 text-navy" />
                  <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-ping"></div>
                </div>

                {/* Video Output */}
                <div className="absolute -right-24 -bottom-12 w-48 bg-white dark:bg-navy rounded-xl shadow-xl overflow-hidden animate-float-delayed border-2 border-gold/20">
                  <div className="h-24 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                    <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-navy ml-1" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Video className="w-3 h-3" />
                      <span>Video Ready</span>
                    </div>
                  </div>
                </div>

                {/* Connection Arrow */}
                <ArrowRight className="absolute left-24 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gold animate-slide-in" />
                <ArrowRight className="absolute right-24 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gold animate-slide-in" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-navy text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-navy dark:text-white">About NeoNote</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            NeoNote helps students and educators convert complex written material into easy-to-understand, 
            visually appealing explainer videos. Whether you're studying or teaching, it adapts to your language, style, 
            and preferred tone — making learning smarter and faster.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-navy dark:text-white">Powerful Features</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how NeoNote makes learning more engaging and effective
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card ref={el => featureCardsRef.current[0] = el}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">Multilingual Support</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Generate videos in over 50 languages with accurate pronunciation and localized content.
                </p>
              </div>
            </Card>
            <Card ref={el => featureCardsRef.current[1] = el}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">Peer-to-peer</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Enhancing learning through collaborative wisdom, enabling students to share and benefit from diverse perspectives.
                </p>
              </div>
            </Card>
            <Card ref={el => featureCardsRef.current[2] = el}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Film className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">Video Generation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Transform complex information into engaging explainer videos with visuals, narration, and animations.
                </p>
              </div>
            </Card>
            <Card ref={el => featureCardsRef.current[3] = el}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserCog className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy dark:text-white">Personalized Learning</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Adjust video length, difficulty, and presentation style to match your learning preferences.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Landing;

