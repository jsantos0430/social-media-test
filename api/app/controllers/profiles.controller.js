const modelProfiles = require('../models/profiles')
const profilesSeeder = require('../seeders/profiles')
const utils = require('../resources/js/utils')
async function createProfile(req, res) {
    try {
        let profileData = req.body
        let profile = new modelProfiles(profileData)
        profile.available = true;
        await profile.save()

        res.status(200).json({ profileId: profile._id })
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

        let profileFound = await modelProfiles.findByIdAndUpdate(id, profileData)

        res.status(200).json({ profileId: profileFound._id })
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
exports.updateProfile = updateProfile
exports.deleteProfile = deleteProfile
exports.seedProfiles = seedProfiles
