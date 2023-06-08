import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ bgColor, color, size, text, borderRadius, icon, bgHoverColor, width }) => {
  const { setIsClicked } = useStateContext();

  return (
    <button
      type='button'
      onClick={() => setIsClicked(false)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl w-${width} hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
