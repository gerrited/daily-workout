const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);
const prompt = 'Create a random workout with exercises, reps, and sets for a full-body workout.';

function generateWorkout() {
  return {
    date: new Date().toLocaleDateString(),
    exercises: [
      { name: 'Push-ups', reps: `3 x ${Math.floor(Math.random() * 20) + 10}` },
      { name: 'Squats', reps: `3 x ${Math.floor(Math.random() * 30) + 20}` },
      { name: 'Pull-ups', reps: `3 x ${Math.floor(Math.random() * 15) + 5}` },
      { name: 'Burpees', reps: `3 x ${Math.floor(Math.random() * 20) + 10}` }
    ]
  };
}

async function generateAIWorkout() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const workout = response.choices[0]
    console.log('Generated Workout:\n', workout);
  } catch (error) {
    console.error('Error generating workout:', error.response ? error.response.data : error.message);
  }
}

generateAIWorkout();

const dirPath = path.join(__dirname, 'data');
const filePath = path.join(dirPath, 'workout.json');

// Verzeichnis erstellen, falls nicht vorhanden
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const workout = generateWorkout();
fs.writeFile(filePath, JSON.stringify(workout, null, 2), (err) => {
  if (err) {
    console.error('Error writing workout.json:', err);
  } else {
    console.log('Workout generated and saved successfully!');
  }
});
