$("#logout").on('click',function() {
  var isLogOut = confirm('您确定要退出吗？');
  if (isLogOut) {
    $.ajax({
      type:'post',//get或post
      url:'/logout',//请求的地址
      success:function(result){//成功的回调函数
        //退出成功跳转到登录页面
        location.href = '/admin/login.html'
      },
      error:function(err) {
        alert('退出失败')
      }
    })
  }
})
var strongs = $("#statInfo").find("strong");
//查询文章数量
$.ajax({
  type:'get',//get或post
  url:'/posts/count',//请求的地址
  success:function(result){//成功的回调函数
    strongs.eq(0).text(result.postCount)
    strongs.eq(1).text(result.draftCount)
  }
})
//查询分类数量
$.ajax({
  type:'get',//get或post
  url:'/categories/count',//请求的地址
  success:function(result){//成功的回调函数
    strongs.eq(2).text(result.categoryCount)
  }
})
//查询分类数量
$.ajax({
  type:'get',//get或post
  url:'/comments/count',//请求的地址
  success:function(result){//成功的回调函数
    strongs.eq(3).text(result.commentCount)
    strongs.eq(4).text(result.noPassCount)
  }
})