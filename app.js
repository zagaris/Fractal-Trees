const canvas = document.querySelector('canvas');
const button = document.querySelector('.generate');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let direction;

function draw(startX, startY, len, angle, branchWidth, col1, col2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = col1;
    ctx.fillStyle = col2;
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    if(angle > 0) {
        ctx.bezierCurveTo(20, -len/2, 20, -len/2, 0, -len);
    } else {
        ctx.bezierCurveTo(20, -len/2, -20, -len/2, 0, -len);
    }
    ctx.stroke();

    if(len < 10) {
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }
    direction = Math.random()*10 +10;

    draw(0, -len, len*0.75, angle+direction, branchWidth*0.5);
    draw(0, -len, len*0.75, angle-direction, branchWidth*0.5);

    ctx.restore();
}
draw(canvas.width/2, canvas.height-80, 120, 0, 25, 'red', 'yellow');


function generateTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let center = canvas.width/2;
    let height = canvas.height-80;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = 0;
    let branchWidth = Math.random() * 140 +1;
    let col1 = 'rgb(' + Math.random()*255+','+ Math.random()*255+','+Math.random()*255+')';
    let col2 = 'rgb(' + Math.random()*255+','+ Math.random()*255+','+Math.random()*255+')';
    draw(center, height, len, angle, branchWidth, col1, col2);
}


button.addEventListener('click', function() {
    generateTree();
})

