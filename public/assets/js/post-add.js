//请求分类列表
$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  success:function(result){//成功的回调函数
    console.log(result);
    var html = template('categoryTpl',{categoryData:result});
    $("#categoryOp").html(html)
  }
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