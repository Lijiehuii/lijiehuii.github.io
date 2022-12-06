/**
 * @desc 创建无缝轮播图的构造函数
 * @class Carousel
 * @constructor
 * @param {String[]} images 
 * @param {Element} render 
 * @return {Carousel} 返回Carousel构造函数实例
 */
function Carousel(images, render) {
    this.images = images.concat([images[0]])
    this.render = render

    this.box = null
    this.ul = null

    this.boxWidth = 0
    
    this.index = 0
    this.timer = null

    this.init()
}

// 定义一个公共方法初始化无缝轮播图
Carousel.prototype.init = function () {
    this.box = document.createElement('div')
    this.box.className = 'carousel'
    this.render.appendChild(this.box)

    this.boxWidth = parseInt(getComputedStyle(this.box, null).width)

    this.ul = document.createElement('ul')
    this.box.appendChild(this.ul)

    for (var i = 0; i < this.images.length; i++) {
        var li = document.createElement('li')
        var img = document.createElement('img')
        img.src = this.images[i]

        li.appendChild(img)
        this.ul.appendChild(li)
    }

    this.startMove()
}

// addEventListener
Carousel.prototype.addEventHandel = function () {
    var self = this
    this.box.onmouseenter = function () {
        clearInterval(self.timer)
    }
    this.box.onmouseleave= function () {
        self.startMove()
    }
}

// 开始轮播方法
Carousel.prototype.startMove = function () {
    var self = this
    this.timer = setInterval(function () {
        self.nextPage()
    }, 2000)
}


// 下一张图片的方法
Carousel.prototype.nextPage = function () {
    this.index = (this.index + 1) % this.images.length

    var offsetX = -this.boxWidth * this.index

    var self = this

    jsAnimate(this.ul, { left: offsetX }, function () {
        self.lastPage()
    })
}


// 最后一张图片的判断方法
Carousel.prototype.lastPage = function () {
    if (this.index === this.images.length - 1) {
        this.index = 0
        this.ul.style.left = 0
    }
}