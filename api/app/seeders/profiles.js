const profileGetter = require('../data/profiles')
const modelProfiles = require('../models/profiles')
const modelProfilesRelationship = require('../models/profilesRelationship')
const seedProfilesAndRelationship = async (numberOfProfiles, maxOfRelationshipPerProfile) => {
    console.log({maxOfRelationshipPerProfile})
    let profiles = profileGetter(numberOfProfiles)

    let profilesCreated = []
    for (let index = 0; index < profiles.length; index++) {
        profilesCreated.push(await modelProfiles.create(profiles[index]))
    }

    // relations
    const getRandonProfiles = (profilesAvailable, numberOfRelationship) => {
        // console.log({numberOfRelationship})
        return profilesAvailable.sort(() => 0.5 - Math.random()).slice(0, numberOfRelationship)
    }
    for (let index = 0; index < profilesCreated.length; index++) {
        const profileCreated = profilesCreated[index];

        let profilesAvailable = profilesCreated.filter((profile) => profile._id.toString() != profileCreated._id.toString())
        let profilesFriends = getRandonProfiles(profilesAvailable, Math.floor(Math.random() * maxOfRelationshipPerProfile))

        let relationship = await modelProfilesRelationship.create({
            profiles: profileCreated,
            friends: profilesFriends,
        })
    }
}

exports.seedProfilesAndRelationship = seedProfilesAndRelationship