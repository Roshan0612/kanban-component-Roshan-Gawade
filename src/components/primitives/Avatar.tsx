import React from 'react';
import { getInitials } from '../../utils/task.utils';

interface AvatarProps {
  name?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 24 }) => {
  return (
    <div
      className="rounded-full bg-primary-500 text-white flex items-center justify-center text-xs"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
