import React from 'react';
import './UIModal.scss';
import UIButton from '../UIButton/UIButton';
import CloseIcon from '../../static/images/close-24px.svg';
import UILoader from '../UILoader/UILoader';

function UIModal(props) {
  const {
    active,
    icon,
    type = '',
    title = 'Подтверждение',
    body = 'Вы действительно хотите это сделать?',
    buttons = {
      positive: 'Да',
      negative: 'Нет',
    },
    hideNegative,
    hidePositive,
    disabledPositive,
    callback,
    loading,
    loadingText,
    readOnly,
  } = props;

  React.useEffect(() => {
    document.body.classList.add('modal');

    return () => {
      document.body.classList.remove('modal');
    };
  }, []);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        callback(false);
      }
    }
    document.addEventListener('keydown', handleClickEscape);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
    };
  }, [callback]);

  const handleAcceptClick = React.useCallback(() => {
    callback(true);
  }, [callback]);

  const handleClose = React.useCallback(() => {
    callback(false);
  }, [callback]);

  return (
    <div className={`ui-modal${active ? ' active' : ''} ${type}`}>
      <div className="confirm-block">
        <div className="confirm-block__title">
          <div className="confirm-block__icon">
            {icon && icon}
          </div>
          <div className="confirm-block__text">
            {title}
          </div>
        </div>
        <div className="confirm-block__body">
          {loading && <div className="ui-modal__loader"><UILoader text={loadingText} /></div>}
          {body}
        </div>
        {!(hidePositive && hideNegative)
          && (
          <div className="confirm-block__controls">
            {(!hidePositive && !readOnly) && (
            <div className="confirm-block__accept-btn">
              <UIButton
                title={buttons.positive}
                type="positive"
                callback={handleAcceptClick}
                disabled={disabledPositive}
              />
            </div>
            )}
            {!hideNegative && (
            <div className="confirm-block__reject-btn">
              <UIButton
                title={readOnly ? 'Закрыть' : buttons.negative}
                type="negative"
                callback={handleClose}
              />
            </div>
            )}
          </div>
          )}
        <div
          role="presentation"
          className="confirm-block__close"
          onClick={handleClose}
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIModal);
