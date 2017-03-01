(function(window,undefined){
    function LazyLoaing(obj){
        this.obj = obj;
    }
    LazyLoaing.prototype = {
        constructor:LazyLoaing,
        init:function(){
            this.lazyload();
            this.setCss();
            this.imgScroll();
        },
        setCss:function(){
            var cssCode = '\
                img.show{\
                    animation: fadeIn '+this.obj.timer+' linear;\
                    -webkit-animation: fadeIn '+this.obj.timer+' linear;\
                }\
                @keyframes fadeIn {\
                    from {opacity: 0;}\
                    to {opacity: 1;}\
                }'
            var style = document.createElement('style');
                style.type = 'text/css';
            if(style.styleSheet){
                //IE
                style.styleSheet.cssText = cssCode;
            }else{
                //others
                style.innerHTML = cssCode;
            }
            document.getElementsByTagName("head")[0].appendChild(style);
        },
        $elem:function(el){
            return document.querySelectorAll(el);
        },
        addClass:function(elem,cName){
            var reg = new RegExp('(^|\\s)' + cName+ '(\\s|$)');
            if(!reg.test(elem.className)){
                elem.className += ' ' + cName;//有个空格
            }
        },
        //节流函数 防止(节约)scroll滚动事件 以固定的的间隔显示图片
        throttle:function(delay,time,callback){
            var startTime = new Date();
            var timer = null;
            return function(){
                var currTime = new Date(),
                    that = this,
                    args = arguments;
                clearTimeout(timer);
                if(currTime - startTime >= delay){
                    callback.apply(that,args);
                    startTime = currTime;
                }else{
                    timer = setTimeout(function(){
                        callback.apply(that,args)
                    },time)
                }
            }
        },
        lazyload:function(){
            var okSeeHeight = document.documentElement.clientHeight;//可视区域高度
            var curScrollTop = document.body.scrollTop || document.documentElement.scrollTop;//滚动条高度
            var imgNums = this.$elem(this.obj.img),
                len = imgNums.length,
                sn = 0;//初始化图片位置
            for(var i=sn; i<len; i++){
                if(imgNums[i].offsetTop < okSeeHeight + curScrollTop){
                    if(imgNums[i].getAttribute('src') == this.obj.default){
                        imgNums[i].src = imgNums[i].getAttribute('data-src');
                        this.addClass(imgNums[i],'show');
                    }
                    sn = i + 1;
                }
            }
        },
        imgScroll:function(){
            var that = this;
            window.addEventListener('scroll',this.throttle(500,500,function(){
                that.lazyload();
            }),false)
        }
    };
    window.$lazyload = function(obj){
        return new LazyLoaing(obj);
    }
})(window)
