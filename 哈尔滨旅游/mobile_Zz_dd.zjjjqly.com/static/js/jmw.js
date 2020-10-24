console.log("%c\u6280\u672f\u652f\u6301\uff1a%c\u5409\u7c73\u575e\u4fe1\u606f\u6280\u672f", "color:#41C074;font-size:20px;font-weight:700;", "color:#1E9FFF;font-size:20px;font-weight:700;");
var browse_time = 0;//停留时间
var mcount = 1;//第几屏
var playback_data = "";//滑动轨迹
var touch_data = "";//鼠标轨迹
var _copy_content = "";//复制内容
var _copy_type = "";//复制方式
var track_bool = true;//第一次复制
var operation_data = "";//操作记录
var wl_id = 0;

var _ip = "";
var _province = "";
var _city = "";
var id_new = 0;

$(function () {
    //console.log(JmwInitJson);
    if (JmwInitJson.config_ipapisource == "" || JmwInitJson.config_ipapisource == "sohu") {
        _ip = returnCitySN.cip;
        _province = returnCitySN.cname;
        $(".sp_sheng").text(_province.replace("省", "").replace("市", ""));
        //console.log("sohu");
    } else if (JmwInitJson.config_ipapisource == "ip138") {
        $.ajax({
            url: 'https://api.ip138.com/query/',
            data: {
                ip: '',
                oid: JmwInitJson.config_oid138,
                mid: JmwInitJson.config_mid138,
                token: JmwInitJson.config_token138
            },
            dataType: 'jsonp',
            success: function (json) {
                if (json.ret == 'ok') {
                    try {
                        _ip = json.ip;
                        _province = json.data[1];
                        _city = json.data[2];
                        $(".sp_sheng").text(_province.replace("省", ""));
                        $(".sp_shi").text(_city.replace("市", ""));
                    } catch (e) {

                    }

                } else if (json.ret == 'err') {
                    _province = json.msg;
                }
            }
        });
        //console.log("ip138");
    } else if (JmwInitJson.config_ipapisource == "126") {
        try {
            _province = lo;
            _city = lc;
            _ip = returnCitySN.cip;
            $(".sp_sheng").text(_province.replace("省", ""));
            $(".sp_shi").text(_city.replace("市", ""));
        } catch (e) {

        }
        //console.log("126");
    }
    try {
        fun_shield_city();
    } catch (e) {

    }
    
});

function JmwTrack() {
    if (track_bool) {
        // $.ajax({
        //     type: "POST",
        //     url: "/tools/lp.ashx",
        //     data: { action: "get_word", ip: _ip, word: tj.word, area: JmwInitJson.model_city, remark: tj.engine, province: _province, city: _city, gid: JmwInitJson.model_lx_gid, kf_name: kefu_data.xingming, kf_id: 0, browser: tj.model, wx: kefu_data.weixinhao, phone: kefu_data.shouji, url: tj.sourceURL, browse_time: browse_time, keywordCode: tj.keywordCode, urlreferrer: url, keyword: tj.keyword, mcount: mcount, copy_content: _copy_content, copy_type: _copy_type, width: window.innerWidth, height: window.innerHeight, playback_data: playback_data, touch_data: touch_data, operation_data: operation_data, adposition: tj.adposition, operation_time: operation_time, dep_id: JmwInitJson.dep_id },
        //     dataType: "json",
        //     jsonp: "callback",
        //     success: function (data) {
        //         console.log(data.mes);
        //         if (data.status == 1) {//成功
        //             wl_id = data.wl_id;
        //             operation_data = operation_data + '{"a":"track","s":"' + browse_time + '"},';
        //             track_bool = false;
        //             customJs();//自定义事件
        //         }
        //     }
        // });
    }
    else {
        console.log("第二次加粉不统计");
    }
}

function JmwLoadData() {
    if (JmwInitJson.model_lx_is_cookie == "1") {
        var word_cookie = $.cookie(JmwInitJson.model_lx_gid + '_word');
        if (JmwInitJson.repeat_word == 0) {
            word_cookie = undefined;
        }
        if (word_cookie == undefined || word_cookie != tj.word) {
            if (tj.word.length != 4) {
                // $.ajax({
                //     type: "POST",
                //     url: "/tools/lp.ashx",
                //     data: { action: "get_word_now", ip: _ip, word: tj.word, area: JmwInitJson.model_city, remark: tj.engine, province: _province, city: _city, gid: JmwInitJson.model_lx_gid, kf_name: kefu_data.xingming, kf_id: 0, browser: tj.model, wx: kefu_data.weixinhao, phone: kefu_data.shouji, url: tj.sourceURL, keywordCode: tj.keywordCode, urlreferrer: url, keyword: tj.keyword, width: window.innerWidth, height: window.innerHeight, adposition: tj.adposition, dep_id: JmwInitJson.dep_id},
                //     dataType: "json",
                //     jsonp: "callback",
                //     success: function (data) {
                //         if (data.status == 1) {//成功
                //             id_new = data.id_new;
                //             $.cookie(JmwInitJson.model_lx_gid + '_word', tj.word, { expires: 30 });
                //         }
                //         console.log(data.mes);
                //     }
                // });
            }
        }
        else {
            console.log("搜索词重复不统计");
        }
    }
}

