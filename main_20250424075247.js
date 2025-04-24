
const axios = require('axios');

async function createChatSession(apiKey, externalUserId) {
  try {
    const response = await axios.post('https://api-dev.on-demand.io/chat/v1/sessions', {
      agentIds: [],
      externalUserId: externalUserId
    }, {
      headers: {
        'apikey': apiKey
      }
    });

    if (response.status === 201) {
      return response.data.id;
    } else {
      throw new Error('Failed to create chat session');
    }
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}

async function submitQuery(apiKey, sessionId, query, responseMode = 'sync') {
  try {
    const response = await axios.post(`https://api-dev.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      agentIds: [
        'plugin-1712327325', 'plugin-1713962163', 'plugin-1713954536',
        'plugin-1713958591', 'plugin-1713958830', 'plugin-1713961903',
        'plugin-1713967141'
      ],
      responseMode: responseMode,
      reasoningMode: 'medium'
    }, {
      headers: {
        'apikey': apiKey
      },
      responseType: responseMode === 'stream' ? 'stream' : 'json'
    });

    if (responseMode === 'stream') {
      response.data.on('data', (chunk) => {
        console.log('Received chunk:', chunk.toString());
      });
    } else {
      if (response.status === 200) {
        console.log('Query response:', response.data);
      } else {
        throw new Error('Failed to submit query');
      }
    }
  } catch (error) {
    console.error('Error submitting query:', error);
    throw error;
  }
}

(async () => {
  const apiKey = '<replace_api_key>';
  const externalUserId = '<replace_external_user_id>';
  const query = 'Put your query here';

  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    await submitQuery(apiKey, sessionId, query, 'sync'); // Change 'sync' to 'stream' if needed
  } catch (error) {
    console.error('Error in chat process:', error);
  }
})();
