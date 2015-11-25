import Player from './Player';

export interface IControls {
    process(player: Player): void;
};

export class Keyboard implements IControls {
    private _keys;

    constructor(game: Phaser.Game, up, down, left, right, fire) {
        let keys = {
            'left': left,
            'right': right,
            'up': up,
            'down': down,
            'fire': fire
        };

        this._keys = game.input.keyboard.addKeys(keys);
    }

    process(player: Player) {
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
    }
};

export class Mouse implements IControls {
    private _pointer: Phaser.Pointer;
    constructor(game: Phaser.Game) {
        this._pointer = game.input.activePointer;
    }

    process(player: Player) {
        let playerPosition = player.physicalPosition;
        let dx = this._pointer.worldX - playerPosition.x;
        let dy = this._pointer.worldY - playerPosition.y;
        // FIXME: to much implementation details knowledge here - switch to turnLeft/turnRight
        player.body.rotation = Math.atan2(dy, dx) + Math.PI / 2;

        if ((dx * dx + dy * dy) > 100 * 100) {
            player.forward();
        }

        if (this._pointer.leftButton.isDown) {
            player.fire();
        }
    }
};
