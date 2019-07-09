//点赞功能
$("#issueBox").on("click",".like",function() {
  var id= $(this).attr("data-id")
  $.ajax({
    type:'POST',//get或post
    url:'/posts/fabulous/'+id,//请求的地址
    success:function(result){//成功的回调函数
      render()
    }
  })
})

var id = location.search.substr(1).split("=")[1]
//根据分类ID查询文章列表
function render() {
  $.ajax({
    type:'get',//get或post
    url:'/posts/category/'+id,//请求的地址
    success:function(result){//成功的回调函数
        var html  = template("listTpl",{data:result})
        $("#issueBox").html(html)
    }
  })
}
render()
