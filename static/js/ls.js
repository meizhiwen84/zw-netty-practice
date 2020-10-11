// 业务代码
var flag = 1;
var tj = {
    view: false,
    acc: false,
    engine: null,
    u: 0,
    sid: 0,
    gbk: false,
    word: '',//搜索词
    clearSelection: false,
    sourceURL: null,
    keywordCode: null,//URL追踪
    ip: "空",
    customerlocal: "空",
    equipment: "空",
    mobile: "空",
    behavior: "空",
    keyword: "",//关键词
    adposition:0
};
window.goTJ = tj;

// 获取URL追踪参数
function getKeywordCode() {

    var a = window.location.href;
    var b = a.indexOf("?");
    if (b == -1) {
        b = a.indexOf("#");
        if (b == -1) {
            tj.sourceURL = a;
            return
        } else {
            var c = a.length;
            var d = a.substring(0, b);
            var e = a.substring(b + 1, c);
            tj.sourceURL = a;
        }
    } else {
        var c = a.length;
        var d = a.substring(0, b);
        var e = a.substring(b + 1, c);
        tj.sourceURL = a;
    }
    
    tj.keyword = GetQueryString("keyword");
    tj.adposition = GetQueryString("e_adposition");
    
}
getKeywordCode();


var url = document.referrer;
//var url = "https://www.so.com/s?ie=utf-8&src=know_side_nlp&q=%E9%98%B3%E6%9C%94%E8%87%AA%E7%94%B1%E8%A1%8C&ob_ext=";
// 获取各种路径信息
function parseURL(c) {
    var a = document.createElement('a');
    a.href = c;
    tj.params = {
        source: c,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var b = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue
                }
                s = seg[i].split('=');
                b[s[0]] = s[1]
            }
            return b
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    }
}
parseURL(url);

// 获取搜索引擎
function getEngine(a) {
    if (a.indexOf('m.baidu.com') > -1) {
        tj.engine = '百度-移动';
        return
    } else if (a.indexOf('www.baidu.com') > -1) {
        tj.engine = '百度-电脑';
        return
    } else if (a.indexOf('www.sogou.com') > -1) {
        tj.engine = '搜狗-电脑';
        return
    } else if (a.indexOf('wap.sogou.com') > -1) {
        tj.engine = '搜狗-移动';
        return
    } else if (a.indexOf('m.sogou.com') > -1) {
        tj.engine = '搜狗-移动';
        return
    } else if (a.indexOf('m.sogou.com/bill_cpc') > -1) {
        tj.engine = '搜狗-信息流';
        return
    } else if (a.indexOf('iflow.uczzd.cn') > -1) {
        tj.engine = 'UC信息流-移动';
        return
    } else if (a.indexOf('www.so.com') > -1) {
        tj.engine = '360-电脑'
    } else if (a.indexOf('m.so.com') > -1) {
        tj.engine = '360-移动'
    } else if (a.indexOf('image.so.com') > -1) {
        tj.engine = '360-电脑-图片'
    } else if (a.indexOf('sm.cn') > -1) {
        tj.engine = "神马搜索"
    } else if (a.indexOf('toutiao.com') > -1) {
        tj.engine = "今日头条"
    } else if (a.indexOf('cx.sogou.com') > -1) {
        tj.engine = "搜狗-信息流"
    } else {
        tj.engine = "未知的搜索渠道"
    }
}
getEngine(tj.params.host);


function isGBK(a) {
    if (a == null) {
        return false
    }
    a = a.toLowerCase();
    return a.indexOf('utf') == -1
}
tj.gbk = isGBK(tj.params.ie);


// 获取有效字
function getYouxuanKeyword(a) {
    tj.gbk = true;
    for (var i = 0; i < a.length; i++) {
        if (a[i].indexOf('p=') == 0) {
            var p = unescape(a[i].substring(2));
            var s = p.indexOf('=');
            var e = p.indexOf('&');
            var b = b(p.substring(s + 1, e));
            return decodeURIComponent(b)
        }
    }
    return null
}

