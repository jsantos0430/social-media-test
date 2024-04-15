const profilesController = require('../controllers/profiles.controller')

module.exports = (router) => {
    router.post('/profiles/create', profilesController.createProfile)
    router.get('/profiles/:id', profilesController.getProfile)
    router.put('/profiles/:id', profilesController.updateProfile)
    router.delete('/profiles/:id', profilesController.deleteProfile)

    router.post('/profiles/seed/:numberOfProfiles/:maxOfRelationshipPerProfile', profilesController.seedProfiles)
    return router
}