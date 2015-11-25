import {IControls} from './Controls';
import CollisionManager from '../components/CollisionManager';

export default class Player extends Phaser.Sprite {
	private static _bullets: Phaser.Group;
	private static _bulletsCollisionGroup: Phaser.Physics.P2.CollisionGroup;
	
	private _controls: IControls;
    private _trail: Phaser.Particles.Arcade.Emitter;
	private _nextFire: number;
	private _fireRate: number;
	
	constructor(game: Phaser.Game, options: any) {
        let image = game.make.image(0, 0, 'player');
        let bitmap = game.make.bitmapData(image.width, image.height);
        bitmap.copy(image).update().shiftHSL(options.hueShift, 0, 0);

		super(game, game.world.randomX, game.world.randomY, bitmap);
        this.anchor.setTo(0.5, 0.5);

        game.physics.p2.enable(this);
        this.body.damping = .8;
        this.body.collideWorldBounds = true;

		this._controls = options.controls;
		
		this._nextFire = 0;
		this._fireRate = 300;
		
		this.ensureBulletsCreated();
		
		this.body.onBeginContact.add((other, other2, thisShape, otherShape) => {
            if (otherShape.collisionGroup & Player._bulletsCollisionGroup.mask) {
                this.die();
            }
        });
		
        this._trail = game.add.emitter(0, 0, 100);
        this._trail.makeParticles('trail');
        this._trail.setRotation(0, 0);
        this._trail.gravity = 0;
        this._trail.setAlpha(0.1, 1, 1000);
        this._trail.setScale(0.1, .2, 0.1, 0.2, 2000, Phaser.Easing.Quintic.Out);
	}
	
	private ensureBulletsCreated() {
		if (!Player._bullets) {
			Player._bullets = this.game.add.group(this.game.world, 'bullets', false, true, Phaser.Physics.P2JS);
			//Player._bullets.enableBodyDebug = true;
			Player._bullets.createMultiple(50, 'bullet', 0, false);
			Player._bullets.setAll('collideWorldBounds', true);

			// TODO: use some IoC
			let collisions: CollisionManager = (<any>this.game.state.getCurrentState()).collisions;
			collisions.reset(Player._bullets);

			Player._bulletsCollisionGroup = collisions.find(Player._bullets).group;
		}
	}
	
	turnLeft() {
		this.body.rotateLeft(100);
	}
	
	turnRight() {
		this.body.rotateRight(100);
	}
	
	stopRotation() {
		this.body.setZeroRotation();
	}
	
	forward() {
		this.body.thrust(400);
		this.trail();
	}
	
	backward() {
		this.body.reverse(400);
	}
	
    die() {
        this.reset(this.game.world.randomX, this.game.world.randomY);
    }

    trail() {
        let trailOffset = 20;
        let maxParticleSpeed = 100;

        let trailDirection = this.body.rotation + Math.PI / 2;
        let normal = {
            x: Math.cos(trailDirection),
            y: Math.sin(trailDirection)
        };

        let clampSpeed = speed => this.game.math.clamp(speed, -maxParticleSpeed, maxParticleSpeed);
        
        this._trail.minParticleSpeed.setTo(clampSpeed((normal.x - 1) * maxParticleSpeed), clampSpeed((normal.y - 1) * maxParticleSpeed));
        this._trail.maxParticleSpeed.setTo(clampSpeed((normal.x + 1) * maxParticleSpeed), clampSpeed((normal.y + 1) * maxParticleSpeed));

        this._trail.emitX = this.body.x + normal.x * trailOffset;
        this._trail.emitY = this.body.y + normal.y * trailOffset;

        if (!this._trail.on) {
            this._trail.flow(1500, 8, 1, 20);
        }
    }
	
    fire() {
        if (this.game.time.now > this._nextFire && Player._bullets.countDead() > 0) {
            this._nextFire = this.game.time.now + this._fireRate;

            let bullet: Phaser.Sprite = Player._bullets.getFirstExists(false);
            bullet.lifespan = 5000;

            let body: Phaser.Physics.P2.Body = bullet.body;

            let bulletSpeed = 500;
            let bulletOffset = 32;
            let bulletDirection = this.body.rotation - Math.PI / 2;

            let normal = {
                x: Math.cos(bulletDirection),
                y: Math.sin(bulletDirection)
            };

            let bounds = this.game.world.bounds;
            let position = {
                x: this.game.math.clamp(this.body.x + normal.x * bulletOffset, bounds.x, bounds.x + bounds.width),
                y: this.game.math.clamp(this.body.y + normal.y * bulletOffset, bounds.y, bounds.y + bounds.height)
            };

            bullet.reset(position.x, position.y);
            body.rotation = this.body.rotation;

            body.velocity.x = normal.x * bulletSpeed;
            body.velocity.y = normal.y * bulletSpeed;
        }
    }
	
	get physicalPosition(): Phaser.Point {
		//return this._sprite.position;
		return new Phaser.Point(this.body.x, this.body.y);
	}
	
	update() {
		this._controls.process(this);
	}
};
