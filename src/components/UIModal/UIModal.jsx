import React from 'react';
import './UIModal.scss';
import { Button, Icon } from 'semantic-ui-react';
import CloseIcon from '../../static/images/close-24px.svg';
import UILoader from '../UILoader';

function UIModal(props) {
  const {
    active,
    icon,
    type = '',
    title = 'Подтверждение',
    body = 'Вы действительно хотите это сделать?',
    buttons,
    hideNegative,
    hidePositive,
    disabledPositive,
    callback,
    loading,
    loadingText,
    readOnly,
  } = props || {};

  const {
    positiveTitle,
    negativeTitle,
  } = buttons || {};

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
    <div className={`ui-modal${active ? ' active' : ''}${type ? ` ${type}` : ''}`}>
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
              <Button
                circular
                positive
                size="small"
                onClick={handleAcceptClick}
                disabled={disabledPositive}
              >
                <Icon name="check" />
                {positiveTitle || 'Да'}
              </Button>
            </div>
            )}
            {!hideNegative && (
            <div className="confirm-block__reject-btn">
              <Button
                circular
                negative
                size="small"
                onClick={handleClose}
              >
                <Icon name="close" />
                {readOnly ? 'Закрыть' : (negativeTitle || 'Нет')}
              </Button>
            </div>
            )}
          </div>
          )}
        <div
          role="presentation"
          className="confirm-block__close"
          onClick={handleClose}
        >
          <div className="confirm-block__close-icon">
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UIModal);
