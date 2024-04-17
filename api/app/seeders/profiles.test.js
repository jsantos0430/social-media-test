const db = require('#resources/js/db.js')
const Redis = require("ioredis");
const profilesSeeder = require('./profiles')

jest.mock('ioredis')

beforeAll(async () => {
    await db.connect();
})
afterEach(async () => {
    await db.clean();
})
afterAll(async () => {
    await db.close();
})

test('Should be able to seed profiles into database', async () => {
    const mockMethod = jest.fn();
    Redis.mockImplementation(() => {
        return {
            hset: mockMethod
        }
    })

    let numberOfProfiles = 10
    let maxOfRelationshipPerProfile = 4
    let data = await profilesSeeder.seedProfilesAndRelationship(numberOfProfiles, maxOfRelationshipPerProfile)
    let firstProfile = data.profilesCreated[0]

    expect(data.profilesCreated).toHaveLength(numberOfProfiles);
    expect(data.relations).toHaveLength(numberOfProfiles);
    expect(firstProfile.first_name).toEqual(expect.any(String))
    expect(firstProfile.last_name).toEqual(expect.any(String))
})