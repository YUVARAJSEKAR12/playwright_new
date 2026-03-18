require('dotenv').config();

exports.env = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  browserName: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false'
};