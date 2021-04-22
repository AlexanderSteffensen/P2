
export class Spinner {
    // The smoothness of the spinners rotation
    refine = 20;
    // The difference in degrees between the rotationAngle and the spinners start position
    repositioningAngle = 0;
    // The amount of ms the spinner will be still before repositioning
    stillTime = 500;
    // The game area radius
    range = 250;
    // The spinners position in the space
    pos = {top : 750, left: 1000};
    // Velocities are the angular velocity on the spinner in [rad/s]
    velocity = {
        // The maximum velocity
        max : 0,
        // The lowest velocity
        min : 0,
        // The different velocities in the different spin sessions
        sessions : [],
        // The velocity when the spinner is repositioning
        repositioning : 0
    };
    waitTime = {
        // The waitTimes on the spinSessions
        sessions : [],
        // The waitTime from spinning start until repositioning begins
        repositioning : 0,
        // The waitTime before the spinners matrix will be reset
        reset : 0,
        // The total time from game start to game end.
        total : 0
    };
    result = {rotationAngle : 0, winner : 0, userAngles : []};

    // Starts a new spinner game
    newGame(userProperties) {
        // Finds the rotationAngle, id on the winner and the users angles to the spinner.
        this.result = spin(userProperties.positions, this.pos, this.range);
        this.rotationAngle = this.result.rotationAngle;

        // Gets the properties of the winner of the game
        this.winner = userProperties.get(this.result.winner);

        //Finds the rotationTime for this game
        this.rotationTime = calcRotationTime(this.rotationAngle);

        // Finds the repositioningAngle for this game
        this.repositioningAngle = (360 - (this.result.rotationAngle % 360));

        // Finds the different velocities for the spinner game
        this.velocity = calcVelocity(this.rotationAngle, this.rotationTime, this.refine);

        // Finds the different waitTimes for the spinner game
        this.waitTime = calcWaitTimes(this.velocity, this.refine, this.rotationAngle, this.stillTime);
    }
}

// Simulates a spin game
function spin(userPos, s_pos, range){
    const minRounds = 2;
    let rot;
    const userAngles = {};

    // gets the users relative position to the spinner
    const relPos = getRelUserPos(userPos, s_pos);

    // finds the players who inside the game area, and gets relative position from relPos
    const players = findPlayers(relPos, range);

    do
        rot = Math.random() * 360*5;
    while(minRounds >= Math.floor(rot/360)) // spinner rotates minimum 2 rounds

    const result = closestUser(players, rot, userAngles);

    //return the result of the spin and the rotation of the spinner. Players should not move before the game is done.
    return {winner: result, rotationAngle: rot, userAngles: userAngles};
}

//Find the user which is closest to being pointed at
function closestUser(players, rotDeg, userAngles){
    const rots = [];
    const ids  = Object.keys(players);
    //Check the angles between all the users in the game.
    ids.forEach(id => {
        let a = Math.atan(players[id].top / players[id].left) * 180 / Math.PI;

        // if user is in second or third quadrant
        if (players[id].left < 0)
            a = 180 + a;

        // if user is in first quadrant
        if (players[id].left > 0 && players[id].top < 0)
            a = 360 + a;

        //calculates the degrees the user has to the rotated spinner
        let angFromRot = Math.abs(a - (rotDeg % 360))

        if (angFromRot > 180)
            angFromRot = 360 - angFromRot;

        //adds the difference in degrees to rots.
        rots.push(angFromRot);

        //takes the angles to
        userAngles[id] = a;
    });

    //Return the index of the lowest angle.
    return ids[rots.indexOf(Math.min(...rots))];
}

//Returns the position of the players in relation to the spinner.
export function getRelUserPos(userPos, s_pos) {
    const relativeAngles = {};

    Object.keys(userPos).forEach(id => relativeAngles[id] = ({
        top:  userPos[id].top  - s_pos.top + 57.5,
        left: userPos[id].left - s_pos.left + 106.5
    }));

    return relativeAngles;
}

function findPlayers(relPos, range) {
    const players = {};

    // finds the users that are inside the 'game range'
    for (const user in relPos) {
        const dist = Math.sqrt(Math.pow(relPos[user].top, 2) + Math.pow(relPos[user].left, 2));
        if (dist <= range)
            players[user] = relPos[user];
    }
    return players;
}

// finds the rotation time on the spinner
function calcRotationTime(rotationAngle) {
    switch (Math.floor(rotationAngle / 360)) {
        case 2: case 3: return 4;
        case 4: case 5: return 5;
        default: return 4;
    }
}

// calculates the different velocities of the spinner
function calcVelocity(rotationAngle, rotationTime, refine) {
    let vMax = (2 * toRadians(rotationAngle)) / (rotationTime);
    let vMin = vMax/refine;
    const deceleration = (0-vMax)/rotationTime;
    let spinSessions = [vMax];

    console.log(rotationAngle);
    console.log(toRadians(rotationAngle));
    console.log(2* toRadians(rotationAngle));
    console.log(vMax);

    for (let i = 1; i < refine; i++)
        spinSessions.push(deceleration * (rotationTime * i/refine) + vMax);

    return {
        max : vMax,
        min : vMin,
        repositioning : 3,
        sessions : spinSessions
    }
}

// compute an angle from degrees to radians
function toRadians(angle) {
    return angle * (Math.PI/180);
}

// calculates the different wait times for the setTimeouts in the spinner.
function calcWaitTimes (velocity, refine, rotationAngle, stillTime) {
    let v = velocity.max;
    let spinSessions = [0];

    for (let i = 1; i < refine; i++) {
        spinSessions.push(spinSessions[i-1] + toRadians(Math.floor(rotationAngle * (1 / refine))) / (v/1000));
        v -= velocity.min;
    }

    let repositioning = stillTime + spinSessions[refine-1] + toRadians(Math.floor(rotationAngle * (1 / refine))) / (velocity.min/1000);
    let reset = 2600;

    return {sessions : spinSessions, repositioning : repositioning, reset : reset, total : repositioning + reset};
}
