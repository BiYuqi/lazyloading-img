## 为什么要实现图片懒加载?
对于一般页面，影响速度最大的因素可能就是图片的大小了，一张普通的图片小道几百k,达到上M,页面图片很多时，页面的加载速度缓慢，几S钟内页面没有加载完成，也许会失去很多的用户。所以，对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样子对于页面加载性能上会有很大的提升，也提高了用户体验。

### 原理
将页面中的img标签src指向一张小图片或者src为空，然后定义data-src（这个属性可以自定义命名，默认用data-src）属性指向真实的图片。src指向一张默认的图片(即本文的default.png)，否则当src为空时也会向服务器发送一次请求。可以指向loading的地址。

### 直接上用法demo，文章博客会详细讲解
```javascript
git clone https://github.com/BiYuqi/lazyloading-img.git

cd lazyloading-img //进入文件夹

//demo 为测试文件
//lazyloading-img.js 懒加载插件 不借助第三方库 纯原生js

```
### 自己使用时的方法
```javascript
//页面引入 lazyloading-img.js
//使用方法
$lazyload({
    img:'img',//图片即标签名 默认写img
    timer:'0.4s'//淡入淡出时间
});

//至此可以去看看网页中的效果了 注意img 必须给定高度
```
![](img/lazy.gif)
### 说明
本插件只提供图片懒加载 ,图片淡入淡出功能，暂无其他
如有问题，请联系我biyuqiwan@163.com
