require('../css/utils.styl')
require('../fonts/iconfont.css')


document.ready(function () {
    let utils = {
        toast: function (icon,str) {
            let div = document.createElement('div')
            let bodyDom = document.querySelector('body')
            div.className = 'toast'
            let html  = `
            <div class="toast">
                <div class="toasticon iconfont ${icon}"></div>
                <div class="toasttext">${str}</div>
            </div>
            `
            div.innerHTML = html
            bodyDom.appendChild(div)
    
            // 两秒之后自身删除
            setTimeout(function(){
                div.remove()
            },2000)
        }
        }
    
    window.utils = utils

})