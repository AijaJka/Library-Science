require('../css/detailsbook.styl')

document.ready(function(){
    let mainDom = document.querySelector('main')
    console.log(mainDom);
    // 获取图书列表
    http.get("/book/bookList", function (res) {
        console.log(res);
        let html = ''

        for(let a=0;a<res.data.length;a++){
            // 对时间属性进行操作 先转数组添加元素再转回来
            let str = res.data[a].book_ctime
            str =  str.replace('T',"")
            str = str.replace('Z',"")
            str = str.replace('.000',"")
            let arrstr = str.split("")
            arrstr.splice(10,0,"    ")
            let time = arrstr.join("")
            console.log(time);
           
            // 渲染页面
            html += `
            <div class="booksynopsis">
            <div class="pic"><img src="${BASE_URL + res.data[a].book_imgurl}" alt=""></div>
            <div class="name">书名:${res.data[a].book_name}</div>
            <div class="time">时间:${time}</div>
            <div class="classify">分类:${res.data[a].book_cate}</div>
            <div class="text">简介:${res.data[a].book_desc}</div>
          </div>
            `
            
        }
        mainDom.innerHTML = html
    })
})