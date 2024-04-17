require('dotenv-safe').config();
const db = require('#resources/js/db.js')
const request = require('supertest');
const app = require('../../app.js')
const modelProfiles = require('#models/profiles.js')
const modelProfilesRelationship = require('#models/profilesRelationship.js')

beforeAll(async () => {
    await db.connect();
})
afterEach(async () => {
    await db.clean();
})
afterAll(async () => {
    await db.close();
})

const testProfile = () => {
    return {
        "_id": "662019d5594c0347bca66835", "first_name": "Keanu",
        "img": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/546.jpg",
        "last_name": "Grady", "phone": "368-517-8839 x6357",
        "address": "786 Waters Flat",
        "city": "South Rosario",
        "state": "Virginia",
        "zipcode": "26448-6635",
        "available": true
    }
}
test('Should be able to create a Profile', () => {
    const profileNew = testProfile()

    return request(app)
        .post('/api/profiles/create')
        .set('authorization', process.env.TOKEN_API)
        .send(profileNew)
        .expect(201)
        .then((res) => {
            let result = res.body
            expect(result).toHaveProperty('profileId')
            expect(result.profileId).toEqual(expect.any(String));
        })
})

test('Should be able to get a Profile', async () => {
    const profileNew = testProfile()
    await modelProfiles.create(profileNew)

    return request(app)
        .get(`/api/profiles/${profileNew._id}`)
        .set('authorization', process.env.TOKEN_API)
        .expect(200)
        .then((res) => {
            expect(res.body).toHaveProperty('profile');
            expect(res.body.profile).toEqual(
                expect.objectContaining({
                    _id: profileNew._id,
                    first_name: profileNew.first_name,
                    last_name: profileNew.last_name,
                })
            )
        })
})

test('Should be able to update a Profile', async () => {
    const profileNew = testProfile()
    await modelProfiles.create(profileNew)

    let params = { first_name: 'Jose', last_name: 'Santos' }
    return request(app)
        .put(`/api/profiles/${profileNew._id}`)
        .set('authorization', process.env.TOKEN_API)
        .send(params)
        .expect(200)
        .then((res) => {
            let result = res.body
            expect(result).toHaveProperty('_id');
            expect(result.first_name).toBe(params.first_name);
            expect(result.last_name).toBe(params.last_name);
        })
})

test('Should be able to delete a Profile', async () => {
    const profileNew = testProfile()
    await modelProfiles.create(profileNew)

    return request(app)
        .delete(`/api/profiles/${profileNew._id}`)
        .set('authorization', process.env.TOKEN_API)
        .expect(200)
        .then((res) => {
            let result = res.body
            expect(result).toHaveProperty('profileId');
            expect(result.profileId).toEqual(expect.any(String));
        })
})

test('Should be able to delete a Profile', async () => {
    const profileNew = testProfile()
    await modelProfilesRelationship.create({ profiles: profileNew, friends: [profileNew, profileNew] })

    return request(app)
        .get(`/api/profiles/all-friends/${profileNew._id}`)
        .set('authorization', process.env.TOKEN_API)
        .expect(200)
        .then((res) => {
            let result = res.body
            expect(result).toHaveProperty('friends');
            expect(result.friends).toHaveLength(2)
            expect(result.friends[0]).toEqual(
                expect.objectContaining({
                    _id: profileNew._id,
                    first_name: profileNew.first_name,
                    last_name: profileNew.last_name,
                })
            )
        })
})