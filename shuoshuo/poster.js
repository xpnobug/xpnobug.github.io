// 部分代码来自ZIBILL主题作者
// canvas生成海报
const poster = (function() {

    const DEBUG = false

    const WIDTH = 700
    const HEIGHT = 1160

    function init(config) {
        const $container = document.querySelector(config.selector)
        $container.style.border = '1px solid #f0f0f0'
        const $wrapper = createDom('div', 'id', 'wrapper')
        const $canvas = createDom('canvas', 'id', 'canvas', 'block')
        const $day = createDom('canvas', 'id', 'day')
        const $date = createDom('canvas', 'id', 'date')
        const $title = createDom('canvas', 'id', 'title')
        const $content = createDom('canvas', 'id', 'content')
        const $logo = createDom('canvas', 'id', 'logo')
        const $description = createDom('canvas', 'id', 'description')

        appendChilds($wrapper, $canvas, $day, $date, $title, $content, $logo, $description)
        $container.appendChild($wrapper)

        const date = new Date()

        // day
        const dayStyle = {
            font: 'bold 80px Helvetica',
            color: 'rgba(255, 255, 255, 1)',
            position: 'right'
        }
        drawOneline($day, dayStyle, date.getDate());

        // date
        const dateStyle = {
            font: '23px Helvetica',
            color: 'rgba(255, 255, 255, 1)',
            position: 'right'
        }
        drawOneline($date, dateStyle, date.getFullYear() + '/' + (date.getMonth() + 1))

        // title canvas
        const titleStyle = {
            font: '30px Helvetica',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 1)',
            length: 2,
            position: 'left'
        }
        titleStyle.font = (config.titleStyle && config.titleStyle.font) || titleStyle.font
        titleStyle.color = (config.titleStyle && config.titleStyle.color) || titleStyle.color
        titleStyle.position = (config.titleStyle && config.titleStyle.position) || titleStyle.position
        drawMoreLines($title, titleStyle, config.title)

        // content canvas
        const contentStyle = {
            font: '22px Helvetica',
            lineHeight: 1.5,
            position: 'left',
            color: 'rgba(236, 241, 255, 1)'
        }
        contentStyle.font = (config.contentStyle && config.contentStyle.font) || contentStyle.font
        contentStyle.color = (config.contentStyle && config.contentStyle.color) || contentStyle.color
        contentStyle.lineHeight = (config.contentStyle && config.contentStyle.lineHeight) || contentStyle.lineHeight
        contentStyle.position = (config.contentStyle && config.contentStyle.position) || contentStyle.position
        drawMoreLines($content, contentStyle, config.content);

        // description
        const descriptionStyle = {
            font: '24px Helvetica',
            color: 'rgba(180, 180, 180, 1)',
            lineHeight: 1.2,
            position: 'left'
        }
        drawMoreLines($description, descriptionStyle, config.description)


        // background image
        const image = new Image();
        image.crossOrigin = "Anonymous";

        //logo
        const logo = new Image();
        logo.crossOrigin = "Anonymous";
        logo.src = config.logo;

        //qrcode
        const qrcode = new Image();
        qrcode.src = config.qrcode;


        const onload = function() {
            $canvas.width = WIDTH;
            $canvas.height = HEIGHT;
            image.src = config.banner;
            if (config.banner === null){
                image.src = "https://qexo.reaicc.com/pub/random_image/?num=1";
            }
            image.onload = function() {
                const ctx = $canvas.getContext('2d')
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                ctx.fillRect(0, 0, $canvas.width, $canvas.height);

                // banner
                imgRect = coverImg($canvas.width - 40, $canvas.height / 1.2 - 40, image.width, image.height);
                ctx.drawImage(image, imgRect.sx, imgRect.sy, imgRect.sWidth, imgRect.sHeight, 20, 20, $canvas.width - 40, $canvas.height / 1.2 - 40);

                //覆盖层
                ctx.fillStyle="rgba(0, 0, 0, 0.3)";
                ctx.fillRect(20,20,$canvas.width - 40,$canvas.height / 1.2 - 40);

                // 时间
                ctx.drawImage($day, -20, 50)
                ctx.drawImage($date, -21, 125)

                //logo
                var logowidth = logo.width;
                var logoheight = logo.height;
                var scale = logowidth / logoheight;
                var logoh = 60;
                var cwidth = logoh * scale;

                drawCircleImage(ctx,logo,110,$canvas.height / 1.2 + 50,50);
                // ctx.drawImage(logo, 60, $canvas.height / 1.2 + 30, cwidth, logoh);
                /**
                 * ctx 画布上下文
                 * img 图片对象
                 * （x, y）圆心坐标
                 * radius 半径
                 * 注意：绘制圆形头像之前，保存画笔；绘制完成后恢复
                 * */
                function drawCircleImage(ctx, img, x, y, radius) {
                    ctx.save();
                    let size = 2 * 50;
                    ctx.arc(x, y, 65, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.drawImage(img, x - radius, y - radius, size, size);
                    ctx.restore();
                    cocoMessage.success('海报已生成');
                    $('.loading_box').remove();
                }


                // ctx.drawImage(qrcode, $canvas.width - 160, $canvas.height / 1.2 + 20, 120, 120);

                //标题文字
                ctx.drawImage($title, 20, $canvas.height / 2 + 20)
                ctx.drawImage($content, 20, $canvas.height / 2 + 120)
                ctx.drawImage($description, 20, $canvas.height / 1.2 + 110)
                ctx.strokeStyle = 'rgba(122, 122, 122, 0.5)';

                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.src = $canvas.toDataURL('image/png')
                const radio = config.radio || 0.7
                img.width = WIDTH * radio
                img.height = HEIGHT * radio
                img.className = 'poster_load';
                ctx.clearRect(0, 0, $canvas.width, $canvas.height)
                $canvas.style.display = 'none'

                if ($container.querySelector('.poster_load')) {
                    $container.querySelector('.poster_load').src = img.src;
                } else {
                    $container.appendChild(img);
                }

                $container.appendChild(img);
                $container.removeChild($wrapper)
                if (config.callback) {
                    config.callback($container)
                }
            }
        }

        onload()
    }

    //裁切
    function containImg(sx, sy, box_w, box_h, source_w, source_h) {
        var dx = sx,
            dy = sy,
            dWidth = box_w,
            dHeight = box_h;
        if (source_w > source_h || (source_w == source_h && box_w < box_h)) {
            dHeight = source_h * dWidth / source_w;
            dy = sy + (box_h - dHeight) / 2;

        } else if (source_w < source_h || (source_w == source_h && box_w > box_h)) {
            dWidth = source_w * dHeight / source_h;
            dx = sx + (box_w - dWidth) / 2;
        }
        return {
            dx,
            dy,
            dWidth,
            dHeight
        }
    }

    function coverImg(box_w, box_h, source_w, source_h) {
        var sx = 0,
            sy = 0,
            sWidth = source_w,
            sHeight = source_h;
        if (source_w > source_h || (source_w == source_h && box_w < box_h)) {
            sWidth = box_w * sHeight / box_h;
            sx = (source_w - sWidth) / 2;
        } else if (source_w < source_h || (source_w == source_h && box_w > box_h)) {
            sHeight = box_h * sWidth / box_w;
            sy = (source_h - sHeight) / 2;
        }
        return {
            sx,
            sy,
            sWidth,
            sHeight
        }
    }

    function createDom(name, key, value, display = 'none') {
        const $dom = document.createElement(name)
        $dom.setAttribute(key, value)
        $dom.style.display = display
        $dom.width = WIDTH
        return $dom
    }

    function appendChilds(parent, ...doms) {
        doms.forEach(dom => {
            parent.appendChild(dom)
        })
    }

    function drawOneline(canvas, style, content) {
        const ctx = canvas.getContext('2d')
        canvas.height = parseInt(style.font.match(/\d+/), 10) + 20
        ctx.font = style.font
        ctx.fillStyle = style.color
        ctx.textBaseline = 'top'

        let lineWidth = 0
        let idx = 0
        let truncated = false
        for (let i = 0; i < content.length; i++) {
            lineWidth += ctx.measureText(content[i]).width;
            if (lineWidth > canvas.width - 60) {
                truncated = true
                idx = i
                break
            }
        }

        let padding = 30

        if (truncated) {
            content = content.substring(0, idx)
            padding = canvas.width / 2 - lineWidth / 2
        }

        if (DEBUG) {
            ctx.strokeStyle = "#6fda92";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }

        if (style.position === 'center') {
            ctx.textAlign = 'center';
            ctx.fillText(content, canvas.width / 2, 0)
        } else if (style.position === 'left') {
            ctx.fillText(content, padding, 0)
        } else {
            ctx.textAlign = 'right'
            ctx.fillText(content, canvas.width - padding, 0)
        }
    }

    function drawMoreLines(canvas, style, content) {
        const ctx = canvas.getContext('2d')
        const fontHeight = parseInt(style.font.match(/\d+/), 10)

        if (DEBUG) {
            ctx.strokeStyle = "#6fda92";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }

        ctx.font = style.font
        ctx.fillStyle = style.color
        ctx.textBaseline = 'top'
        ctx.textAlign = 'center'

        let alignX = 0

        if (style.position === 'center') {
            alignX = canvas.width / 2;
        } else if (style.position === 'left') {
            ctx.textAlign = 'left'
            alignX = 40
        } else {
            ctx.textAlign = 'right'
            alignX = canvas.width - 40
        }

        let lineWidth = 0
        let lastSubStrIndex = 0
        let offsetY = 0
        for (let i = 0; i < content.length; i++) {
            lineWidth += ctx.measureText(content[i]).width;
            if (lineWidth > canvas.width - 120) {
                ctx.fillText(content.substring(lastSubStrIndex, i), alignX, offsetY);
                offsetY += fontHeight * style.lineHeight
                lineWidth = 0
                lastSubStrIndex = i
            }
            if (i === content.length - 1) {
                ctx.fillText(content.substring(lastSubStrIndex, i + 1), alignX, offsetY);
            }
        }
    }


    return {
        init
    }
})()


