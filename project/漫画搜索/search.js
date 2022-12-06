// 创建搜索方法
class SearchBar {
    constructor($el, refresh) {
        this.$el = $el

        this.$input = $('<input class="search" type="search">')
        this.$searchList = $('<ul><li>搜索</li></ul>')
        this._searchKeyWordArr = []
        this.refresh = refresh

        // 显示
        this._showList = true

        this.render()
    }

    get showList() {
        return this._showList
    }

    set showList(val) {
        if (val != this._showList) {
            this._showList = val
            this._showList ? this.$searchList.show() : this.$searchList.hide()
        }
    }

    get searchKeyWordArr() {
        return this._searchKeyWordArr
    }

    set searchKeyWordArr(val) {
        if (this._searchKeyWordArr !== val) {
            // 更新UI
            this._searchKeyWordArr = val
            this.renderSearchList()
        }
    }

    // 原型方法
    render() {
        this.$input.appendTo(this.$el).on('input', e => {
            
            // 获取表单元素输入的内容
            let text = this.$input.val().trim()
            // 可以将text改成存取描述符，当数据发生改变时
            // 自己去更新ui
            if (text) {
                this.showList = true
                console.log(123);
                $('li', this.$searchList).eq(0).text(`搜索：${text}`)

                this.getRecommendSearchKeyWord(text)
            } else {
                this.showList = false
            }
        })

        this.$searchList.appendTo(this.$el).on('click', 'li', e => {
            // 这里拿纯文本，不然会拿到<em></em>字符串
            console.log($(e.target).text());

            let keyword = $(e.target).text()
            this.getDataFromSever(keyword)
            // 隐藏
            this.showList = false

            this.$input.val("")
        })

        // 将值赋值为false，自动进入set方法
        this.showList = false
    }

    renderSearchList() {
        $('li', this.$searchList).eq(0).siblings().remove()
        for (let i = 0; i < this.searchKeyWordArr.length; i++) {
            $('<li>').html(this.searchKeyWordArr[i]).appendTo(this.$searchList)
        }
    }

    async getRecommendSearchKeyWord(text) {
        let url = `https://apis.netstart.cn/bcomic/SearchSug?term=${text}&num=10`
        let { data } = await axios.get(url)
        console.log('推荐搜索', data);
        this.searchKeyWordArr = data.data
    }

    async getDataFromSever(keyword) {
        let url = `https://apis.netstart.cn/bcomic/Search?styleId=-1&areaId=-1&isFinish=-1&order=-1&pageNum=1&pageSize=20&isFree=-1&keyWord=${keyword}`
        let { data } = await axios.get(url)
        console.log(data.data.list);
        this.refresh(data.data.list)
    }
}
