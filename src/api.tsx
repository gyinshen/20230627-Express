export interface OpenAIData {
  choices : {
    0 : {
      message : {
        content : string
      }
    }
  }
}

export async function fetchOpenAIData(query: string) {
  
  // const { query } = req.body as RequestBody
  
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    // body: JSON.stringify({ query }),
    body: JSON.stringify({
      model: 'gpt-3.5-turbo-16k',
      messages: [{ role: 'user', content: `${query}` }], // Use the request body data
      temperature: 0.3,
      // stream: true,
    }),
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      Authorization: `Bearer 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`,
    },
  });

  if (!res.ok) { 
    throw new Error('Something went wrong');
  }
  const data : OpenAIData = await res.json();
  
  return data
}