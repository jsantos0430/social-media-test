const modelProfiles = require('../models/profiles')
const modelProfilesRelationship = require('../models/profilesRelationship')
const profilesSeeder = require('../seeders/profiles')
const utils = require('../resources/js/utils')
const profilesRelationship = require('../resources/js/profilesRelationship')

async function createProfile(req, res) {
    try {
        let profileData = req.body
        let profile = new modelProfiles(profileData)
        profile.available = true;
        await profile.save()

        res.status(201).json({ profileId: profile._id })
    } catch (err) {
        res.status(401).json({ err })
    }
}

async function getProfileFriends(req, res) {
    try {
        let id = req.params.id;

        let relationship = await modelProfilesRelationship.findOne({ 'profiles._id': id })

        res.status(200).json({ friends: relationship.friends })
    } catch (err) {
        res.status(401).json({ err })
    }
}

async function getProfile(req, res) {
    try {
        let id = req.params.id;

        let profileFound = await modelProfiles.findById(id)

        res.status(200).json({ profile: profileFound })
    } catch (err) {
        res.status(401).json({ err })
    }
}

async function updateProfile(req, res) {
    try {
        let id = req.params.id;
        let profileData = req.body

        let profileFound = await modelProfiles.findByIdAndUpdate(id, profileData, { new: true })

        res.status(200).json({
            _id: profileFound._id,
            first_name: profileFound.first_name, 
            last_name: profileFound.last_name
        })
    } catch (err) {
        res.status(401).json({ err })
    }
}

async function deleteProfile(req, res) {
    try {
        let id = req.params.id;

        let profileFound = await modelProfiles.findByIdAndDelete(id)

        res.status(200).json({ profileId: profileFound._id })
    } catch (err) {
        res.status(401).json({ err })
    }
}

async function getShorestRelationshipBetweenProfiles(req, res) {
    try {
        let profile_a = req.body.profile_a
        let profile_b = req.body.profile_b

        let path = await profilesRelationship.getShorestRelationshipBetweenProfiles(profile_a, profile_b)

        res.status(200).json({ path })
    } catch (err) {
        res.status(401).json({ err })
    }
}
/*
    WARNING:
    This controller is an alternative that we can use to created profiles massively
    but has a maximum of profiles (100).
    we recommend using command. 
        Example: npm run seed profiles <numberOfProfiles> <maxOfRelationshipPerProfile>
*/

async function seedProfiles(req, res) {
    try {
        let numberOfProfiles = req.params.numberOfProfiles
        let maxOfRelationshipPerProfile = req.params.maxOfRelationshipPerProfile
        if (!utils.isNumber(numberOfProfiles) || !utils.isNumber(maxOfRelationshipPerProfile)) throw 'The params could be numbers'

        numberOfProfiles = +(numberOfProfiles)
        maxOfRelationshipPerProfile = +(maxOfRelationshipPerProfile)

        await profilesSeeder.seedProfilesAndRelationship(numberOfProfiles > 100 ? 100 : numberOfProfiles,
            maxOfRelationshipPerProfile >= numberOfProfiles ? numberOfProfiles - 1 : maxOfRelationshipPerProfile)

        res.status(200).json({ status: 1 })
    } catch (err) {
        res.status(401).json({ err })
    }
}
exports.createProfile = createProfile
exports.getProfile = getProfile
exports.getProfileFriends = getProfileFriends
exports.updateProfile = updateProfile
exports.deleteProfile = deleteProfile
exports.seedProfiles = seedProfiles
exports.getShorestRelationshipBetweenProfiles = getShorestRelationshipBetweenProfiles
