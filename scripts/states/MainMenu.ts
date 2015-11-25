export default class Boot extends Phaser.State {
	preload() {
	}
	
	create() {
		this.game.state.start('Arena', true, false);
	}
};
