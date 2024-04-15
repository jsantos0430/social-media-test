const { faker } = require('@faker-js/faker'); 

module.exports = (numberOfProfiles) => {
    let profiles = []
    for (let index = 0; index < numberOfProfiles; index++) {
        profiles.push({
            id: index + 1,
            img: faker.image.avatar(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipcode: faker.location.zipCode(),
            available: true,
        })
    }
    return profiles
}