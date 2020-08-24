import React from 'react';
import './UITextArea.scss';

interface IUITextAreaProps {
  title?: string;
  name: string;
  callback: (name: string, value: string) => void;
  data: string;
  minLength?: number;
  disabled?: boolean;
  vertical?: boolean;
}

function UITextArea(props: IUITextAreaProps) {
  const {
    title,
    name,
    data,
    callback,
    minLength = 0,
    disabled,
    vertical,
  } = props || {};

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event || {};
    const { value: thisValue } = target || {};
    if (callback) {
      callback(name, thisValue);
    }
  }, [callback, name]);

  return (
    <div className={`ui-textarea ${data && data.length < minLength ? 'error' : ''}`}>
      {title
      && (
      <div className="ui-textarea__title font-type-b-10">
        <span className="ellipsis-element">{title}</span>
      </div>
      )}
      <textarea
        className={`ui-textarea__textarea ${vertical ? 'vertical' : ''} ${disabled ? 'disabled' : ''}`}
        onChange={handleChange}
        value={data ?? ''}
        disabled={disabled}
      />
    </div>
  );
}

export default React.memo(UITextArea);
