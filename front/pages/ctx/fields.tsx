import React, { ReactElement } from 'react';
import { EditableField } from '../../contexts/editableField';
import { EditableFieldsProvider, useEditableFields } from '../../contexts/editableField';

interface FieldsProps {}

function SomeFields() {
  const { state, dispatch } = useEditableFields();
  return (
    <>
      <EditableField name="name" />
      <div>
        {!state.editting ? (
          <button
            onClick={() => {
              dispatch({ type: 'edit' });
            }}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                dispatch({ type: 'cancel' });
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch({ type: 'accept' });
              }}
            >
              Accept
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default function Fields({}: FieldsProps): ReactElement {
  return (
    <EditableFieldsProvider
      fields={{
        name: {
          actualValue: 'Alexis Leite',
          type: 'text',
        },
      }}
    >
      <SomeFields />
    </EditableFieldsProvider>
  );
}
