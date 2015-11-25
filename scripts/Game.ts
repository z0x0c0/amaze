// Phaser is included separately into a global scope - can't make it (and PIXI) load through webpack 

import Boot from './states/Boot';
import Preloader from './states/Preloader';
import MainMenu from './states/MainMenu';
import Arena from './states/Arena';

export default class AMaze extends Phaser.Game {
	static game: AMaze;

	constructor() {
		super('100%', '100%', Phaser.AUTO, 'content');

		this.state.add('Boot', Boot, false);
		this.state.add('Preloader', Preloader, false);
		this.state.add('MainMenu', MainMenu, false);
		this.state.add('Arena', Arena, false);

		//this.time.slowMotion = 10;
		this.state.start('Boot');
	}
	
	quitGame() {
		this.state.start('MainMenu');
	}
};

AMaze.game = new AMaze();
