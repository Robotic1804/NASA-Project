
const launches = new Map();

let letestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-42  b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    letestFlightNumber++;
    launches.set(
        letestFlightNumber, Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['Zero to Mastery', 'NASA'],
            flightNumber: latestFlightNumber
    }));
    
}

module.exports = {

    launches,
    addNewLaunch
};