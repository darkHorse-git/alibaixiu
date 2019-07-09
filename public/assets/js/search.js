var key = location.search.substr(1).split('=')[1];

function render() {
//显示搜索结果
$.ajax({
  type:'get',//get或post
  url:'/posts/search/'+key,//请求的地址
  success:function(result){//成功的回调函数
    console.log(result)
    var tpl = `
    <h2>搜索到的文章</h2>
    {{each data}}
      <div class="entry">
          <div class="head">
            <a href="detail.html?id={{$value._id}}">{{$value.title}}</a>
          </div>
          <div class="main">
            <p class="info">{{$value.author.nikeName}} 发表于 {{$value.createAt}}</p>
            <p class="brief">{{$value.content}}</p>
            <p class="extra">
              <span class="reading">阅读({{$value.meta.views}})</span>
              <span class="comment">评论({{$value.meta.comments}})</span>
              <a href="javascript:;" class="like" data-id="{{$value._id}}">
                <i class="fa fa-thumbs-up"></i>
                <span>赞({{$value.meta.likes}})</span>
              </a>
              <a href="javascript:;" class="tags">
                分类：<span>{{$value.category.title}}</span>
              </a>
            </p>
            <a href="detail.html?id={{$value._id}}" class="thumb">
              <img src="{{$value.thumbnail}}" alt="">
            </a>
          </div>
        </div>
    {{/each}}
    `
    var  html = template.render(tpl,{data:result})
    $("#issueBox").html(html)
  }
})
}
render()
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