// 获取搜索键字
function getKeyWord() {
    if (url.length == 0) {
        tj.word = "无";
        return
    }
    var a = tj.params;
    if (a.host.indexOf('youxuan.baidu.com') >= 0) {
        tj.word = getYouxuanKeyword(a.query.split('&'));
        return
    }
    if (!tj.params) {
        return null
    }
    if (tj.engine == "百度-移动" || tj.engine == "百度-电脑") {
        var b = a.params.word || a.params.keyword || a.params.wd || a.params.q
    } else if (tj.engine == "搜狗") {
        var b = a.params.query || a.params.keyword
    } else {
        var b = a.params.word || a.params.keyword || a.params.wd || a.params.q || a.params.query
    }
    if (a.host == 'cpro.baidu.com') {
        b = a.params.ori || a.params.k || a.params.k0 || a.params.k1 || a.params.k2 || a.params.k3 || a.params.k4;
        tj.gbk = true
    }
    if (b != null && b.indexOf('%') > -1) {
        tj.word = decodeURIComponent(b)
    } else {
        tj.word = b
    }
    if (tj.word == undefined)
    {
        tj.word = "无";
    }
}
getKeyWord();
var date = {};


// 获取时间
function getTime() {
    var a = new Date();
    date.y = a.getFullYear();
    date.m = a.getMonth();
    date.d = a.getDate()
}
getTime();




// 获取设备信息
function getUserAgent() {
    tj.keywordCode = navigator.userAgent;
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        tj.equipment = 'IOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        tj.equipment = '安卓';
    } else {
        tj.equipment = '电脑';
    };
}
getUserAgent();


// 获取浏览器信息
function getBrowser() {
    var u = navigator.userAgent;
    var u2 = navigator.appVersion;
    if (u.indexOf('Trident') > -1)
    {
        tj.model = 'IE浏览器';
    } else if (u.indexOf('Presto') > -1) {
        tj.model = 'opera浏览器';
    } else if (u.indexOf('BIDUBrowser') > -1) {
        tj.model = '百度浏览器';
    } else if (u.indexOf('SE') > -1) {
        tj.model = '搜狗浏览器';
    } else if (u.indexOf('QQBrowser') > -1) {
        tj.model = 'QQ浏览器';
    } else if (u.indexOf('TheWorld') > -1) {
        tj.model = '世界之窗浏览器';
    } else if (u.indexOf('Maxthon') > -1) {
        tj.model = '遨游浏览器';
    } else if (u.indexOf('baiduboxapp') > -1) {
        tj.model = '百度APP浏览器';
    } else if (u.indexOf('iPhone') > -1) {
        tj.model = 'iPhone';
    } else if (u.indexOf('iPad') > -1) {
        tj.model = 'iPad';
    } else if (u.indexOf('MicroMessenger') > -1) {
        tj.model = '微信';
    } else if (u.indexOf('UCBrowser') > -1) {
        tj.model = 'UC浏览器';
    } else if (u.indexOf('VivoBrowser') > -1) {
        tj.model = 'VIVO浏览器';
    } else if (u.indexOf('HuaweiBrowser') > -1) {
        tj.model = '华为浏览器';
    } else if (u.indexOf('MiuiBrowser') > -1) {
        tj.model = '小米浏览器';
    } else if (u.indexOf('OppoBrowser') > -1) {
        tj.model = 'OPPO浏览器';
    } else if (u.indexOf('SLBrowser') > -1) {
        tj.model = '智慧浏览器';
    } else if (u.indexOf('Firefox') > -1) {
        tj.model = '火狐浏览器';
    } else if (u.indexOf('8888888888') > -1) {
        tj.model = '88888888888888888';
    } else if (u.indexOf('8888888888') > -1) {
        tj.model = '88888888888888888';
    }else if (u.indexOf('Baiduspider-render') > -1) {
        tj.model = '百度蜘蛛';
        tj.engine = "百度蜘蛛"
    } else if (u.indexOf('Baiduspider-ads') > -1) {
        tj.model = '百度蜘蛛';
        tj.engine = "百度蜘蛛"
    }

    if (tj.model == "" || tj.model == undefined) {
        if (u2.indexOf('Firefox') > -1) {
            tj.model = '火狐浏览器';
        } else if (u2.indexOf('88888888888888') > -1) {
            tj.model = '88888';
        }



        tj.model = '谷歌内核';
    }
    tj.model = GetMobileModel() + tj.model;
}
getBrowser();

