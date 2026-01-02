
import React from 'react';

interface StoryDisplayProps {
  segments: string[];
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ segments, isLoading }) => {
  if (segments.length === 0 && !isLoading) return null;

  // Simple parser to handle bold text from Markdown
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-red-700 font-bold bg-red-50 px-1 rounded mx-0.5 border-b-2 border-red-200">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="relative">
        {/* Story Scroll Design */}
        <div className="bg-white border-x-8 border-red-100 p-6 md:p-10 rounded-lg relative shadow-inner">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-100 rounded-full shadow-md flex items-center justify-center z-20 border-2 border-white">
            <i className="fas fa-scroll text-red-600"></i>
          </div>
          
          <div className="space-y-6">
            {segments.map((segment, idx) => {
              const isFinale = segment.includes('【大結局】');
              return (
                <div 
                  key={idx} 
                  className={`prose prose-lg max-w-none text-gray-800 leading-relaxed text-xl whitespace-pre-wrap animate-fade-in-up
                    ${isFinale ? 'bg-red-50 p-6 rounded-2xl border-2 border-red-200 shadow-sm' : ''}`}
                >
                  {renderText(segment)}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 text-red-400 py-4 animate-pulse">
                <i className="fas fa-pen-nib fa-spin"></i>
                <span className="font-bold">作家正在構思下一段精彩情節...</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-6 -right-4 w-24 h-24 pointer-events-none opacity-20">
          <i className="fas fa-dragon text-red-400 text-7xl transform rotate-12"></i>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;
