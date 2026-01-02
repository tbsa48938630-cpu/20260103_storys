
import React, { useState, useEffect, useRef } from 'react';
import { startStory, continueStory, endStory } from './services/geminiService';
import StoryDisplay from './components/StoryDisplay';
import InputArea from './components/InputArea';
import Header from './components/Header';

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [storySegments, setStorySegments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isStoryStarted = storySegments.length > 0;

  const handleAction = async () => {
    if (!inputText.trim() && !isFinished) {
      alert(isStoryStarted ? '請輸入下一句讓故事接下去！' : '請先輸入一些成語或詞彙喔！');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let newSegment = '';
      if (!isStoryStarted) {
        newSegment = await startStory(inputText);
      } else {
        newSegment = await continueStory(inputText);
      }
      setStorySegments(prev => [...prev, newSegment]);
      setInputText('');
    } catch (err) {
      setError('唉呀！故事書被頑皮的小精靈藏起來了，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setError(null);
    try {
      const finalSegment = await endStory();
      setStorySegments(prev => [...prev, finalSegment]);
      setIsFinished(true);
      setInputText('');
    } catch (err) {
      setError('結局被怪獸吃掉了！請再試一次。');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStorySegments([]);
    setInputText('');
    setError(null);
    setIsFinished(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [storySegments]);

  return (
    <div className="min-h-screen pb-20 bg-[#FFF5F5]">
      <Header />
      
      <main className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-red-100">
          <div className="p-6 md:p-8">
            {!isFinished ? (
              <>
                <p className="text-gray-600 mb-6 text-center text-lg">
                  {isStoryStarted 
                    ? "太精彩了！接下來會發生什麼事呢？趕快輸入下一句吧！" 
                    : "在下面輸入 2~3 個成語或詞彙，我就會變出一段爆笑故事！"}
                </p>

                <InputArea 
                  value={inputText}
                  onChange={setInputText}
                  onGenerate={handleAction}
                  isLoading={loading}
                  isStarted={isStoryStarted}
                />

                {isStoryStarted && !loading && (
                  <button
                    onClick={handleFinish}
                    className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-red-300 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-flag-checkered"></i>
                    <span>我想看【大結局】了！</span>
                  </button>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-block bg-green-100 text-green-600 px-6 py-2 rounded-full font-bold mb-4">
                  ✨ 冒險完成！ ✨
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">這真是一個偉大的故事！</h2>
                <button 
                  onClick={handleReset}
                  className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg"
                >
                  開始新的大冒險
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 flex items-center gap-3">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            )}

            <div className="mt-8">
              <StoryDisplay 
                segments={storySegments} 
                isLoading={loading} 
              />
              <div ref={scrollRef} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>由幽默故事 AI 提供靈感 💡 專為充滿想像力的你設計</p>
        </div>
      </main>
    </div>
  );
};

export default App;
