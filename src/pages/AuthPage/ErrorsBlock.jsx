import React from 'react';
import { connect } from 'react-redux';

function ErrorsBlock(props) {
  const { errors } = props;

  return (
    <div className="form__errors-block">
      {errors}
    </div>
  );
}

const mapStateToProps = (state) => ({ errors: state.authStore.errors });

export default connect(mapStateToProps, null)(ErrorsBlock);