function repalceHtmlToText(str) {
    str = str.replace(/<\/?.+?>/g, "");
    str = str.replace(/&nbsp;/g, "");
    return str;
}

//ajax生成文章海报
$('body').on('click', '.cr_poster', function() {
    var post_id = $(this).attr('poster-data');
    $('.poster_box').remove();
    $('#share_modal_'+post_id+' .poster_box_ap').append('<div class="poster_box"></div>');

    function Posterdown(e){
        if (e == null) {
            return;
        }

        var modal = '#share_modal_'+post_id;

        var url = $(''+modal+' .poster_box img').attr('src');
        $(''+modal+' .post_share_box').removeClass('hide');
        $(''+modal+' .poster_download').attr('href',url).attr('download','poster_' + post_id + '.png');
        $
    }


    $.ajax({
        type: "GET",
        url: "https://qexo.reaicc.com/pub/talks/",
        dataType: 'json',
        data: {
            action: 'pix_create_poster',
            post_id: post_id,
        },

        beforeSend: function () {
            cocoMessage.info('海报生成中..');
            $('#share_modal_'+post_id+' .poster_box').append('<div class="loading_box"><div uk-spinner></div></div>');
        },
        success: function(data){
            var dataList = data.data;
            dataList.forEach(item => {
                let id = item.id;
                let like = item.like;
                let liked = item.liked;
                let content =repalceHtmlToText(item.content);
                let time = plugin.convertTime(timeUtil(item.time));
                // var logo = "https://q1.qlogo.cn/g?b=qq&nk=2877406366&s=640";
                if (id === post_id) {
                    poster.init({
                        banner: "https://qexo.reaicc.com/pub/random_image/?num=1",
                        selector: '.poster_box',
                        title: "REAI - BLOG",
                        content: content,
                        logo: 'https://picx.zhimg.com/v2-29bb8be7c11f021d6bb5b0ba26efdf29_r.webp?source=1940ef5c',
                        qrcode: id,
                        description: "遇见即是上上签. "+"发布于"+ time+". "+ + like +"个喜欢 ♥",
                        callback: Posterdown
                    });
                    return false;
                }
            })
        }
    });
});


