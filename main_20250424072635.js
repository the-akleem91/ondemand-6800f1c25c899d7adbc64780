
const axios = require('axios');

// Replace with your actual API key and external user ID
const API_KEY = '<replace_api_key>';
const EXTERNAL_USER_ID = '<replace_external_user_id>';

// Function to create a chat session
async function createChatSession() {
    try {
        const response = await axios.post('https://api-dev.on-demand.io/chat/v1/sessions', {
            agentIds: [],
            externalUserId: EXTERNAL_USER_ID
        }, {
            headers: {
                'apikey': API_KEY
            }
        });

        if (response.status === 201) {
            return response.data.data.id;
        } else {
            throw new Error('Failed to create chat session');
        }
    } catch (error) {
        console.error('Error creating chat session:', error);
    }
}

// Function to submit a query
async function submitQuery(sessionId, query) {
    try {
        const response = await axios.post(`https://api-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
            endpointId: 'predefined-openai-gpt4o',
            query: query,
            agentIds: [
                'plugin-1712327325',
                'plugin-1713962163',
                'plugin-1713954536',
                'plugin-1713958591',
                'plugin-1713958830',
                'plugin-1713961903',
                'plugin-1713967141'
            ],
            responseMode: 'sync',
            reasoningMode: 'medium'
        }, {
            headers: {
                'apikey': API_KEY
            }
        });

        if (response.status === 200) {
            console.log('Query response:', response.data);
        } else {
            throw new Error('Failed to submit query');
        }
    } catch (error) {
        console.error('Error submitting query:', error);
    }
}

// Main function to execute the API calls
async function main() {
    const sessionId = await createChatSession();
    if (sessionId) {
        await submitQuery(sessionId, 'Put your query here');
    }
}

main();
