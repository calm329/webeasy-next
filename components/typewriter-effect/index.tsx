import React, { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  text: string;
  typeSpeed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, typeSpeed = 70 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(displayText + text.charAt(index));
        setIndex(index + 1);
      }, typeSpeed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, typeSpeed, displayText]);

  return <span>{displayText}</span>;
};

export default TypewriterEffect;