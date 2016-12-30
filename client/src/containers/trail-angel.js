'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as testActions from '../actions/test-actions';
import * as userActions from '../actions/user-actions';

import Test from '../components/test.component';
import TabBar from '../components/common/footer.component';

// import any top level presentational components here

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <TabBar/>
      // <Test
        // foo={state.foo}s
        // bar={state.bar}
        // custom={state.custom}
        // { ...actions } />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state: state.testReducer
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(testActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailAngel);
