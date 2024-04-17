const modelProfiles = require('../../models/profiles')
const Graph = require('node-dijkstra')
const utils = require('./utils')
const Redis = require("ioredis");

exports.getShorestRelationshipBetweenProfiles = async (profile_a, profile_b) => {
    try {
        const redis = new Redis();
        let relations = await redis.hgetall('profilesRelationship');

        Object.keys(relations).forEach((key) => { relations[key] = JSON.parse(relations[key])})
        const route = new Graph(relations)

        let path = route.path(profile_a, profile_b)
        path = utils.parseStringToObjectId(path || [])
        path.splice(0, 1); path.splice(-1, 1)

        return await modelProfiles.find({ _id: { $in: path } }).select('img first_name last_name phone')
    } catch (err) {
        // Add specialized error handling, like using newrelic or sentry
        console.log(err)
    }
}