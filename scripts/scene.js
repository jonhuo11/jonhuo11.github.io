// more optimized version of lsystem_test.js to be used on final website

var drawSystem = (abc, cmd, axiom, iter, x, y, height, r) => {
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
                // run the command at c, scaling to iteration and window height percentage
                cmd[c](i, height, r);
            }
        }
    }
    pop();
};

// tree 1
var tree1 = {
    abc : {
        "F" : "FW",
        "X" : "F-[[X]+X]+F[+FX]-X"
    },
    cmd : {
        "F" : (i,h,r=1) => {
            var l = 0.01 * h;

            strokeWeight(5 * 1/i);
            line(0, 0, 0, l * (i * 0.5));
            translate(0, l * (i * 0.5));
        },
        "W" : (i,h,r=1) => {
            var l = 0.02 * h * r;

            strokeWeight(4 * 1/i);
            line(0, 0, 0, l * (i * 0.5));
            translate(0, l * (i * 0.5));
        },
        "X" : (i,h,r=1) => {
            var l = 0.005 * h;

            strokeWeight(2 * 1/i);
            line(0, 0, 0, l * (i * 0.5));
            translate(0, l * (i * 0.5));
        },
        "+" : (i,h,r=1) => {
            rotate(-10 * i * r);
        },
        "-" : (i,h,r=1) => {
            rotate(15 * r);
        },
        "[" : (i,h,r=1) => {
            push();
        },
        "]" : (i,h,r=1) => {
            pop();
        }
    }
};

// tree 2
var tree2 = {
    abc : {
        "A" : "A[-B][+B]",
        "B" : "A[-B]A[+A]"
    },
    cmd : {
        "A" : (i,h,r=1) => {
            var l = 0.02 * h;

            strokeWeight(2 * 1/i);
            line(0, 0, 0, l * (i * 0.5));
            translate(0, l * (i * 0.5));
        },
        "B" : (i,h,r=1) => {
            var l = 0.01 * h * r;

            strokeWeight(1 * 1/i);
            line(0, 0, 0, l * (i * 0.5));
            translate(0, l * (i * 0.5));
        },
        "+" : (i,h,r=1) => {
            rotate(-20 * r);
        },
        "-" : (i,h,r=1) => {
            rotate(20 * r * (1/i));
        },
        "[" : (i,h,r=1) => {
            push();
        },
        "]" : (i,h,r=1) => {
            pop();
        }
    }
};

var renderScene = () => {
    var w = windowWidth;
    var h = windowHeight;

    // rendering the scene on startup
    // express all non-zero lengths and widths as % of window width/height
    translate(windowWidth/2, windowHeight);
    rotate(180);
    background("#d9fcfc");

    // random number generator
    var randPercentRange = 0.2;
    var randBool = (Math.random() >= 0.5 ? 1 : -1);
    var randPercent = 1 + (randBool * (Math.random() * randPercentRange));

    // draw trees
    drawSystem(tree1.abc, tree1.cmd, "X", Math.round(4 * randPercent), 0.1 * w * randPercent, 0, h, randPercent);
    drawSystem(tree2.abc, tree2.cmd, "A", Math.round(5 * randPercent), -0.2 * w * randPercent, 0, h, randPercent);

    console.log("scene drawn!");
};

var canv;
var setup = () => {
    canv = createCanvas(windowWidth, windowHeight);
    canv.parent("sketch");
    canv.style("display", "block");
    angleMode(DEGREES);

    renderScene();
};

var windowResized = () => {
    console.log("window resize detected");
    resizeCanvas(windowWidth, windowHeight);

    renderScene();
};
