const path = require('path');

const getDateString = (date) => {
  return date.toISOString().split('T')[0];
}

const getFilePath = (dirPath, dataString) => {
  return path.join(dirPath, 'workout-' + dataString + '.json');
}

module.exports = { getDateString, getFilePath };
