//渲染轮播图
$.ajax({
  type: 'get',//get或post
  url: '/slides',//请求的地址
  success: function (result) {//成功的回调函数
    var html = template("swipeTpl", { data: result })
    $("#swipeBox").html(html)
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);
      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    })
  }
})
//最新发布文章列表
function render() {
  $.ajax({
    type:'get',//get或post
    url:'/posts/lasted',//请求的地址
    success:function(result){//成功的回调函数
      var html = template("newIssueTpl",{data:result});
      $("#newsBox").html(html)
    }
  })
}
render()
//点赞功能
$("#newsBox").on("click",".like",function() {
  var id= $(this).attr("data-id")
  $.ajax({
    type:'POST',//get或post
    url:'/posts/fabulous/'+id,//请求的地址
    success:function(result){//成功的回调函数
      render()
    }
  })
})