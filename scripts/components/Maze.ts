import GlowFilter from '../filters/GlowFilter';
import AMaze from '../Game';
import CollisionManager from '../components/CollisionManager'; 

interface Dimensions {
	x: number,
	y: number
};

export default class Maze extends Phaser.Group {
	private _rnd: Phaser.RandomDataGenerator;
	private _grid: Dimensions;
	private _cell: Dimensions;
	private _wallThickness: number;

	constructor(game: Phaser.Game, options: any = {}) {
        // We want to create physics body after we've painted in the graphics to match dimensions.
        // Pass enableBody == false and enable physics explicitly after creation
		super(game, game.world, 'walls', false, false, Phaser.Physics.P2JS);
		//this.enableBodyDebug = true;
		this.classType = Phaser.Graphics;
		
		this._rnd = game.rnd;
		
		let mazeColor = options.mazeColor || 0x007fff;
		let wallThickness = options.wallThickness || 10;
		let minCellWidth = options.minCellWidth || 200;

		this.filters = [new GlowFilter(game, game.width, game.height, 15, 2, 1, mazeColor, .1)];
		this.filterArea = new PIXI.Rectangle(0, 0, game.width, game.height);
		
        // Offset a wall thikness to make space for overlap (described below) at the leftmost/bottom sides
        let mazeWidth = game.width - wallThickness;;
        let mazeHeight = game.height - wallThickness;
        this._grid = {
            x: Math.ceil(mazeWidth / minCellWidth),
            y: Math.ceil(mazeHeight / minCellWidth)
        };

        this._cell = {
            x: mazeWidth / this._grid.x,
            y: mazeHeight / this._grid.y
        };
		
		this._wallThickness = wallThickness;

		this.addWalls({
			x: 0,
			y: 0,
			width: this._grid.x,
			height: this._grid.y
		});

		this.setAll('body.static', true);
        // TODO: use some IoC
        let collisions: CollisionManager = (<any>game.state.getCurrentState()).collisions;
        collisions.reset(this);
	}
	
    _addRectangle(x, y, width, height): Phaser.Graphics {
        let radius = 4;
        let wall: Phaser.Graphics = this.create(0, 0);

        // PIXI.PolyK can't triangulate some of the rounded rectangles - fallback to simple ones
        // Note: copy/paste from PIXI.WebGLGraphics.buildRoundedRectangle
        let recPoints = [];
        recPoints.push(x, y + radius);
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));
        let triangles = PIXI.PolyK.Triangulate(recPoints);

        // We draw black walls with mazeColor glow in order to make glowing edges insted of solid walls
        wall.beginFill(0);
        if (triangles) {
            wall.drawRoundedRect(x, y, width, height, radius);
        } else {
            wall.drawRect(x, y, width, height);
        }
        wall.endFill();

        return wall;
    }

    addWall(x, y, length, isHorizontal) {
		const wallThickness = this._wallThickness;
		
        let rect = {
            x: x * this._cell.x,
            y: y * this._cell.y,
            // Make perpendicular walls overlap in order to make junctions prettier
            width: isHorizontal ? length * this._cell.x + wallThickness : wallThickness,
            height: isHorizontal ? wallThickness : length * this._cell.y + wallThickness
        };

        // P2 bodies are relative to their center of mass
        // draw rectangle around (0, 0) in order to align with physics
        let wall = this._addRectangle(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
        this.game.physics.enable(wall, this.physicsBodyType, this.enableBodyDebug);
        wall.reset(rect.x + rect.width / 2, rect.y + rect.height / 2);
    }

    addWalls(area) {
        if (area.width <= 1 || area.height <= 1) {
            return;
        }

        let isHorizontal;
        if (area.width > area.height) {
            isHorizontal = false;
        } else if (area.width < area.height) {
            isHorizontal = true;
        } else {
            isHorizontal = this._rnd.pick([true, false]);
        }

        if (isHorizontal) {
            // Do not try to add walls on the outside of the area
            let pivot = this._rnd.integerInRange(area.y + 1, area.y + area.height - 1);
            let totalLength = area.width;

            let numberOfHoles = this._rnd.integerInRange(1, totalLength / 2);
            let holes = [totalLength];
            for (let i = 0; i < numberOfHoles; i++) {
                holes.push(this._rnd.integerInRange(0, totalLength - 1));
            }

            let current = 0;
            holes = holes.sort((l, r) => l - r);
            holes.forEach(hole => {
                let length = hole - current;
                if (length > 0 && current < totalLength) {
                    this.addWall(area.x + current, pivot, length, isHorizontal);
                }
                current = hole + 1;
            });

            this.addWalls({
                x: area.x,
                y: area.y,
                width: area.width,
                height: pivot - area.y
            });
            this.addWalls({
                x: area.x,
                y: pivot,
                width: area.width,
                height: area.height - (pivot - area.y)
            });
        } else {
            // Do not try to add walls on the outside of the area
            let pivot = this._rnd.integerInRange(area.x + 1, area.x + area.width - 1);
            let totalLength = area.height;

            let numberOfHoles = this._rnd.integerInRange(1, totalLength / 2);
            let holes = [totalLength];
            for (let i = 0; i < numberOfHoles; i++) {
                holes.push(this._rnd.integerInRange(0, totalLength - 1));
            }

            let current = 0;
            holes = holes.sort((l, r) => l - r);
            holes.forEach(hole => {
                let length = hole - current;
                if (length > 0 && current < totalLength) {
                    this.addWall(pivot, area.y + current, length, isHorizontal);
                }
                current = hole + 1;
            });

            this.addWalls({
                x: area.x,
                y: area.y,
                width: pivot - area.x,
                height: area.height
            });
            this.addWalls({
                x: pivot,
                y: area.y,
                width: area.width - (pivot - area.x),
                height: area.height
            });
        }
    }
};
