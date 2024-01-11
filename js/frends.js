function loadQexoFriends(id, url) {
  var uri = url + "/pub/friends/";
  var loadStyle = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">友链加载中...</p></div>';
  document.getElementById(id).className = "flexcard-flink-list";
  document.getElementById(id).innerHTML = loadStyle;
  var ajax;
  try {
    // Firefox, Opera 8.0+, Safari
    ajax = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
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
  let list = [];
  ajax.open("get", uri, true);
  ajax.setRequestHeader("Content-Type", "text/plain");
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var res = JSON.parse(ajax.response);
        if (res["status"]) {
          var friends = res["data"];
          document.getElementById(id).innerHTML = "";
          let h2Tag = document.createElement('h2');
          h2Tag.textContent = '相知无远近，万里尚为邻。'+"("+friends.length+")" ;
          document.getElementById(id).appendChild(h2Tag);
          // 遍历友链列表
          for (let i = 0; i < friends.length; i++) {

            // 创建链接标签
            let aTag = document.createElement('a');
            aTag.className = 'flink-list-card cf-friends-link';
            aTag.href = friends[i]['url'];
            aTag.dataset.title = friends[i]['description'];
            aTag.target = '_blank';

            // 创建包裹图片的div
            let divWrapper = document.createElement('div');
            divWrapper.className = 'wrapper cover';

            // 创建缩略图链接
            let aThumb = document.createElement('a');
            aThumb.href = 'https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/'+ friends[i]["url"];
            aThumb.dataset.fancybox = 'gallery';
            aThumb.dataset.caption = '';
            aThumb.dataset.thumb = 'https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/'+ friends[i]["url"];

            // 创建图片
            let imgCover = document.createElement('img');
            imgCover.className = 'cover fadeIn entered loaded';
            imgCover.dataset.lazySrc = 'https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/'+ friends[i]["url"];
            imgCover.onerror = function() {
                this.onerror = null;
              this.src = '/img/404.jpg';
            };
            imgCover.alt = '';
            imgCover.draggable = false;
            imgCover.dataset.llStatus = 'loaded';
            imgCover.src = 'https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/'+ friends[i]["url"];

            aThumb.appendChild(imgCover);
            divWrapper.appendChild(aThumb);

            // 创建信息div
            let divInfo = document.createElement('div');
            divInfo.className = 'info';

            // 创建头像链接
            let aAvatar = document.createElement('a');
            aAvatar.href = friends[i]["image"];
            aAvatar.dataset.fancybox = 'gallery';
            aAvatar.dataset.caption = '';
            aAvatar.dataset.thumb = friends[i]["image"];

            // 创建头像图片
            let imgAvatar = document.createElement('img');
            imgAvatar.className = 'cf-friends-avatar flink-avatar entered loaded';
            imgAvatar.dataset.lazySrc = friends[i]["image"];
            imgAvatar.onerror = function() {
              this.onerror = null;
              this.src = '/img/friend_404.gif';
            };
            imgAvatar.alt = '';
            imgAvatar.draggable = false;
            imgAvatar.dataset.llStatus = 'loaded';
            imgAvatar.src = friends[i]["image"];

            aAvatar.appendChild(imgAvatar);
            divInfo.appendChild(aAvatar);

            // 创建友链名称
            let spanName = document.createElement('span');
            spanName.className = 'flink-sitename cf-friends-name';
            spanName.textContent = friends[i]["name"];
            divInfo.appendChild(spanName);

            // 添加标签
            aTag.appendChild(divWrapper);
            aTag.appendChild(divInfo);

            // 添加到页面
            document.getElementById(id).appendChild(aTag);
          }
            // 遍历友链列表，创建友链标签并添加到页面中去，包括友链名称、友链头像、友链缩略图等信息
        } else {
          console.log(res["data"]["msg"]);
        }
      } else {
        console.log("友链获取失败! 网络错误");
      }
    }
  };
  ajax.send(null);
}



function loadSideBarFriends(id, url) {
  var uri = url + "/pub/friends/";
  var loadStyle = '<div class="qexo_loading"><div class="qexo_part"><div style="display: flex; justify-content: center"><div class="qexo_loader"><div class="qexo_inner one"></div><div class="qexo_inner two"></div><div class="qexo_inner three"></div></div></div></div><p style="text-align: center; display: block">友链加载中...</p></div>';
  for(let i=0;i<document.getElementsByClassName(id).length;i++){
    document.getElementsByClassName(id)[i].innerHTML = loadStyle;
  }
  document.getElementsByClassName(id)[1]
  var ajax;
  try {
    // Firefox, Opera 8.0+, Safari
    ajax = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
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
  ajax.open("get", uri, true);
  ajax.setRequestHeader("Content-Type", "text/plain");
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        var res = JSON.parse(ajax.response);
        if (res["status"]) {
          var friends = res["data"];
          for(let i=0;i<document.getElementsByClassName(id).length;i++){
            document.getElementsByClassName(id)[i].innerHTML = '';
          }
          for (let i = 0; i < friends.length; i++) {
            for(let j=0;j<document.getElementsByClassName(id).length;j++){
              document.getElementsByClassName(id)[j].innerHTML += '<li><a class="level is-mobile is-mobile" href="'+friends[i]["url"]+'" target="_blank" rel="noopener"><span class="level-left"><span class="level-item">'+friends[i]["name"]+'</span></span><span class="level-right"><span class="level-item tag">'+friends[i]["url"].split('/')[2]+'</span></span></a></li>';
            }
          }
        } else {
          console.log(res["data"]["msg"]);
        }
      } else {
        console.log("友链获取失败! 网络错误");
      }
    }
  };
  ajax.send(null);
}

var threshold = 160; // 打开控制台的宽或高阈值
// 每秒检查一次
window.setInterval(function() {
  if (window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold) {
    // 如果打开控制台，则刷新页面
    window.open("about:blank","_self")
    window.close();
  }
}, 1e3);

// 返回桌面的时候显示
// ((function() {
//   var callbacks = [],
//       timeLimit = 50,
//       open = false;
//   setInterval(loop, 1);
//   return {
//     addListener: function(fn) {
//       callbacks.push(fn);
//     },
//     cancleListenr: function(fn) {
//       callbacks = callbacks.filter(function(v) {
//         return v !== fn;
//       });
//     }
//   }
//
//   function loop() {
//     var startTime = new Date();
//     debugger;
//     if (new Date() - startTime > timeLimit) {
//       if (!open) {
//         callbacks.forEach(function(fn) {
//           fn.call(null);
//         });
//       }
//       open = true;
//       window.stop();
//       document.body.innerHTML = "";
//     } else {
//       open = false;
//     }
//   }
// })()).addListener(function() {
//   window.location.reload();
// });

window.onload = function(){
  //如果用户在工具栏调起开发者工具，那么判断浏览器的可视高度和可视宽度是否有改变，如有改变则关闭本页面
  // var h = window.innerHeight,w=window.innerWidth;
  // window.onresize = function () {
  //   if (h!= window.innerHeight||w!=window.innerWidth){
  //     window.open("about:blank","_self")
  //     window.close();
  //   }
  // }
  // document.onkeydown = function(event){
  //   var ev = event || window.event || arguments.callee.caller.arguments[0];
  //   if(event.keyCode = 123){
  //     return false;//123 代表F12键位
  //   }
  // }
}