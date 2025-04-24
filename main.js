
const axios = require('axios');

async function createChatSession(apiKey, externalUserId) {
    const url = 'https://api-dev.on-demand.io/chat/v1/sessions';
    const headers = {
        'apikey': apiKey,
        'Content-Type': 'application/json'
    };
    const body = {
        agentIds: [],
        externalUserId: externalUserId
    };

    try {
        const response = await axios.post(url, body, { headers });
        if (response.status === 201) {
            return response.data.data.id; // Extract session ID
        } else {
            throw new Error('Failed to create chat session');
        }
    } catch (error) {
        console.error('Error creating chat session:', error);
        throw error;
    }
}

async function submitQuery(apiKey, sessionId, query) {
    const url = `https://api-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`;
    const headers = {
        'apikey': apiKey,
        'Content-Type': 'application/json'
    };
    const body = {
        endpointId: 'predefined-openai-gpt4o',
        query: query,
        agentIds: [
            'plugin-1712327325', 'plugin-1713962163', 'plugin-1713954536',
            'plugin-1713958591', 'plugin-1713958830', 'plugin-1713961903',
            'plugin-1713967141'
        ],
        responseMode: 'sync',
        reasoningMode: 'medium'
    };

    try {
        const response = await axios.post(url, body, { headers });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to submit query');
        }
    } catch (error) {
        console.error('Error submitting query:', error);
        throw error;
    }
}

async function main() {
    const apiKey = '<replace_api_key>';
    const externalUserId = '<replace_external_user_id>';
    const query = 'Put your query here';

    try {
        const sessionId = await createChatSession(apiKey, externalUserId);
        const queryResponse = await submitQuery(apiKey, sessionId, query);
        console.log('Query Response:', queryResponse);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
```
