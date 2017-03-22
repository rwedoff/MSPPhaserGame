var SimpleGame = (function () {
    function SimpleGame() {
        this.self = this;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('tile', '/src/assets/stoneMid.png');
        this.game.load.image('spikes', '/src/assets/spikes.png');
        this.game.load.spritesheet('playerSheet', '/src/assets/spritesheet.png', 72, 97, 11);
        this.game.stage.backgroundColor = '#124184';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;
    };
    SimpleGame.prototype.create = function () {
        this.floor = this.game.add.tileSprite(0, this.game.world.bounds.bottom - 50, this.game.world.bounds.right, 50, 'tile');
        this.spikes = this.game.add.tileSprite(0, 0, this.game.world.bounds.right, 50, 'spikes');
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.bounds.bottom - 150, 'playerSheet');
        var walk = this.player.animations.add('walk');
        this.player.animations.play('walk', 13, true);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.spikes, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.floor.body.immoveable = true;
        this.floor.body.allowGravity = false;
        this.floor.body.collideWorldBounds = true;
        this.spikes.body.immoveable = true;
        this.spikes.body.allowGravity = false;
    };
    SimpleGame.prototype.update = function () {
        this.game.physics.arcade.collide(this.floor, this.player);
        this.game.physics.arcade.collide(this.spikes, this.player, this.loseEvent, this.loseEvent, this);
        this.game.physics.arcade.collide(this.enemy, this.player, this.loseEvent, this.loseEvent, this);
        this.game.physics.arcade.collide(this.fly, this.player, this.loseEvent, this.loseEvent, this);
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
    SimpleGame.prototype.loseEvent = function (self) {
        this.loseText.text = "You lose\nPress Space to Play Again";
        this.timer.running = false;
        this.enemySpeed = 0;
        if (this.total >= this.highScore) {
            this.highScore = this.total;
        }
    };
    SimpleGame.prototype.resetGame = function () {
        this.enemySpeed = 3;
        this.enemy.x = this.game.world.bounds.right;
        this.enemy.y = this.game.world.centerY;
        this.timer.running = true;
        this.total = 0;
        this.tempTotal = 0;
        this.loseText.text = "";
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map