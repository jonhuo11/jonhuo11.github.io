

// ===== TRAIL MAP =====
var trailmap;   // trails left by agents
                // dictionary of format 
                // {value: float}
//var trailmapClearQueue = [];

var trailmapSize =
{
    height : 0,
    width : 0
};

var emptyTrailmap = function()
{
    trailmap = null;
    trailmap = {};
    trailmapSize = {height: 0, width: 0};
    trailmapClearQueue = [];
};
var resetTrailmap = function()
{
    emptyTrailmap();
    trailmapSize.height = windowHeight;
    trailmapSize.width = windowWidth;
};

// ===== AGENT =====
var agents; // array of agents

// static agent settings
var footprintDecayPercent = 0.02;   // decays by x percent PER SECOND, 0 to 1
var footprintDestroyThresholdPercent = 0.02;  // 0 to 1
var sensorLength = 1.49;            // since 1px = 1 unit^2
var step = 1;
var agentColor = [255,255,255];

var emptyAgents = function()
{
    agents = null;
    agents = [];
};

class Agent
{
    constructor(x, y, angle)
    {
        this.x = x;
        this.y = y;
        this.angle = angle; // angle 0 is facing right (along x axis)
    }

    posToMapPos()
    {
        // round down the position
        return [Math.floor(this.x), Math.floor(this.y)];
    }
}

var drawAgent = function(a)
{
    var p = a.posToMapPos();
    point(p[0], p[1]);
};

var drawTile = function(tileId) // tileid given in "x,y"
{
    var sp = tileId.split(",");
    var x = parseInt(sp[0]);
    var y = parseInt(sp[1]);
    //console.log(trailmap[tileId]);
    var c = trailmap[tileId];
    stroke(c, c, c);
    point(x, y, 0);
}

// decay footprints
var decayTile = function(tileId)
{
    if (trailmap[tileId] > footprintDestroyThresholdPercent * 255)
    {
        trailmap[tileId] *= (1 - footprintDecayPercent);
    }
    else
    {
        trailmap[tileId] = 0; // optimization?
    }
    /*
    for (var tileId in trailmap)
    {
        if (trailmap[tileId] > footprintDestroyThresholdPercent * 255)
        {
            trailmap[tileId] *= (1 - footprintDecayPercent);
        }
        else
        {
            trailmap[tileId] = 0; // optimization?
        }
        
        else if (trailmap[tileId] <= footprintDestroyThresholdPercent * 255)
        {
            
            //trailmapClearQueue.push(tileId); // remove to keep iterations low
        }
    }*/
};

// leave a trail
var footprint = function(x, y)
{
    var id = String(x + "," + y);
    trailmap[id] = 255; // fixed alpha value
}

// walk an agent in its current angle direction
var walkAgent = function(a)
{
    var mp = a.posToMapPos();
    footprint(mp[0], mp[1]);

    var dx = step * Math.cos(a.angle);
    var dy = step * Math.sin(a.angle);
    var nx = a.x + dx;
    var ny = a.y + dy;

    if (
        (nx < -trailmapSize.width/2 || nx > trailmapSize.width/2) || 
        (ny < -trailmapSize.height/2 || ny > trailmapSize.height/2)
    )
    {
        nx = Math.min((trailmapSize.width/2) - 0.1, Math.max(-trailmapSize.width/2, nx));
        ny = Math.min(trailmapSize.height/2 - 0.1, Math.max(-trailmapSize.height/2, ny));
        a.angle = Math.random() * 2 * Math.PI;
    }
    a.x = nx;
    a.y = ny;
};

var addAgent = function(a)
{
    agents.push(a);
};

// ===== AGENT SPAWNS =====

// spawns in a circle centered at middle of screen x agents spread (0 to 1)
var spawnRandomCircle = function(x, spread)
{
    //var cx = Math.floor(trailmapSize.width / 2);
    //var cy = Math.floor(trailmapSize.height / 2); 
    var maxDist = Math.min(trailmapSize.width/2, trailmapSize.height/2) * spread;

    for (var i = 0; i < x; i++)
    {
        var r = Math.random() * maxDist;
        var theta = Math.random() * 2 * Math.PI;
        var x1 = r * Math.cos(theta);
        var y1 = r * Math.sin(theta);
        addAgent(new Agent(x1, y1, Math.random() * 2 * Math.PI));
    }
}

// ===== RUNTIME =====

// starts a new simulation
var newSim = function()
{
    resetTrailmap();
    emptyAgents();
    background("#000000");
    strokeWeight(0.8);

    // make some agents using 
    spawnRandomCircle(100, 0.5);

};

var cv;

var setup = function () 
{
    cv = createCanvas(windowWidth, windowHeight, WEBGL);
    cv.parent("slimemoldsketch");
    cv.style("display", "block");
    newSim();
};

var windowResized = function ()
{
    resizeCanvas(windowWidth, windowHeight);
    newSim();
};

var fps = 0;
var draw = function ()
{
    background("#000000");
    
    // render trailmap
    for (var tile in trailmap)
    {
        decayTile(tile);
        drawTile(tile);
    }

    /*  slow?
    // clear tiles with negligible value
    for (var i = 0; i < trailmapClearQueue.length; i++)
    {
        delete trailmap[trailmapClearQueue[i]];
    }
    trailmapClearQueue = []; // clear the removal stuff
    */

    // render agents
    //stroke(agentColor[0], agentColor[1], agentColor[2]);
    for (var i = 0; i < agents.length; i++)
    {
        walkAgent(agents[i]);
        // optimization??
        //drawAgent(a);
    }
};