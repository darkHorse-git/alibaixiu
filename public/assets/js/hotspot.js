// 热门推荐文章
$.ajax({
  type: 'get',//get或post
  url: '/posts/recommend',//请求的地址
  success: function (response) {//成功的回调函数
    var tpl =
      `{{each data}}
      <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="热门文章">
          <span>{{$value.title}}</span>
        </a>
      </li>
    {{/each}}`
    var html = template.render(tpl, { data: response })
    $("#hotspotBox").html(html)
  }
})
//随机推荐文章
$.ajax({
  type: 'get',//get或post
  url: '/posts/random',//请求的地址
  success: function (result) {//成功的回调函数
    var randomTpl =
      `
      {{each data}}
      <li>
          <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
              <img src="{{$value.thumbnail}}">
            </div>
          </a>
      </li>
      {{/each}}
    `
    var html = template.render(randomTpl, { data: result })
    $(".random").html(html)
  }
})
//获取最新评论
$.ajax({
  type: 'get',//get或post
  url: '/comments/lasted',//请求的地址
  success: function (result) {//成功的回调函数
    var w =
      `
      {{each data}}
      <li>
          <a href="detail.html?id={{$value.post}}">
            <div class="avatar">
              <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
              <p>
                <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,10)}}说:
              </p>
              <p>{{$value.content}}</p>
            </div>
          </a>
      </li>
      {{/each}}
    `
    var html = template.render(w, { data: result })
    $(".discuz").html(html)
  }
})
//侧边栏导航
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    var tpl =
      `
      {{each data}}
      <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
      {{/each}}
    `
    var html = template.render(tpl, { data: result })
    $(".nav").html(html)
    $(".topnav").find("ul").html(html)
  }
})

// 文章搜索功能,呈现匹配文章列表
$(".search form").on("submit",function() {
  var key = $(this).find("input").eq(0).val()
  location.href = 'search-list.html?key='+key;
  return false;
})