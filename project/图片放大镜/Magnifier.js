function Magnifier(image, readyEl) {
    this.container = null;
    this.small = null;
    this.m = null;
    this.smallImg = null;
    this.image = image;
    this.bigImg = null;
    this.fangdajing= null;
    this.init = function () {
        this.container = document.createElement("div");
        this.container.className = "container";

        this.small = document.createElement("div");
        this.smallImg = document.createElement("img");;
        this.m = document.createElement("div");
        this.fangdajing = document.createElement("div");

        this.small.className = "small";
        this.smallImg.className = "smallImg";
        this.m.className = "m";
        this.fangdajing.className = "fangdajing";

        this.small.appendChild(this.smallImg);
        this.small.appendChild(this.m);
        this.small.appendChild(this.fangdajing);

        this. big = document.createElement("div");
        this. bigImg = document.createElement("img");;

        this.big.className = "big";
        this.bigImg.className = "bigImg";

        this.big.appendChild(this.bigImg);

        this.container.appendChild(this.small);
        this.container.appendChild(this.big);

        this.smallImg.src = this.bigImg.src = this.image;

        readyEl.appendChild(this.container)

        var that = this;

        this.small.onmousemove = function (e) {

            var x = e.offsetX
            var y = e.offsetY

            that.fangdajing.style.display = 'block';
            that.big.style.display = 'block';

            that.fangdajing.style.left = parseInt(x - that.fangdajing.offsetWidth / 2) + "px";

            that.fangdajing.style.top = parseInt(y - that.fangdajing.offsetHeight / 2) + "px";

            that.fangdajing.style.left = parseInt(that.fangdajing.style.left) < 0 ? 0 : that.fangdajing.style.left;

            that.fangdajing.style.left = parseInt(that.fangdajing.style.left) > (that.small.offsetWidth - that.fangdajing.offsetWidth) ? (that.small.offsetWidth - that.fangdajing.offsetWidth) + "px" : that.fangdajing.style.left;

            that.fangdajing.style.top = parseInt(that.fangdajing.style.top) < 0 ? 0 : that.fangdajing.style.top;

            that.fangdajing.style.top = parseInt(that.fangdajing.style.top) > (that.small.offsetHeight - that.fangdajing.offsetHeight) ? (that.small.offsetHeight - that.fangdajing.offsetHeight) + "px" : that.fangdajing.style.top;

            that.bigImg.style.left = -3 * parseInt(that.fangdajing.style.left) + "px";

            that.bigImg.style.top = -3 * parseInt(that.fangdajing.style.top) + "px";
        }

        this.small.onmouseout = function () {
            that.fangdajing.style.display = 'none';
            that.big.style.display = 'none';
        }

    }

    this.init();
}