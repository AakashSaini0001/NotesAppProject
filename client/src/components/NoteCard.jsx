import React from 'react';

// Lucide icons via npm: npm install lucide-react
import { MoreVertical, CalendarDays, Pin } from 'lucide-react';

const NoteCard = ({
  tag = 'Personal',
  title = 'Sample Note Title',
  content = 'This is a sample content preview for your note. It can be a summary or the beginning of the note text.',
  date = 'Mar 13, 2024',
}) => {
  // Color mapping based on tag
  const tagColors = {
    personal: 'bg-purple-500',
    project: 'bg-blue-500',
    clients: 'bg-indigo-500',
    'office work': 'bg-orange-600',
  };

  const tagColor = tagColors[tag.toLowerCase()] || 'bg-gray-600';

  return (
    <div className="bg-[#1C1F2E] hover:bg-[#2a2d3f] transition-all p-5 rounded-2xl border border-[#2f334d] w-full max-w-xs shadow-sm">
      {/* Tag Label */}
      <div className={`text-white text-xs px-3 py-1 rounded-full inline-block ${tagColor}`}>
        {tag}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mt-4">{title}</h3>

      {/* Preview Content */}
      <p className="text-sm text-gray-400 mt-2 line-clamp-3">
        {content}
      </p>

      {/* Footer: Date + Actions */}
      <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <CalendarDays size={14} />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Pin size={16} className="cursor-pointer hover:text-white" />
          <MoreVertical size={16} className="cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
