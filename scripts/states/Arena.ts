import UnderseaFilter from '../filters/UnderseaFilter';
import Player from '../components/Player';
import * as Controls from '../components/Controls';
import Maze from '../components/Maze';
import CollisionManager from '../components/CollisionManager';

export default class Arena extends Phaser.State {
	private _bgFilter: Phaser.Filter;
	private _players: Phaser.Group;
	private _maze: Maze;
	
	public collisions: CollisionManager;
	
	preload() {
	}
	
	create() {
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.p2.restitution = 0.8;
		this.game.physics.p2.updateBoundsCollisionGroup();

		this.collisions = new CollisionManager(this.game, {
			'players': ['players', 'bullets', 'walls'],
			'bullets': ['players', 'bullets', 'walls'],
			'walls': ['players', 'bullets']
		});

		this._bgFilter = new UnderseaFilter(this.game);
		this._bgFilter.addToWorld(0, 0, this.game.width, this.game.height);
		
		let playerOptions = [
			{
				hueShift: 0,
				controls: new Controls.Keyboard(this.game, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.CONTROL)
			},
			{
				hueShift: 0.33,
				controls: new Controls.Keyboard(this.game, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR)
			},
			{
				hueShift: 0.66,
				controls: new Controls.Mouse(this.game)
			}
		];

		this._players = this.game.add.group(this.game.world, 'players', false, true, Phaser.Physics.P2JS);
		playerOptions.forEach(options => this._players.add(new Player(this.game, options)));
		this.collisions.reset(this._players);
		
		this._maze = new Maze(this.game);
	}
	
	update() {
		this._bgFilter.update();
		this._players.forEach(player => player.update(), this);
	}
};
