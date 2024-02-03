# tweet-analytics
Using elastic search for analytics


## Requirements
- Elastic Search
- Nodejs


## Steps
- clone this repository `git clone https://github.com/nitindoodhiya/tweet-analytics.git`
- `cd tweet-analytics`
- npm install
- run `node csv-to-json.js` to convert `input.csv` to `output.json` file
- run `node save-to-elastic-search.js` to save the data at `index: tweets`
- run `node max-hashtags.js` to get the top 10 hashtags
