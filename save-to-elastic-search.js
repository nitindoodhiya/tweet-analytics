const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

// Elasticsearch settings
const client = new Client({ node: 'http://localhost:9200' });
const INDEX_NAME = 'tweets';
const DOC_TYPE = '_doc';

// Path to your JSON file
const JSON_FILE_PATH = 'output.json';

async function indexDocuments(jsonData) {
    const batchSize = 50;
    let index = 0;

    while (index < jsonData.length) {
        const batch = jsonData.slice(index, index + batchSize);
        const body = batch.flatMap(doc => [{ index: { _index: INDEX_NAME } }, doc]);

        const { body: bulkResponse } = await client.bulk({ refresh: true, body });

        if (bulkResponse && bulkResponse.errors) {
            console.log('Bulk indexing errors:', bulkResponse.errors);
        } else {
            console.log('Indexed', index + batchSize,'/', jsonData.length, 'documents');
        }

        index += batchSize;
    }
}

async function main() {
    try {
        const jsonData = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));

        await indexDocuments(jsonData);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close Elasticsearch client
        await client.close();
    }
}

main();
