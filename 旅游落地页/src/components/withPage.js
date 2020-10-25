import React, { Component } from 'react';

function withPage(WrappedComponent, page = {}) {
  return class extends Component {
    componentDidMount() {
      const { title } = page;
      // 公共设置title
      document.title = title || '旅游指南';
      window.myHistory = this.props.history;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withPage;
