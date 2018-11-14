const frameLength = 1/60;

let tiles = [];
let map = [];
let entities = [];
let sprite = new Image();

function pageLoad() {

    for (let x = 0; x <= 8; x++) {
        let row = [];
        for (let y = 0; y <= 6; y++) {
            row.push(Math.floor(Math.random() * 16));
        }
        map.push(row);
    }

    for (let i = 1; i <= 16; i++) {
        let tile = new Image();
        tile.src = '/client/img/' + i + '.png';
        tiles.push(tile);
    }

    for (let i = 0; i < 20; i++) {
        let newEntity = { x: Math.floor(Math.random() * 8),
            y: Math.floor(Math.random() * 6),
            progress: 1};
        newEntity.targetX = newEntity.x;
        newEntity.targetY = newEntity.y;
        newEntity.lastX = newEntity.x;
        newEntity.lastY = newEntity.y;
        entities.push(newEntity);
    }

    sprite.src = '/client/img/sprite.png';

    setInterval(update, frameLength*1000);

}

function update() {

    for(let e of entities) {

        if (e.progress >= 1) {

            e.progress = 0;
            e.x = e.targetX;
            e.y = e.targetY;
            e.lastX = e.x;
            e.lastY = e.y;

            let direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    if (e.x > 0) { e.targetX = e.x - 1; }
                    break;
                case 1:
                    if (e.y > 0) { e.targetY = e.y - 1; }
                    break;
                case 2:
                    if (e.x < 7) { e.targetX = e.x + 1; }
                    break;
                case 3:
                    if (e.y < 5) { e.targetY = e.y + 1; }
                    break;
            }

        } else {

            e.x = e.lastX + (e.targetX - e.lastX) * e.progress;
            e.y = e.lastY + (e.targetY - e.lastY) * e.progress;
            e.progress += 2 * frameLength;

        }

    }

    draw();

}

function draw() {

    let canvasContext = document.getElementById('canvas').getContext('2d');
    canvasContext.globalCompositeOperation = 'source-over';

    canvasContext.clearRect(0, 0, 1024, 768);

    for (let x = 0; x <= 8; x++) {
        for (let y = 0; y <= 6; y++) {
            canvasContext.save();
            canvasContext.translate(x*128, y*128);
            canvasContext.drawImage(tiles[map[x][y]], 0, 0);
            canvasContext.restore();
        }
    }

    for(let e of entities) {
        canvasContext.save();
        canvasContext.translate(e.x*128, e.y*128);
        canvasContext.drawImage(sprite, 0, 0);
        canvasContext.restore();
    }

}