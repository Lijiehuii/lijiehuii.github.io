class Newsongs {
    constructor($el) {
        this.$el = $el;
        this.$newsongsList = $(".newsongs-list");
        this.$listSong = $(".list-song");
        this.$wangyYiNewSongs = $(".wangyyi-newsongs");
        this.$songPlay = $(".songplay")
        this.$return = $(".return");
        this.$audio = $(".song-audio .audio");
        this.audiorefresh = document.querySelector(".audio");
        this.songLryicList = $(".song-lryic-list");
        this.songPlayName = $(".songPlay-top .song-play-name");
        this.tranSlateY = 250;
        this.hight = 26;
        this.data = null;
        this.songId = null;
        this.songAudio = null;
        this.lryic = null
        this.idArr = [];
        this.songnameArr = [];
        this.authorArr = [];
        this.lryicArr = [];
        this.songTimeArr = [];
        this.songLryicArr = [];
        this.currentTimeArr = [];
        this.getDataFromServer();
        this.newsongsListClick();
        this.returnBtn()
    }

    // 新歌榜单渲染
    newsongsRender(data) {
        this.idArr = [];
        this.songnameArr = [];
        this.authorArr = [];
        for (let i = 0; i < this.data.length; i++) {
            this.idArr = [...this.idArr, this.data[i].id];
            this.songnameArr = [...this.songnameArr, this.data[i].name];
            this.authorArr = [...this.authorArr, this.data[i].song.artists[0].name];
            let $listSongEL = '';
            if (i < 3) {
                $listSongEL +=
                    `<div class="list-song" data-id="${this.data[i].id}" data-list="${i}">
                        <div class="rank hot" data-id="${this.data[i].id}" data-list="${i}">0${i + 1}</div>
                        <div class="song" data-id="${this.data[i].id}" data-list="${i}">
                            <div class="song-desc" data-id="${this.data[i].id}" data-list="${i}">
                            <div class="song-name" data-id="${this.data[i].id}" data-list="${i}">${this.data[i].name}</div>
                            <div class="song-author" data-id="${this.data[i].id}" data-list="${i}"><i data-id="${this.data[i].id}"></i>${this.data[i].song.artists[0].name}</div>
                        </div>
                        <div class="song-play-btn" data-id="${this.data[i].id}" data-list="${i}">
                            <span data-id="${this.data[i].id}" data-list="${i}"></span>
                        </div>
                        </div>
                    </div>`
            } else if (i < 9) {
                $listSongEL +=
                    `<div class="list-song" data-id="${this.data[i].id}" data-list="${i}">
                        <div class="rank" data-id="${this.data[i].id}" data-list="${i}">0${i + 1}</div>
                        <div class="song" data-id="${this.data[i].id}" data-list="${i}">
                        <div class="song-desc" data-id="${this.data[i].id}" data-list="${i}">
                            <div class="song-name" data-id="${this.data[i].id}" data-list="${i}">${this.data[i].name}</div>
                            <div class="song-author" data-id="${this.data[i].id}" data-list="${i}"><i data-id="${this.data[i].id}" data-list="${i}"></i>${this.data[i].song.artists[0].name}</div>
                        </div>
                        <div class="song-play-btn" data-id="${this.data[i].id}" data-list="${i}">
                            <span data-id="${this.data[i].id}" data-list="${i}"></span>
                        </div>
                        </div>
                    </div>`
            } else {
                $listSongEL +=
                    `<div class="list-song" data-id="${this.data[i].id}" data-list="${i}">
                        <div class="rank" data-id="${this.data[i].id}" data-list="${i}">${i + 1}</div>
                        <div class="song" data-id="${this.data[i].id}" data-list="${i}">
                        <div class="song-desc" data-id="${this.data[i].id}" data-list="${i}">
                            <div class="song-name" data-id="${this.data[i].id}" data-list="${i}">${this.data[i].name}</div>
                            <div class="song-author" data-id="${this.data[i].id}" data-list="${i}"><i data-id="${this.data[i].id}" data-list="${i}"></i>${this.data[i].song.artists[0].name}</div>
                        </div>
                        <div class="song-play-btn" data-id="${this.data[i].id}" data-list="${i}">
                            <span data-id="${this.data[i].id}" data-list="${i}"></span>
                        </div>
                        </div>
                    </div>`
            }
            this.$el.append($listSongEL);
        }
    }

    // 榜单歌曲点击
    newsongsListClick() {
        let songLryicList = document.querySelector(".song-lryic-list");
        songLryicList.style.transform = "translateY(250px)";
        this.songLryicList.text("");
        this.$audio.text("");
        this.$newsongsList.on("click", this.$listSong, (e) => {
            this.songId = e.target.dataset.id;
            this.songListId = e.target.dataset.list;
            this.getLyricFromServer(this.songId);
            this.getAudioFromServer(this.songId);
            this.audiorefresh.load();
            this.$wangyYiNewSongs.css("display", "none");
            this.$songPlay.css("display", "block");
            this.songPlayName.text(this.songnameArr[this.songListId])
        })
    }

    // 榜单歌曲点击播放
    songPlyaRender(lryic) {
        let songLryicList = document.querySelector(".song-lryic-list");
        songLryicList.style.transform = "translateY(250px)";
        this.songTimeArr = [];
        this.lryicArr = [];
        this.songLryicArr = [];
        let lrcReg = /^\[(\d+):(\d+\.\d+)\]([\S ]*)$/mg
        while (lrcReg.test(lryic)) {
            this.lryicArr.push({
                time: `${RegExp.$1 * 60 + Math.floor(RegExp.$2 * 10) / 10}`,
                lrc: `${RegExp.$3}`
            })
        }
        for (let i = 0; i < this.lryicArr.length; i++) {
            this.songTimeArr = [...this.songTimeArr, this.lryicArr[i].time];
            this.songLryicArr = [...this.songLryicArr, this.lryicArr[i].lrc];
            let $songLryic = `<p data-num=${i + 1} data-time=${this.lryicArr[i].time}>${this.lryicArr[i].lrc.trim()}</p>`
            this.songLryicList.append($songLryic);
        }
        this.songLryRoll(this.songTimeArr);
    }

    // 从正在播放的歌曲返回到新歌榜单
    returnBtn() {
        this.$return.on("click", () => {
            let songLryicList = document.querySelector(".song-lryic-list");
            songLryicList.style.transform = "translateY(250px)";
            this.songLryicList.text("");
            this.$audio.text("");
            this.$wangyYiNewSongs.css("display", "block");
            this.$songPlay.css("display", "none");
            this.audiorefresh.load();
        })
    }

    // 歌词滚动高亮
    songLryRoll(songTimeArr) {
        let songLryicList = document.querySelector(".song-lryic-list");
        songLryicList.style.transform = "translateY(250px)";
        this.currentTimeArr = [];
        let audio = document.querySelector(".audio");
        let $lryic = $(".song-lryic-list p");
        this.audiorefresh.ontimeupdate = () => {
            let currentTime = audio.currentTime;
            for (let i = 0; i < songTimeArr.length; i++) {
                if (currentTime >= songTimeArr[songTimeArr.length - 1]) {
                    this.tranSlateY = 250 - (this.hight * (songTimeArr.length - 1));
                    $lryic.eq(i).addClass("active").siblings().removeClass("active");
                    this.songLryicList.css("transform", `translateY(${this.tranSlateY}px)`);
                } else if (currentTime >= songTimeArr[i] && currentTime < songTimeArr[i + 1]) {
                    this.tranSlateY = 250 - (this.hight * i);
                    $lryic.eq(i).addClass("active").siblings().removeClass("active");
                    this.songLryicList.css("transform", `translateY(${this.tranSlateY}px)`);
                }
            }
        }
    }



    // 获取新歌
    async getDataFromServer() {
        let url = `https://apis.netstart.cn/music/personalized/newsong`;
        let { data } = await axios.get(url);
        this.data = data.result
        this.newsongsRender(this.data);
    }

    // 获取歌曲歌词
    async getLyricFromServer(songId) {
        let url = ` https://apis.netstart.cn/music/lyric?id=${songId}`;
        let { data } = await axios.get(url);
        this.lryic = data.lrc.lyric
        this.songPlyaRender(this.lryic)
    }

    // 获取歌曲音频
    async getAudioFromServer(songId) {
        this.$audio.text("");
        let audio = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
        let source = `<source  src="${audio}" type="audio/mp3"></source>`
        this.$audio.append(source);
        this.audiorefresh.load();
    }
}
