const { Client } = require('@elastic/elasticsearch');

// Create an Elasticsearch client instance
const client = new Client({ node: 'http://localhost:9200' }); // Update the URL with your Elasticsearch server URL

async function runAggregationQuery() {
    try {
        // Define your aggregation query
        const { aggregations } = await client.search({
            index: 'tweets', // Update with your index name
            body: {
                size: 0, // We don't need the hits, just the aggregation results
                aggs: {
                    "hashtags": {
                        "terms": {
                            "field": "hashtags.keyword",
                            "size": 10
                        }
                    }
                }
            }
        });

        console.log(aggregations.hashtags.buckets);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

// Call the function to run the aggregation query
runAggregationQuery();
