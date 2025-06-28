'use client';
import { useEffect, useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      aria-label="Scroll to top"
    >
      <ArrowUpCircle className="w-6 h-6" />
    </button>
  ) : null;
}
