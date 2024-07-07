const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');
// const { getDateString, getFilePath } = require('../shared/utils');
require('dotenv').config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);
const prompt = `
Generate a JSON object for a daily workout without equipment. The workout should include 3-5 exercises. Each exercise should have a name and the number of repetitions formatted as "sets x reps". Ensure the JSON follows this structure:

{
  "exercises": [
    { "name": "Exercise Name 1", "reps": "sets x reps" },
    { "name": "Exercise Name 2", "reps": "sets x reps" },
    ...
  ]
}

Here is an example:
{
  "exercises": [
    { "name": "Push-ups", "reps": "3 x 15" },
    { "name": "Squats", "reps": "3 x 20" },
    { "name": "Pull-ups", "reps": "3 x 10" },
    { "name": "Burpees", "reps": "3 x 12" }
  ]
}
`;

const getDateString = (date) => {
  return date.toISOString().split('T')[0];
}

const getFilePath = (dirPath, dataString) => {
  return path.join(dirPath, 'workout-' + dataString + '.json');
}

async function generateWorkout() {
  try {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const date = new Date()
    var dateString = getDateString(date);
    var filePath = getFilePath(dirPath, dateString);

    if (fs.existsSync(filePath)){
      console.log(`The file ${filePath} already exists`);
      date.setDate(date.getDate() + 1);
      dateString = getDateString(date);
      filePath = getFilePath(dirPath, dateString);
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "user", "content": prompt}],
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const message = response.choices[0].message.content;
    const jsonObject = JSON.parse(message);
    jsonObject.date = dateString;
    const workout = JSON.stringify(jsonObject, null, 2);

    fs.writeFile(filePath, workout, (err) => {
      if (err) {
        console.error('Error writing workout.json:', err);
      } else {
        console.log('Workout ' + filePath + ' generated!');
      }
    });

    const latestFilePath = path.join(dirPath, 'latest.txt');
    fs.writeFile(latestFilePath, filePath, (err) => {
      if (err) {
        console.error('Error writing latest.txt:', err);
      } else {
        console.log('Latest workout is now ' + filePath);
      }
    });

  } catch (error) {
    console.error('Error generating workout:', error.response ? error.response.data : error.message);
  }
}

generateWorkout();