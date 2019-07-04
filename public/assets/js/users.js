$("#userForm").on('submit', function () {
  // 收集表单数据
  var userData = $(this).serialize();

  $.ajax({
    type: 'post',//get或post
    url: '/users',//请求的地址
    data: userData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      location.reload();//刷新当前页面
    },
    error: function (err) {
      alert(JSON.parse(err.responseText).message);
    }
  })
  return false;//阻止表单默认行为
})

//给文件选择控件添加onchange事件
$("#avatar").on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0]);

  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    data: formData,
    //告诉ajax不要转换数据参数
    processData: false,
    //formData默认有请求头告诉$.ajax不要默认设置请求头为application/x-www-form-urlencoded
    contentType: false,
    success: function (reponse) {//成功的回调函数
      $("#preview").attr('src', reponse[0].avatar);
      $("#hiddenipt").val(reponse[0].avatar);
    },
    error: function (err) {
      console.log(err);
    }
  })
})
//获取用户列表
$.ajax({
  type: 'get',//get或post
  url: '/users',//请求的地址
  success: function (userInfo) {//成功的回调函数
    var html = template('userListTpl', { userInfo: userInfo });
    $("#userList").html(html)
  }
})

$("#userList").on('click', '.edit', function () {
  var id = $(this).attr('data_id');

  $.ajax({
    type: 'GET',//get或post
    url: '/users/' + id,//请求的地址
    // data: {
    //   nickName: username
    // },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      console.log(result)
    }
  })
})