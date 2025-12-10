
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { words, model: userModel } = await req.json();

        if (!words || !Array.isArray(words) || words.length === 0) {
            return NextResponse.json({ error: 'Words are required' }, { status: 400 });
        }

        const prompt = `
      Write a short, engaging story (approx 100 words) using the following words: ${words.join(', ')}.
      The story should be suitable for a language learner.
      Highlight the usage of these words naturally.
      Return the response as a JSON object with a "title" and a "content" field.
      The content should be the story text.
      IMPORTANT: Return ONLY valid JSON. No markdown code blocks.
    `;

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not defined in environment variables');
        }
        const model = userModel || 'gemini-1.5-flash'; // Fallback to flash if not provided
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || response.statusText);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Attempt to parse JSON from the response
        let storyData;
        try {
            // Clean up potentially remaining markdown
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            storyData = JSON.parse(cleanText);
        } catch (e) {
            // Fallback if JSON parsing fails
            storyData = {
                title: "Generated Story",
                content: text
            };
        }

        return NextResponse.json(storyData);
    } catch (error: any) {
        console.error('Story generation error:', error);
        // Mask the key for security but show enough to identify it
        const usedKey = (process.env.GOOGLE_GENERATIVE_AI_API_KEY || '').substring(0, 10) + '...';

        return NextResponse.json({
            error: error.message || 'Failed to generate story',
            details: error.toString(),
            debugKey: usedKey
        }, { status: 500 });
    }
}