//表单提交
function JmwTrackBd(_content) {
    if (JmwInitJson.model_lx_biaodan != "0") {
        // $.ajax({
        //     type: "POST",
        //     url: "/tools/lp.ashx",
        //     data: { action: "biaodan", ip: _ip, word: tj.word, area: JmwInitJson.model_city, remark: tj.engine, province: _province.cname, city: _city, gid: JmwInitJson.model_lx_gid, kf_name: kefu_data.xingming, kf_id: 0, browser: tj.model, wx: kefu_data.weixinhao, phone: kefu_data.shouji, url: tj.sourceURL, browse_time: browse_time, keywordCode: tj.keywordCode, content: _content, width: window.innerWidth, height: window.innerHeight },
        //     dataType: "json",
        //     jsonp: "callback",
        //     success: function (data) {
        //         if (data.status == 1) {
        //             layer.open({
        //                 content: '提交成功'
        //             , skin: 'msg'
        //             , time: 2 //2秒后自动关闭
        //             , end: function () {
        //
        //             }
        //             });
        //         } else {
        //             alert(data.msg);
        //         }
        //     }
        // });
    }
}

//浏览时间
function JmwLlsj() {
    if (id_new > 0) {
        // $.ajax({
        //     type: "POST",
        //     url: "/tools/lp.ashx",
        //     data: { action: "browse", urlr_id: id_new, wl_id: wl_id, browse_time: browse_time, mcount: mcount, playback_data: playback_data, touch_data: touch_data, operation_data: operation_data, dep_id: JmwInitJson.dep_id },
        //     dataType: "json",
        //     jsonp: "callback",
        //     success: function (data) {
        //         if (data.status == 1) {
        //             console.log("时间统计成功")
        //         } else {
        //         }
        //     }
        // });
    }
}

var copy_bool = false;
var vis_bool = true;//是否继续计时
var operation_time = 0;
//监测长按操作
var str_copy = "";

setInterval(function () {
    if (vis_bool) {
        browse_time = browse_time + 0.5;//停留时间
    }
    operation_time = operation_time + 0.5;
    str_copy = window.getSelection(0).toString();
    if (str_copy != "" && _copy_content != str_copy) {
        _copy_content = str_copy;
        _copy_type = 1;//长按
        operation_data = operation_data + '{"a":"selected","s":"' + browse_time + '"},';
        if (str_copy.indexOf(kefu_data.shouji) > -1 || str_copy.indexOf(kefu_data.weixinhao) > -1) {
            copy_bool = true;
            operation_time = 0;
        }
    }
}, 500);

var playback_top = 0;
setInterval(function () {
    if (vis_bool && browse_time < 300) {
        playback_top = document.documentElement.scrollTop || document.body.scrollTop;
        playback_data = playback_data + "|" + playback_top;
    }
}, 500);


//监控复制
document.addEventListener('copy', function (event) {
    operation_data = operation_data + '{"a":"copy","s":"' + browse_time + '"},';
    copy_bool = true;
    operation_time = 0;
});




//长按监控
$.fn.longPress = function (fn) {
    var timeout = undefined;
    var $this = this;
    for (var i = 0; i < $this.length; i++) {
        $this[i].addEventListener('touchstart', function (event) {
            timeout = setTimeout(fn, 800);
        }, false);
        $this[i].addEventListener('touchend', function (event) {
            clearTimeout(timeout);
        }, false);
    }
}

$(".sp_weixinhao,.sp_shoujihao").longPress(function () {
    copy_bool = true;
    operation_time = 0;
});




//判断激活状态
var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
        vis_bool = true;
        //已
        operation_data = operation_data + '{"a":"on","s":"' + browse_time + '"},';
    } else {
        //未
        operation_data = operation_data + '{"a":"off","s":"' + browse_time + '"},';
        vis_bool = false;
        JmwLlsj();
        if (copy_bool) {
            if (operation_time < 10) {
                console.log(operation_time);
                console.log("复制统计");
                JmwTrack();
            }
            copy_bool = false;
        }
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);
window.onbeforeunload = function (e) {
    JmwLlsj();
}

