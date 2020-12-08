
(function() {
    function Sprite(url, pos, size) {
        this.pos = pos;
        this.size = size;
        this.url = url;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];

               
            }
            else {
                frame = 0;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();