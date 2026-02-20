import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
}

const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
  return (
    <svg 
      className={`inline-block shrink-0 ${className}`} 
      width={size} 
      height={size}
      viewBox="0 0 24 24"
      
      // حذف fill-current از اینجا و سپردن آن به تعریف خود سمبل‌ها
    >
      <use href={`/icons-sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;