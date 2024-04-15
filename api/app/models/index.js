const fs = require('fs')
const modelPath = `${__dirname}`

module.exports = () => {
    fs.readdirSync(modelPath).filter((file) => {
        const removeExtensionFromFile = (fileExt) => { return fileExt.split('.').slice(0, -1).join('').toString() }
        let modelFile = removeExtensionFromFile(file)
        return modelFile !== 'index' ? require(`./${modelFile}`) : ''
    })
}