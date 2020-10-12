'use strict'

class Scene {
    constructor ({
        name = "scene",
        canvasSize = new p5.Vector(256, 256),
        running = true,
        backgroundColor = 220
    }) {
        if (!Scene.instance) {
            this.name = name;
            this.canvasSize = canvasSize;
            this.running = running;
            this.backgroundColor = backgroundColor;

            this.objects = [];

            Scene.instance = this;
            Object.seal(Scene.instance);
        }

        return Scene.instance;
    }

    static log(text) {
        console.log(`[${this.name}] ${text}`);
    }

    setup () {
        Scene.log("running scene setup code");
        createCanvas(this.canvasSize.x, this.canvasSize.y);
        background(this.backgroundColor);
        angleMode(DEGREES);
        colorMode(RGB, 255);
        frameRate(30);
        translate(this.canvasSize.x/2, this.canvasSize.y);
        rotate(180);

        this.sceneSetup();

        Scene.log("setup code complete");

        Scene.log("running initial object setup code")
        this.objects.forEach((object) => {
            object.setup();
        });
        Scene.log("initial object setup code complete");
    }

    // runs once on start
    sceneSetup() {

        // test system
        var test = new Tree({
            name : "Tree system tester",
            position : new p5.Vector(1, 1),

            rules : [
                new Rule({
                    from : "F",
                    to : "FF+[+F-F-F]-[-F+F+F]"
                })
            ],
            // the command set, maps characters to actions
            commands : [
                // draw a line and move forward
                new Command({
                    symbol : "F",
                    action : ({iter = 1, mod = 1}) => {
                        stroke(38, 0, 10);
                        strokeWeight(5 * (1/iter));
                        line(0, 0, 0, 40 * (1/iter));
                        translate(0, 40 * (1/iter));
                    }
                }),
                // move forward without drawing
                new Command({
                    symbol : "G",
                    action : ({iter = 1, mod = 1}) => {
                        translate(0, 40 * (1/iter));
                    }
                }),
                // turn right
                new Command({
                    symbol : "+",
                    action : ({iter = 1, mod = 1}) => {
                        rotate(25 * mod);
                    }
                }),
                new Command({
                    symbol : "-",
                    action : ({iter = 1, mod = 1}) => {
                        rotate(-25);
                    }
                }),
                // save position
                new Command({
                    symbol : "[",
                    action : ({iter = 1, mod = 1}) => {
                        push();
                    }
                }),
                // restore previous position
                new Command({
                    symbol : "]",
                    action : ({iter = 1, mod = 1}) => {
                        pop();
                    }
                }),
            ],

            axiom : "F",
            maxIter : 3
        });
        this.objects.push(test);
    }

    draw() {
        if (this.running) {
            translate(this.canvasSize.x/2, this.canvasSize.y);
            rotate(180);
            background(this.backgroundColor);

            this.objects.forEach((object) => {
                object.draw();
            });
        }
    }
}

class SceneObject {
    constructor ({
        name = "SceneObject",
        position: pos = new p5.Vector(0,0)
    }) {
        this.name = name;
        this.pos = pos;
    }

    setup () {

    }

    draw () {
        Scene.log(this.name);
    }
}

// LSYSTEM code
class LSystem extends SceneObject {
    constructor ({
        rules = [],
        commands = {},
        maxIter = 0,
        axiom = "",
        ...rest
    }) {
        super(rest);

        this.rules = rules;
        this.commands = commands;
        this.maxIter = maxIter;
        this.iter = 0;
        this.axiom = axiom;
        this.string = this.axiom;
    }

    draw () {
        this.renderMax({mod : 1});
        if (this.iter >= this.maxIter) {
            this.iter = 0;
            this.string = this.axiom;
        }
    }

    // compute and draw to the maximum number of iterations
    renderMax({mod = 1}) {
        while (this.iter < this.maxIter) {
            this.computeOneIter();
            this.renderCurrent({mod : mod});
        }
    }

    // DRAW THE CURRENT ITERATION
    renderCurrent({mod = 1}) {
        // look through this.string and apply according functions for each symbol
        for (var symbol of this.string) {
            for (var cmd of this.commands) {
                if (cmd.canApplyTo({sym:symbol})) {
                    cmd.applyTo({sym:symbol, iter:this.iter, mod:mod});
                }
            }
        }
    }

    // computes one iteration of the string
    computeOneIter () {
        if (this.iter < this.maxIter) {
            var next = "";
            for (var c of this.string) {
                next += this.applyRules({
                    char : c
                });
            }
            this.iter += 1;
            this.string = next;
            return this.string;
        } else {
            Scene.log(`max iterations of ${this.maxIter} reached`);
            return this.string;
        }
    }

    applyRules({
        char
    }) {
        var out = char;
        for (var rule of this.rules) {
            if (rule.canApplyTo({
                char : char
            })) {
                out = rule.applyTo({
                    char : char
                });
                break;
            }
        }
        return out;
    }
}

class Rule {
    constructor ({
        from,
        to
    }) {
        this.from = from;
        this.to = to;
    }

    canApplyTo({
        char
    }) {
        if (char == this.from) {
            return true;
        } else {
            return false;
        }
    }

    applyTo({
        char
    }) {
        if (this.canApplyTo({char:char})) {
            return this.to;
        } else {
            return char;
        }
    }
}

class Command {
    constructor ({
        symbol,
        action
    }) {
        this.symbol = symbol;
        this.action = action;
    }

    canApplyTo({
        sym
    }) {
        if (sym == this.symbol) {
            return true;
        } else {
            return false;
        }
    }

    applyTo({
        sym,
        iter = 1,
        mod = 1
    }) {
        if (this.canApplyTo({sym:sym})) {
            this.action({iter:iter, mod:mod});
        }
    }
}

// Tree LSystem
class Tree extends LSystem {
    constructor({...rest}) {
        super(rest);

        this.rotInput = 0;
        this.rotRange = 0.05;
    }

    draw () {
        // use sin function with caps to produce rotation range
        var y = this.rotRange * sin((1/this.rotRange) * this.rotInput);
        var rot = 1 + y;
        this.rotInput += 0.1;

        this.renderMax({mod : rot});
        if (this.iter >= this.maxIter) {
            this.iter = 0;
            this.string = this.axiom;
        }
    }
}

// run the scene
const scene = new Scene({
    name : "LSystem",
    canvasSize : new p5.Vector(800, 800)
});
Object.seal(scene);

function setup() {
    scene.setup();
}

function draw() {
    scene.draw();
}
