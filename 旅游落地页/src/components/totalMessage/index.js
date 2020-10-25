import React from 'react';
// import smile from '../../imgs/j_0057.gif';
// import answer_bg from '../../imgs/202009101446404296.jpg';
// import way1 from '../../imgs/202009101450542734.jpeg';
// import way2 from '../../imgs/202009101450547734.jpg';
// import photo1 from '../../imgs/202009101451140078.jpg';
// import photo2 from '../../imgs/202009101451523671.jpg';
// import photo3 from '../../imgs/202009101451527421.jpg';
// import photo4 from '../../imgs/202009101451528828.jpg';

import './index.scss';

const TotalMessage = props => {
  let { topTotal } = props;
  return (
    <div className="total_message d-flex justify-content-between">
      <div className="totel_left">
        <span>
          <strong>{topTotal.peopleNum}</strong>人顶过
        </span>
        <span>
          评论<strong>{topTotal.commentNum}</strong>
        </span>
      </div>
      <div className="totel_right">{topTotal.day}天前</div>
    </div>
  );
};

export default TotalMessage;
