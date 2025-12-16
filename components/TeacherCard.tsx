import React from 'react';

interface TeacherCardProps {
  title: string;
  items: string[];
  visible: boolean;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ title, items, visible }) => {
  if (!visible) return null;

  return (
    <div className="relative border-2 border-dashed border-green-500 bg-green-500/10 p-6 rounded-xl mt-6">
      <div className="absolute -top-3 right-5 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
        TEACHER MODE
      </div>
      <h4 className="font-bold text-lg mb-2">👨‍🏫 {title}</h4>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm md:text-base">{item}</li>
        ))}
      </ul>
    </div>
  );
};