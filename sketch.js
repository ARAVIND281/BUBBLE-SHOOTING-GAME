var p;
var size;
var heading;
var pVel;
var force;
var boostColor;
var touch;
var playerColor;
var Score;
var Health;
var bb;
var bbVel;
var bbSize;
lasers = [];
laserVel = [];

function preload() {
    laserSound = loadSound('laser.ogg');
}



function setup() {
    createCanvas(400, 400);
    p = createVector(width / 2, height / 2)
    pVel = createVector(0, 0);
    force = createVector(0, 0);
    size = 10;
    heading = 0;
    boostColor = color("red");
    playerColor = color(255);
    Score = 0;
    Health = 200;
    bb = [];
    bbVel = [];
    bbSize = 25;

    for (var i = 0; i < 5; i++) {
        bb.push(createVector(random(0, width), random(0, height)));
        bbVel.push(p5.Vector.random2D().mult(random(0.25, 2.25)));
    }
}

function draw() {
    background(0);

    updatePlayer();
    updateBubbles();
    updateLasers();

}

function updatePlayer() {
    boostColor = color(0)
        

    if (keyIsDown(LEFT_ARROW)) {
        heading -= 6;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        heading += 6;
    }
    if (keyIsDown(UP_ARROW)) {
        force = p5.Vector.fromAngle(radians(heading));
        pVel.add(force.mult(0.2));
        boostColor = color(0, 255, 0);
    }

    
    if (p.x > 400) {
        p.x = 0
    }
    if (p.x < 0) {
        p.x = 400
    }
    if (p.y > 400) {
        p.y = 0
    }
    if (p.y < 0) {
        p.y = 400
    }



    pVel.mult(0.978);
    p.add(pVel);
    
    push();
    translate(p.x, p.y);
    rotate(radians(heading));
    

    fill(boostColor)
    triangle(-size + 2, size * .7, -size * 3.5, size / 7, size * -.7, -size * .7);
    


    fill(playerColor);
    triangle(-size + 1, -size + 1, size + 1, 0, -size + 1, size + 1);
    pop();
    fill(255);
    text(Health, p.x - 10, p.y + 25)

    fill(255);
    text(Score, 25, 25);

}

function updateBubbles() {
    touch = false;
    for (var i = 0; i < bb.length; i++) {
        push();

        if (dist(bb[i].x, bb[i].y, p.x, p.y) < bbSize / 2) {
            touch = true;
            console.log(touch);
        }
        bb[i].add(bbVel[i]);

        
        if (bb[i].x > width + bbSize / 2) {
            bb[i].x = 0
        }
        if (bb[i].x < -bbSize / 2) {
            bb[i].x = 400
        }
        if (bb[i].y > height + bbSize / 2) {
            bb[i].y = 0
        }
        if (bb[i].y < -bbSize / 2) {
            bb[i].y = 400
        }

        fill("pink")
        stroke(255);
        ellipse(bb[i].x, bb[i].y, bbSize);
        pop();
    }
    if (touch == true) {
        playerColor = color(255, 0, 0);
        Health--;
    } else {
        playerColor = color(255);
    }

}

function updateLasers() {
    for (var i = 0; i < lasers.length; i++) {

        //check bubble collisions
        for (var z = 0; z < bb.length; z++) {
            if (dist(lasers[i].x, lasers[i].y, bb[z].x, bb[z].y) < bbSize / 2) {
                bb[z] = createVector(random(0, width), random(0, height));
                bbVel[z] = p5.Vector.random2D().mult(random(0.25, 2.25));
                Score++;
            }
        }
        lasers[i].add(laserVel[i]);

        push();
        stroke(132, 112, 255);
        //point(lasers[i].x,lasers[i].y);

        line(lasers[i].x, lasers[i].y, lasers[i].x + laserVel[i].x * 4, lasers[i].y + laserVel[i].y * 4)

        pop();
    }
}

function keyPressed() {
    //console.log (keyCode); 
    if (keyCode == 32) { // space bar code is 32
        laserSound.play();
        lasers.push(createVector(p.x, p.y));
        laserVel.push(p5.Vector.fromAngle(radians(heading)).mult(7));


    }
}