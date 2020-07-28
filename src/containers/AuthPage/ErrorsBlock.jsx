import React from 'react';
import { connect } from 'react-redux';


function ErrorsBlock(props) {
  const { errors } = props;

  return errors ? (
    <div className="auth-page__errors-block">
      {errors}
    </div>
  ) : null;
}

const mapStateToProps = (state) => ({ errors: state.authStore.errors });

export default connect(mapStateToProps, null)(ErrorsBlock);
