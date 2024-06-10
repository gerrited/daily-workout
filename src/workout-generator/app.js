const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
require('dotenv').config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);
const prompt = `
Generate a JSON object for a daily crossfit workout without equipment. The workout should include the date of today and a list of exercises. Each exercise should have a name and the number of repetitions formatted as "sets x reps". Ensure the JSON follows this structure:

{
  "date": "YYYY-MM-DD",
  "exercises": [
    { "name": "Exercise Name 1", "reps": "sets x reps" },
    { "name": "Exercise Name 2", "reps": "sets x reps" },
    ...
  ]
}

Here is an example:
{
  "date": "2024-06-09",
  "exercises": [
    { "name": "Push-ups", "reps": "3 x 15" },
    { "name": "Squats", "reps": "3 x 20" },
    { "name": "Pull-ups", "reps": "3 x 10" },
    { "name": "Burpees", "reps": "3 x 12" }
  ]
}

Please generate a new workout for today.
`;

async function generateWorkout() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const date = new Date().toISOString().split('T')[0];
    const message = response.choices[0].message.content;
    const jsonObject = JSON.parse(message);
    jsonObject.date = date;
    const workout = JSON.stringify(jsonObject, null, 2);

    const dirPath = path.join(__dirname, 'data');
    const filePath = path.join(dirPath, 'workout-' + date + '.json');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFile(filePath, workout, (err) => {
      if (err) {
        console.error('Error writing workout.json:', err);
      } else {
        console.log('Workout ' + filePath + ' generated!');
      }
    });


  } catch (error) {
    console.error('Error generating workout:', error.response ? error.response.data : error.message);
  }
}

generateWorkout();