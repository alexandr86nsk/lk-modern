import React from 'react';
import './UIFilePreview.scss';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import BackIcon from '../../static/images/arrow_back_ios-24px.svg';
import ForwardIcon from '../../static/images/arrow_forward_ios-24px.svg';
import RotateLeftIcon from '../../static/images/rotate_left-24px.svg';
import RotateRightIcon from '../../static/images/rotate_right-24px.svg';
import CloseIcon from '../../static/images/close-24px.svg';
import IncreaseIcon from '../../static/images/add_circle_outline-24px.svg';
import DecreaseIcon from '../../static/images/remove_circle_outline-24px.svg';
import UIDraggable from '../UIDraggable/UIDraggable';
import UILoader from '../UILoader';


function UIFilePreview(props) {
  const {
    preview,
    callback,
    image,
    loading,
    fixed,
    title,
    multi,
    changeFileCallback,
    component,
  } = props;

  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [imageSize, setImageSize] = React.useState(1);

  const handleIncreaseImage = React.useCallback(() => {
    if (imageSize < 3) {
      setImageSize(imageSize + 0.5);
    }
  }, [imageSize]);

  const handleDecreaseImage = React.useCallback(() => {
    if (imageSize > 0.5) {
      setImageSize(imageSize - 0.5);
    }
  }, [imageSize]);

  const onWheel = React.useCallback((e) => {
    if (e.deltaY < 0) {
      handleIncreaseImage();
    } else {
      handleDecreaseImage();
    }
  }, [handleDecreaseImage, handleIncreaseImage]);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        callback();
      }
    }
    document.addEventListener('keydown', handleClickEscape);
    document.addEventListener('wheel', onWheel);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
      document.removeEventListener('wheel', onWheel);
    };
  }, [callback, onWheel]);

  const onDocumentLoadSuccess = React.useCallback((value) => {
    setNumPages(value.numPages);
  }, []);

  const b64toBlob = React.useMemo(() => {
    try {
      const byteCharacters = atob(preview);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i += 1) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      return new Blob(byteArrays, { type: 'application/pdf' });
    } catch (e) {
      return new Blob([preview], { type: 'application/pdf' });
    }
  }, [preview]);

  const increasePage = React.useCallback(() => {
    if (!multi) {
      if (pageNumber !== numPages) {
        setPageNumber(pageNumber + 1);
      } else {
        setPageNumber(1);
      }
    } else {
      changeFileCallback('increase');
    }
  }, [changeFileCallback, multi, numPages, pageNumber]);

  const decreasePage = React.useCallback(() => {
    if (!multi) {
      if (pageNumber === 1) {
        setPageNumber(numPages);
      } else {
        setPageNumber(pageNumber - 1);
      }
    } else {
      changeFileCallback('decrease');
    }
  }, [changeFileCallback, multi, numPages, pageNumber]);

  const handleCloseClick = React.useCallback(() => {
    callback();
  }, [callback]);

  const rotateLeft = React.useCallback(() => {
    setRotation(rotation - 90);
  }, [rotation]);

  const rotateRight = React.useCallback(() => {
    setRotation(rotation + 90);
  }, [rotation]);

  return (
    <div className={`ui-pdf-preview ${fixed ? 'fixed' : ''}`}>
      <div className="ui-pdf-preview__body">
        <div className="ui-pdf-preview__list">
          {((numPages > 1 || multi) && !loading)
          && (
            <button
              className="ui-pdf-preview__btn"
              type="button"
              onClick={decreasePage}
              title="Предыдущая страница"
            >
              <BackIcon />
            </button>
          )}
          { loading && <div>Данные загружаются. Подождите пожалуйста</div> }
          { ((image && !loading) || (!image && preview)) && (
            <>
              {((!multi && !image && numPages < 2) || (image && !multi)) && (
              <button
                className="ui-pdf-preview__btn"
                type="button"
                onClick={rotateLeft}
                title="Повернуть влево"
              >
                <div className="icon-wrapper">
                  <RotateLeftIcon />
                </div>
              </button>
              )}
              <div className="ui-pdf-preview__image">
                {title && <div className="ui-pdf-preview__title">{title}</div>}
                <UIDraggable
                  style={{
                    transform: `rotate(${rotation}deg) scale(${imageSize})`,
                  }}
                >
                  {image ? (
                    <img
                      src={`data:image/*;base64,${preview}`}
                      alt="file"
                      className="ui-pdf-preview__image"
                    />
                  )
                    : (
                      <Document
                        file={b64toBlob}
                        onLoadSuccess={onDocumentLoadSuccess}
                        renderMode="svg"
                        loading="Формирование"
                        error="Ошибка загрузки файла."
                        noData="Неверный формат файла."
                        externalLinkTarget="_blank"
                      >
                        <Page
                          pageNumber={pageNumber}
                          loading={<UILoader text="Загрузка" size="small" />}
                          error="Ошибка загрузки страницы."
                          noData="Неверный формат файла."
                          renderMode="svg"
                        />
                      </Document>
                    )}
                </UIDraggable>
                <div className="ui-pdf-preview__resize-block">
                  <button
                    className="ui-pdf-preview__btn"
                    type="button"
                    onClick={handleDecreaseImage}
                  >
                    <DecreaseIcon />
                  </button>
                  <div className="ui-pdf-preview__size">{`${imageSize * 100}%`}</div>
                  <button
                    className="ui-pdf-preview__btn"
                    type="button"
                    onClick={handleIncreaseImage}
                  >
                    <IncreaseIcon />
                  </button>
                </div>
              </div>
              {((!multi && !image && numPages < 2) || (image && !multi)) && (
              <button
                className="ui-pdf-preview__btn"
                type="button"
                onClick={rotateRight}
                title="Повернуть вправо"
              >
                <div className="icon-wrapper">
                  <RotateRightIcon />
                </div>
              </button>
              )}
            </>
          )}
          {((numPages > 1 || multi) && !loading)
          && (
            <button
              className="ui-pdf-preview__btn"
              type="button"
              onClick={increasePage}
              title="Следующая страница"
            >
              <ForwardIcon />
            </button>
          )}
          {((numPages > 1 && !image) || multi) && (
            <div className="ui-pdf-preview__edit-block">
              <button
                className="ui-pdf-preview__btn"
                type="button"
                onClick={rotateLeft}
                title="Повернуть влево"
              >
                <div className="icon-wrapper">
                  <RotateLeftIcon />
                </div>
              </button>
              <button
                className="ui-pdf-preview__btn"
                type="button"
                onClick={rotateRight}
                title="Повернуть вправо"
              >
                <div className="icon-wrapper">
                  <RotateRightIcon />
                </div>
              </button>
            </div>
          )}
          <div role="presentation" className="ui-pdf-preview__close" onClick={handleCloseClick}>
            <CloseIcon />
          </div>
        </div>
        {numPages > 1 && <p>{`Страница ${pageNumber} из ${numPages}`}</p>}
        {component
        && (
          <div className="ui-pdf-preview__component">
            {component}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(UIFilePreview);
