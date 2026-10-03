import React, { useState, useEffect, useRef } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { PageId } from '../../types';
import { CfdLogo } from '../common/CfdLogo';
import { Tooltip } from '../common/Tooltip';
import { motion, AnimatePresence } from 'motion/react';
import { animate } from 'animejs';
import {
  Globe,
  LayoutDashboard,
  FolderKanban,
  Shapes,
  Settings,
  PlayCircle,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  TrendingUp,
  BookOpen,
  ListOrdered,
  FolderArchive,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    soundEnabled,
    toggleSound,
    activeThemeConfig,
    themeMode,
    toggleThemeMode,
    queue,
    setIsQueueOpen,
    setIsOpenFoamModalOpen,
  } = usePlatform();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [optimisticPage, setOptimisticPage] = useState<PageId | null>(null);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOptimisticPage(null);
  }, [page]);

  const runningJobsCount = queue.filter((j) => j.status === 'running').length;

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Landing', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'geometry', label: 'Geometry', icon: Shapes },
    { id: 'setup', label: 'Setup', icon: Settings },
    { id: 'runner', label: 'Run', icon: PlayCircle },
    { id: 'sweeps', label: 'Sweeps & Polars', icon: TrendingUp },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'ai', label: 'AI Analysis', icon: Brain },
    { id: 'reporting', label: 'Reports', icon: FileSpreadsheet },
    { id: 'docs', label: 'Documentation', icon: BookOpen },
  ];

  const handleNavClick = (id: PageId) => {
    setOptimisticPage(id);
    setPage(id);
    setMobileMenuOpen(false);

    try {
      animate('#css-selector-id', { rotate: '1turn', duration: 350 });
    } catch {}
  };

  const handleSlideToggle = () => {
    try {
      animate('#css-selector-id', { rotate: '1turn', duration: 400 });
      if (navRef.current) {
        animate(navRef.current, {
          opacity: [0.6, 1],
          duration: 300,
          ease: 'outQuad',
        });
      }
    } catch {}
  };

  const activePage = optimisticPage || page;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* 
        HEADER AS LEFT-SIDE NAVIGATION WORKBENCH BAR WITH AEROSPACE GLASSMORPHISM
        Translucent frosted glass with ambient backdrop blur revealing the atmospheric cloud shader
      */}
      <header className="glass-sidebar lg:w-60 xl:w-64 lg:h-full lg:flex-col lg:justify-between z-40 shrink-0 sticky top-0 transition-colors w-full h-14 lg:h-full flex items-center justify-between lg:items-stretch select-none px-3 py-2 sm:px-4 lg:px-0">
        
        {/* Top: Brand Logo & Title with Slide Button */}
        <div className="flex items-center justify-between p-2 lg:p-4 lg:border-b border-white/30 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md shrink-0 w-full lg:w-auto">
          <button
            onClick={() => handleNavClick('landing')}
            className="group text-left transition-transform active:scale-95 flex items-center min-h-[44px] py-1 cursor-pointer"
            title="CFD Platform — Home"
            aria-label="CFD Platform Home"
          >
            <CfdLogo size="sm" showText={true} />
          </button>

          {/* Slide / Rotate Button on Desktop */}
          <div className="hidden lg:flex items-center">
            <Tooltip content="Slide & refresh navigation rail." position="bottom">
              <button
                onClick={handleSlideToggle}
                aria-label="Slide navigation rail"
                className="glass-item p-1.5 rounded-lg text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              >
                <div id="css-selector-id" className="flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </button>
            </Tooltip>
          </div>

          {/* Mobile Hamburger Toggle Button (lg:hidden) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            className="glass-item flex lg:hidden items-center justify-center p-2 min-h-[38px] min-w-[38px] rounded-lg text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Center: Navigation items arranged ONE BY ONE vertically with glassmorphic cards */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden min-h-0">
          <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Navigation Rail
          </div>
          <nav
            ref={navRef}
            className="flex-1 flex flex-col gap-1.5 px-3 py-1 overflow-y-auto scrollbar-none"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap relative cursor-pointer min-h-[38px] text-left transition-all ${
                    isActive
                      ? 'glass-item-active font-bold shadow-md'
                      : 'glass-item text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  style={isActive ? { color: activeThemeConfig.accentColor, borderColor: activeThemeConfig.accentColor } : {}}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? '' : 'text-slate-700 dark:text-slate-300'}`}
                    style={isActive ? { color: activeThemeConfig.accentColor } : {}}
                  />
                  <span className="truncate flex-1">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicatorVertical"
                      className="w-1.5 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: activeThemeConfig.accentColor }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Utilities and Controls arranged ONE BY ONE vertically with glassmorphism */}
        <div className="hidden lg:flex flex-col gap-1.5 p-3 border-t border-white/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md shrink-0">
          {/* 1. Simulation Queue Button */}
          <button
            onClick={() => setIsQueueOpen(true)}
            title="Open Simulation Queue & Terminal Logs"
            aria-label="Simulation Queue"
            className="glass-item w-full flex items-center justify-between px-3 py-2 min-h-[38px] rounded-xl text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ListOrdered className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>Queue & Logs</span>
            </div>
            {runningJobsCount > 0 ? (
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-mono animate-pulse shadow-xs">
                {runningJobsCount}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Idle</span>
            )}
          </button>

          {/* 2. OpenFOAM Export Quick Button */}
          <button
            onClick={() => setIsOpenFoamModalOpen(true)}
            title="Export Production OpenFOAM Case ZIP"
            aria-label="Export OpenFOAM Case"
            className="glass-item w-full flex items-center justify-between px-3 py-2 min-h-[38px] rounded-xl text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <FolderArchive className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Export Case ZIP</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">v2606</span>
          </button>

          {/* 3. Dark / Light Mode & Sound Controls in a 2-col row */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={toggleThemeMode}
              title={themeMode === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme Mode"
              className="glass-item flex items-center justify-center gap-1.5 p-2 rounded-xl text-slate-700 dark:text-amber-400 text-xs font-semibold cursor-pointer"
            >
              {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{themeMode === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
              aria-label="Toggle Sound"
              className={`glass-item flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold cursor-pointer ${
                soundEnabled
                  ? 'text-teal-700 dark:text-teal-400 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Audio' : 'Muted'}</span>
            </button>
          </div>

          {/* 4. Workbench Quick Action CTA */}
          {activePage !== 'runner' && (
            <button
              onClick={() => handleNavClick('runner')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 min-h-[38px] bg-slate-900/90 hover:bg-slate-900 dark:bg-teal-600/90 dark:hover:bg-teal-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer mt-1 backdrop-blur-md border border-white/20"
            >
              <PlayCircle className="w-4 h-4 text-white" />
              <span>Launch Solver</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Slide-in Navigation Drawer (arranged one by one on the left with glassmorphism) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="glass-sidebar fixed inset-y-0 left-0 w-[82vw] max-w-xs shadow-2xl z-50 flex flex-col lg:hidden pt-safe pb-safe"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-white/40 dark:border-slate-800/60 flex items-center justify-between bg-white/30 dark:bg-slate-950/40 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <CfdLogo size="sm" showText={true} />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation drawer"
                  className="glass-item p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links Scrollable List arranged one by one */}
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 py-1">
                  Workbench Navigation
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
                        isActive
                          ? 'glass-item-active font-bold shadow-md'
                          : 'glass-item text-slate-800 dark:text-slate-200'
                      }`}
                      style={isActive ? { color: activeThemeConfig.accentColor, borderColor: activeThemeConfig.accentColor } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}

                {/* Additional Quick Controls in Mobile Drawer */}
                <div className="pt-4 border-t border-white/40 dark:border-slate-800/60 mt-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 py-1">
                    Utilities
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsQueueOpen(true);
                    }}
                    className="glass-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 min-h-[44px] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ListOrdered className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <span>Simulation Queue</span>
                    </div>
                    {runningJobsCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] flex items-center justify-center font-mono">
                        {runningJobsCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOpenFoamModalOpen(true);
                    }}
                    className="glass-item w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 min-h-[44px] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FolderArchive className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <span>Export OpenFOAM Case</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
