//判断是否是微信浏览器
export const isWeiXin = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') >= 0;
};

export const isIOS = function() {
  var u = window.navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

export const isAndroid = function() {
  var u = window.navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
};

export const isPC = function() {
  var userAgentInfo = window.navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

// webp图片的处理
const imgCheck = () => {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    );
  } catch (err) {
    return false;
  }
};

export const isWebp = imgCheck() ? '.webp' : '';

// 京东图片的处理
/*

  url:图片的路径
  scale:缩放比列  默认给70，如不需要，则参数传空
  dpg:dpg格式的压缩 默认是支持的，如不想用dpg压缩，参数传空
  width:缩放的宽度  默认是没有值
  height:缩放的高度 默认是没有值
  以下域名的可以被解析：img10.360buyimg.com、img11.360buyimg.com、img12.360buyimg.com、img13.360buyimg.com、img14.360buyimg.com、img20.360buyimg.com、img30.360buyimg.com、m.360buyimg.com (主要用于移动端)


*/
export const gzipPicture = function(url, scale, dpg, width, height) {
  let urls = [
      'img10.360buyimg.com',
      'img11.360buyimg.com',
      'img12.360buyimg.com',
      'img13.360buyimg.com',
      'img14.360buyimg.com',
      'img20.360buyimg.com',
      'img30.360buyimg.com',
      'm.360buyimg.com'
    ],
    isUrl =
      url &&
      urls.includes(
        url.split('//')[1]
          ? url.split('//')[1].split('360buyimg.com')[0] + '360buyimg.com'
          : ''
      ) &&
      /\.(jpg|png)$/.test(url),
    newUrl;

  newUrl =
    url && url.indexOf('/jfs/') > 0 && width && height
      ? url.replace('/jfs/', `/s${width}x${height}_jfs/`)
      : url;
  newUrl = `${newUrl}${scale === '' ? '' : '!q' + (scale ? scale : 70)}${dpg ===
  ''
    ? ''
    : '.dpg'}${isWebp}`;
  return isUrl ? newUrl : url;
};

/**
 * 获得当前地址栏传递参数
 * @returns {null}
 */
export function getUrlString(name) {
  var reg = new RegExp('(^|&|\\?)' + name + '=([^&^#]*)(#|&|$)', 'i');
  var r = window.location.href.match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
