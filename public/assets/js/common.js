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