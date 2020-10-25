import React from 'react';

import classnames from 'classnames';

import './index.scss';

const answer = props => {
  let { beSureFunc } = props;
  let { answer } = props;
  return (
    <div className={classnames('answer')}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="title_left d-flex flex-direction-row">
          <span className="title_left_logo" />
          <div className="title_left_name d-flex flex-direction-column">
            <span>{answer.pin}</span>
            <span>
              <span
                style={{ fontFamily: 'PingFangSC-Medium', fontWeight: 600 }}
              >
                {answer.number}
              </span>人认可
            </span>
          </div>
          <span className="title_left_level">{answer.level}</span>
        </div>
        <div className="title_right d-flex flex-direction-column">
          <span>最佳答案</span>
          <span>{answer.date}</span>
        </div>
      </div>
      <p>
        {answer.describe}
        <img src={answer.smile} alt="" />
        <img src={answer.smile} alt="" />
        <img src={answer.smile} alt="" />
      </p>
      <img className="answer_bg" src={answer.answer_bg} alt="" />
      {/*出游方式*/}
      <div className="answer_Travel_way">
        <span>{answer.way1}</span>
        <p>{answer.way1Content}</p>
      </div>
      {/*导游*/}
      <div className="answer_Travel_way">
        <span>{answer.way2}</span>
        <p dangerouslySetInnerHTML={{ __html: answer.way2Content }} />
        <div className="answer_Travel_way_strong">
          时间：&nbsp;
          <span>
            <strong>{answer.day}</strong>天
          </span>
        </div>
        <div className="answer_Travel_way_strong">
          人均：&nbsp;
          <span>
            约<strong>{answer.money}</strong>元左右
          </span>
        </div>
        <div className="answer_Travel_way_strong">
          服务包括：&nbsp;
          <span dangerouslySetInnerHTML={{ __html: answer.serviceContent }} />
        </div>
        <div
          className="answer_Travel_way_advice left"
        >
          <h4 class="zaax-wxh">自由行管家<span class="zaax-wxname">小剪</span>微信：15587559122</h4>
          (←长按复制添加至微信)<br />
          下面给大家分享旅游经验和建议，仅供参考
        </div>
      </div>
      <div className="answer_Travel_way advice">
        <span>【经验建议】</span>

        {answer.advice &&
          answer.advice.map((item, index) => {
            return (
              <p key={index} className="advice">
                {item}
              </p>
            );
          })}
      </div>
      <img src={answer.way1Img} className="answer_bg" alt="" />
      <img src={answer.way2Img} className="answer_bg" alt="" />
      <div className="answer_Travel_way">
        <span>【行程攻略】</span>

        {answer.strategys &&
          answer.strategys.map((item, inx) => {
            return (
              <p className="advice day" key={inx}>
                <strong>{item.name}：</strong>
                {item.content}
              </p>
            );
          })}
      </div>
      <div className="tip">ps：为我们量身打造的供参考，如果大家还有什么特殊的要求，也可以加<span class="zaax-wxname">小剪</span>详细了解下的哦。</div>
      <p className="introduce">
        整个行程玩下很轻松，没有任何的强制消费环节，专业VIP接站，专车接送，这个是必须要点赞的，<span class="zaax-wxname">小剪</span>不但做事认真负责，而且安排的行程也是高度自由，不论想玩几天时间，你想怎么玩就怎么玩，他都可以根据你的时间和兴趣爱好安排一条合理的旅游路线，去恩施旅游找<span class="zaax-wxname">小剪</span>绝不会错:
      </p>
      <div
        className="answer_Travel_way_advice"
      >
        <h4 class="zaax-wxh">自由行管家<span class="zaax-wxname">小剪</span>微信：15587559122</h4>
        (←长按复制添加至微信)<br />
      </div>
      {answer.bgPhotos &&
        answer.bgPhotos.map((bgPhoto, ind) => {
          return <img key={ind} src={bgPhoto} className="answer_bg" alt="" />;
        })}
    </div>
  );
};

export default answer;
