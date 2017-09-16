/**
* 简单拖动js，需要引入jquery
* @params clickDom 拖动时点击的dom
* @params clickDom 拖动时点击的dom
*/
var Dragfree = function(clickDom,params){
  this.params = params || {};
  this.handleRange = params.handleRange || document; //mousemove作用范围
  this.clickDom = clickDom; //需要点击的domm
  this.moveDom = params.moveDom || this.clickDom; //需要移动的dom
  this.setDrag();
}
Dragfree.prototype.setDomStr = function(clickDom) {
  this.clickDom = clickDom;
}
Dragfree.prototype.getDomStr = function(clickDom) {
  return this.clickDom;
}
Dragfree.prototype.setDrag = function() {
  var handleRange = this.handleRange;
  var $clickDiv = $(this.clickDom);
  var $moveDiv = $(this.moveDom);
  var widht = $moveDiv.width() + 'px';
  var height = $moveDiv.height() + 'px';
  $moveDiv.css({
    'position': 'absolute',
    'width': widht,
    'height': height,
    'top': $moveDiv[0].offsetTop+'px',
    'left': $moveDiv[0].offsetLeft+'px',
    'margin': '0',
  })
  /* 绑定鼠标左键按住事件 */
  $clickDiv.bind("mousedown",function(event){
    /* 获取需要拖动节点的坐标 */
    var offset_x = $moveDiv[0].offsetLeft;//x坐标
    var offset_y = $moveDiv[0].offsetTop;//y坐标
    /* 获取当前鼠标的坐标 */
    var mouse_x = event.pageX;
    var mouse_y = event.pageY;
    /* 绑定拖动事件 */
    /* 由于拖动时，可能鼠标会移出元素，所以应该使用全局（document）元素 */
    $(handleRange).bind("mousemove",function(ev){
      console.log('mousemove')
      /* 计算鼠标移动了的位置 */
      var _x = ev.pageX - mouse_x;
      var _y = ev.pageY - mouse_y;
      /* 设置移动后的元素坐标 */
      var now_x = (offset_x + _x ) + "px";
      var now_y = (offset_y + _y ) + "px";
      /* 改变目标元素的位置 */
      $moveDiv.css({
        top:now_y,
        left:now_x
      });
    });
  });
  /* 当鼠标左键松开，接触事件绑定 */
  $(handleRange).bind("mouseup",function(){
    $(handleRange).unbind("mousemove");
  });
}