import React from 'react';

export const FloatingPeacock = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} inline-block animate-bounce`}>
      <div className="text-4xl transform hover:scale-110 transition-transform duration-200 cursor-pointer select-none">
        🦚
      </div>
    </div>
  );
};

export const RunningCheetah = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} inline-block`}>
      <div className="text-4xl animate-pulse transform hover:scale-110 transition-transform duration-200 cursor-pointer select-none">
        🐆
      </div>
    </div>
  );
};

// Example usage component that shows multiple floating animals
const FloatingAnimals = () => {
  return (
    <div className="relative h-96 w-full bg-gradient-to-b from-blue-100 to-blue-200 overflow-hidden p-4">
      {/* Peacocks */}
      <FloatingPeacock className="absolute top-1/4 left-1/4" />
      <FloatingPeacock className="absolute top-1/2 left-1/3 delay-300" />
      <FloatingPeacock className="absolute top-1/2 left-3/3 delay-300" />
      <FloatingPeacock className="absolute top-1/2 left-2/3 delay-300" />
      <FloatingPeacock className="absolute bottom-1/4 right-1/4 delay-500" />
      
      {/* Cheetahs */}
      <RunningCheetah className="absolute top-1/3 right-1/3" />
      <RunningCheetah className="absolute bottom-1/3 left-1/2 delay-200" />
      <RunningCheetah className="absolute top-1/2 right-1/2 delay-200" />
    </div>
  );
};

export default FloatingAnimals;