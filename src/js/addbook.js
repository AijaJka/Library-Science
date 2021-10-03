require('../css/addbook.styl')

document.ready(function(){
    let booknameDom = document.querySelector('.booknamebox .contentbox')
    let classifyDom = document.querySelector('.classifybox .contentbox')
    let briefIntroductionDom = document.querySelector('.brief-introduction .contentbox')
    // console.log(booknameDom,classifyDom,briefIntroductionDom);
    let picDom = document.querySelector('.picbox .pic')
    let picInp = document.querySelector('.picfile')
    let handeDom = document.querySelector('button')
    console.log(BASE_URL);

    let data = {
        bookName:"",
        category:"",
        desc:"",
        imgurl:"",
    }

    picDom.addEventListener('click',function(){
        picInp.click()
    })
    let img = document.createElement("img")
    picDom.appendChild(img)
 
    // let imgurl = ''
    picInp.addEventListener('change',function(){
        // picInp.files
        $updateFile('/book/upload', 'imgurl', this.files[0], function (res) {
            console.log(res);
            console.log(res.imgurl);
            data.imgurl = res.imgurl
            img.src = BASE_URL + res.imgurl
            console.log(img.src);
        })
    })

  

    booknameDom.addEventListener('change',function(){
        booknameDom.textContent = booknameDom.value
        data.bookName = booknameDom.textContent
    })
    classifyDom.addEventListener('change',function(){
        classifyDom.textContent = classifyDom.value
        data.category = classifyDom.textContent
    })
    briefIntroductionDom.addEventListener('change',function(){
        briefIntroductionDom.textContent = briefIntroductionDom.value
        data.desc = briefIntroductionDom.textContent
    })
    
    
  
    console.log(utils);
    handeDom.addEventListener('click',function(){
        console.log(data);

        http.post("/book/add",data,function(res){
            if(res.status == 0){
                console.log(res);
                utils.toast("icon-zhengque1","添加成功")
            }else{
                utils.toast("icon-cuowu","添加失败")
            }
        })

    })

})