//获取手机型号
function GetMobileModel() {
    if (navigator.userAgent.indexOf('MI 8 Lite') > -1) {
        return "小米|";
    } else if (navigator.userAgent.indexOf('OPPO') > -1) {
        return "OPPO|";
    } else if (navigator.userAgent.indexOf('vivo') > -1) {
        return "VIVO|";
    } else if (navigator.userAgent.indexOf('EVR-AL00') > -1) {
        return "华为Mate20|";
    } else if (navigator.userAgent.indexOf('JKM-AL00') > -1) {
        return "华为畅享|";
    } else if (navigator.userAgent.indexOf('SOV33') > -1) {
        return "索尼|";
    } else if (navigator.userAgent.indexOf('BND-AL10') > -1) {
        return "华为荣耀畅玩|";
    } else if (navigator.userAgent.indexOf('JSN-AL00a') > -1) {
        return "华为荣耀8X|";
    } else if (navigator.userAgent.indexOf('Redmi') > -1) {
        return "红米|";
    } else if (navigator.userAgent.indexOf('1707-A01') > -1) {
        return "360N6|";
    } else if (navigator.userAgent.indexOf('Mi-4c') > -1) {
        return "小米4C|";
    } else if (navigator.userAgent.indexOf('M6 Note') > -1) {
        return "魅族|";
    } else if (navigator.userAgent.indexOf('1801-A01') > -1) {
        return "360|";
    } else if (navigator.userAgent.indexOf('JKM-AL00b') > -1) {
        return "华为畅享|";
    } else if (navigator.userAgent.indexOf('PADM00') > -1) {
        return "OPOP A3|";
    } else if (navigator.userAgent.indexOf('BLA-AL00') > -1) {
        return "华为Mate10|";
    } else if (navigator.userAgent.indexOf('SM-C7000') > -1) {
        return "三星|";
    } else if (navigator.userAgent.indexOf('FIG-AL10') > -1) {
        return "华为畅享7S|";
    } else if (navigator.userAgent.indexOf('ELE-AL00') > -1) {
        return "华为P30|";
    } else if (navigator.userAgent.indexOf('SLA-AL00') > -1) {
        return "华为畅享7|";
    } else if (navigator.userAgent.indexOf('M5 Note') > -1) {
        return "魅族N5|";
    } else if (navigator.userAgent.indexOf('POT-AL00a') > -1) {
        return "手机畅享9S|";
    } else if (navigator.userAgent.indexOf('VIE-AL10') > -1) {
        return "华为P9 Plus|";
    } else if (navigator.userAgent.indexOf('V1818A') > -1) {
        return "VIVO U1|";
    } else if (navigator.userAgent.indexOf('PBBM30') > -1) {
        return "OPPO A5|";
    } else if (navigator.userAgent.indexOf('ZTE BA611T') > -1) {
        return "中兴BA611T|";
    } else if (navigator.userAgent.indexOf('SM-G9500') > -1) {
        return "三星Galaxy S8|";
    } else if (navigator.userAgent.indexOf('V1809A') > -1) {
        return "VIVO X23|";
    } else if (navigator.userAgent.indexOf('SM-E7009') > -1) {
        return "三星GALAXY E7|";
    } else if (navigator.userAgent.indexOf('ALP-AL00') > -1) {
        return "华为Mate10|";
    } else if (navigator.userAgent.indexOf('PCHM30') > -1) {
        return "OPPO A11X|";
    } else if (navigator.userAgent.indexOf('TRT-TL10A') > -1) {
        return "华为畅享7 Plus|";
    } else if (navigator.userAgent.indexOf('EVA-AL10') > -1) {
        return "华为P9|";
    } else if (navigator.userAgent.indexOf('V1901A') > -1) {
        return "VIVO Y3|";
    } else if (navigator.userAgent.indexOf('PRA-AL00') > -1) {
        return "华为荣耀8青春版|";
    } else if (navigator.userAgent.indexOf('PBEM00') > -1) {
        return "OPPO R17|";
    } else if (navigator.userAgent.indexOf('FLA-AL20') > -1) {
        return "华为畅享8 Plus|";
    } else if (navigator.userAgent.indexOf('PAAM00') > -1) {
        return "OPPO R15|";
    } else if (navigator.userAgent.indexOf('DLI-TL20') > -1) {
        return "华为荣耀6A|";
    } else if (navigator.userAgent.indexOf('HWI-AL00') > -1) {
        return "华为Nova2S|";
    } else if (navigator.userAgent.indexOf('COL-AL10') > -1) {
        return "荣耀10|";
    } else if (navigator.userAgent.indexOf('DUB-AL00') > -1) {
        return "华为畅享9|";
    } else if (navigator.userAgent.indexOf('Mi Note') > -1) {
        return "小米Note3|";
    } else if (navigator.userAgent.indexOf('V1732A') > -1) {
        return "VIVO Y81S|";
    } else if (navigator.userAgent.indexOf('SM-N900') > -1) {
        return "三星Galaxy N3|";
    } else if (navigator.userAgent.indexOf('HMA-AL00') > -1) {
        return "华为Mate20|";
    } else if (navigator.userAgent.indexOf('V1813T') > -1) {
        return "VIVO Z3i|";
    } else if (navigator.userAgent.indexOf('HMA-L29') > -1) {
        return "华为mate20|";
    } else if (navigator.userAgent.indexOf('OPPO A57') > -1) {
        return "OPPO A57|";
    } else if (navigator.userAgent.indexOf('MI 5') > -1) {
        return "小米5|";
    } else if (navigator.userAgent.indexOf('LYA-AL00') > -1) {
        return "Mate20Pro|";
    } else if (navigator.userAgent.indexOf('BLN-AL20') > -1) {
        return "华为荣耀畅玩6X|";
    } else if (navigator.userAgent.indexOf('GIONEE F6L') > -1) {
        return "金立F6L|";
    } else if (navigator.userAgent.indexOf('NXT-AL10') > -1) {
        return "华为Mate 8|";
    } else if (navigator.userAgent.indexOf('PCAM10') > -1) {
        return "OPPO A9|";
    } else if (navigator.userAgent.indexOf('V1836A') > -1) {
        return "VIVO X27PRO|";
    } else if (navigator.userAgent.indexOf('EML-AL00') > -1) {
        return "华为P20|";
    } else if (navigator.userAgent.indexOf('VTR-AL00') > -1) {
        return "华为P10|";
    } else if (navigator.userAgent.indexOf('SCL-CL00') > -1) {
        return "华为 荣耀4A|";
    } else if (navigator.userAgent.indexOf('VKY-AL00') > -1) {
        return "华为P10 Plus|";
    } else if (navigator.userAgent.indexOf('PBAM00') > -1) {
        return "OPPO A5|";
    } else if (navigator.userAgent.indexOf('MHA-AL00') > -1) {
        return "华为Mate 9|";
    } else if (navigator.userAgent.indexOf('MI MAX 2') > -1) {
        return "小米MAX2|";
    } else if (navigator.userAgent.indexOf('VOG-AL10') > -1) {
        return "华为P30 Pro|";
    } else if (navigator.userAgent.indexOf('Che1-CL20') > -1) {
        return "荣耀畅玩4X|";
    } else if (navigator.userAgent.indexOf('SM-G9350') > -1) {
        return "三星GALAXY S7|";
    } else if (navigator.userAgent.indexOf('VNS-AL00') > -1) {
        return "华为G9青春版|";
    } else if (navigator.userAgent.indexOf('KNT-AL20') > -1) {
        return "荣耀V8|";
    } else if (navigator.userAgent.indexOf('MI 6X') > -1) {
        return "小米6X|";
    } else if (navigator.userAgent.indexOf('m2 note') > -1) {
        return "魅蓝note2|";
    } else if (navigator.userAgent.indexOf('R7c') > -1) {
        return "OPPOR7|";
    } else if (navigator.userAgent.indexOf('MIX 3') > -1) {
        return "小米MIX 3|";
    } else if (navigator.userAgent.indexOf('U FLY F9') > -1) {
        return "宇飞来 YU FLY F9|";
    } else if (navigator.userAgent.indexOf('MIX 3') > -1) {
        return "小米MIX 3|";
    } else if (navigator.userAgent.indexOf('CLT-AL00') > -1) {
        return "华为P20 Pro|";
    } else if (navigator.userAgent.indexOf('V1832A') > -1) {
        return "VIVO S1 Pro|";
    } else if (navigator.userAgent.indexOf('MAX3(X23)') > -1) {
        return "米蓝 MAX3|";
    } else if (navigator.userAgent.indexOf('V1816A') > -1) {
        return "VIVO X23|";
    } else if (navigator.userAgent.indexOf('PCHM10') > -1) {
        return "OPPO A11|";
    } else if (navigator.userAgent.indexOf('PACT00') > -1) {
        return "OPPO R15|";
    } else if (navigator.userAgent.indexOf('PBFM00') > -1) {
        return "OPPO A7|";
    } else if (navigator.userAgent.indexOf('OS105') > -1) {
        return "坚果Pro2|";
    } else if (navigator.userAgent.indexOf('ONEPLUS') > -1) {
        return "一加手机|";
    } else if (navigator.userAgent.indexOf('R7Plus') > -1) {
        return "OPPO_R7Plus|";
    } else if (navigator.userAgent.indexOf('DUA-AL00') > -1) {
        return "荣耀畅玩7|";
    } else if (navigator.userAgent.indexOf('CPH1721') > -1) {
        return "Oppo R11s Plus|";
    } else if (navigator.userAgent.indexOf('Xiaomi') > -1) {
        return "小米|";
    } else if (navigator.userAgent.indexOf('SM-N9109W') > -1) {
        return "三星GALAXY Note 4|";
    } else if (navigator.userAgent.indexOf('HRY-AL00Ta') > -1) {
        return "荣耀20i|";
    } else if (navigator.userAgent.indexOf('MI 8 SE') > -1) {
        return "小米8 SE|";
    } else if (navigator.userAgent.indexOf('SM-J7108') > -1) {
        return "三星2016版GALAXY J7|";
    } else if (navigator.userAgent.indexOf('V1831A') > -1) {
        return "VIVO S1|";
    } else if (navigator.userAgent.indexOf('ARE-AL00') > -1) {
        return "荣耀8X Max|";
    } else if (navigator.userAgent.indexOf('DUA-TL00') > -1) {
        return "荣耀畅玩7|";
    } else if (navigator.userAgent.indexOf('LRA-AL00') > -1) {
        return "荣耀20|";
    } else if (navigator.userAgent.indexOf('HRY-AL00Ta') > -1) {
        return "荣耀20i|";
    } else if (navigator.userAgent.indexOf('RMX1971') > -1) {
        return "realme Q|";
    } else if (navigator.userAgent.indexOf('20170829D') > -1) {
        return "小辣椒|";
    } else if (navigator.userAgent.indexOf('V1813A') > -1) {
        return "VIVO Y97|";
    } else if (navigator.userAgent.indexOf('PBBM00') > -1) {
        return "OPPO A7x|";
    } else if (navigator.userAgent.indexOf('HRY-AL00a') > -1) {
        return "荣耀10|";
    } else if (navigator.userAgent.indexOf('PACM00') > -1) {
        return "OPPO R15|";
    } else if (navigator.userAgent.indexOf('Nokia X6') > -1) {
        return "诺基亚X6|";
    } else if (navigator.userAgent.indexOf('JAT-AL00') > -1) {
        return "荣耀畅玩8A|";
    } else if (navigator.userAgent.indexOf('MI MAX') > -1) {
        return "小米Max|";
    } else if (navigator.userAgent.indexOf('JSN-AL00') > -1) {
        return "荣耀8X|";
    } else if (navigator.userAgent.indexOf('MI 6') > -1) {
        return "小米6|";
    } else if (navigator.userAgent.indexOf('BKK-AL10') > -1) {
        return "荣耀畅玩8C|";
    } else if (navigator.userAgent.indexOf('AUM-AL00') > -1) {
        return "荣耀畅玩7A|";
    } else if (navigator.userAgent.indexOf('MI CC 9') > -1) {
        return "小米CC9|";
    } else if (navigator.userAgent.indexOf('LLD-AL20') > -1) {
        return "荣耀9i|";
    } else if (navigator.userAgent.indexOf('BKK-TL00') > -1) {
        return "荣耀畅玩8C|";
    } else if (navigator.userAgent.indexOf('DE106') > -1) {
        return "坚果R1|";
    } else if (navigator.userAgent.indexOf('iPhone') > -1) {
        return "苹果|";
    } else if (navigator.userAgent.indexOf('Letv X501') > -1) {
        return "乐视乐1S|";
    } else if (navigator.userAgent.indexOf('CAM-TL00') > -1) {
        return "荣耀畅玩5A|";
    } else if (navigator.userAgent.indexOf('SEA-AL10') > -1) {
        return "华为nova5 Pro|";
    } else if (navigator.userAgent.indexOf('PCT-AL10') > -1) {
        return "荣耀V20|";
    } else if (navigator.userAgent.indexOf('SUGAR Y12') > -1) {
        return "SUGAR Y12|";
    } else if (navigator.userAgent.indexOf('KIW-CL00') > -1) {
        return "荣耀畅玩5X|";
    } else if (navigator.userAgent.indexOf('MRD-AL00') > -1) {
        return "华为畅享9e|";
    } else if (navigator.userAgent.indexOf('HWI-TL00') > -1) {
        return "华为nova2s|";
    } else if (navigator.userAgent.indexOf('DUK-AL20') > -1) {
        return "荣耀V9|";
    } else if (navigator.userAgent.indexOf('V1818CA') > -1) {
        return "VIVO Y93s|";
    } else if (navigator.userAgent.indexOf('HLK-AL00') > -1) {
        return "荣耀9X|";
    } else if (navigator.userAgent.indexOf('Le X620') > -1) {
        return "乐视乐2|";
    } else if (navigator.userAgent.indexOf('TNY-AL00') > -1) {
        return "荣耀 Magic2|";
    } else if (navigator.userAgent.indexOf('PCGM00') > -1) {
        return "OPPO K3|";
    } else if (navigator.userAgent.indexOf('MLA-AL10') > -1) {
        return "华为麦芒5|";
    } else if (navigator.userAgent.indexOf('EVA-AL00') > -1) {
        return "华为P9|";
    } else if (navigator.userAgent.indexOf('SLA-TL10') > -1) {
        return "华为畅享7|";
    } else if (navigator.userAgent.indexOf('MAR-AL00') > -1) {
        return "华为nova4e|";
    } else if (navigator.userAgent.indexOf('PIC-AL00') > -1) {
        return "华为nova 2|";
    } else if (navigator.userAgent.indexOf('Mac OS') > -1) {
        return "苹果电脑|";
    } else if (navigator.userAgent.indexOf('88888888888') > -1) {
        return "888888888888888|";
    } else if (navigator.userAgent.indexOf('88888888888') > -1) {
        return "888888888888888|";
    } else if (navigator.userAgent.indexOf('88888888888') > -1) {
        return "888888888888888|";
    } else if (navigator.userAgent.indexOf('88888888888') > -1) {
        return "888888888888888|";
    } else if (navigator.userAgent.indexOf('HUAWEI') > -1) {
        return "华为|";
    } else if (navigator.userAgent.indexOf('XiaoMi') > -1) {
        return "小米|";
    } else if (navigator.userAgent.indexOf('Windows NT') > -1 && navigator.userAgent.indexOf('WOW64') > -1) {
        return "Windows系统|";
    } else {
        return "";
    }
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}


function layer_close() {
    //layer.close(layer.index);
    //$('#tck').click();
}
function layer_open() {
    //$('.sp_weixinhao').eq(0).click();
    //$('#a_wx').click();
}