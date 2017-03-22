var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.spritesheet('playerSheet', '/src/assets/spritesheet.png', 72, 97, 11);
        this.game.stage.backgroundColor = '#124184';
    };
    SimpleGame.prototype.create = function () {
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.bounds.bottom - 150, 'playerSheet');
        var walk = this.player.animations.add('walk');
        this.player.animations.play('walk', 13, true);
        this.player.body.collideWorldBounds = true;
    };
    SimpleGame.prototype.update = function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.x += 5;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.x -= 5;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player.y -= 15;
        }
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map