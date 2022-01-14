//https://github.com/gpujs/gpu.js/

let mw = 600;
let mh = 300;

const canv = document.createElement("canvas");
canv.height = mh;
canv.width = mw;
document.getElementById("petridish").appendChild(canv);

const gpu = new GPU({canvas : canv, mode : 'gpu'});

// ===== TESTING =====

/*
let a1 = [0,1,4,1239,123,3]; // if u have predefined array size this is possible
const t1 = gpu.createKernel(function(x) {
    return x[this.thread.x] + 1; // iterate with x. this.thread.x = current output array index
}, {
    output : [a1.length] // output is array with length a1.length
});
console.log(t1(a1));

let a2 = [[0,1,2,3],[99,98,93,334]];
const t2 = gpu.createKernel(function(x) {
    let val = x[this.thread.y][this.thread.x]; // same as iterating through the 2d array
    return 0 - val;
}, {
    output : [a2[0].length, a2.length] // output 2d array with same dimensions as predef arr
});
console.log(t2(a2));

var a3 = [[1,2],[3,4]];
const t3 = gpu.createKernel(function(a) {
    var x = this.thread.x;
    var p = a[x][0];
    return [a[x][0], a[x][1]];
}, {
    output : [2]
});
console.log(t3(a3));*/


// ===== SLIME MOLD =====

var tmap = Array(mw).fill().map(() => Array(mh).fill(0));
var agentCount = 1;
var agentList = [[20,40,0]];//Array(agentCount).fill().map(() => Array(3).fill(0));

const testWalk = function(a) {
    var r = Math.random() > 0.5 ? 1 : -1;
    var r1 = Math.random() > 0.5 ? 1 : -1;
    var cx = a[0];
    var cy = a[1];
    return [cx + r, cy + r1, 0];
};

const imprint = function()
{
    for (var i = 0; i < agentCount; i++)
    {
        var a1 = agentList[i][0];
        var a2 = agentList[i][1];
        tmap[a1][a2] = 1;

        agentList[i] = testWalk(agentList[i]);
    }
};

/*
const walk = gpu.createKernel(function(agents) {
    var r = Math.random() > 0.5 ? 1 : -1;
    var r1 = Math.random() > 0.5 ? 1 : -1;
    var cx = agents[this.thread.x][0];
    var cy = agents[this.thread.x][1];
    return [cx + r, cy + r1, 0];
    
    var flag = false;

    var angle = agents[this.thread.x][2];

    var nx = agents[this.thread.x][0];
    nx += this.constants.step * Math.cos(angle);
    if (nx < 0 || nx > this.constants.mw)
    {
        nx = Math.min(this.constants.mw - 1, Math.max(0, nx));
        flag = true;
    }

    var ny = agents[this.thread.x][1];
    ny += this.constants.step * Math.sin(angle);
    if (ny < 0 || ny > this.constants.mh)
    {
        ny = Math.min(this.constants.mh - 1, Math.max(0, ny));
        flag = true;
    }

    if (flag)
    {
        angle = Math.random() * 2 * Math.PI;
    }
    return [Math.floor(nx), Math.floor(ny), angle];
}, {
    output : [agentCount],
    constants : {
        mh : mh,
        mw : mw,
        step : 1.49
    }
});*/

const decay = gpu.createKernel(function(map) {
    var val = map[this.thread.y][this.thread.x];
    val -= 0.01;
    if (val < 0)
    {
        return 0;
    }
    return val;
}, {
    output : [mw, mh]
});

const draw = gpu.createKernel(function(map) {
    var val = map[this.thread.y][this.thread.x];
    this.color(val, val, val);
}, {
    output : [mw,mh],
    graphical : true
});

/*
var last;
const initmap = gpu.createKernel(function(){
    //this.color(0,0,0,1);
    
    var r = ((this.thread.y * this.thread.x) %255)/255;
    this.color(r,r,r, 1);
}, {
    output : [mw, mh],
    graphical : true
});
initmap();
last = initmap.getPixels();

// pixels is in 0-255 while this.color takes 0-1
// divide pixels by 255 to get 0-1 value
const compute = gpu.createKernel(function(pixels) {
    var x = this.thread.x;
    var y = this.thread.y;
    var w = this.constants.mw;
    var h = this.constants.mh;
    var i = 4 * x * w + 4 * y;
    var val = pixels[i];
    val -= -1;
    if (val < 0)
    {
        val = 0;
    }
    val /= 255;
    this.color(val, val, val, 1);
}, {
    output : [mw, mh],
    graphical : true,
    constants : {
        mh : mh,
        mw : mw
    }
});*/

// draw loop
const render = function()
{
    //compute(last);
    //last = compute.getPixels();
    //console.log(last[0] + ", " + last[1] + ", " + last[2]);

    tmap = decay(tmap);
    //agentList = walk(agentList);
    imprint();
    draw(tmap);
    
    // next frame
    window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);