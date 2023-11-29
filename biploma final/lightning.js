
document.addEventListener("DOMContentLoaded", function () {
    if (isCanvasSupported()) {
        var c = document.getElementById('canvas');
        var cw = c.width = window.innerWidth;
        var ch = c.height = window.innerHeight;
        var cl = new canvasLightning(c, cw, ch);

        setupRAF();
        cl.init();
    }
});
const canvasLightning = function (c, cw, ch) {
    var _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cw = cw;
    this.ch = ch;
    this.mx = 0;
    this.my = 0;
    this.lightning = [];
    this.lightTimeCurrent = 0;
    this.lightTimeTotal = 50;

    this.rand = function (rMi, rMa) { return ~~((Math.random() * (rMa - rMi + 1)) + rMi); };
    this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) { return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1); };

    this.init = function () {
        this.createL(this.cw / 2, this.ch / 2, true);
        this.loop();
    };

    this.createL = function (x, y, canSpawn) {
        this.lightning.push({
            x: x,
            y: y,
            xRange: this.rand(5, 30),
            yRange: this.rand(5, 25),
            path: [{
                x: x,
                y: y
            }],
            pathLimit: this.rand(10, 35),
            canSpawn: canSpawn,
            hasFired: false
        });
    };

    this.updateL = function () {
        var i = this.lightning.length;
        while (i--) {
            var light = this.lightning[i];
            light.path.push({
                x: light.path[light.path.length - 1].x + (this.rand(0, light.xRange) - (light.xRange / 2)),
                y: light.path[light.path.length - 1].y + (this.rand(0, light.yRange))
            });
            if (light.path.length > light.pathLimit) {
                this.lightning.splice(i, 1)
            }
            light.hasFired = true;
        };
    };

    this.renderL = function () {
        var i = this.lightning.length;
        while (i--) {
            var light = this.lightning[i];
            this.ctx.strokeStyle = 'hsla(0, 100%, 100%, ' + this.rand(10, 100) / 100 + ')';
        }

        this.ctx.stroke();
    }
};



this.clearCanvas = function () {
this.ctx.clearRect(0, 0, this.cw, this.ch);
};