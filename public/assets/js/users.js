function render() {
  //获取用户列表
  $.ajax({
    type: 'get',//get或post
    url: '/users',//请求的地址
    success: function (userInfo) {//成功的回调函数
      var html = template('userListTpl', { userInfo: userInfo });
      $("#userList").html(html)
    }
  })
}
render()

$("#addForm").on('submit', function () {
  // 收集表单数据
  var userData = $(this).serialize();

  $.ajax({
    type: 'post',//get或post
    url: '/users',//请求的地址
    data: userData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      location.reload()
    },
    error: function (err) {
      alert(JSON.parse(err.responseText).message);
    }
  })
  return false;//阻止表单默认行为
})

//渲染用户修改页面
$("#userList").on('click', '.edit', function () {
  var id = $(this).attr('data_id');
  $.ajax({
    type: 'GET',//get或post
    url: '/users/' + id,//请求的地址
    success: function (userInfo) {//成功的回调函数
      var html = template('modifyUserTpl', userInfo);
      $("#addForm").html(html)
    }
  })
})
//修改用户信息
$("#addForm").on("submit", function () {
  var modifyInfo = $(this).serialize();
  var id = $(this).find("button").attr('data-id');
  $.ajax({
    type: 'PUT',//get或post
    url: '/users/' + id,//请求的地址
    data: modifyInfo,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function () {//成功的回调函数
      render()
    }
  })
  return false;
})
//删除用户
$("#userList").on('click', '.delete', function () {
  if (confirm('确定要删除吗？')) {
    //获取要删除的id
    var id = $(this).attr('data_id');

    $.ajax({
      type: 'DELETE',//get或post
      url: '/users/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        render()
      }
    })
  }
})

$("#selectAll").on('change', function () {
  var checkBool = $(this).prop('checked')
  $(".selectOne").prop('checked', checkBool)
  if ($(this).prop('checked')) {
    $("#deleteMany").show();
  } else {
    $("#deleteMany").hide();
  }
})
$("#userList").on('change', '.selectOne', function () {
  var checkboxs = $("#userList").find('.selectOne');

  if (checkboxs.length == checkboxs.filter(':checked').length) {
    $("#selectAll").prop('checked', true)
  } else (
    $("#selectAll").prop('checked', false)
  )

  if (checkboxs.filter(":checked").length >= 2) {
    $("#deleteMany").show();
  } else {
    $("#deleteMany").hide();
  }
})
//批量删除
$("#deleteMany").on('click', function () {
  if (confirm('确定要删除吗！')) {
    var checkboxs = $("#userList").find('.selectOne');
    var selects = checkboxs.filter(":checked");

    selects.each(function (i, val) {
      var id = $(val).attr('data_id')
      $.ajax({
        type: 'DELETE',//get或post
        url: '/users/' + id,//请求的地址
        success: function (result) {//成功的回调函数
          render()
          $("#deleteMany").hide();
        }
      })
    })
  }
})