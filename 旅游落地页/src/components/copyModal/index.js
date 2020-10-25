import React from 'react';

import './index.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const copyModal = props => {
  let { close, show, copy, goWx } = props;
  //   复制电话号码
  let number = '15587559122';
  return (
    <div>
      {show && (
        <div className="copy_modal d-flex align-items-center justify-content-center">
          <div className="modal d-flex align-items-center justify-content-center">
            <div className="title">15587559122 是微信号也是手机号，您可以：</div>
            <CopyToClipboard
              text={number} //点击复制时的内容,可自行设置或传入
              onCopy={copy} //点击之后的回调
            >
              <p key="copy">
                点击复制(<span>15587559122</span>)
              </p>
            </CopyToClipboard>

            <p
              onClick={() => {
                goWx();
              }}
            >
              打开微信(<span>若无反应，请手动打开</span>)
            </p>
            <p>
              拨打电话(<a href="tel:13828172679">15587559122</a>)
            </p>
          </div>
          <div
            className="cancel"
            onClick={() => {
              close();
            }}
          >
            取消
          </div>
        </div>
      )}
    </div>
  );
};

export default copyModal;
