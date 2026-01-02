
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-orange-400 py-6 md:py-10 shadow-lg text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="flex flex-wrap gap-10 p-10 transform rotate-12">
          {Array.from({ length: 20 }).map((_, i) => (
            <i key={i} className={`fas fa-${['pencil-alt', 'book', 'magic', 'laugh-wink', 'star'][i % 5]} text-4xl`}></i>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-playful mb-3 tracking-wider drop-shadow-md">
          成語無厘頭大冒險 🚀
        </h1>
        <p className="text-lg md:text-xl font-medium text-orange-100 opacity-90">
          讓枯燥的成語變成爆笑的小劇場！
        </p>
      </div>
    </header>
  );
};

export default Header;
