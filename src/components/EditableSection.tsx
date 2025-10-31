import React from 'react';
import { Edit3, Check, X } from 'lucide-react';

interface EditableSectionProps {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editor: React.ReactNode;
  children: React.ReactNode;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editor,
  children
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  if (isEditing) {
    return (
      <div className="relative border-2 rounded-2xl p-6 bg-white" style={{ borderColor: '#0044ff' }}>
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold font-inter text-gray-900">Editing: {title}</h3>
        </div>
        <div>
          {editor}
        </div>
        <div className="flex justify-end space-x-1 sm:space-x-2 mt-4">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 sm:px-6 py-2 sm:py-3 text-white rounded-full hover:opacity-90 transition-all duration-200 font-medium text-sm sm:text-base"
            style={{ backgroundColor: '#0044ff' }}
          >
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-3 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 transition-all duration-200 font-medium text-sm sm:text-base"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl p-3 transition-all duration-200">
      {children}
    </div>
  );
};

export default EditableSection;
