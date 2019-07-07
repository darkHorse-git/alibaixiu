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
        console.log(result);

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
      console.log(categoryData);
      console.log(result);
      
     
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

$("#addForm").on('submit',function() {
  var id = $(".modifyBtn").attr("data-id")
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
//事件文件上传，图片预览
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
      console.log(result[0].avatar)
      $("#preview").prop("src",result[0].avatar)
      $("#hidimg").val(result[0].avatar)
    }
  }) 
})