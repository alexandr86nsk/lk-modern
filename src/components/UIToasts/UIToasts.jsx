import React from 'react';
import './UIToasts.scss';
import { connect } from 'react-redux';
import { Transition, List } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import UIToast from './UIToast';

function UIToasts(props) {
  const {
    toasts,
    toastsStoreRemoveToast,
  } = props;

  React.useEffect(() => {
    toasts.forEach((v) => {
      if (v.type === 'error') {
        setTimeout(() => {
          if (v) {
            toastsStoreRemoveToast(v);
          }
        }, 5000);
      } else {
        setTimeout(() => {
          if (v) {
            toastsStoreRemoveToast(v);
          }
        }, 2000);
      }
    });
  }, [toasts, toastsStoreRemoveToast]);

  const memoizedList = React.useMemo(() => toasts.map((toast) => {
    const { id } = toast;
    return (
      <List.Item key={id}>
        <UIToast {...toast} onDismissClick={() => toastsStoreRemoveToast(toast)} />
      </List.Item>
    );
  }), [toasts, toastsStoreRemoveToast]);

  return (
    <div className="ui-toasts">
      <Transition.Group
        as={List}
        duration={600}
        divided
        size="huge"
        verticalAlign="middle"
        animation="fade"
      >
        {memoizedList}
      </Transition.Group>
    </div>
  );
}

const mapStateToProps = (state) => ({
  toasts: state.toastsStore.toasts,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(UIToasts));
