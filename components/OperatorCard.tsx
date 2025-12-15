import React, { useState, useEffect } from 'react';
import { Operator, Side } from '../types';
import { AttackIcon, DefenseIcon, RoleIcon, SpeedIcon, HealthIcon } from './Icons';

interface OperatorCardProps {
  operator: Operator | null;
  side: Side;
  isRolling: boolean;
}

const OperatorCard: React.FC<OperatorCardProps> = ({ operator, side, isRolling }) => {
  const isAttacker = side === Side.ATTACKER;
  const baseColor = isAttacker ? 'text-blue-500' : 'text-orange-500';
  const gradientColor = isAttacker ? 'from-blue-600/20' : 'from-orange-600/20';

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (operator) {
      setImgError(false);
    }
  }, [operator]);

  const badgeUrl = operator 
    ? `https://r6operators.marcopixel.eu/icons/svg/${operator.name.toLowerCase()}.svg` 
    : '';

  // Loading / Empty State
  if (!operator) {
    return (
      <div className="w-64 h-80 flex flex-col items-center justify-center opacity-30">
        <div className={`w-32 h-32 rounded-full border-4 border-dashed ${isAttacker ? 'border-blue-500' : 'border-orange-500'} flex items-center justify-center animate-pulse-fast`}>
          {isAttacker ? <AttackIcon className="w-16 h-16" /> : <DefenseIcon className="w-16 h-16" />}
        </div>
        <div className="mt-4 text-xl font-black uppercase tracking-widest text-white">
            {isRolling ? 'INITIALIZING...' : 'AWAITING ORDER'}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-72 md:w-80 flex flex-col items-center group">
      
      {/* Top Header: Role & Name */}
      <div className="w-full flex items-end justify-between border-b-4 border-white mb-2 pb-1 relative">
          {/* Background gradient for readability */}
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} to-transparent -z-10`}></div>
          
          <div className="flex flex-col">
              <div className="flex items-center gap-2">
                 <RoleIcon type={operator.iconType || 'support'} className={`w-5 h-5 ${baseColor}`} />
                 <span className="text-xs font-bold uppercase tracking-wider text-gray-300">{operator.role[0]}</span>
              </div>
              <h1 className="text-5xl font-black italic uppercase leading-none text-white text-shadow-md tracking-tighter">
                  {operator.name}
              </h1>
          </div>
          <div className="mb-1 opacity-80">
              {isAttacker ? <AttackIcon className="w-8 h-8 text-blue-400" /> : <DefenseIcon className="w-8 h-8 text-orange-400" />}
          </div>
      </div>

      {/* Main Image Area */}
      <div className="relative w-full flex justify-center py-2">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-3xl opacity-30 ${isAttacker ? 'bg-blue-600' : 'bg-orange-600'}`}></div>
          
          {!imgError ? (
            <img 
                src={badgeUrl} 
                alt={operator.name} 
                className="w-64 h-64 object-contain drop-shadow-2xl z-10 transform transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
            />
          ) : (
            <RoleIcon type={operator.iconType || 'support'} className={`w-48 h-48 ${baseColor} opacity-80`} />
          )}
      </div>

      {/* Gadget Info (Compact) */}
      <div className="w-full bg-black/70 backdrop-blur-sm border-l-4 border-white p-2 mb-2">
         <div className="text-[10px] text-gray-400 uppercase tracking-widest">Unique Ability</div>
         <div className="text-lg font-bold text-white leading-tight">{operator.gadget}</div>
      </div>

       {/* Stats Row */}
      <div className="flex w-full gap-2 mb-2">
          <div className="bg-black/60 flex-1 p-1 flex flex-col items-center rounded-sm">
             <span className="text-[9px] uppercase text-gray-500">SPD</span>
             <SpeedIcon level={operator.speed} />
          </div>
          <div className="bg-black/60 flex-1 p-1 flex flex-col items-center rounded-sm">
             <span className="text-[9px] uppercase text-gray-500">HP</span>
             <HealthIcon level={operator.health} />
          </div>
      </div>
    </div>
  );
};

export default OperatorCard;