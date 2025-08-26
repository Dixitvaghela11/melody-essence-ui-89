import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MusicPlayer } from "./components/MusicPlayer";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { NotificationBanner } from "./components/NotificationBanner";
import { Home } from "./pages/Home";
import { Podcasts } from "./pages/Podcasts";
import { RadioPage } from "./pages/Radio";
import { Library } from "./pages/Library";
import { Search } from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check for saved theme preference or default to system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'warning'
  });

  useEffect(() => {
    // Apply initial theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Show welcome notification
    setTimeout(() => {
      setNotification({
        isVisible: true,
        message: 'Welcome to MelodyFlow! Discover new music every day.',
        type: 'info'
      });
    }, 1000);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Update DOM
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            {/* Sidebar - Desktop fixed, Mobile drawer */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            {/* Header */}
            <Header 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            
            {/* Main Content */}
            <main className="lg:ml-64 mt-16 pb-32 md:pb-24 px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/radio" element={<RadioPage />} />
                <Route path="/trending" element={<Home />} />
                <Route path="/liked" element={<Library />} />
                <Route path="/albums" element={<Library />} />
                <Route path="/artists" element={<Library />} />
                <Route path="/profile" element={<Home />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Mobile Bottom Navigation */}
            <MobileBottomNav />
            
            {/* Music Player */}
            <MusicPlayer />
            
            {/* Notification Banner */}
            <NotificationBanner 
              message={notification.message}
              type={notification.type}
              isVisible={notification.isVisible}
              onClose={() => setNotification({ ...notification, isVisible: false })}
            />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
