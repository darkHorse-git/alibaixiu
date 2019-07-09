// 添加文章分类
$("#addCategory").on("submit", function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',//get或post
    url: '/categories',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function () {//成功的回调函数
      render()
    }
  })
  return false;
})
// 渲染分类列表
function render() {
  $.ajax({
    type: 'get',//get或post
    url: '/categories',//请求的地址
    success: function (response) {//成功的回调函数
      var html = template("categoryListTpl", { categoryData: response });
      $("#categoryList").html(html);
      $("#addCategory").find('input').val('')
    }
  })
}
render()
// 编辑分类
$("#categoryList").on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'GET',//get或post
    url: '/categories/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      var html = template("modifyFormTpl", result);
      $("#categoryBox").html(html)
    }
  })
})
// 删除分类
$("#categoryList").on("click", '.delete', function () {
  if (confirm('确定要删除吗？')) {
    var id = $(this).attr("data-id");
    $.ajax({
      type: 'DELETE',//get或post
      url: '/categories/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        render()
      }
    })
  }
})
//根据ID修改分类
$("#categoryBox").on("submit", "#addCategory", function () {
  var formData = $(this).serialize();
  var id = $(this).attr("data-id");
  $.ajax({
    type: 'PUT',//get或post
    url: '/categories/' + id,//请求的地址
    data: formData,
    success: function (result) {//成功的回调函数
      render()
    }
  })
  return false;
})

$("#selectAll").on("change", function () {
  if ($(this).prop("checked")) {
    $("#categoryList").find('input').prop('checked', true)
  } else {
    $("#categoryList").find('input').prop('checked', false)
  }
})

$("#categoryList").on("change", "input", function () {
  var ipt = $("#categoryList").find("input");
  var n = ipt.filter(':checked').length;
  if (n == ipt.length) {
    $("#selectAll").prop('checked', true)
  } else {
    $("#selectAll").prop('checked', false)
  }
})

