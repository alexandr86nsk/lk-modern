import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIContextMenu from '../UIContextMenu/UIContextMenu';

function PageContextMenu(props) {
  const {
    show,
    body,
    posX,
    posY,
    contextMenuStoreClear,
  } = props;

  const handleClose = React.useCallback(() => {
    contextMenuStoreClear();
  }, [contextMenuStoreClear]);

  return (
    <div className="page-context-menu">
      {show
      && (
        <UIContextMenu
          body={body}
          hideCallback={handleClose}
          posTop={posY}
          posLeft={posX}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  show: state.contextMenuStore.show,
  body: state.contextMenuStore.body,
  posY: state.contextMenuStore.posY,
  posX: state.contextMenuStore.posX,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageContextMenu);
