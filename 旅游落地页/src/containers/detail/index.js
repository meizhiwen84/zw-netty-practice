import React, { PureComponent } from 'react';

import './index.scss';
//图片
import { getUrlString } from '../../utils';
import * as travelData from '../../travelData';
class detail extends PureComponent {
  constructor(props) {
    super(props);
    document.title = '详情';
    this.state = travelData[getUrlString('id')];
  }
  render() {
    let { detail } = this.state;
    return (
      <div className="detail d-flex flex-direction-column align-items-center ">
        <img src={detail.img} alt="" />
        <div className="msg">
          <span>{detail.pin}</span>
          <span>{detail.lvevl}</span>
        </div>
        <div className="num">
          <span>
            <strong>{detail.approval}</strong>个认可&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>
            <strong>{detail.identification}</strong>个认同&nbsp;&nbsp;|&nbsp;&nbsp;
          </span>
          <span>
            <strong>{detail.answer}</strong>个回答
          </span>
        </div>
      </div>
    );
  }
}

export default detail;
