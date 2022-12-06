class Manga {
    constructor($wrap) {
        this.$wrap = $wrap
        this._mangaList = []
    }

    get mangaList() {
        return this._mangaList
    }

    set mangaList(val) {
        if (val !== this._mangaList && val.length) {
            this._mangaList = val
            this.render()
        }
    }

    render() {
        this.$wrap.html('')
        for (let i = 0; i < this.mangaList.length; i++){
            let {
                vertical_cover: cover,
                org_title: title,
                styles: styles
            } = this.mangaList[i]
            let $div = $('<div class="search-item">')
            $(`<img src="${cover}">`).appendTo($div)
            $(`<p class="title">${title}</p>`).appendTo($div)
            $(`<p class="style">${styles}</p>`).appendTo($div)
            $div.appendTo(this.$wrap)
        }
    }
}
