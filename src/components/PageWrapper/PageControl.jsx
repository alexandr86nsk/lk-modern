import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/actions';
import UIPageControl from '../UIPageControl/UIPageControl';

function PageControl(props) {
  const {
    show,
    data,
  } = props;

  return (
    <div className="page-control">
      {show && <UIPageControl {...data} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  show: state.pageControlStore.show,
  data: state.pageControlStore.data,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageControl);
