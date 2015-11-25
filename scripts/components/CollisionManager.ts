interface CollisionInformation {
	group: Phaser.Physics.P2.CollisionGroup,
	collidesTo: Phaser.Physics.P2.CollisionGroup[]
};

export default class CollisionManager {
	private _groups: {
		[index: string]: CollisionInformation
	}
	
	constructor(game:Phaser.Game, config: Object) {
		this._groups = {};
		let groupNames = Object.keys(config);

		groupNames.forEach(name => {
			this._groups[name] = {
				group: game.physics.p2.createCollisionGroup(),
				collidesTo: []
			};
		});

		groupNames.forEach(name => {
			this._groups[name].collidesTo = config[name].map(otherName => this._groups[otherName].group)
		});
	}

	find(group: Phaser.Group | string): CollisionInformation {
		let name = typeof group === 'string' ? group : group.name;
		return this._groups[name];
	}
	
	reset(group: Phaser.Group) {
		let info = this.find(group);
		group.callAll('body.setCollisionGroup', 'body', info.group);
		group.callAll('body.collides', 'body', info.collidesTo);
	}
};
