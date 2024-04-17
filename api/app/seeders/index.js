const process = require('process')
const profilesSeeder = require('../seeders/profiles')
const db = require('#resources/js/db.js')

let seederType = process.argv[2]
if (!seederType) return console.log('Write the Seeder Type')  

if (seederType == 'profiles') {
    const numberOfProfiles = process.argv[3]
    const maxOfRelationshipPerProfile = process.argv[4]
    if (!numberOfProfiles) return console.log('Write the number of profiles') 
    if (!maxOfRelationshipPerProfile) return console.log('Write maximum of relations between profiles') 

    db.connect();
    profilesSeeder.seedProfilesAndRelationship(numberOfProfiles, maxOfRelationshipPerProfile)
    console.log('Profiles created successfully')
} else console.log('Seeder Type not fount')