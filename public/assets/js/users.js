$("#userForm").on('submit', function () {
  
  // 收集表单数据
  var userData = $(this).serialize();

  $.ajax({
    type: 'post',//get或post
    url: '/users',//请求的地址
    data: userData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      // location.reload();//刷新当前页面
      // render();  
      location.reload()
    },
    error: function (err) {
      alert(JSON.parse(err.responseText).message);
    }
  })
  return false;//阻止表单默认行为
})

//将文件选择控件的change事件委托到一直存在的formbox上
$("#formBox").on('change', '#avatar', function () {
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
//渲染用户修改页面
$("#userList").on('click', '.edit', function () {
  var id = $(this).attr('data_id');
  $.ajax({
    type: 'GET',//get或post
    url: '/users/' + id,//请求的地址
    success: function (userInfo) {//成功的回调函数
      var html = template('modifyUserTpl', userInfo);
      $("#formBox").html(html)
    }
  })
})
//修改用户信息
$("#formBox").on("submit", "#modifyBox", function () {
  var modifyInfo = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'PUT',//get或post
    url: '/users/' + id,//请求的地址
    data: modifyInfo,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      location.reload()
    }
  })
  return false;
})
//删除用户
$("#userList").on('click', '.delete', function () {
  //获取要删除的id
  var id = $(this).attr('data_id');

  $.ajax({
    type: 'DELETE',//get或post
    url: '/users/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      render()
    }
  })
}) 