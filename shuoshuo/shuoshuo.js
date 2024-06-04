var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
var storage = window.localStorage;

var lazyLoadInstance = new LazyLoad({});
var qexo_talks = [];
//ajax 分类筛选 moment
//readmore_data =[];//定义数组
$(document).on('click', '.moment_cat_nav ul li a', function () {
  var t = $('.moment_cat_nav ul li a');
  if (t.hasClass('disabled')) {
    return false;
  }
  $('.moment_cat_nav ul li a').addClass('disabled');

  //readmore_data.splice(0,readmore_data.length);//清空数组
  //5.22增加 移动回复表单
  var temp = $("#comment_form_reset");
  var form = $(".respond_box");
  var form = $("#t_commentform").prop('outerHTML');
  temp.html(form);

  $(".moment_list").empty();
  $('#t_pagination a').hide();
  $(this).addClass('active');
  $(this).parent().siblings().children().removeClass('active');
  var cat = $(this).attr('data');
  var name = $(this).find('span').html();
  // 获取ip
  var ipCity;
  $.ajax({
    url: 'https://api.qjqq.cn/api/Local',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      ipCity = data.data.city+"·"+data.data.district
      console.log(ipCity);
    },
  });
  $.ajax({
    type: "get",
    url: "https://qexo.reaicc.com/pub/talks/",
    dataType: 'json',
    data: {
      'action': 'moment_cat_filter',
      cat: cat,
    },

    beforeSend: function () {
      $('.moment_list').html('<div class="loading_box"><div uk-spinner></div></div>');
    },
    success: function (data) {
      $('.moment_list .loading_box').remove();
      $('#t_pagination a').text('LOAD MORE');
      var dataList = data.data;
      let list = [];
      qexo_talks = qexo_talks.concat(dataList);
      dataList.forEach(item => {
        let id = item.id;
        let like = item.like;
        let liked = item.liked;
        let content = item.content;
        let time = plugin.convertTime(timeUtil(item.time));
        let types = item.values.cat;
        var result = $("" +
            "<div class=\"loop_content p_item moment_item uk-animation-slide-bottom-small type-moment status-publish hentry moments-4 post-'" + id + "'\"\n" +
            "     id='" + id + "'>\n" +
            "    <div class=\"p_item_inner\">\n" +
            "        <div class=\"list_user_meta\">\n" +
            "            <div class=\"avatar\"><img class=\"avatar avatar-100 photo\"\n" +
            "                                     decoding=\"async\" height=\"100\"\n" +
            "                                     loading=\"lazy\" src='https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640' width=\"100\"></div>\n" +
            "            <div class=\"name\">知记\n" +
            "                <time class=\"time\" datetime=\"2022/01/05 19:01:11\" itemprop=\"datePublished\">" + time + "</time>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "<div class=\"blog_content\">\n" +
            "    <div class=\"entry-content\">\n" +
            "        <div class=\"p_title\"><a href=\"https://sady0.com/moment/1018.html\"></a></div>\n" +
            "        <div class=\"t_content\"><p>" + content + "</p></div>\n" + "" +
            "          <div class=\"video_list\">" +

            "           </div>" +
            "        <div class=\"img_list\">\n" +
            "            <div class=\"list_inner\"> </div>\n" +
            "        </div>\t\t\t</div><!-- .entry-content -->\n" +

            "    <span class=\"ip_loca\"><i class=\"ri-map-pin-2-line\" id=\"userAgentCity\"></i>"+ipCity+"</span>\n" +

            "    <div class=\"entry-footer\">\n" +
            "        <div class=\"post_footer_meta\">\n" +
            "            <div class=\"left\" id ='dz" + id + "'>\n" +
            "                <a class=\"up_like \" data-action=\"up\" data-id=" + id + ">\n" +
            "                    <i class=\"ri-heart-2-line\"></i>\n" +
            "                    <span>" + like + "</span>\n" +
            "                </a>\t\t\t\t\t\t" +
            "         </div>\n" +
            "           <div class=\"pix_share_btn\">\n" +
            "                <a class=\"pix_icon share_btn_icon cr_poster\" poster-data=" + id + " uk-toggle=\"target: #share_modal_" + id + "\" uk-tooltip=\"title: 生成海报分享; pos: top;\"><i class=\"ri-share-forward-box-line\"></i></a>\n" +
            "                <div id=\"share_modal_" + id + "\" class=\"uk-flex-top poster_modal\" uk-modal>\n" +
            "                    <div class=\"uk-modal-dialog uk-modal-body uk-margin-auto-vertical\">\n" +
            "                        <button class=\"uk-modal-close-outside\" type=\"button\" uk-close></button>\n" +
            "                        <div class=\"poster_box_ap\"></div>\n" +
            "                        <div class=\"post_share_box hide\">\n" +
            "                            <a class=\"poster_download\" uk-tooltip=\"title: 下载海报; pos: top;\"><i class=\"ri-download-line\"></i></a>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>" +

            "        </div>\n" +
            "    </div>\n" +
            " </div>");
        if (types === cat){
          list.push(result[0].outerHTML)
        }else if (cat === "all"){
          list.push(result[0].outerHTML)
        }
      })
      if (list.length === 0){
        $('.moment_list').html('<p class="no_posts">暂时还没有相关数据！</p>');
      }
      $(".moment_list").append(list);
      if (dataList.length < 2) {
        $('#t_pagination a').hide();
      } else {
        $('#t_pagination a').show();
      }

      lazyLoadInstance.update();
      $('.moment_cat_nav ul li a').removeClass('disabled');

    }
  });
});

