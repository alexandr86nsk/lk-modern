import React from 'react';
import './UISidebar.scss';
import { connect } from 'react-redux';
import logo from '../../../logo/mobile-app-logo.png';
import UISidebarItem from './UISidebarItem/UISidebarItem';
import UISidebarList from './UISidebarList';
import UISearch from '../UISearch/UISearch';

function UISidebar(props) {
  const {
    showSidebar = true,
    path,
    compact = true,
  } = props;

  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = React.useCallback(
    (value) => setSearchValue(value), [setSearchValue],
  );

  const renderMenu = React.useMemo(() => UISidebarList.map((v) => {
    const searchText = searchValue.toLowerCase();
    const args = {
      showSidebar,
      key: v.id,
      item: v,
      active: v.link === `/${path.split('/')[1]}`
      || !!v.items.filter((el) => (el.link === `/${path.split('/')[1]}`) || el.link === path).length,
      isOpen: !!v.items.filter((el) => (el.link === `/${path.split('/')[1]}`) || el.link === path).length,
      subItems: v.link ? '' : v.items.map((el) => {
        if (el.link === `/${path.split('/')[1]}` || el.link === path) {
          return { ...el, active: true };
        }
        return el;
      }),
    };

    if (searchValue) {
      if (
        v.title.toLowerCase().includes(searchText)
        || v.items.filter((el) => el.title.toLowerCase().includes(searchText)).length
      ) {
        return (
          <UISidebarItem {...args} isOpen searchValue={searchValue} />
        );
      }
      return null;
    }

    return (
      <UISidebarItem {...args} />
    );
  }), [showSidebar, path, searchValue]);

  return (
    <aside
      role="presentation"
      className={`ui-sidebar${!showSidebar ? ' hide' : ''}${compact ? ' --compact' : ''}`}
    >
      <div className="ui-sidebar__logo">
        <div className="ui-sidebar__btn">
          <div>
            <img src={logo} alt="logo" />
          </div>
          {/*<div className="font-type-b-14">
            <span>Бюро</span>
            <span>судебного взыскания</span>
          </div>*/}
        </div>
      </div>
      {/*<div className="ui-sidebar__search">
        <UISearch callback={handleSearch} data={searchValue} hideResults />
      </div>*/}
      <nav>
        <ul className="ui-sidebar__navigation">
          {renderMenu}
        </ul>
      </nav>
    </aside>
  );
}

const mapStateToProps = (state) => ({
  //showSidebar: state.globalStore.showSidebar,
  path: state.router.location.pathname,
});

export default connect(mapStateToProps, null)(UISidebar);
