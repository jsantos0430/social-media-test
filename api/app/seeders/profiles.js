const profileGetter = require('../data/profiles')
const modelProfiles = require('../models/profiles')
const modelProfilesRelationship = require('../models/profilesRelationship')
const Redis = require("ioredis");
const utils = require('../resources/js/utils')

const seedProfilesAndRelationship = async (numberOfProfiles, maxOfRelationshipPerProfile) => {
    const redis = new Redis();

    let profiles = profileGetter(numberOfProfiles)

    let profilesCreated = []
    for (let index = 0; index < profiles.length; index++) {
        profilesCreated.push(await modelProfiles.create(profiles[index]))
    }

    // relations
    const getRandonProfiles = (profilesAvailable, numberOfRelationship) => {
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

        await redis.hset('profilesRelationship', profileCreated._id.toString(), JSON.stringify(utils.setProfileFriendsEdges(relationship.friends)))
    }
}

exports.seedProfilesAndRelationship = seedProfilesAndRelationship