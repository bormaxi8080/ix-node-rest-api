'use strict';

import {google} from "googleapis";
import config from "../config.js";
import logger from "./Logger.js";
import fs from "fs";

const ENV = config.ENV;
const ENVConfig = config[ENV];

const googleDrive = ENVConfig.googleDrive;

const { clientId, clientSecret, redirectURI, refreshToken } = googleDrive;

const oauth2Client = new google.auth.OAuth2(
    clientId, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

const googleAPI = {
    /**
     * Sets file access rights to public
     * @param fileId
     * @returns {Promise<string>}
     * @private
     */
    async _setFilePublic(fileId) {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: "reader",
                    type: "anyone"
                }
            });

            const file = await drive.files.get({
                fileId,
                fields: "webContentLink"
            });

            logger.silly(JSON.stringify(file, null, 2));
            logger.silly(JSON.stringify(file.data, null, 2));
            logger.silly(JSON.stringify(file.data.webContentLink, null, 2));

            return file.data.webContentLink;
        } catch (error) {
            logger.error(error);
        }
    },

    /**
     * Sets file access rights to public
     * @returns {Promise<string>}
     * @private
     * @param folderId
     */
    async _setFolderPublic(folderId) {
        try {
            await drive.permissions.create({
                fileId: folderId,
                requestBody: {
                    role: "reader",
                    type: "anyone"
                }
            });

            const folder = await drive.files.get({
                fileId: folderId,
                fields: "webViewLink"
            });

            logger.silly(JSON.stringify(folder, null, 2));
            logger.silly(JSON.stringify(folder.data, null, 2));
            logger.silly(JSON.stringify(folder.data.webViewLink, null, 2));

            return folder.data.webViewLink;
        } catch (error) {
            logger.error(error);
        }
    },

    /**
     * Creates new Google Drive folder by folder name
     * @param folderName
     * @returns {Promise<{link: *, id}>}
     */
    async createFolder(folderName) {
        try {
            const createdFolder = await drive.files.create({
                requestBody: {
                    name: folderName,
                    mimeType: "application/vnd.google-apps.folder"
                }
            });
            logger.debug(JSON.stringify(createdFolder, null, 2));

            const link = await this._setFolderPublic(createdFolder.data.id);
            const id = createdFolder.data.id;
            return {
                id,
                link
            }
        } catch (error) {
            logger.error(error);
        }
    },

    /**
     * Uploads file to Google Drive
     * @param folderId
     * @param fileData
     * @returns {Promise<{link: *, id}>}
     */
    async uploadFile(folderId, fileData) {
        try {
            const createdFile = await drive.files.create({
                requestBody: {
                    name: fileData.originalFilename,
                    parents: [ folderId ],
                    mimeType: fileData.mimetype
                },
                media: {
                    mimeType: fileData.type,
                    body: fs.createReadStream(fileData.filepath)
                }
            });
            logger.debug(JSON.stringify(createdFile, null, 2));

            const link = await this._setFilePublic(createdFile.data.id);
            const id = createdFile.data.id;
            return {
                id,
                link
            }
        } catch (error) {
            logger.error(error);
        }
    },

    /**
     * Deletes file from Google Drive
     * @param fileId
     * @returns {Promise<GaxiosResponse<void>>}
     */
    async deleteFile(fileId) {
        try {
            return await drive.files.delete({
                fileId
            });
        } catch (error) {
            logger.error(error);
        }
    },

    /**
     * Deletes folder from Google Drive
     * @param folderId
     * @returns {Promise<GaxiosResponse<void>>}
     */
    async deleteFolder(folderId) {
        return await this.deleteFile(folderId);
    }
}

export default googleAPI;