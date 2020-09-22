import React from 'react';
import './UISidebar.scss';
import { connect } from 'react-redux';
import UILogo from '../UILogo/UILogo';
import UISidebarItem from './UISidebarItem';
import UISidebarList from './UISidebarList';
import CloseIcon from './close-icon.svg';
import actions from '../../redux/actions/actions';
import useOutsideClick from '../UICustomHooks/useOutsideClick/useOutsideClick';

function UISidebar(props) {
  const {
    path,
    type,
    showSidebar,
    globalStoreSetSection,
  } = props || {};

  const sidebarRef = React.useRef(null);

  const handleClose = React.useCallback(() => {
    globalStoreSetSection({ showSidebar: false });
  }, [globalStoreSetSection]);

  useOutsideClick(sidebarRef, handleClose);

  const renderMenu = React.useMemo(() => UISidebarList.map((v) => {
    const currentPath = `/${path.split('/')[1]}`;
    const {
      id, link, items, title,
    } = v || {};

    if (items && Array.isArray(items)) {
      const arrItems = items.map((w) => {
        const { id: wId, link: wLink } = w || {};
        return (
          <li key={`subKey${wId}`}>
            <UISidebarItem
              item={w}
              active={wLink === `/${currentPath}` || wLink === path}
            />
          </li>
        );
      });
      return (
        <div className="ui-sidebar__section" key={id}>
          <h3 className="ui-sidebar__list-title">{title}</h3>
          <ul className="ui-sidebar__list">{arrItems}</ul>
        </div>
      );
    }
    return (
      <UISidebarItem
        key={id}
        item={v}
        active={link === `/${currentPath}` || link === path}
      />
    );
  }), [path]);

  return (
    <aside
      className={`ui-sidebar${type ? ` ${type}` : ''}${showSidebar ? ' show' : ''}`}
      ref={sidebarRef}
    >
      <div className="ui-sidebar__body">
        <div
          role="presentation"
          className="ui-sidebar__close"
          onClick={handleClose}
        >
          <CloseIcon />
        </div>
        <div className="ui-sidebar__logo">
          <UILogo type="--vertical" />
        </div>
        <nav>
          <div className="ui-sidebar__navigation">
            {renderMenu}
          </div>
        </nav>
      </div>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  showSidebar: state.globalStore.showSidebar,
  path: state.router.location.pathname,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(UISidebar);
