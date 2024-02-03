const fs = require('fs');
const csv = require('csv-parser');
const { exit } = require('process');

// Path to the CSV file
const csvFilePath = 'input.csv';

// Array to hold the JSON objects
let jsonArray = [];

// Read the CSV file
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
        const { LikeCount } = data
        const tweetId = data['Tweet Id'];
        const res  = data.hashtag.slice(1,-1).replace(/'/g, '');
        let hashtags = res.split(',');
        let trimmedHashtags = hashtags.map((hashtag) => hashtag.trim())
        const filteredHashtags = trimmedHashtags.filter((hashtag) => hashtag !== '')
        const obj = {
            hashtags: filteredHashtags,
            likeCount: LikeCount,
            tweetId,
            datetime: data.Datetime,
        }
        jsonArray.push(obj);
    })
    .on('end', () => {
        const jsonFilePath = 'output.json';
        fs.writeFile(jsonFilePath, JSON.stringify(jsonArray, null, 4), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return;
            }
            console.log('Conversion complete!');
        });
    });
