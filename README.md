# tweet-analytics
Using elastic search for analytics


## Requirements
- Elastic Search
- Nodejs


## Steps
- clone this repository
- `cd tweet-analytics`
- npm install
- run `node csv-to-json.js` to convert `input.csv` to `output.json` file
- run `node save-to-elasticsearch.js` to save the data at `index: tweets`
- run `node max-hashtags.js` to get the top 10 hashtags
