var id = location.search.substr(1).split("=")[1]
$.ajax({
  type:'get',//get或post
  url:'/posts/'+id,//请求的地址
  success:function(result){//成功的回调函数
    var html = template('detailTpl',result)
    $(".article").html(html)
  }
})
//获取网站配置
var review;
$.ajax({
  type:'get',//get或post
  url:'/settings',//请求的地址
  success:function(result){//成功的回调函数
    review = result.review;
    if (result.comment && isLogin) {
      $("#commentBox").css("display","block")
    }else {
      $("#commentBox").css("display","none")
    }
  }
})


$("#commentBox").on("submit",function() {
  var content = $(this).find("textarea").val()  
  var state;
  if (review) {
    state = 0
  }else {
    state = 1
  }
  
  $.ajax({
    type:'POST',//get或post
    url:'/comments',//请求的地址
    data:{
      content,
      post:id,
      state
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      location.reload()
    },
    error:function(result) {
      console.log('评论失败');
    }
  })
  return false;
})