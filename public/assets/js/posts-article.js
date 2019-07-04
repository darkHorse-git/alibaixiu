$.ajax({
  type: 'GET',//get或post
  url: '/posts',//请求的地址
  success: function (result) {//成功的回调函数
    var articleData = result.records;
    var html = template("articleListTpl", {articleData:articleData});
    $("#articleList").html(html)
  }
})
function dateFormat(date) {
  return date.replace('T',' ').replace(".000Z"," ")
}
template.defaults.imports.dateFormat = dateFormat;