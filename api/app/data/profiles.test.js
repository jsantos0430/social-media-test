const profilesGetter =  require('./profiles')

test('Should be able to create random profiles when given the numbers', () => {
    let profiles = profilesGetter(10)
    let firstProfile = profiles[0]

    expect(profiles).toHaveLength(10);
    expect(firstProfile).toHaveProperty('first_name');
    expect(firstProfile.first_name).toEqual(expect.any(String))
    expect(firstProfile.last_name).toEqual(expect.any(String))
})