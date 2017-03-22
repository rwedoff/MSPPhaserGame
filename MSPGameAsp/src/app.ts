class SimpleGame {


    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);
    }

    

    preload() {
      
        
        this.game.stage.backgroundColor = '#124184';
       
     
        
    }

    create() {
        
     
        
    } 

   
    update() {
   
    }
     
}



window.onload = () => {
    var game = new SimpleGame();
};