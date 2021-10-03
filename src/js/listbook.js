require('../css/listbook.styl')
document.ready(function () {
// 定义一个变量 下面多删用来装书的ID
    let obj = {
        bookIds: []
    }

    let mainDom = document.querySelector('main')
    let allcheckInp = document.querySelector('.allinp')


    let checkDom = document.querySelector('.checktext')
    let numDom = document.querySelector('.numtext')

    let allremoveDom = document.querySelector('.allremove')
    let utilsDom = document.querySelector('.utils')
    let html = ''

    // 获取图书列表
    http.get("/book/bookList", function (res) {
        let arr = res.data
        console.log(arr);
        if (res.status == 0) {
            // 当请求成功时渲染到页面
            for (let a = 0; a < arr.length; a++) {
                html += `
        <div class="list">
        <input type="checkbox" class="check" >
        <div class="pic">
            <img src="${BASE_URL + arr[a].book_imgurl}" alt="">
        </div>
        <div class="text">
        <div class="title">${arr[a].book_name}</div>
        <div class="classify">${arr[a].book_cate}</div>
        <div class="content">${arr[a].book_desc}</div>
        </div>
        <div class="btn">
            <button class="remove">删除</button>
        </div>
        </div>
        `
                mainDom.innerHTML = html
            }
        }

        let checkInp = document.querySelectorAll('.check')

        // 多个删除
        // 监听多个删除按钮
        allcheckInp.addEventListener('click', function () {
            if(allcheckInp.checked == true){
                utils.toast("icon-daosanjiao","请选择不超过三本图书")
            }
            for (let b = 0; b < checkInp.length; b++) {
                checkInp[b].addEventListener('click',function(){
                    // 当复选框为TRUE时候添加到上面对象的数组中
                    if (checkInp[b].checked == true) {
                        obj.bookIds.push(arr[b].id)
                        
                    }
                    // 否则在对象的数组属性中删除
                    else {
                        obj.bookIds.splice( obj.bookIds.indexOf(obj.bookIds), 1)
                    }
                    console.log(obj.bookIds);
                    allremoveDom.addEventListener('click', function () {
                        http.post("/book/batchdelete", obj, function (res) {
                            if(obj.bookIds.length <=3){
                                utils.toast("icon-zhengque1","删除成功")
                            }else{
                              
                                utils.toast("icon-cuowu","最多只能删除3条，哥！")
                            }
                        })
                    })
                })
               
            }
        })



       // 单个删除
        let listDom = document.querySelectorAll('.list')
        for (let b = 0; b < listDom.length; b++) {
           
            listDom[b].addEventListener('click', function (e) {
                
                let id = arr[b].id
                
                let inp = document.querySelectorAll('.check')
                if (inp[b].checked == true) {
                    
                    if (e.target.className == "remove") {
                        http.get("/book/delete?bookId=" + id, function (res) {
                        })
                    }
                  
                } 
            })
        }


        let backDom = document.querySelector('.back')
        backDom.addEventListener('click',function(){
            location.href = 'addbook.html'
        })
    })


})