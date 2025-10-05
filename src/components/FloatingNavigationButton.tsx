import React, { useState } from 'react';
import { Menu, X, Flame, Clapperboard, Monitor, Sparkles, Radio, CheckCircle2 } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function FloatingNavigationButton() {
  const [isOpen, setIsOpen] = useState(false);

  const sections: Section[] = [
    { id: 'trending', label: 'Tendencias', icon: <Flame className="h-4 w-4" /> },
    { id: 'novelas-transmision', label: 'Novelas en Transmisión', icon: <Radio className="h-4 w-4" /> },
    { id: 'novelas-finalizadas', label: 'Novelas Finalizadas', icon: <CheckCircle2 className="h-4 w-4" /> },
    { id: 'peliculas', label: 'Películas Destacadas', icon: <Clapperboard className="h-4 w-4" /> },
    { id: 'series', label: 'Series Destacadas', icon: <Monitor className="h-4 w-4" /> },
    { id: 'anime', label: 'Anime Destacado', icon: <Sparkles className="h-4 w-4" /> },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="p-2 max-h-[70vh] overflow-y-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 transition-colors rounded-xl text-left"
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
