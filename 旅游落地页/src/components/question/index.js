import React from 'react';

import classnames from 'classnames';

import './index.scss';

const question = props => {
  let { question } = props;
  return (
    <div>
      <div
        className={classnames('question')}
        onClick={() => {
          props.goDetail();
        }}
      >
        <h3>{question.title}</h3>
        <p>{question.content}</p>
        <div className="num">
          <span>
            <b className="strong">{question.number}</b>浏览
          </span>
          <span>
            <b className="strong">{question.answerNumber}</b>回答
          </span>
        </div>
        <div className="position">
          <span>{question.area}</span>
          <span>
            <img
              src="http://img.laobayou.cn/enshi/imgs/202007260937520703.jpg"
              alt=""
            />
            {question.pin}
          </span>
        </div>
      </div>
    </div>
  );
};

export default question;
