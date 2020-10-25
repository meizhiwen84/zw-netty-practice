import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications from 'react-notify-toast';
import * as homeActions from '../../store/actions/home';

class Main extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
      .isRequired
  };

  render() {
    let { children } = this.props;

    return (
      <div className="main">
        <div>
          {children}
          <Notifications />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => ({
  home
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(homeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
