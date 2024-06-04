var div = document.getElementById('series');
var width = div.style.width || div.clientWidth || div.offsetWidth || div.scrollWidth;
var s = 'position:fixed;top:80px;width:' + width + 'px;';
wg();

function wg() {
    //    setFixed();
    $.ajax({
        dataType: 'json',
        url: 'index/motto.blog',
        type: 'POST',
        success: function(ret) {
            if (ret.code === '0') {
                $('#motto').html(ret.data.content);
                if (ret.data.author != null && ret.data.author != undefined && ret.data.author != '') {
                    $('#author').html('——' + ret.data.author);
                }
            }
        }
    });
}

function setFixed() {
    window.addEventListener("scroll", function(e) {
        var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (!is_mobile() && document.body.offsetWidth >= 753 && scrollHeight > 1080) {
            $('#series').attr('style', s);
            $('#officialAccount').hide();
        } else {
            $('#series').removeAttr('style');
            $('#officialAccount').show();
        }
    });
}

function is_mobile() {
    var ua = navigator.userAgent.toLowerCase();
    if (/(ip(hone|od)|android|opera m(ob|in)i|windows (phone|ce)|blackberry|s(ymbian|eries60|amsung)|p(laybook|alm|rofile\/midp|laystation portable)|nokia|fennec|htc[-_]|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})/i.test(ua)) {
        return true;
    } else {
        return false;
    }
}