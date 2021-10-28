import React, { ReactElement } from 'react';

type SegmentedPropsOptions = {
  label: string;
  value: string;
};
interface SegmentedProps {
  options: SegmentedPropsOptions[];
  onSelect: (ev: SegmentedPropsOptions) => void;
  selected?: string;
}

export default function SegmentedControl(props: SegmentedProps): ReactElement {
  const [stateSelected, setSelected] = React.useState(props.options[0].value);
  const selected = props.selected ?? stateSelected;
  return (
    <ul>
      <style jsx>{`
        ul {
          text-align: center;
        }
        li {
          display: inline-block;
          background: #ccc;
          border-bottom: 3px solid #bbb;
          border-top: 3px solid #bbb;
          border-left: 1px solid #bbb;
        }

        li.selected {
          background: #eee;
        }

        li:first-of-type {
          border-left: 3px solid #bbb;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        li:last-of-type {
          border-right: 3px solid #bbb;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        button {
          background: none;
          border: none;
          padding: 4px;
        }
      `}</style>
      {props.options.map((option) => (
        <li
          onClick={() => {
            if (!props.selected) setSelected(option.value);
            props.onSelect(option);
          }}
          key={option.value}
          className={`segmented-control-option ${option.value === selected ? 'selected' : ''}`}
        >
          <button>{option.label}</button>
        </li>
      ))}
    </ul>
  );
}
