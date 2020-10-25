import { PureComponent } from 'react';
import { notify } from 'react-notify-toast';

import './index.scss';

export default class Toast extends PureComponent {
  static showMessage(msg = '哥请传字符串', time = 2000) {
    let myColor = { background: 'rgba(0, 0, 0, 0.7)', text: '#FFFFFF' };
    notify.show(msg, 'custom', time, myColor);
  }
}
