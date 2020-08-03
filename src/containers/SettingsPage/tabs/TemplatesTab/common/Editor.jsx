import React from 'react';

function Editor(props) {
  const {
    name,
    data,
    callback,
    templateVar,
  } = props;

  const contextMenuRef = React.useRef(null);
  const [contextMenuStyle, setContextMenuStyle] = React.useState(null);

  const handleChange = React.useCallback((event) => {
    if (callback) {
      callback(name, event.target.value);
    }
  }, [callback, name]);

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
      const { current } = contextMenuRef || {};
      if (e.target.contains(current)) {
        setContextMenuStyle(null);
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
      return templateVar.map((v) => {
        const {
          id,
          description,
          name,
        } = v || {};
        return (
          <div
            key={id}
            role="presentation"
            className="context-menu__item"
            onClick={() => {}}
          >
            <span className="text" aria-hidden>{description || ''}</span>
          </div>
        );
      });
    }
    return null;
  }, [templateVar]);

  const handleSetContextMenuStyle = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const { current } = contextMenuRef || {};
    const menuStyle = {
      visibility: 'unset',
      transform: 'unset',
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
    setContextMenuStyle(menuStyle);
  }, []);

  return (
    <div className="add-template-popup__editor">
      <textarea
        className="add-template-popup__textarea"
        onChange={handleChange}
        value={(data || data === 0) ? data : ''}
        onContextMenu={handleSetContextMenuStyle}
      />
      <div
        className="add-template-popup__context-menu menu transition font-type-m-12"
        style={contextMenuStyle}
        ref={contextMenuRef}
      >
        {renderContextMenu}
      </div>
    </div>
  );
}

export default React.memo(Editor);
