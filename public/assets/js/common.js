$("#logout").on('click', function () {
  var isLogOut = confirm('您确定要退出吗？');
  if (isLogOut) {
    $.ajax({
      type: 'post',//get或post
      url: '/logout',//请求的地址
      success: function (result) {//成功的回调函数
        //退出成功跳转到登录页面
        location.href = '/admin/login.html'
      },
      error: function (err) {
        alert('退出失败')
      }
    })
  }
})
//呈递用户名和用户头像
$.ajax({
  type: 'get',//get或post
  url: '/users/' + userId,//请求的地址
  success: function (result) {//成功的回调函数
    $(".profile").find("img").attr("src", result.avatar)
    $(".profile").find("h3").text(result.nickName)
  }
})

//实现文件上传，图片预览
$("#addForm").on("change","#feature",function() {
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  $.ajax({
    type:'POST',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      $("#preview").prop("src",result[0].avatar)
      $("#hidimg").val(result[0].avatar)
    }
  }) 
})