//点赞
$(document).on('click', '.up_like ', function () {
  // if ($(this).hasClass('done')) {
  //     cocoMessage.info("您已经点过赞了");
  //     return false;
  // } else {
  //
  // }
  $(this).addClass('done');
  var pid = $(this).data("id");
  var like_action = $(this).data('action'),
      rateHolder = $(this).children('span');
  iconHolder = $(this).children('i');
  $(iconHolder).removeAttr('class');
  $(iconHolder).toggleClass('ri-heart-2-fill');
  // $(rateHolder).html(data);
  var uri = "https://qexo.reaicc.com/pub/like_talk/"
  var ajax;
  try {
    ajax = new XMLHttpRequest();
  } catch (e) {
    try {
      ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("糟糕,你的浏览器不能上传文件!");
        return false;
      }
    }
  }
  ajax.open("post", uri, true);
  ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  ajax.onreadystatechange = function () {
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        var res = JSON.parse(ajax.response);
        if (res["status"]) {
          for (var i = 0; i < qexo_talks.length; i++) {
              $('.up_like '+pid).remove();
              var html;
              if (qexo_talks[i]["id"] === pid) {
                  if (res["action"]) {
                      qexo_talks[i]["like"]++;
                      qexo_talks[i]["liked"] = true;
                      html = '<a class=\"up_like '+pid+'\ done" data-action=\"up\" data-id='+pid+'>';
                      html +=
                          " <i class=\"ri-heart-2-fill\"></i>\n" +
                          " <span>" + qexo_talks[i]['like'] + "</span>";
                      html += '</a>';
                      break;
                  } else {
                      qexo_talks[i]["like"]--;
                      qexo_talks[i]["liked"] = false;
                      html = '<a class=\"up_like '+pid+'\" data-action=\"up\" data-id='+pid+'>';
                      html +=
                          " <i class=\"ri-heart-2-line\"></i>\n" +
                          " <span>" + qexo_talks[i]['like'] + "</span>";
                      html += '</a>';
                      break;
                  }
              }
          }
          document.getElementById('dz'+pid).innerHTML = html;
          cocoMessage.success(res["msg"]);
        } else {
          cocoMessage.fail(res["msg"]);
        }
      } else {
        console.log("点赞失败! 网络错误");
      }
    }
  };
  ajax.send("id=" + pid);
});

/**
 * 时间戳转换
 * @param time
 * @returns {string}
 */
function timeUtil(time) {
  // 此处时间戳以毫秒为单位
  let date = new Date(parseInt(time) * 1000);
  let Year = date.getFullYear();
  let Moth = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  let Day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
  let Hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
  let Minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  let Sechond = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Year + '-' + Moth + '-' + Day + '   ' + Hour + ':' + Minute + ':' + Sechond;
}

/**
 * @Memo 时间工具类
 *
 * @Author songyf
 * @Date Aug 22,2019
 *
 * @Readme 调用方式：eg: $("#id").html(plugin.convertTime("2019-08-23 15:00:00"));
 $("#id").html(plugin.convertTime(new Date()));
 $("#id").html(plugin.convertTime(new Date("2019-08-21")));
 ......
 */
;(function (win, undefined) {
  "use strict"
  var _win;
  var plugin = {
    /**
     * 功能一：转换某个时间距离当前时间的间隔 【刚刚、1分钟前、半个小时前...】
     * @param e
     * @param t
     * @returns
     */
    convertTime: function (e, t) {
      var i = this,
          o = [[], []],
          a = (new Date).getTime() - new Date(e).getTime();
      return a > 6912e5 ? (a = new Date(e), o[0][0] = i.digit(a.getFullYear(), 4), o[0][1] = i.digit(a.getMonth() + 1), o[0][2] = i.digit(a.getDate()), t || (o[1][0] = i.digit(a.getHours()), o[1][1] = i.digit(a.getMinutes()), o[1][2] = i.digit(a.getSeconds())), o[0].join("-") + " " + o[1].join(":")) : a >= 864e5 ? (a / 1e3 / 60 / 60 / 24 | 0) + "天前" : a >= 36e5 ? (a / 1e3 / 60 / 60 | 0) + "小时前" : a >= 12e4 ? (a / 1e3 / 60 | 0) + "分钟前" : a < 0 ? "未来" : "刚刚"
    },
    digit: function (e, t) {
      var i = "";
      e = String(e),
          t = t || 2;
      for (var o = e.length; o < t; o++) i += "0";
      return e < Math.pow(10, t) ? i + (0 | e) : e
    },
  }
  //将插件对象暴露给全局对象
  _win = (function () {
    return this || (0, eval)('this');
  }());
  !('plugin' in _win) && (_win.plugin = plugin);
}());

var divs = document.querySelectorAll('time');
var dates;
[].forEach.call(divs, function (div) {
  // do whatever
  dates = div.dateTime;
  // console.log(dates);

});
var a = $(".time");
for (let i = 0; i < divs.length; i++) {
  $(a[i]).html(plugin.convertTime(a[i].dateTime));
  // console.log(a[i]);
  // console.log(dates[i]);
}

