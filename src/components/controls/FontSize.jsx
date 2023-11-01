import React from 'react';
import { Input } from '../ui/input';
import useStore from '@/store';

const FontSize = () => {
  const fontSize = useStore((state) => state.fontSize);
  const isMobileView = window.innerWidth < 450;

  const handleFontSizeChange = (value) => {
    if (!isMobileView) {
      const newValue = Math.min(25, parseInt(value, 10));
      useStore.setState({ fontSize: newValue });
    } else {
      useStore.setState({ fontSize: isMobileView ? 15 : parseInt(value, 10) });
    }
  };

  return (
    <div>
      <label className='block mb-2 text-xs font-medium text-neutral-400'>Font Size</label>
      <Input
        type="number"
        name="fontsize"
        className="!dark w-16 bg-transparent border-violet-400"
        min={6}
        max={25}
        value={isMobileView ? 15 : fontSize}
        onChange={(e) => handleFontSizeChange(e.target.value)}
        readOnly={isMobileView}
      />
    </div>
  );
};

export default FontSize;
