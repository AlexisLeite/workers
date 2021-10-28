import React from 'react';

export const EditableFieldsContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);
export type EditableFieldTypes = 'text' | 'date' | 'textarea';
export type EditableFieldProps = {
  actualValue: string;
  type: EditableFieldTypes;
  value?: string;
};
export type FieldDefinitions = { [name: string]: EditableFieldProps };
type State = { editting: boolean; fields: FieldDefinitions };
type Dispatch = (action: Action) => void;
type Action =
  | { type: 'edit' | 'cancel' | 'accept' }
  | { type: 'update'; name: string; newValue: string };
type EditableFieldsProviderProps = { children: any; fields: FieldDefinitions };

function inputReducer(state: State, action: Action) {
  const newState = { ...state };
  switch (action.type) {
    case 'edit':
      newState.editting = true;
      break;
    case 'cancel':
      for (let name in newState.fields) {
        newState.fields[name].value = newState.fields[name].actualValue;
      }
      newState.editting = false;
      break;
    case 'accept':
      for (let name in newState.fields) {
        newState.fields[name].actualValue = newState.fields[name].value ?? '';
      }
      newState.editting = false;
      break;
    case 'update':
      for (let name in newState.fields) {
        if (name === action.name) {
          newState.fields[name].value = action.newValue;
          break;
        }
      }
      break;
  }
  return newState;
}

export function EditableFieldsProvider({ children, fields }: EditableFieldsProviderProps) {
  const [state, dispatch] = React.useReducer(inputReducer, { editting: false, fields });

  const value = { state, dispatch };
  return <EditableFieldsContext.Provider value={value}>{children}</EditableFieldsContext.Provider>;
}

export function useEditableFields() {
  const context = React.useContext(EditableFieldsContext);

  if (!context) {
    throw new Error('useEditableFields must be used within a EditableFieldsProvider');
  }

  return context;
}

export function EditableFieldButtons({
  Accept,
  Cancel,
  Edit,
  onAccept,
}: {
  Accept?: any;
  Cancel?: any;
  Edit?: any;
  onAccept: () => boolean;
}) {
  const { state, dispatch } = useEditableFields();
  return !state.editting ? (
    <button onClick={() => dispatch({ type: 'edit' })}>{Edit ?? 'Edit'}</button>
  ) : (
    <>
      <button
        onClick={() => {
          dispatch({ type: 'cancel' });
        }}
      >
        {Cancel ?? 'Cancel'}
      </button>
      <button
        onClick={() => {
          if (onAccept()) dispatch({ type: 'accept' });
        }}
      >
        {Accept ?? 'Accept'}
      </button>
    </>
  );
}

export function EditableField({ name }: { name: string }) {
  const { state, dispatch } = useEditableFields();
  const onChange = (ev: React.FormEvent<any>) => {
    const newValue = ev.currentTarget.value;
    dispatch({ type: 'update', name, newValue });
  };
  if (state.fields[name]) {
    const field = state.fields[name];
    const value = field.value ?? field.actualValue;
    if (state.editting)
      switch (field.type) {
        case 'date':
        case 'text':
          return <input type={field.type} value={value} onChange={onChange} />;
        case 'textarea':
          return <textarea onChange={onChange}>{value}</textarea>;
      }
    return <>{value}</>;
  }
  return (
    <>{`There is no field with name ${name} declared on the EditableFieldsProvider fields attribute.`}</>
  );
}
