export default class Boot extends Phaser.State {
	preload() {
	}
	
	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.game.state.start('Preloader', true, false);
	}
};
