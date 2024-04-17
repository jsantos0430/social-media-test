const profilesRelationship = require('./profilesRelationship')
const modelProfiles = require('../../models/profiles')
const Redis = require("ioredis");
const db = require('#resources/js/db.js')

jest.mock('ioredis')
beforeAll(async () => {
    await db.connect();
    let profiles = getTestProfiles()

    let profilesList = []
    Object.keys(profiles).forEach((key) => { profilesList.push(profiles[key]) })

    await modelProfiles.create(profilesList)
})

afterEach(async () => {
    await db.clean();
})
afterAll(async () => {
    await db.close();
})

const getTestProfiles = () => {
    let robertoProfile = {
        "_id": "661e8818177945a12f274317", "first_name": "Roberto",
        "last_name": "Stiedemann", "phone": "930-272-8158 x89832"
    }

    let juanProfile = {
        "_id": "661e8818177945a12f274319", "first_name": "Juan",
        "last_name": "Cartwright", "phone": "(846) 529-4166"
    }
    let maykelProfile = {
        "_id": "661e8818177945a12f27431b", "first_name": "Maykel",
        "last_name": "Nicolas", "phone": "425.883.5158 x19721"
    }
    let anaProfile = {
        "_id": "661e8818177945a12f27431d", "first_name": "Ana",
        "last_name": "Dooley", "phone": "1-476-896-0075"
    }
    let leoProfile = {
        "_id": "661e8818177945a12f27431f", "first_name": "Leo",
        "last_name": "Monahan", "phone": "463-540-2876 x721"
    }

    return { robertoProfile, juanProfile, maykelProfile, anaProfile, leoProfile }
}
test('Should be able to get the shorest path between two profiles', async () => {
    let profiles = getTestProfiles()
    Redis.mockImplementation(() => {
        return {
            hgetall: (hashName) => {
                return {
                    [profiles.robertoProfile._id]: JSON.stringify({ [profiles.anaProfile._id]: 1, [profiles.juanProfile._id]: 1 }),
                    [profiles.juanProfile._id]: JSON.stringify({ [profiles.maykelProfile._id]: 1 }),
                    [profiles.maykelProfile._id]: JSON.stringify({ [profiles.leoProfile._id]: 1 }),
                    [profiles.anaProfile._id]: JSON.stringify({ [profiles.leoProfile._id]: 1 }),
                }
            }
        }
    })
    let data = await profilesRelationship.getShorestRelationshipBetweenProfiles(profiles.robertoProfile._id, profiles.leoProfile._id)
    let anaProfile = data[0]

    expect(data).toHaveLength(1);
    expect(anaProfile).toHaveProperty('first_name', 'Ana')
    expect(anaProfile).toHaveProperty('last_name', 'Dooley')
})