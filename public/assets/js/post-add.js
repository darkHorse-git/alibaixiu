//实现图片上传和预览
$("#feature").on('change',function() {
  var formData = new FormData();
  formData.append('avatar',this.files[0]);
  $.ajax({
    type:'POST',//get或post
    url:'/upload',//请求的地址
    contentType:false,
    processData:false,
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      $("#preview").attr('src',result[0].avatar).show();
      $("#hidimg").val(result[0].avatar)
    }
  })
})

$("#addForm").on("submit",function() {
  var formData = $(this).serialize();
  $.ajax({
    type:'POST',//get或post
    url:'/posts',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.href='/admin/posts.html'
    }
  })
  return false;
}) 