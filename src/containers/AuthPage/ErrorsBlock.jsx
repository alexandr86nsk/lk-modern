import React from 'react';
import { connect } from 'react-redux';


function ErrorsBlock(props) {
  const { errors } = props;

  return (
    <div className="auth-page__errors-block font-type-b-14">
      {errors}
    </div>
  );
}

const mapStateToProps = (state) => ({ errors: state.authStore.errors });

export default connect(mapStateToProps, null)(ErrorsBlock);
