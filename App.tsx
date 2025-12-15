import React, { useState, useCallback } from 'react';
import { OPERATORS } from './constants';
import { Operator, Side } from './types';
import OperatorCard from './components/OperatorCard';

const App: React.FC = () => {
  const [atkOp, setAtkOp] = useState<Operator | null>(null);
  const [defOp, setDefOp] = useState<Operator | null>(null);
  const [rollingAtk, setRollingAtk] = useState(false);
  const [rollingDef, setRollingDef] = useState(false);
  const [chromaMode, setChromaMode] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const getRandomOperator = (side: Side) => {
    const pool = OPERATORS.filter(op => op.side === side);
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // Animation and selection logic
  const rollOperator = useCallback(async (side: Side) => {
    const isAttacker = side === Side.ATTACKER;
    const setRolling = isAttacker ? setRollingAtk : setRollingDef;
    const setOp = isAttacker ? setAtkOp : setDefOp;

    setRolling(true);
    
    // Animation loop
    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setOp(getRandomOperator(side));
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        
        // Final selection
        const finalOp = getRandomOperator(side);
        setOp(finalOp);
        setRolling(false);
      }
    }, 80);
  }, []);

  const handleFullRandom = () => {
    rollOperator(Side.ATTACKER);
    setTimeout(() => rollOperator(Side.DEFENDER), 200);
  };

  return (
    <div className={`h-screen w-screen flex flex-col relative ${chromaMode ? 'bg-[#00b140]' : 'bg-transparent'}`}>
      
      {/* Main Stage - Centered vertically and horizontally */}
      <div className="flex-grow flex items-center justify-center p-8 gap-12 md:gap-24">
        
        {/* Attacker HUD */}
        <div className={`transition-all duration-500 ${atkOp ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
           <OperatorCard 
              operator={atkOp} 
              side={Side.ATTACKER} 
              isRolling={rollingAtk} 
           />
        </div>

        {/* VS Separator (Optional, only show if both present) */}
        {atkOp && defOp && (
          <div className="hidden md:flex flex-col items-center justify-center opacity-50">
             <div className="w-px h-32 bg-white/30"></div>
             <span className="py-4 text-xl font-black italic text-white/50">VS</span>
             <div className="w-px h-32 bg-white/30"></div>
          </div>
        )}

        {/* Defender HUD */}
        <div className={`transition-all duration-500 ${defOp ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
           <OperatorCard 
              operator={defOp} 
              side={Side.DEFENDER} 
              isRolling={rollingDef}
           />
        </div>

      </div>

      {/* Control Deck - Fixed Bottom */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300 z-50 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-md border-t border-x border-gray-700 rounded-t-xl p-4 flex items-center justify-between shadow-2xl">
          
          {/* Left: Status Placeholder */}
          <div className="hidden md:flex items-center gap-4 text-xs text-gray-400 w-20">
             {/* Empty for balance */}
          </div>

          {/* Center: Actions */}
          <div className="flex items-center gap-4 mx-auto">
            <button 
              onClick={() => rollOperator(Side.ATTACKER)}
              disabled={rollingAtk}
              className="px-4 py-2 bg-r6blue/20 border border-r6blue text-r6blue hover:bg-r6blue hover:text-white font-bold uppercase text-sm rounded transition-colors"
            >
              Roll Atk
            </button>
            
            <button 
              onClick={handleFullRandom}
              disabled={rollingAtk || rollingDef}
              className="px-6 py-3 bg-white text-black font-black uppercase tracking-wider hover:bg-gray-200 rounded shadow-lg scale-100 hover:scale-105 transition-transform"
            >
              DEPLOY ALL
            </button>

            <button 
              onClick={() => rollOperator(Side.DEFENDER)}
              disabled={rollingDef}
              className="px-4 py-2 bg-r6orange/20 border border-r6orange text-r6orange hover:bg-r6orange hover:text-white font-bold uppercase text-sm rounded transition-colors"
            >
              Roll Def
            </button>
          </div>

          {/* Right: Toggles */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setChromaMode(!chromaMode)}
              className={`p-2 rounded border ${chromaMode ? 'bg-green-600 border-green-400 text-white' : 'bg-transparent border-gray-600 text-gray-400'}`}
              title="Toggle Green Screen"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <button 
              onClick={() => setShowControls(false)}
              className="p-2 text-gray-400 hover:text-white"
              title="Hide Controls"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Show Controls Trigger */}
      {!showControls && (
        <button 
          onClick={() => setShowControls(true)}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-black/50 text-white p-2 rounded-t-lg hover:bg-black/80 transition-colors z-50"
        >
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}

    </div>
  );
};

export default App;