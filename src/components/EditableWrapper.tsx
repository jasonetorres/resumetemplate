import React, { useRef } from 'react';
import EditableSection from './EditableSection';

interface EditableWrapperProps {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editor: React.ReactElement;
  children: React.ReactNode;
}

const EditableWrapper: React.FC<EditableWrapperProps> = ({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  editor,
  children
}) => {
  const editorMethodsRef = useRef<{ saveChanges?: () => void; discardChanges?: () => void }>({});

  // Clone the editor with ref to access its methods
  const editorWithRef = React.cloneElement(editor, {
    ref: (ref: any) => {
      if (ref) {
        editorMethodsRef.current = ref;
      }
    }
  });

  const handleSave = () => {
    if (editorMethodsRef.current.saveChanges) {
      editorMethodsRef.current.saveChanges();
    }
    onSave();
  };

  const handleCancel = () => {
    if (editorMethodsRef.current.discardChanges) {
      editorMethodsRef.current.discardChanges();
    }
    onCancel();
  };

  return (
    <EditableSection
      title={title}
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      editor={editorWithRef}
    >
      {children}
    </EditableSection>
  );
};

export default EditableWrapper;
