import {asyncHandler} from "../utils/asyncHandler.js";

import { fetchNasaData } from '../service/nasa.service.js';
import { getDayOfYear } from '../utils/date.helpers.js';
import { getPercentile } from '../utils/analytics.js';

export const getWeatherLikelihood = async (req, res) => {
  const { lat, lon, day_of_year } = req.query;

  if (!lat || !lon || !day_of_year) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const nasaData = await fetchNasaData(lat, lon);
    const paramsData = nasaData.properties.parameter;

    // 1. Parse raw data into a clean array of records
    const records = Object.keys(paramsData.T2M_MAX).map(dateStr => {
      if (paramsData.T2M_MAX[dateStr] < -900) return null; // Filter out missing data
      return {
        dayOfYear: getDayOfYear(dateStr),
        T2M_MAX: paramsData.T2M_MAX[dateStr],
        PRECTOTCORR: paramsData.PRECTOTCORR[dateStr],
        WS10M: paramsData.WS10M[dateStr],
        RH2M: paramsData.RH2M[dateStr]
      };
    }).filter(record => record !== null);

    // 2. Filter for the relevant time window (+/- 7 days)
    const requestedDay = parseInt(day_of_year);
    const window = 7;
    const relevantData = records.filter(record =>
      record.dayOfYear >= requestedDay - window && record.dayOfYear <= requestedDay + window
    );

    if (relevantData.length < 20) { // Not enough data for a meaningful analysis
        return res.status(200).json({ message: "Not enough historical data for a reliable analysis of this location and date." });
    }

    // 3. Calculate Percentile Thresholds
    const temps = relevantData.map(d => d.T2M_MAX);
    const precip = relevantData.map(d => d.PRECTOTCORR);
    const winds = relevantData.map(d => d.WS10M);
    const humidity = relevantData.map(d => d.RH2M);

    const hotThreshold = getPercentile(temps, 90);
    const coldThreshold = getPercentile(temps, 10);
    const wetThreshold = getPercentile(precip, 85);
    const windyThreshold = getPercentile(winds, 85);
    
    // 4. Calculate "Uncomfortable" metric (e.g., top 20% of temp AND top 20% of humidity)
    const uncomfortableTempThresh = getPercentile(temps, 80);
    const uncomfortableHumidThresh = getPercentile(humidity, 80);
    const uncomfortableDays = relevantData.filter(d =>
      d.T2M_MAX > uncomfortableTempThresh && d.RH2M > uncomfortableHumidThresh
    ).length;
    const uncomfortableProbability = relevantData.length > 0 ? uncomfortableDays / relevantData.length : 0;

    // 5. Build the final, clean JSON response
    const finalResponse = {
      location: { lat: parseFloat(lat), lon: parseFloat(lon) },
      query: { day_of_year: requestedDay, date_window_days: window * 2 + 1 },
      analysis: {
        total_historical_days_analyzed: relevantData.length,
        likelihoods: {
          very_hot: {
            probability: 0.10,
            description: `A 10% chance of the max temperature exceeding ${hotThreshold.toFixed(1)}°C.`
          },
          very_cold: {
            probability: 0.10,
            description: `A 10% chance of the max temperature being below ${coldThreshold.toFixed(1)}°C.`
          },
          very_wet: {
            probability: 0.15,
            description: `A 15% chance of daily precipitation exceeding ${wetThreshold.toFixed(2)} mm.`
          },
          very_windy: {
            probability: 0.15,
            description: `A 15% chance of average wind speed exceeding ${windyThreshold.toFixed(1)} m/s.`
          },
          uncomfortable: {
            probability: parseFloat(uncomfortableProbability.toFixed(2)),
            description: `A ${(uncomfortableProbability * 100).toFixed(0)}% chance of conditions being very hot and humid.`
          }
        }
      }
    };
    
    res.status(200).json(finalResponse);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadWeatherData = async (req, res) => {
  // We can implement this logic later if there's time
  res.status(501).send("Download endpoint not yet implemented.");
};