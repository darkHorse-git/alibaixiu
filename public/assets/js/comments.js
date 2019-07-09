function render() {
  $.ajax({
    type:'get',//get或post
    url:'/comments',//请求的地址
    success:function(result){//成功的回调函数
      var html1 = template('commentTpl',result);
      var html2 = template('pagesTpl',result);
      $("#commentBOx").html(html1)
      $("#pageBox").html(html2)
    }
  })
}
render();
function dateFormat(date) {
  return date.split('T')[0]
}
template.defaults.imports.dateFormat = dateFormat;
function changePage(page) {
  $.ajax({
    type:'get',//get或post
    url:'/comments',//请求的地址
    data:{
      page:page
    },
    success:function(result){//成功的回调函数
      var html1 = template('commentTpl',result);
      var html2 = template('pagesTpl',result);
      $("#commentBOx").html(html1)
      $("#pageBox").html(html2)
    }
  })
}

//评论审核功能
$("#commentBOx").on("click",".audit",function() {
  var status = $(this).attr("data-state");
  var id = $(this).attr("data-id");
  $.ajax({
    type:'PUT',//get或post
    url:'/comments/'+id,//请求的地址
    data:{
      state:status
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      render()
    }
  })
})

//删除评论
$("#commentBOx").on("click",".delCommet",function() {
  var id = $(this).attr('data-id');
  $.ajax({
    type:'DELETE',//get或post
    url:'/comments/'+id,//请求的地址
    success:function(result){//成功的回调函数
      render()
    }
  })
})