import React from 'react';

import TotalMessage from '../totalMessage'; //内容总信息显示
import CommentContent from '../commentContent'; //评论的内容
import CommonAnswer from '../commonAnswer'; //评论答区域

import './index.scss';

const bottomAnswer = props => {
  let {
    topTotal1,
    topTotal2,
    topTotal3,
    topTotal4,
    topTotal5,
    contents,
    contents1,
    contents2,
    contents3,
    contents4,
    answer,
    answer1,
    answer2,
    beSureFunc
  } = props;
  window.beSureFunc = beSureFunc;
  return (
    <div>
      <TotalMessage topTotal={topTotal1} />
      <CommentContent contents={contents} />
      <CommonAnswer answer={answer} />
      <TotalMessage topTotal={topTotal2} />
      <CommentContent contents={contents1} />
      <CommonAnswer answer={answer1} />
      <TotalMessage topTotal={topTotal3} />
      <CommentContent contents={contents2} />
      <CommonAnswer answer={answer2} />
      <TotalMessage topTotal={topTotal4} />
      <CommentContent contents={contents3} />
      <TotalMessage topTotal={topTotal5} />
      <CommentContent contents={contents4} />
    </div>
  );
};

export default bottomAnswer;
