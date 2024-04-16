const profilesController = require('../controllers/profiles.controller')
const middAuth = require('../middlewares/auth')

module.exports = (router) => {
    router.post('/profiles/create', middAuth.verifyToken, profilesController.createProfile)
    router.get('/profiles/:id', middAuth.verifyToken, profilesController.getProfile)
    router.put('/profiles/:id', middAuth.verifyToken, profilesController.updateProfile)
    router.delete('/profiles/:id', middAuth.verifyToken, profilesController.deleteProfile)
    router.post('/profiles/shortest-relationship-between-profile', middAuth.verifyToken, profilesController.getShorestRelationshipBetweenProfiles)

    router.post('/profiles/seed/:numberOfProfiles/:maxOfRelationshipPerProfile', middAuth.verifyToken, profilesController.seedProfiles)
    return router
}