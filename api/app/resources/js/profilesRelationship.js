const modelProfilesRelationship = require('../../models/profilesRelationship')
const modelProfiles = require('../../models/profiles')
const Graph = require('node-dijkstra')
const utils = require('./utils')

exports.getShorestRelationshipBetweenProfiles = async (profile_a, profile_b) => {
    try {
        let relations = await modelProfilesRelationship.find();

        const setProfileFriendsEdges = (friends) => {
            return friends.reduce((prev, curr) => {
                prev[curr._id] = 1;
                return prev;
            }, {})
        }

        const route = new Graph()
        for (let index = 0; index < relations.length; index++) {
            let relation = relations[index];
            route.addNode(relation.profiles._id.toString(), setProfileFriendsEdges(relation.friends))
        }

        let path = route.path(profile_a, profile_b)
        path = utils.parseStringToObjectId(path || [])
        path.splice(0, 1); path.splice(-1, 1)
        return await modelProfiles.find({ _id: { $in: path } }).select('img first_name last_name phone')
    } catch (err) {
        console.log(err)
    }
}