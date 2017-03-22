var SimpleGame = (function () {
    function SimpleGame() {
        this.self = this;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('slime', '/src/assets/slimeWalk1.png');
        this.game.load.image('poker', '/src/assets/pokerMad.png');
        this.game.load.image('fly', '/src/assets/flyFly1.png');
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
        this.enemy = this.game.add.sprite(this.game.world.bounds.right, this.game.world.bounds.bottom, 'slime');
        this.enemy.y = this.game.world.bottom - this.enemy.height - 100;
        var poker = this.game.add.sprite(this.game.world.bounds.right, this.game.world.bounds.bottom, 'poker');
        this.fly = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'fly');
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.spikes, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.fly, Phaser.Physics.ARCADE);
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        this.enemySpeed = 3;
        this.tempTotal = 0;
        this.fly.body.allowGravity = false;
        this.player.body.collideWorldBounds = true;
        this.floor.body.immoveable = true;
        this.floor.body.allowGravity = false;
        this.floor.body.collideWorldBounds = true;
        this.spikes.body.immoveable = true;
        this.spikes.body.allowGravity = false;
        this.enemies = [this.enemy, poker];
    };
    SimpleGame.prototype.spawnEnemy = function () {
        var rand = Math.floor(Math.random() * (this.enemies.length));
        var enemy = this.enemies[rand];
        var enemySprite = this.game.add.sprite(this.game.world.right, this.game.world.centerY + 50, enemy.key);
        this.game.physics.enable(enemySprite, Phaser.Physics.ARCADE);
        return enemySprite;
    };
    SimpleGame.prototype.spawnFly = function () {
        var rand = Math.random() * (this.game.world.bounds.bottom - 300);
        var fly = this.game.add.sprite(this.game.world.left, rand, 'fly');
        this.game.physics.enable(fly, Phaser.Physics.ARCADE);
        fly.body.allowGravity = false;
        return fly;
    };
    SimpleGame.prototype.update = function () {
        this.game.physics.arcade.collide(this.floor, this.player);
        this.game.physics.arcade.collide(this.floor, this.enemy);
        this.game.physics.arcade.collide(this.spikes, this.player, this.loseEvent, this.loseEvent, this);
        this.game.physics.arcade.collide(this.enemy, this.player, this.loseEvent, this.loseEvent, this);
        this.game.physics.arcade.collide(this.fly, this.player, this.loseEvent, this.loseEvent, this);
        if (this.firstPlay == true) {
            this.enemySpeed = 0;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.x += 5;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.x -= 5;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.player.y -= 15;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        }
        if (this.enemy.body.right < 0) {
            this.enemy = this.spawnEnemy();
        }
        if (this.fly.body.left > this.game.world.bounds.right) {
            this.fly = this.spawnFly();
        }
        this.fly.x += this.enemySpeed + 1;
        this.enemy.x -= this.enemySpeed;
    };
    SimpleGame.prototype.loseEvent = function (self) {
        this.enemySpeed = 0;
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map