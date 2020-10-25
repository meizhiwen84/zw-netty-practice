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

const commentContent = props => {
  let { contents } = props;
  return (
    contents &&
    contents.map((content, index) => {
      return (
        <div key={index} className="comment_content">
          <div>
            <img src={content.img} alt="" />
            <span className="margin_left">{content.name}</span>
            <span className="margin_left level">{content.level}</span>
          </div>
          <p>
            <span>{content.answer}</span>
            <span dangerouslySetInnerHTML={{ __html: content.content }} />
          </p>
        </div>
      );
    })
  );
};

export default commentContent;
