import React, { PureComponent } from 'react';

import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../store/actions/home';
import Toast from '../../components/toast';
import { isWeiXin, getUrlString } from '../../utils';
import * as travelData from '../../travelData';

import withPage from '../../components/withPage.js';
import Question from '../../components/question'; //问题
import Answer from '../../components/answer'; //最佳问答
import BottomAnswer from '../../components/bottomAnswer'; //最佳问答
import CopyModal from '../../components/copyModal'; //复制弹框

import './index.scss';

class home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = travelData[getUrlString('id')];
  }
  goDetail = () => {
    let { history } = this.props;
    history.push('/detail.html?id=' + getUrlString('id'));
  };
  // 复制的确认弹框
  beSureFunc = () => {
    this.setState({
      show: true
    });
  };
  //复制的回调
  copy = () => {
    Toast.showMessage('复制成功', 1000);
  };
  //关闭
  close = () => {
    this.setState({
      show: false
    });
  };
  //打开微信
  goWx = () => {
    if (!isWeiXin()) {
      window.location.href = 'weixin://';
    } else {
      Toast.showMessage('已在微信App内且内容已复制，赶紧去添加吧');
    }
  };
  render() {
    let {
      contents,
      contents1,
      contents2,
      contents3,
      contents4,
      answer,
      answer1,
      answer2,
      topTotal1,
      topTotal2,
      topTotal3,
      topTotal4,
      topTotal5,
      show,
      question,
      topAnswer
    } = this.state;

    return (
      <div>
        <div
          className={classnames('home_container d-flex flex-direction-column')}
        >
          <div className={classnames('home_container_title')}>
            <span className="logo" />
            <span className="title_right">官网首页</span>
          </div>
        </div>
        <Question goDetail={this.goDetail} question={question} />
        <Answer beSureFunc={this.beSureFunc} answer={topAnswer} />
        <BottomAnswer
          contents={contents}
          contents1={contents1}
          contents2={contents2}
          contents3={contents3}
          contents4={contents4}
          answer={answer}
          answer1={answer1}
          answer2={answer2}
          topTotal1={topTotal1}
          topTotal2={topTotal2}
          topTotal3={topTotal3}
          topTotal4={topTotal4}
          topTotal5={topTotal5}
          beSureFunc={this.beSureFunc}
        />
        <CopyModal
          show={show}
          copy={this.copy}
          close={this.close}
          goWx={this.goWx}
        />
        <p style={{ textAlign: 'center', lineHeight: '60px', color: '#999' }}>
          ~~~~到底了~~~~
        </p>
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

const page = {
  title: travelData[getUrlString('id')].documentTitle
};

export default withPage(
  connect(mapStateToProps, mapDispatchToProps)(home),
  page
);
