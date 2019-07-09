//查询文章列表
function render(){
  $.ajax({
    type: 'GET',//get或post
    url: '/posts',//请求的地址
    success: function (result) {//成功的回调函数
      var html = template("articleListTpl", result);
      var page_html = template("pagesTpl", result)
      $("#articleList").html(html)
      $("#pages").html(page_html)
    }
  })
}
render();
//查询分类列表
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    window.categoryData =result;
    var cg_html = template("allCategoryTpl", {category: result });
    $("#allCategory").html(cg_html)
  }
})

function dateFormat(date) {
  return date.split('T')[0]
}
template.defaults.imports.dateFormat = dateFormat;
var art = document.querySelector('#articleFilter')
// 筛选文章列表
$("#filterBtn").on("click", function() {
    var formData = new FormData(art)
    var category = formData.get("category")
    var state=  formData.get("state")
    $.ajax({
      type: 'GET',//get或post
      url: '/posts',//请求的地址
      data:{
        category:category,
        state:state
      },
      success: function (result) {//成功的回调函数
        var html = template("articleListTpl", result);
        var page_html =template("pagesTpl",result)
        $("#articleList").html(html)
        $("#pages").html(page_html)
      }
    })
  return false;
})
//点击页码显示页面
function changePage(page) {
  $.ajax({
    type: 'GET',//get或post
    url: '/posts',//请求的地址
    data: {
      page: page
    },
    success: function (result) {//成功的回调函数
      var html = template("articleListTpl", result);
      var page_html = template("pagesTpl", result)

      $("#articleList").html(html)
      $("#pages").html(page_html)
    }
  })
}
//呈递文章编辑页面
$("#articleList").on("click",'.edit',function() {
  var id = $(this).attr("data-id")
  $.ajax({
    type:'get',//get或post
    url:'/posts/'+id,//请求的地址
    success:function(result){//成功的回调函数
      var html=template("modifyTpl",result)
      $("#addForm").html(html)
      categoryData.forEach(element => {
       var a=  $("<option value="+element._id+" >"+element.title+"</option>")
        $("#categoryOp").append(a)
      });
    }
  })  
})
//删除文章
$("#articleList").on("click",'.deleteBtn',function() {
  var id = $(this).attr("data-id")
  if (confirm("确定要删除吗？")) {
    $.ajax({
      type:'DELETE',//get或post
      url:'/posts/'+id,//请求的地址
      success:function(result){//成功的回调函数
        render()
      }
    })  
  }
})
//修改文章
$("#addForm").on('submit',function() {
  var id = $(".modifyBtn").attr("data-id")
  //如果用户没有更改图片，隐藏域的值为空
  if ($("#hidimg").val() == '') {
    $("#hidimg").val($(this).find('img').attr('src'))
  }
  var formData = $(this).serialize();
  $.ajax({
    type:'PUT',//get或post
    url:'/posts/'+id,//请求的地址
    data:formData,
    success:function(result){//成功的回调函数
      location.reload()
    }
  })
  return false;
})
