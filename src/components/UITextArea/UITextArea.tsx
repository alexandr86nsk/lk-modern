import React from 'react';
import './UITextArea.scss';
import { Popup } from 'semantic-ui-react';
import HintIcon from '../UIInput/hint-icon.svg';

interface IUITextAreaProps {
  title?: string;
  name: string;
  callback: (name: string, value: string) => void;
  data: string;
  minLength?: number;
  disabled?: boolean;
  vertical?: boolean;
  type?: string;
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
    type,
  } = props || {};

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event || {};
    const { value: thisValue } = target || {};
    if (callback) {
      callback(name, thisValue);
    }
  }, [callback, name]);

  return (
    <div className={`ui-textarea${data && data.length < minLength ? ' error' : ''}${type ? ` ${type}` : ''}`}>
      {title
      && (
      <div className="ui-textarea__title">
        <div className="ui-textarea__title-content" title={title}>
          <span className="ellipsis-element">
            {title}
          </span>
        </div>
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
