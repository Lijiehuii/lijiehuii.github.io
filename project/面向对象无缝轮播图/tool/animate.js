function jsAnimate(el, styleObj, cb) {

    clearInterval(el.timer)

    el.timer = setInterval(function () {
        var animateStop = true

        // 枚举 styleObj
        for (attr in styleObj) {
            // 获取目标动画样式
            var targetValue = styleObj[attr]

            // 获取当前元素的样式
            var currentValue = parseInt(getComputedStyle(el, null)[attr])

            // 目标值减去当前值
            var speed = (targetValue - currentValue) / 8

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
            // 只要有一个样式动画还在继续,动画函数就不能停止
            if (speed !== 0) {
                animateStop = false
            }

            el.style[attr] = currentValue + speed + 'px'

            if (animateStop) {
                clearInterval(el.timer)
                // cb callback 异步函数执行完毕后的回调函数
                cb && cb() // cb并不是一个必传参数,所以在调用时先判断该参数是否传递
                // if(cb) {
                //     cb()
                // }
                
            }

        }
    }, 20)
}