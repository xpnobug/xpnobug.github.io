document.ready(function() {
    const componentViewer = new Vue({
        el: '#viewer',
        data: {
            showBool: false,
            gallery: {
                index: 0,
                list: []
            },
            image: {
                initBool: true,
                loadBool: false
            },
            touch: {
                start: 0,
                move: 0,
                moveMax: 50,
                moveOpacityScale: 1.5
            }
        },
        computed: {
            isMac: function() {
                return /mac/i.test(window.navigator.platform);
            },
            isTouchDevice: function() {
                return 'ontouchstart' in window;
            }
        },
        methods: {
            imageLoad: function(url, callback) {
                let img = new Image();
                img.src = url;
                if (img.complete) {
                    callback(img.width, img.height);
                } else {
                    img.onload = () => {
                        callback(img.width, img.height);
                        img.onload = null;
                    }
                }
            },
            imageDownload: function(url) {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    let a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response);
                    a.download = url.substring(url.lastIndexOf('/') + 1);
                    a.click();
                };
                xhr.send();
            },
            keyFunction: function(e) {
                let keyMap = (this.isMac && e.metaKey) || (!this.isMac && e.ctrlKey) ? {
                    s: 'download'
                } : {
                    Escape: 'close',
                    ArrowUp: 'count__',
                    ArrowRight: 'next',
                    ArrowDown: 'tips__',
                    ArrowLeft: 'prev'
                };
                if (keyMap[e.key]) {
                    let keyButton = this.$el.querySelector('.viewer-key-' + keyMap[e.key]);
                    keyButton.classList.add('on');
                    setTimeout(() => {
                        keyButton.classList.remove('on');
                        if (!/__/.test(keyMap[e.key])) setTimeout(() => keyButton.click(), 200);
                    }, 300);
                    e.preventDefault();
                }
            },
            imageSwitch: function(url) {
                if (!this.showBool) this.showBool = true;
                if (this.image.initBool && !this.isTouchDevice) window.addEventListener('keydown', this.keyFunction, true);
                this.image.loadBool = true;
                setTimeout(() => {
                    this.imageLoad(url, () => {
                        this.$refs.viewerImage.innerHTML = '<img src="' + url + '" draggable="false" alt="" />';
                        if (this.image.initBool) this.image.initBool = false;
                        this.image.loadBool = false;
                    });
                }, 500);
            },
            imageClose: function() {
                if (!this.isTouchDevice) window.removeEventListener('keydown', this.keyFunction, true);
                this.showBool = false;
                this.image.initBool = true;
            },
            viewerButton: function(dom) {
                if (dom.hasAttribute('data-action')) {
                    switch (dom.getAttribute('data-action')) {
                        case 'prev':
                            if (!this.image.loadBool) {
                                this.gallery.index = this.gallery.index == 0 ? this.gallery.list.length - 1 : this.gallery.index - 1;
                                this.imageSwitch(this.gallery.list[this.gallery.index]);
                            }
                            break;
                        case 'next':
                            if (!this.image.loadBool) {
                                this.gallery.index = this.gallery.index == this.gallery.list.length - 1 ? 0 : this.gallery.index + 1;
                                this.imageSwitch(this.gallery.list[this.gallery.index]);
                            }
                            break;
                        case 'download':
                            if (!this.image.loadBool) this.imageDownload(this.gallery.list[this.gallery.index]);
                            break;
                        case 'close':
                            this.imageClose();
                            break;
                    }
                }
            },
            postGalleryButton: function(url, dom) {
                this.gallery.list = [];
                if (dom.tagName.toLowerCase() == 'img') {
                    /*
                    gallery
                    ..figure
                      ..thumbnail
                    */
                    for (let child of dom.parentNode.parentNode.children) this.gallery.list.push(child.firstElementChild.getAttribute('data-index'));
                    this.gallery.index = [].indexOf.call(this.gallery.list, url);
                } else {
                    this.gallery.list.push(url);
                    this.gallery.index = 0;
                }
                this.imageSwitch(this.gallery.list[this.gallery.index]);
            },
            imageTouchStart: function(e) {
                e.preventDefault();
                this.touch.start = e.targetTouches[0].clientX;
                window.addEventListener('touchmove', this.imageTouchMove, {
                    passive: false
                });
                window.addEventListener('touchend', this.imageTouchEnd);
                this.$refs.viewerImage.removeAttribute('style');
            },
            imageTouchMove: function(e) {
                e.preventDefault();
                this.touch.move = e.targetTouches[0].clientX - this.touch.start;
                this.$refs.viewerImage.style.transform = 'translate3d(calc(-50% + ' + this.touch.move + 'px), -50%, 0)';
                if (Math.abs(this.touch.move) > this.touch.moveMax) this.$refs.viewerImage.style.opacity = Math.abs(this.touch.move) - this.touch.moveMax > this.touch.moveOpacityScale * 100 ? 0 : 1 - ((Math.abs(this.touch.move) - this.touch.moveMax) / (this.touch.moveOpacityScale * 100)).toFixed(2);
            },
            imageTouchEnd: function() {
                window.removeEventListener('touchmove', this.imageTouchMove);
                window.removeEventListener('touchend', this.imageTouchEnd);
                if (this.touch.move != 0) {
                    if (Math.abs(this.touch.move) > this.touch.moveMax) {
                        this.$el.querySelector('.viewer-touch-' + (this.touch.move > 0 ? 'next' : 'prev')).click();
                        this.$refs.viewerImage.removeAttribute('style');
                    } else {
                        this.$refs.viewerImage.style.transform = 'translate3d(-50%, -50%, 0)';
                        this.$refs.viewerImage.style.transition = 'transform 0.3s linear';
                    }
                    this.touch.move = 0;
                }
                this.touch.start = 0;
            }
        },
        mounted: function() {
            window.componentViewer_postGalleryButton = this.postGalleryButton;
            if (this.isTouchDevice) this.$refs.viewerImage.addEventListener('touchstart', this.imageTouchStart, {
                passive: false
            });
        }
    });
});