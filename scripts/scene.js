// more optimized version of lsystem_test.js to be used on final website

var drawSystem = (abc, cmd, axiom, iter, x, y) => {
    var i = 0;
    var str = axiom;
    var next = "";

    push();
    translate(x, y);
    while (i < iter) {
        // calculate the current string
        for (c of str) {
            if (abc[c] != null) {
                next += abc[c];
            } else {
                next += c;
            }
        }
        str = next;
        next = "";
        i += 1;

        // draw the current iteration of string
        for (c of str) {
            if (cmd[c] != null) {
                // run the command at c
                cmd[c](i);
            }
        }
    }
    pop();
};

// tree 1
var tree1 = {
    abc : {
        "F" : "FF+[+F-F-FP]-[-F+F+FP]"
    },
    cmd : {
        "F" : (i) => {
            stroke(38, 0, 10);
            strokeWeight(3 * (1/i));
            line(0, 0, 0, 20 * (1/i));
            translate(0, 20 * (1/i));
        },
        "P" : (i) => {
            noStroke();
            fill(255, 192, 203);
            ellipse(0, 0, 10 * (1/i), 15 * (1/i));
        },
        "+" : (i) => {
            rotate(30);
        },
        "-" : (i) => {
            rotate(-30);
        },
        "[" : (i) => {
            push();
        },
        "]" : (i) => {
            pop();
        }
    }
};

// tree 2
var tree2 = {
    abc : {
        "F" : "F",
        "X" : "F[+X][-X]F"
    },
    cmd : {
        "F" : (i) => {
            stroke("#7c7f59");
            strokeWeight(3 * (1/i));
            line(0, 0, 0, 15 * (i * 0.2));
            translate(0, 15 * (i * 0.2));
        },
        "X" : (i) => {
            line(0, 0, 0, 10 * (i * 0.2));
            translate(0, 10 * (i * 0.2));
        },
        "+" : (i) => {
            rotate(8);
        },
        "-" : (i) => {
            rotate(-27);
        },
        "[" : (i) => {
            push();
        },
        "]" : (i) => {
            pop();
        }
    }
};

// tree 3
var tree3 = {
    abc : {
        "F" : "FF",
        "X" : "F-[[X]+X]+F[+FX]-X"
    },
    cmd : {
        "F" : (i) => {
            strokeWeight(2 * 1/i);
            line(0, 0, 0, 16 * (i * 0.5));
            translate(0, 16 * (i * 0.5));
        },
        "X" : (i) => {
            line(0, 0, 0, 10 * (i * 0.5));
            translate(0, 10 * (i * 0.5));
        },
        "+" : (i) => {
            rotate(-10 * i);
        },
        "-" : (i) => {
            rotate(15);
        },
        "[" : (i) => {
            push();
        },
        "]" : (i) => {
            pop();
        }
    }
};

canvasX = 1200;
canvasY = 600;
var setup = () => {
    createCanvas(canvasX, canvasY);
    angleMode(DEGREES);
    background("#6de4ed");
    translate(canvasX/2, canvasY);
    rotate(180);

    // rendering the scene on startup

    //drawSystem(tree1.abc, tree1.cmd, "F", 4, 200, 0);
    //drawSystem(tree2.abc, tree2.cmd, "X", 8, -200, 0);
    drawSystem(tree3.abc, tree3.cmd, "X", 3, 0, 0);

};
