/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Phaser is included separately into a global scope - can't make it (and PIXI) load through webpack 
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot_1 = __webpack_require__(1);
	var Preloader_1 = __webpack_require__(2);
	var MainMenu_1 = __webpack_require__(3);
	var Arena_1 = __webpack_require__(4);
	var AMaze = (function (_super) {
	    __extends(AMaze, _super);
	    function AMaze() {
	        _super.call(this, '100%', '100%', Phaser.AUTO, 'content');
	        this.state.add('Boot', Boot_1.default, false);
	        this.state.add('Preloader', Preloader_1.default, false);
	        this.state.add('MainMenu', MainMenu_1.default, false);
	        this.state.add('Arena', Arena_1.default, false);
	        //this.time.slowMotion = 10;
	        this.state.start('Boot');
	    }
	    AMaze.prototype.quitGame = function () {
	        this.state.start('MainMenu');
	    };
	    return AMaze;
	})(Phaser.Game);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AMaze;
	;
	AMaze.game = new AMaze();


/***/ },
/* 1 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot = (function (_super) {
	    __extends(Boot, _super);
	    function Boot() {
	        _super.apply(this, arguments);
	    }
	    Boot.prototype.preload = function () {
	    };
	    Boot.prototype.create = function () {
	        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	        this.game.state.start('Preloader', true, false);
	    };
	    return Boot;
	})(Phaser.State);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Boot;
	;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Preloader = (function (_super) {
	    __extends(Preloader, _super);
	    function Preloader() {
	        _super.apply(this, arguments);
	    }
	    Preloader.prototype.preload = function () {
	        this.load.image('player', 'assets/car.png');
	        this.load.image('bullet', 'assets/carrot.png');
	        this.load.image('trail', 'assets/bubble.png');
	    };
	    Preloader.prototype.create = function () {
	        this.game.state.start('MainMenu', true, false);
	    };
	    return Preloader;
	})(Phaser.State);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Preloader;
	;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Boot = (function (_super) {
	    __extends(Boot, _super);
	    function Boot() {
	        _super.apply(this, arguments);
	    }
	    Boot.prototype.preload = function () {
	    };
	    Boot.prototype.create = function () {
	        this.game.state.start('Arena', true, false);
	    };
	    return Boot;
	})(Phaser.State);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Boot;
	;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var UnderseaFilter_1 = __webpack_require__(5);
	var Player_1 = __webpack_require__(6);
	var Controls = __webpack_require__(7);
	var Maze_1 = __webpack_require__(8);
	var CollisionManager_1 = __webpack_require__(10);
	var Arena = (function (_super) {
	    __extends(Arena, _super);
	    function Arena() {
	        _super.apply(this, arguments);
	    }
	    Arena.prototype.preload = function () {
	    };
	    Arena.prototype.create = function () {
	        var _this = this;
	        this.game.physics.startSystem(Phaser.Physics.P2JS);
	        this.game.physics.p2.restitution = 0.8;
	        this.game.physics.p2.updateBoundsCollisionGroup();
	        this.collisions = new CollisionManager_1.default(this.game, {
	            'players': ['players', 'bullets', 'walls'],
	            'bullets': ['players', 'bullets', 'walls'],
	            'walls': ['players', 'bullets']
	        });
	        this._bgFilter = new UnderseaFilter_1.default(this.game);
	        this._bgFilter.addToWorld(0, 0, this.game.width, this.game.height);
	        var playerOptions = [
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
	        playerOptions.forEach(function (options) { return _this._players.add(new Player_1.default(_this.game, options)); });
	        this.collisions.reset(this._players);
	        this._maze = new Maze_1.default(this.game);
	    };
	    Arena.prototype.update = function () {
	        this._bgFilter.update();
	        this._players.forEach(function (player) { return player.update(); }, this);
	    };
	    return Arena;
	})(Phaser.State);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Arena;
	;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var UnderseaFilter = (function (_super) {
	    __extends(UnderseaFilter, _super);
	    function UnderseaFilter(game) {
	        var fragmentSrc = "\n            precision mediump float;\n\n            uniform float     time;\n            uniform vec2      resolution;\n            uniform vec2      mouse;\n\n            #define MAX_ITER 4\n\n            void main( void )\n            {\n                vec2 v_texCoord = gl_FragCoord.xy / resolution;\n\n                vec2 p =  v_texCoord * 8.0 - vec2(20.0);\n                vec2 i = p;\n                float c = 1.0;\n                float inten = .05;\n\n                for (int n = 0; n < MAX_ITER; n++)\n                {\n                    float t = time * (1.0 - (3.0 / float(n+1)));\n\n                    i = p + vec2(cos(t - i.x) + sin(t + i.y),\n                    sin(t - i.y) + cos(t + i.x));\n\n                    c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),\n                    p.y / (cos(i.y+t)/inten)));\n                }\n\n                c /= float(MAX_ITER);\n                c = 1.5 - sqrt(c);\n\n                vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);\n\n                texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));\n\n                gl_FragColor = texColor;\n            }";
	        _super.call(this, game, null, fragmentSrc);
	    }
	    return UnderseaFilter;
	})(Phaser.Filter);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = UnderseaFilter;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Player = (function (_super) {
	    __extends(Player, _super);
	    function Player(game, options) {
	        var _this = this;
	        var image = game.make.image(0, 0, 'player');
	        var bitmap = game.make.bitmapData(image.width, image.height);
	        bitmap.copy(image).update().shiftHSL(options.hueShift, 0, 0);
	        _super.call(this, game, game.world.randomX, game.world.randomY, bitmap);
	        this.anchor.setTo(0.5, 0.5);
	        game.physics.p2.enable(this);
	        this.body.damping = .8;
	        this.body.collideWorldBounds = true;
	        this._controls = options.controls;
	        this._nextFire = 0;
	        this._fireRate = 300;
	        this.ensureBulletsCreated();
	        this.body.onBeginContact.add(function (other, other2, thisShape, otherShape) {
	            if (otherShape.collisionGroup & Player._bulletsCollisionGroup.mask) {
	                _this.die();
	            }
	        });
	        this._trail = game.add.emitter(0, 0, 100);
	        this._trail.makeParticles('trail');
	        this._trail.setRotation(0, 0);
	        this._trail.gravity = 0;
	        this._trail.setAlpha(0.1, 1, 1000);
	        this._trail.setScale(0.1, .2, 0.1, 0.2, 2000, Phaser.Easing.Quintic.Out);
	    }
	    Player.prototype.ensureBulletsCreated = function () {
	        if (!Player._bullets) {
	            Player._bullets = this.game.add.group(this.game.world, 'bullets', false, true, Phaser.Physics.P2JS);
	            //Player._bullets.enableBodyDebug = true;
	            Player._bullets.createMultiple(50, 'bullet', 0, false);
	            Player._bullets.setAll('collideWorldBounds', true);
	            // TODO: use some IoC
	            var collisions = this.game.state.getCurrentState().collisions;
	            collisions.reset(Player._bullets);
	            Player._bulletsCollisionGroup = collisions.find(Player._bullets).group;
	        }
	    };
	    Player.prototype.turnLeft = function () {
	        this.body.rotateLeft(100);
	    };
	    Player.prototype.turnRight = function () {
	        this.body.rotateRight(100);
	    };
	    Player.prototype.stopRotation = function () {
	        this.body.setZeroRotation();
	    };
	    Player.prototype.forward = function () {
	        this.body.thrust(400);
	        this.trail();
	    };
	    Player.prototype.backward = function () {
	        this.body.reverse(400);
	    };
	    Player.prototype.die = function () {
	        this.reset(this.game.world.randomX, this.game.world.randomY);
	    };
	    Player.prototype.trail = function () {
	        var _this = this;
	        var trailOffset = 20;
	        var maxParticleSpeed = 100;
	        var trailDirection = this.body.rotation + Math.PI / 2;
	        var normal = {
	            x: Math.cos(trailDirection),
	            y: Math.sin(trailDirection)
	        };
	        var clampSpeed = function (speed) { return _this.game.math.clamp(speed, -maxParticleSpeed, maxParticleSpeed); };
	        this._trail.minParticleSpeed.setTo(clampSpeed((normal.x - 1) * maxParticleSpeed), clampSpeed((normal.y - 1) * maxParticleSpeed));
	        this._trail.maxParticleSpeed.setTo(clampSpeed((normal.x + 1) * maxParticleSpeed), clampSpeed((normal.y + 1) * maxParticleSpeed));
	        this._trail.emitX = this.body.x + normal.x * trailOffset;
	        this._trail.emitY = this.body.y + normal.y * trailOffset;
	        if (!this._trail.on) {
	            this._trail.flow(1500, 8, 1, 20);
	        }
	    };
	    Player.prototype.fire = function () {
	        if (this.game.time.now > this._nextFire && Player._bullets.countDead() > 0) {
	            this._nextFire = this.game.time.now + this._fireRate;
	            var bullet = Player._bullets.getFirstExists(false);
	            bullet.lifespan = 5000;
	            var body = bullet.body;
	            var bulletSpeed = 500;
	            var bulletOffset = 32;
	            var bulletDirection = this.body.rotation - Math.PI / 2;
	            var normal = {
	                x: Math.cos(bulletDirection),
	                y: Math.sin(bulletDirection)
	            };
	            var bounds = this.game.world.bounds;
	            var position = {
	                x: this.game.math.clamp(this.body.x + normal.x * bulletOffset, bounds.x, bounds.x + bounds.width),
	                y: this.game.math.clamp(this.body.y + normal.y * bulletOffset, bounds.y, bounds.y + bounds.height)
	            };
	            bullet.reset(position.x, position.y);
	            body.rotation = this.body.rotation;
	            body.velocity.x = normal.x * bulletSpeed;
	            body.velocity.y = normal.y * bulletSpeed;
	        }
	    };
	    Object.defineProperty(Player.prototype, "physicalPosition", {
	        get: function () {
	            //return this._sprite.position;
	            return new Phaser.Point(this.body.x, this.body.y);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Player.prototype.update = function () {
	        this._controls.process(this);
	    };
	    return Player;
	})(Phaser.Sprite);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Player;
	;


/***/ },
/* 7 */
/***/ function(module, exports) {

	;
	var Keyboard = (function () {
	    function Keyboard(game, up, down, left, right, fire) {
	        var keys = {
	            'left': left,
	            'right': right,
	            'up': up,
	            'down': down,
	            'fire': fire
	        };
	        this._keys = game.input.keyboard.addKeys(keys);
	    }
	    Keyboard.prototype.process = function (player) {
	        if (this._keys.left.isDown) {
	            player.turnLeft();
	        }
	        else if (this._keys.right.isDown) {
	            player.turnRight();
	        }
	        else {
	            player.stopRotation();
	        }
	        if (this._keys.up.isDown) {
	            player.forward();
	        }
	        else if (this._keys.down.isDown) {
	            player.backward();
	        }
	        if (this._keys.fire.isDown) {
	            player.fire();
	        }
	    };
	    return Keyboard;
	})();
	exports.Keyboard = Keyboard;
	;
	var Mouse = (function () {
	    function Mouse(game) {
	        this._pointer = game.input.activePointer;
	    }
	    Mouse.prototype.process = function (player) {
	        var playerPosition = player.physicalPosition;
	        var dx = this._pointer.worldX - playerPosition.x;
	        var dy = this._pointer.worldY - playerPosition.y;
	        // FIXME: to much implementation details knowledge here - switch to turnLeft/turnRight
	        player.body.rotation = Math.atan2(dy, dx) + Math.PI / 2;
	        if ((dx * dx + dy * dy) > 100 * 100) {
	            player.forward();
	        }
	        if (this._pointer.leftButton.isDown) {
	            player.fire();
	        }
	    };
	    return Mouse;
	})();
	exports.Mouse = Mouse;
	;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var GlowFilter_1 = __webpack_require__(9);
	;
	var Maze = (function (_super) {
	    __extends(Maze, _super);
	    function Maze(game, options) {
	        if (options === void 0) { options = {}; }
	        // We want to create physics body after we've painted in the graphics to match dimensions.
	        // Pass enableBody == false and enable physics explicitly after creation
	        _super.call(this, game, game.world, 'walls', false, false, Phaser.Physics.P2JS);
	        //this.enableBodyDebug = true;
	        this.classType = Phaser.Graphics;
	        this._rnd = game.rnd;
	        var mazeColor = options.mazeColor || 0x007fff;
	        var wallThickness = options.wallThickness || 10;
	        var minCellWidth = options.minCellWidth || 200;
	        this.filters = [new GlowFilter_1.default(game, game.width, game.height, 15, 2, 1, mazeColor, .1)];
	        this.filterArea = new PIXI.Rectangle(0, 0, game.width, game.height);
	        // Offset a wall thikness to make space for overlap (described below) at the leftmost/bottom sides
	        var mazeWidth = game.width - wallThickness;
	        ;
	        var mazeHeight = game.height - wallThickness;
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
	        var collisions = game.state.getCurrentState().collisions;
	        collisions.reset(this);
	    }
	    Maze.prototype._addRectangle = function (x, y, width, height) {
	        var radius = 4;
	        var wall = this.create(0, 0);
	        // PIXI.PolyK can't triangulate some of the rounded rectangles - fallback to simple ones
	        // Note: copy/paste from PIXI.WebGLGraphics.buildRoundedRectangle
	        var recPoints = [];
	        recPoints.push(x, y + radius);
	        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
	        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
	        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
	        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));
	        var triangles = PIXI.PolyK.Triangulate(recPoints);
	        // We draw black walls with mazeColor glow in order to make glowing edges insted of solid walls
	        wall.beginFill(0);
	        if (triangles) {
	            wall.drawRoundedRect(x, y, width, height, radius);
	        }
	        else {
	            wall.drawRect(x, y, width, height);
	        }
	        wall.endFill();
	        return wall;
	    };
	    Maze.prototype.addWall = function (x, y, length, isHorizontal) {
	        var wallThickness = this._wallThickness;
	        var rect = {
	            x: x * this._cell.x,
	            y: y * this._cell.y,
	            // Make perpendicular walls overlap in order to make junctions prettier
	            width: isHorizontal ? length * this._cell.x + wallThickness : wallThickness,
	            height: isHorizontal ? wallThickness : length * this._cell.y + wallThickness
	        };
	        // P2 bodies are relative to their center of mass
	        // draw rectangle around (0, 0) in order to align with physics
	        var wall = this._addRectangle(-rect.width / 2, -rect.height / 2, rect.width, rect.height);
	        this.game.physics.enable(wall, this.physicsBodyType, this.enableBodyDebug);
	        wall.reset(rect.x + rect.width / 2, rect.y + rect.height / 2);
	    };
	    Maze.prototype.addWalls = function (area) {
	        var _this = this;
	        if (area.width <= 1 || area.height <= 1) {
	            return;
	        }
	        var isHorizontal;
	        if (area.width > area.height) {
	            isHorizontal = false;
	        }
	        else if (area.width < area.height) {
	            isHorizontal = true;
	        }
	        else {
	            isHorizontal = this._rnd.pick([true, false]);
	        }
	        if (isHorizontal) {
	            // Do not try to add walls on the outside of the area
	            var pivot = this._rnd.integerInRange(area.y + 1, area.y + area.height - 1);
	            var totalLength = area.width;
	            var numberOfHoles = this._rnd.integerInRange(1, totalLength / 2);
	            var holes = [totalLength];
	            for (var i = 0; i < numberOfHoles; i++) {
	                holes.push(this._rnd.integerInRange(0, totalLength - 1));
	            }
	            var current = 0;
	            holes = holes.sort(function (l, r) { return l - r; });
	            holes.forEach(function (hole) {
	                var length = hole - current;
	                if (length > 0 && current < totalLength) {
	                    _this.addWall(area.x + current, pivot, length, isHorizontal);
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
	        }
	        else {
	            // Do not try to add walls on the outside of the area
	            var pivot = this._rnd.integerInRange(area.x + 1, area.x + area.width - 1);
	            var totalLength = area.height;
	            var numberOfHoles = this._rnd.integerInRange(1, totalLength / 2);
	            var holes = [totalLength];
	            for (var i = 0; i < numberOfHoles; i++) {
	                holes.push(this._rnd.integerInRange(0, totalLength - 1));
	            }
	            var current = 0;
	            holes = holes.sort(function (l, r) { return l - r; });
	            holes.forEach(function (hole) {
	                var length = hole - current;
	                if (length > 0 && current < totalLength) {
	                    _this.addWall(pivot, area.y + current, length, isHorizontal);
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
	    };
	    return Maze;
	})(Phaser.Group);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Maze;
	;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// http://codepen.io/mishaa/pen/raKzrm
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var GlowFilter = (function (_super) {
	    __extends(GlowFilter, _super);
	    function GlowFilter(game, textureWidth, textureHeight, distance, outerStrength, innerStrength, color, quality) {
	        quality = Math.pow(quality, 1 / 3);
	        distance *= quality;
	        textureWidth *= quality;
	        textureHeight *= quality;
	        this.uniforms = {
	            distance: { type: '1f', value: distance },
	            outerStrength: { type: '1f', value: null },
	            innerStrength: { type: '1f', value: null },
	            glowColor: { type: '4f', value: null },
	            pixelWidth: { type: '1f', value: null },
	            pixelHeight: { type: '1f', value: null },
	        };
	        this.color = color;
	        this.outerStrength = outerStrength;
	        this.innerStrength = innerStrength;
	        this.textureWidth = textureWidth;
	        this.textureHeight = textureHeight;
	        //this.passes = [this];
	        this.fragmentSrc = "\n            precision mediump float;\n            varying vec2 vTextureCoord;\n            uniform sampler2D texture;\n            uniform float distance;\n            uniform float outerStrength;\n            uniform float innerStrength;\n            uniform vec4 glowColor;\n            uniform float pixelWidth;\n            uniform float pixelHeight;\n            vec2 px = vec2(pixelWidth, pixelHeight);\n            void main(void) {\n                const float PI = 3.14159265358979323846264;\n                vec4 ownColor = texture2D(texture, vTextureCoord);\n                vec4 curColor;\n                float totalAlpha = 0.;\n                float maxTotalAlpha = 0.;\n                float cosAngle;\n                float sinAngle;\n                for (float angle = 0.; angle <= PI * 2.; angle += " + (1 / quality / distance).toFixed(7) + " ) {\n                cosAngle = cos(angle);\n                sinAngle = sin(angle);\n                for (float curDistance = 1.; curDistance <= " + distance.toFixed(7) + "; curDistance++) {\n                    curColor = texture2D(texture, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y));\n                    totalAlpha += (distance - curDistance) * curColor.a;\n                    maxTotalAlpha += (distance - curDistance);\n                }\n                }\n                maxTotalAlpha = max(maxTotalAlpha, 0.0001);\n    \n                ownColor.a = max(ownColor.a, 0.0001);\n                ownColor.rgb = ownColor.rgb / ownColor.a;\n                float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);\n                float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;\n                float resultAlpha = (ownColor.a + outerGlowAlpha);\n                gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);\n            }\n    ";
	        _super.call(this, game, this.uniforms, this.fragmentSrc);
	    }
	    Object.defineProperty(GlowFilter.prototype, "color", {
	        set: function (value) {
	            var r = ((value & 0xFF0000) >> 16) / 255, g = ((value & 0x00FF00) >> 8) / 255, b = (value & 0x0000FF) / 255;
	            this.uniforms.glowColor.value = { x: r, y: g, z: b, w: 1 };
	            this.dirty = true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GlowFilter.prototype, "outerStrength", {
	        set: function (value) {
	            this.uniforms.outerStrength.value = value;
	            this.dirty = true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GlowFilter.prototype, "innerStrength", {
	        set: function (value) {
	            this.uniforms.innerStrength.value = value;
	            this.dirty = true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GlowFilter.prototype, "textureWidth", {
	        set: function (value) {
	            this.uniforms.pixelWidth.value = 1 / value;
	            this.dirty = true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GlowFilter.prototype, "textureHeight", {
	        set: function (value) {
	            this.uniforms.pixelHeight.value = 1 / value;
	            this.dirty = true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GlowFilter;
	})(Phaser.Filter);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GlowFilter;
	;


/***/ },
/* 10 */
/***/ function(module, exports) {

	;
	var CollisionManager = (function () {
	    function CollisionManager(game, config) {
	        var _this = this;
	        this._groups = {};
	        var groupNames = Object.keys(config);
	        groupNames.forEach(function (name) {
	            _this._groups[name] = {
	                group: game.physics.p2.createCollisionGroup(),
	                collidesTo: []
	            };
	        });
	        groupNames.forEach(function (name) {
	            _this._groups[name].collidesTo = config[name].map(function (otherName) { return _this._groups[otherName].group; });
	        });
	    }
	    CollisionManager.prototype.find = function (group) {
	        var name = typeof group === 'string' ? group : group.name;
	        return this._groups[name];
	    };
	    CollisionManager.prototype.reset = function (group) {
	        var info = this.find(group);
	        group.callAll('body.setCollisionGroup', 'body', info.group);
	        group.callAll('body.collides', 'body', info.collidesTo);
	    };
	    return CollisionManager;
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CollisionManager;
	;


/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map