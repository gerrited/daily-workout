const express = require('express');
// const { getDateString, getFilePath } = require('../../shared/utils');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const validator = require('validator');

const commitId = process.env.COMMIT_ID || 'unknown';
const shortCommitId = process.env.COMMIT_ID ? process.env.COMMIT_ID.substring(0, 7) : 'unknown';
const repoUrl = process.env.REPO_URL || '#';

const getDateString = (date) => {
  return date.toISOString().split('T')[0];
}

const getFilePath = (dirPath, dataString) => {
  return path.join(dirPath, 'workout-' + dataString + '.json');
}

const isValidDate = (dateString) => {
  return validator.isISO8601(dateString, { strict: true });
};

const getLatestWorkoutDate = () => {
  const latestFilePath = path.join(getDataFilePath(), 'latest.txt');
  return fs.readFileSync(latestFilePath);
};

const getWorkoutFilepath = (date) => {
  const dateString = getDateString(date);
  const dirPath = getDataFilePath();
  return getFilePath(dirPath, dateString);
}

const getDataFilePath = () => {
  return path.join(__dirname, '..', 'data');
};

const workoutExists = (date) => {
  const fileName = getWorkoutFilepath(date);
  return fs.existsSync(fileName);
}

const getWorkoutData = (date) => {
  const filename = getWorkoutFilepath(date);
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
};

const render = (res, dateString) => {
  const date = new Date(dateString);
  const workout = getWorkoutData(date);

  const previousDay = new Date(dateString);
  previousDay.setDate(previousDay.getDate() - 1);
  const previous = workoutExists(previousDay) ? getDateString(previousDay) : "";

  const nextDay = new Date(dateString);
  nextDay.setDate(nextDay.getDate() + 1);
  const next = workoutExists(nextDay) ? getDateString(nextDay) : "";

  res.render('index', { previous, next, workout, repoUrl, shortCommitId, commitId });
}

router.get('/', (_, res) => {
  const dateString = getLatestWorkoutDate();
  render(res, dateString);
});

router.get('/:date', (req, res) => {
  const dateString = req.params.date;

  if (!isValidDate(dateString)) {
    return res.status(400).send('Invalid date format');
  }

  const date = new Date(dateString);
  if (!workoutExists(date)) {
    return res.status(404).send('Workout file not found');
  }

  render(res, dateString);
});

module.exports = router;
