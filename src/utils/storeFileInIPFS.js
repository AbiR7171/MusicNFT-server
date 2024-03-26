const { NFTStorage, File, Blob } = require('nft.storage');
const { filesFromPaths } = require('files-from-path');

const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhEZDZmODk4YTAxNzFFYjYyNzY5MjU3NjY3NkNGN2E2RTJEZTdBMTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODc1MDg5OTg4OCwibmFtZSI6IkhxbmZ0cyBWMSJ9.ua-DvRSzBKMRZ3rflPnIvuPhz3o-_aS9rEi8X-xOG9w'
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
async function storeFileInIPFS(filePath, callback) {
    const files = await filesFromPaths([filePathForCSV + filePath]);
    // const cid = await client.storeBlob(files[0]);
    const cid = await client.storeDirectory(files);
    console.log("IPS: ", cid);
    return callback(cid);
}

module.exports = storeFileInIPFS