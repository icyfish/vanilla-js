var PIXEL_SIZE = 5;
var BOARD_SIZE = 60;

function SnakePiece($container, tail) {
  this.x = 0;
  this.y = 0;
  this.vx = 1;
  this.vy = 0;
  this.tail = tail;

  this.$container = $container;

  this.$snake = $("<div class='snake-piece'/>");
  this.$snake.appendTo($container);

}
SnakePiece.prototype = {
    _move: function(x, y){
      // move the tail to where this piece was
      if(this.tail) {
        this.tail._move(this.x, this.y);
      }

      // set new position
      this.x = x;
      this.y = y;

      // move the pixel on the screen
      this.$snake.css({
        left: this.x * PIXEL_SIZE,
        top: this.y * PIXEL_SIZE
      });
    },

  update: function() {

      // find new position based on current velocity
      var x = this.x + this.vx;
      var y = this.y + this.vy;

      // keep within the board bounds
      if(x < 0) x = 0;
      if(y < 0) y = 0;
      if(x >= BOARD_SIZE) x = BOARD_SIZE - 1;
      if(y >= BOARD_SIZE) y = BOARD_SIZE - 1;

      this._move(x, y);
    },

    setDirection: function(vx, vy) {
      this.vx = vx;
      this.vy = vy;
    },

    // make the snake longer by one unit by adding a piece just after this one
    extend: function(){
      var oldTail = this.tail;
      this.tail = new SnakePiece(this.$container, oldTail);
    }

  };
