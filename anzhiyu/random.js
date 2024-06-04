var posts=["/pages/34ec25/","posts/33db93c3/","posts/bed8d6a9/","posts/da18907e/","/pages/14e432/","/pages/ea4914/","/pages/da3f07/","/pages/c516cc/","/pages/aa9f61/","/pages/cc8ce5/","/pages/e2af3a/","posts/jhgjl/","posts/55928/","posts/ymzdxq/","posts/64074/","posts/48591/","posts/mxdxjava/","posts/hcck/","posts/javaglq/","posts/javajsp/","posts/javafwq/","posts/javamj/","/pages/9ecdc1/","posts/35707/","/pages/7908f2/","/pages/6b8149/","/pages/149013/","/pages/f594fa/","/pages/d05c38/","/pages/2ddf04/","posts/32846/","/pages/6c22f4/","/pages/f1bba6/","/pages/2fea08/","/pages/c50d2b/","/pages/3c954b/","/pages/596174/","/pages/0d31cd/","posts/linuxjdk/","posts/linuxmysql8/","posts/linuxnginx/","posts/linuxredis/","posts/linuxtom/","posts/mavensf/","posts/mysqljl/","posts/58328/","posts/vmlinux/","posts/githubauto/","posts/imgjc/","posts/ljspringboot/","posts/dxsend/","posts/zk/","posts/beiwang/","posts/anzhmysql/","posts/finalllinux/","posts/juyuwang/","/pages/a14952/","/pages/95f25b/","posts/gitml/","posts/bd5534bf/","posts/ideakjj/","posts/vscodekjj/","posts/banksy/","posts/11097/","posts/xcaddvideo/","posts/cmdzy/","posts/30451/","posts/createvue/","posts/foreverqd/","posts/jhmap/","posts/linkmg/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};var friend_link_list=[{"name":"REAI","link":"https://blog.reaicc.com","avatar":"https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640","descr":"热爱漫无边际，生活自有分寸！","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://blog.reaicc.com","color":"vip","tag":"技术"},{"name":"网易云音乐","link":"https://music.reaicc.com/","avatar":"/img/wangyiyun.png","descr":"网易云音乐","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://music.reaicc.com","color":"vip","tag":"音乐"},{"name":"朋友圈","link":"https://blog.reaicc.com/friends/","avatar":"/img/朋友圈.png","descr":"朋友圈","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://blog.reaicc.com/friends","color":"vip","tag":"朋友圈"},{"name":"枫涵","link":"https://blog.mapleie.cn","avatar":"https://mapleie.oss-cn-beijing.aliyuncs.com/WechatIMG80.jpeg","descr":"枫涵","siteshot":"https://mapleie.oss-cn-beijing.aliyuncs.com/WechatIMG80.jpeg","tag":"技术"},{"name":"每日早报","link":"https://news.reaicc.com","avatar":"https://news.reaicc.com/favicon.svg","descr":"每日早报","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://news.reaicc.com","color":"speed","tag":"生活"},{"name":"聊天室","link":"https://reaicc.com","avatar":"https://reaicc.com","descr":"聊天室","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://reaicc.com/","color":"speed","tag":"聊天"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };