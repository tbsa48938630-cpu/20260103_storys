
import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isStarted: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onGenerate, isLoading, isStarted }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isStarted ? "輸入下一句，例如：突然間，天空掉下了..." : "例如：畫蛇添足、炸雞腿..."}
          disabled={isLoading}
          className="w-full px-6 py-4 bg-red-50 border-2 border-red-100 rounded-2xl text-xl focus:outline-none focus:border-red-400 transition-colors placeholder:text-red-200"
          onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-300 pointer-events-none">
          <i className={`fas fa-${isStarted ? 'paper-plane' : 'feather-alt'} text-2xl`}></i>
        </div>
      </div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading || (!isStarted && !value.trim())}
        className={`w-full py-4 rounded-2xl text-xl font-bold text-white shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3
          ${isLoading || (!isStarted && !value.trim())
            ? 'bg-gray-300 cursor-not-allowed shadow-none' 
            : 'bg-red-600 hover:bg-red-700'
          }`}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            <span>正在磨墨中...</span>
          </>
        ) : (
          <>
            <i className={`fas fa-${isStarted ? 'magic' : 'play'}`}></i>
            <span>{isStarted ? '繼續冒險！' : '開始冒險！'}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default InputArea;
