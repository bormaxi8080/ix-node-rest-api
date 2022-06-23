const { google } = require('googleapis');
const { googleDrive } = require('../config');
const fs = require("fs")

const { clientId, clientSecret, redirectURI, refreshToken } = googleDrive

const oauth2Client = new google.auth.OAuth2(
    clientId, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken })

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})


const googleAPI = {
    async _setFilePublic(fileId) {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone"
                }
            })

            const file = await drive.files.get({
                fileId,
                fields: "webContentLink"
            })

            console.log(file)
            console.log(file.data)
            console.log(file.data.webContentLink)

            return file.data.webContentLink
        } catch (e) {
            console.error(e)
        }
    },
    async uploadFile(fileData) {
        try {
            const createFile = await drive.files.create({
                requestBody: {
                    name: fileData.name,
                    mimeType: fileData.type
                },
                media: {
                    mimeType: fileData.type,
                    body: fs.createReadStream(fileData.path)
                }
            })
            console.log(createFile)

            const link = await this._setFilePublic(createFile.data.id)
            const id = createFile.data.id
            return {
                id,
                link
            }

        } catch (e) {
            console.error(e)
        }
    },
    async deleteFile(fileId) {
        try {
            const data = await drive.files.delete({
                fileId
            })

            return data
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = googleAPI