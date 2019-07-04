$("#modifyPw").on("submit",function(){
  var formData = $(this).serialize();
  $.ajax({
    type:'PUT',//get或post
    url:'/users/password',//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.href = '/admin/login.html'
    },
    error:function(err) {
      var mg =  JSON.parse(err.responseText).message;
      alert(mg)      
    }
  })
  return false;
})