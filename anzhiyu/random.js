var posts=["/pages/34ec25/","03.模板引擎.Thymeleaf/","03.模板引擎.Velocity/","99.其他01.Java日志/","/pages/14e432/","/pages/ea4914/","/pages/da3f07/","/pages/c516cc/","/pages/aa9f61/","/pages/cc8ce5/","/pages/e2af3a/","Collections集合工具类和可变参数/","Freenom 域名自动续期/","Java-面向对象/","JavaWeb之Cookie和Session/","JavaWeb之Filter和Listener/","JavaWeb之Jsp指南/","JavaWeb之Servlet指南/","JavaWeb面经/","/pages/9ecdc1/","/pages/7908f2/","/pages/6b8149/","/pages/149013/","/pages/f594fa/","/pages/d05c38/","/pages/2ddf04/","/pages/6c22f4/","/pages/f1bba6/","/pages/2fea08/","/pages/c50d2b/","/pages/3c954b/","/pages/596174/","/pages/0d31cd/","linux虚拟机安装jdk1.8/","linux虚拟机安装mysql-8.0.25/","linux虚拟机安装nginx/","linux虚拟机安装redis/","linux虚拟机安装tomcat/","maven私服/","mysql记录/","五分钟发布npm包/","使用 vmware 安装linux/","使用GitHub 自动部署/","使用Tengine+Lua+GM实现图片自动裁剪缩放/","使用idea远程连接部署SpringBoot项目/","发送短信验证码/","周刊/","备忘/","安装MySQL社区服务器8.0.25/","安装finalshell 连接 linux/","局域网内访问虚拟机/","/pages/a14952/","/pages/95f25b/","常用Git命令清单/","快捷键-Eclipse/","快捷键-Intellij/","快捷键-VsCode/","提取.bank音频包/","相册添加视频格式/","端口号占用使用cmd解决/","解决cmd创建vue权限问题/","配置redis一直启动/","集合之Map集合/","魔改.友链/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};var friend_link_list=[{"name":"REAI","link":"https://blog.reaicc.com","avatar":"https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640","descr":"热爱漫无边际，生活自有分寸！","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://blog.reaicc.com","color":"vip","tag":"技术"},{"name":"网易云音乐","link":"https://music.reaicc.com/","avatar":"/img/wangyiyun.png","descr":"网易云音乐","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://music.reaicc.com","color":"vip","tag":"音乐"},{"name":"朋友圈","link":"https://blog.reaicc.com/friends/","avatar":"/img/朋友圈.png","descr":"朋友圈","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://blog.reaicc.com/friends","color":"vip","tag":"朋友圈"},{"name":"枫涵","link":"https://blog.mapleie.cn","avatar":"https://mapleie.oss-cn-beijing.aliyuncs.com/WechatIMG80.jpeg","descr":"枫涵","siteshot":"https://mapleie.oss-cn-beijing.aliyuncs.com/WechatIMG80.jpeg","tag":"技术"},{"name":"每日早报","link":"https://news.reaicc.com","avatar":"https://news.reaicc.com/favicon.svg","descr":"每日早报","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://news.reaicc.com","color":"speed","tag":"生活"},{"name":"聊天室","link":"https://reaicc.com","avatar":"https://reaicc.com","descr":"聊天室","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/noanimate/https://reaicc.com/","color":"speed","tag":"聊天"}];
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