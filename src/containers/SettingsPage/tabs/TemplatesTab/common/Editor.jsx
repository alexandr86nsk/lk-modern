import React from 'react';

const MenuItem = (props) => {
  const {
    description,
    name,
    callback,
  } = props || {};

  const handleClick = React.useCallback(() => {
    if (callback) {
      callback(name);
    }
  }, [name, callback]);

  return (
    <div
      role="presentation"
      className="context-menu__item"
      onClick={handleClick}
    >
      <span className="text" aria-hidden>{description || ''}</span>
    </div>
  );
};

function Editor(props) {
  const {
    name,
    data,
    callback,
    templateVar,
  } = props;

  const textareaRef = React.useRef(null);
  const contextMenuRef = React.useRef(null);
  const highlightsRef = React.useRef(null);
  const backdropRef = React.useRef(null);
  const [contextMenuStyle, setContextMenuStyle] = React.useState(null);
  const [cursorPosition, setCursorPosition] = React.useState(null);

  const applyHighlights = React.useCallback((text) => text
    .replace(/\n$/g, '\n\n')
    .replace(/{[A-Za-z0-9_]*}/g, '<mark>$&</mark>'), []);

  const handleChange = React.useCallback((event) => {
    if (callback) {
      callback(name, event.target.value);
    }
  }, [callback, name]);

  React.useEffect(() => {
    if (data) {
      const { current } = highlightsRef || {};
      current.innerHTML = applyHighlights(data);
    }
  }, [applyHighlights, data]);

  const handleInsertVar = React.useCallback((value) => {
    if (cursorPosition && callback) {
      const {
        start,
        end,
      } = cursorPosition || {};
      const {
        current,
      } = textareaRef || {};
      callback(
        name,
        data.substring(0, start) + value + data.substring(end),
      );
      current.focus();
      setTimeout(() => { current.selectionEnd = end + value.length; }, 0);
      setContextMenuStyle(null);
    }
  }, [
    name,
    data,
    callback,
    cursorPosition,
  ]);

  React.useEffect(() => {
    function handleClickEscape(event) {
      if (event.key === 'Escape') {
        if (contextMenuStyle) {
          setContextMenuStyle(null);
        }
      }
    }
    function handleClickMouse(event) {
      const { current } = contextMenuRef || {};
      if (current && !current.contains(event.target)) {
        if (contextMenuStyle) {
          setContextMenuStyle(null);
        }
      }
    }
    function handleScroll(e) {
      const { current: textareaCurrent } = textareaRef || {};
      const { current: backdropCurrent } = backdropRef || {};
      setContextMenuStyle(null);
      if (e.target.contains(textareaCurrent)) {
        const { scrollTop } = textareaCurrent || {};
        backdropCurrent.scrollTop = scrollTop;
      }
    }
    document.addEventListener('keydown', handleClickEscape);
    document.addEventListener('mousedown', handleClickMouse);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('keydown', handleClickEscape);
      document.removeEventListener('mousedown', handleClickMouse);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [contextMenuStyle]);

  const renderContextMenu = React.useMemo(() => {
    if (templateVar && Array.isArray(templateVar)) {
      return templateVar.map((v) => <MenuItem key={v.id} {...v} callback={handleInsertVar} />);
    }
    return null;
  }, [templateVar, handleInsertVar]);

  const handleSetContextMenuStyle = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const { current } = contextMenuRef || {};
    const menuStyle = {
      visibility: 'unset',
      transform: 'unset',
      opacity: '1',
      left: document.body.offsetWidth - e.clientX - current.offsetWidth > 0
        ? `${e.clientX}px`
        : undefined,
      right: document.body.offsetWidth - e.clientX - current.offsetWidth < 0
        ? `${document.body.offsetWidth - e.clientX}px`
        : undefined,
      top: document.body.offsetHeight - e.clientY - current.offsetHeight > 0
        ? `${e.button === 0 ? (e.clientY + 7) : e.clientY}px`
        : undefined,
      bottom: document.body.offsetHeight - e.clientY - current.offsetHeight < 0
        ? `${e.button === 0 ? (document.body.offsetHeight - e.clientY + 7) : document.body.offsetHeight - e.clientY}px`
        : undefined,
    };
    setCursorPosition({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
    setContextMenuStyle(menuStyle);
  }, []);

  return (
    <div className="add-template-popup__editor">
      <div className="add-template-popup__editor-title">
        <span className="ellipsis-element">
          Текст шаблона
        </span>
      </div>
      <div className="add-template-popup__editor-body">
        <div className="backdrop" ref={backdropRef}>
          <div className="highlights" ref={highlightsRef} />
        </div>
        <textarea
          className="add-template-popup__textarea"
          onChange={handleChange}
          value={(data || data === 0) ? data : ''}
          onContextMenu={handleSetContextMenuStyle}
          ref={textareaRef}
        />
        <div
          className="add-template-popup__context-menu menu transition"
          style={contextMenuStyle}
          ref={contextMenuRef}
        >
          {renderContextMenu}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Editor);
