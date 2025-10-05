import express from 'express';

import {
  getWeatherLikelihood,
  downloadWeatherData
} from '../controllers/weather.controller.js';

const router = express.Router();

// Defines a GET route for /api/weather/likelihood
router.get('/likelihood', getWeatherLikelihood);

// Defines a GET route for /api/weather/download
router.get('/download', downloadWeatherData);

export default router;