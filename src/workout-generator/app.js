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
Generate a JSON object for a workout without equipment. The workout should include 3-5 exercises. Each exercise should have a name and the number of repetitions formatted as "sets x reps". Ensure the JSON follows this structure:

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

function getFileName(dirPath, date){
  var dataString = date.toISOString().split('T')[0];
  return path.join(dirPath, 'workout-' + dataString + '.json');
}

async function generateWorkout() {
  try {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const date = new Date()
    var fileName = getFileName(dirPath, date);

    if (fs.existsSync(fileName)){
      console.log(`${fileName} already exists`);
      date.setDate(date.getDate() + 1);
      fileName = getFileName(dirPath, date);
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
    jsonObject.date = date;
    const workout = JSON.stringify(jsonObject, null, 2);

    fs.writeFile(fileName, workout, (err) => {
      if (err) {
        console.error('Error writing workout.json:', err);
      } else {
        console.log('Workout ' + fileName + ' generated!');
      }
    });


  } catch (error) {
    console.error('Error generating workout:', error.response ? error.response.data : error.message);
  }
}

generateWorkout();