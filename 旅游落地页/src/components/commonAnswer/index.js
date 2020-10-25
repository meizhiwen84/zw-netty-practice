import React from 'react';

import './index.scss';

const commonAnswer = props => {
  let { answer } = props;
  return (
    <div className="common_answer">
      <div className="d-flex align-items-center">
        <div className="common_answer_pin">
          <img alt="" src={answer.img} />
        </div>
        <strong>{answer.name}</strong>
        <span className="level">{answer.level}</span>
      </div>
      <p>
        <span dangerouslySetInnerHTML={{ __html: answer.content }} />
      </p>
    </div>
  );
};

export default commonAnswer;
