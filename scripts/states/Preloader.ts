export default class Preloader extends Phaser.State {
	preload() {
		this.load.image('player', 'assets/car.png');
		this.load.image('bullet', 'assets/carrot.png');
		this.load.image('trail', 'assets/bubble.png');
	}
	
	create() {
		this.game.state.start('MainMenu', true, false);
	}
};