function GetKfData() {
    console.log("重新获取客服信息");
    // $.ajax({
    //     type: "GET",
    //     url: "/tools/lp.ashx",
    //     data: { action: "get_service", gid: JmwInitJson.model_lx_gid, kf_id: _kf_id },
    //     dataType: "json",
    //     jsonp: "callback",
    //     success: function (data) {
    //         if (data.status == 1) {
    //             kefu_data = data;
    //
    //             if (JmwInitJson.model_lx_lock_share_wx == "1") {
    //                 $.cookie(JmwInitJson.model_lx_gid + '_data', JSON.stringify(data), { expires: 1 });
    //                 console.log("储存客服信息到cookie");
    //             }
    //             //window.location.hash = data.kf_id;
    //
    //             UpKfData();
    //             JmwLoadData();
    //
    //         } else {
    //             console.log("客服信息获取失败");
    //         }
    //     }
    // });
}

function UpKfData() {
    $(".sp_xingming").text(kefu_data.xingming);
    $(".sp_weixintu").attr("src", kefu_data.weixintu);
    $(".sp_shoujihao").text(kefu_data.shouji);
    $(".sp_weixinhao").text(kefu_data.weixinhao);
    $(".sp_lvxingshe").text(kefu_data.lvxingshe);
    $(".sp_paimingtu").attr("src", kefu_data.paimingtu);
    $(".sp_headimg").attr("src", kefu_data.headimg);

    $(".is_kf_tx").attr("src", kefu_data.headimg);
    $(".is_kf_nc").text(kefu_data.xingming);
    

    if (kefu_data.sex == "男") {
        $(".sp_ta").text("他");
        $(".sp_meinv").text("帅哥");
        $(".sp_amei").text("阿哥");
        $(".sp_jiejie").text("哥哥");
        $(".sp_piaoliang").text("帅气");
    }
    if (kefu_data.sex == "女") {
        $(".sp_ta").text("她");
        $(".sp_meinv").text("美女");
        $(".sp_amei").text("阿妹");
        $(".sp_jiejie").text("姐姐");
        $(".sp_piaoliang").text("漂亮");
    }
    $("#wx_copy").val(kefu_data.weixinhao);
    $('.a_tel').attr('href', 'tel:' + kefu_data.shouji);

    
    if (tj.word != "" && tj.word != "空" && tj.word != "无") {
        $(".sp_word").text(tj.word);
        document.title = document.title.replace("<span class='sp_word'></span>", tj.word);
    } else {
        var word_ = $.cookie(JmwInitJson.model_lx_gid + '_word');
        if (word_ != undefined && tj.word != "" && tj.word != "空" && tj.word != "无") {
            $(".sp_word").text(word_);
            document.title = document.title.replace("<span class='sp_word'></span>", word_);
        } else {
            document.title = document.title.replace("<span class='sp_word'></span>", "");
        }
    }

    console.log("客服信息加载完成");
}



var time_touchend = 0;
var time_touchstart = 0;
var x_touchend = 0;
var x_touchstart = 0;
var y_touchend = 0;
var y_touchstart = 0;
var touch_sj = 0;
$(function () {
    
    //懒加载
    $("img").lazyload({ effect: "fadeIn", threshold: 380 });
    //第几屏↓
    if (JmwInitJson.mobile_pc == "mobile") {
        var clientHeight = parseInt(document.documentElement.clientHeight);
        window.addEventListener('touchend', function (event) {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var h = Math.floor(top / clientHeight) + 1;
            if (mcount < h) {
                mcount = h;
            }
            var event = event || window.event;
            x_touchend = event.changedTouches[0].clientX;
            y_touchend = event.changedTouches[0].clientY;
            time_touchend = new Date().getTime();
            touch_sj = time_touchend - time_touchstart;
            touch_data = touch_data + '{"a":"' + x_touchstart + '|' + y_touchstart + '","t":"' + x_touchend + '|' + y_touchend + '","s":"' + browse_time + '","y":"' + touch_sj + '"},';
        });

        window.addEventListener('touchstart', function (event) {
            //touchmove:开始触摸进行时
            var event = event || window.event;
            x_touchstart = event.touches[0].clientX;
            y_touchstart = event.touches[0].clientY;
            time_touchstart = new Date().getTime();
        });
    } else if (JmwInitJson.mobile_pc = "pc") {
        var clientHeight = parseInt(document.documentElement.clientHeight);
        window.addEventListener('scroll', function (ev) {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            var h = Math.floor(top / clientHeight) + 1;
            if (mcount < h) {
                mcount = h;
            }
        });
    }
    //第几屏↑
});

