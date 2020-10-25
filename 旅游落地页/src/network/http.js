import Toast from '../components/toast';

// 本地环境
export let HOST = '';
/*下面错误码都是可以根据项目的code进行修改*/
// const CODE_SUCCESS = '200'; //成功

let axios = require('axios-jsonp-pro');

axios.defaults.baseURL = HOST;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

export default class Http {
  _doQuery(method, path, data, host, config) {
    //支持post formdata
    let configInit = {
      withoutInfo: false,
      formData: false,
      dealData: true,
      showError: true,
      cache: true,
      ...config
    };
    let {
      withoutInfo,
      formData,
      dealData,
      showError,
      cache,
      file
    } = configInit;

    let paramsTmp = data;
    if (withoutInfo) {
      paramsTmp = {
        ...data
      };
    }
    if (!cache) {
      paramsTmp['_t'] = new Date().getTime();
    }
    if (method === axios.post) {
      data = paramsTmp;
    } else {
      data = {
        params: paramsTmp
      };
    }
    if (file) {
      let fd = new FormData();

      Object.keys(data).forEach(function(key) {
        fd.append(key, data[key]);
      });
      data = fd;
    } else if (formData) {
      function form() {
        let ret = [];
        for (let it in data) {
          ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]));
        }
        return ret.join('&');
      }
      data = form(data);
    }

    return new Promise((resolve, reject) => {
      host && host.length
        ? (axios.defaults.baseURL = host)
        : (axios.defaults.baseURL = HOST);
      method(path, data)
        .then(response => {
          //jsonp得测试
          if (method === axios.jsonp) {
            response = {
              status: 200,
              data: response
            };

            if (response.data.code) {
              response.data.resultCode = response.data.code;
              response.data.resultMessage = response.data.msg;
            }
          }

          if (dealData) {
            processResponseData(response, resolve, reject, showError, path);
          } else {
            resolve(response.data);
          }
        })
        .catch(error => {
          window.__sgm__.custom({
            type: 1,
            code: path,
            msg: JSON.stringify(error)
          });
          reject(error);
        });
    });
  }
  get(path, data, host, config) {
    return this._doQuery(axios.get, path, data, host, config);
  }
  post(path, data, host, config) {
    return this._doQuery(axios.post, path, data, host, config);
  }
  jsonp(path, data, host, config) {
    return this._doQuery(axios.jsonp, host + path, data, host, config);
  }
}

function processResponseData(response, resolve, reject, showError, path) {
  switch (response.status) {
    case 200: {
      let resData = response.data;

      if (resData.status === 'success') {
        resolve(resData.data);
      } else if (resData.resultCode === 0) {
        resolve(resData.resultData);
      } else if (resData.code === 1000 || resData.resultCode === 3) {
        reject({
          error: resData
        });
      } else if ([].includes(resData.code)) {
        //需要报错Toast.showMessage，那么把code码都放着里面
        showError &&
          resData.message &&
          resData.message.length &&
          Toast.showMessage(resData.message);
        reject({
          error: resData
        });
      } else {
        Toast.showMessage('活动太火爆，请稍后再试');
        reject({
          error: resData
        });
      }
      break;
    }
    default: {
      reject(new Error());
    }
  }
}
