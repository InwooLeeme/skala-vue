const getTemperatureScore = (temperature) => {
  if (temperature >= 15 && temperature <= 22) {
    return 30;
  }

  if (temperature >= 10 && temperature <= 26) {
    return 24;
  }

  if (temperature >= 5 && temperature <= 30) {
    return 15;
  }

  return 5;
};

const getRainScore = (rainProbability) => {
  if (rainProbability <= 0.1) {
    return 25;
  }

  if (rainProbability <= 0.3) {
    return 20;
  }

  if (rainProbability <= 0.5) {
    return 10;
  }

  if (rainProbability < 0.7) {
    return 5;
  }

  return 0;
};

const getWindScore = (windSpeed) => {
  if (windSpeed <= 3) {
    return 15;
  }

  if (windSpeed <= 5) {
    return 10;
  }

  if (windSpeed <= 8) {
    return 5;
  }

  return 0;
};

const getHumidityScore = (humidity) => {
  if (humidity >= 40 && humidity <= 65) {
    return 10;
  }

  if (humidity >= 30 && humidity <= 75) {
    return 7;
  }

  if (humidity >= 20 && humidity <= 85) {
    return 4;
  }

  return 0;
};

const getAirScore = (aqi) => {
  if (aqi <= 50) {
    return 20;
  }

  if (aqi <= 100) {
    return 14;
  }

  if (aqi <= 150) {
    return 7;
  }

  return 0;
};

export const calculateWalkScore = ({
  feelsLike,
  rainProbability,
  windSpeed,
  humidity,
  aqi,
}) => {
  let totalScore = 0;
  let maxScore = 0;

  const temperatureScore = getTemperatureScore(feelsLike);
  totalScore = totalScore + temperatureScore;
  maxScore = maxScore + 30;

  const windScore = getWindScore(windSpeed);
  totalScore = totalScore + windScore;
  maxScore = maxScore + 15;

  const humidityScore = getHumidityScore(humidity);
  totalScore = totalScore + humidityScore;
  maxScore = maxScore + 10;

  const hasRainData = rainProbability !== null && rainProbability !== undefined;
  const hasAirData = aqi !== null && aqi !== undefined;

  if (hasRainData) {
    const rainScore = getRainScore(rainProbability);
    totalScore = totalScore + rainScore;
    maxScore = maxScore + 25;
  }

  if (hasAirData) {
    const airScore = getAirScore(aqi);
    totalScore = totalScore + airScore;
    maxScore = maxScore + 20;
  }

  const finalScore = Math.round((totalScore / maxScore) * 100);
  let mustAvoid = false;

  if (hasRainData && rainProbability >= 0.7) {
    mustAvoid = true;
  }

  if (hasAirData && aqi >= 151) {
    mustAvoid = true;
  }

  let label;
  let shortLabel;
  let tagType;
  let progressStatus;

  if (mustAvoid || finalScore < 55) {
    label = '산책을 미루는 게 좋아요';
    shortLabel = '미루기';
    tagType = 'danger';
    progressStatus = 'exception';
  } else if (finalScore < 75) {
    label = '짧은 산책을 권장해요';
    shortLabel = '짧게';
    tagType = 'warning';
    progressStatus = 'warning';
  } else {
    label = '산책하기 좋은 시간이에요';
    shortLabel = '추천';
    tagType = 'success';
    progressStatus = 'success';
  }

  let complete = true;

  if (!hasRainData || !hasAirData) {
    complete = false;
  }

  return {
    score: finalScore,
    label: label,
    shortLabel: shortLabel,
    tagType: tagType,
    progressStatus: progressStatus,
    complete: complete,
  };
};

const getCityDate = (timestamp, timezoneOffset) => {
  return new Date((timestamp + timezoneOffset) * 1000);
};

const getDateKey = (date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getBestSlot = (slots) => {
  let bestSlot = null;

  for (const slot of slots) {
    if (bestSlot === null || slot.guide.score > bestSlot.guide.score) {
      bestSlot = slot;
    }
  }

  return bestSlot;
};

export const selectBestWalkTimes = (slots, timezoneOffset) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const cityNow = getCityDate(currentTimestamp, timezoneOffset);
  const todayKey = getDateKey(cityNow);

  const tomorrow = new Date(cityNow.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowKey = getDateKey(tomorrow);

  const todaySlots = [];
  const tomorrowMorningSlots = [];

  for (const slot of slots) {
    const localDate = getCityDate(slot.timestamp, timezoneOffset);
    const slotDateKey = getDateKey(localDate);
    const slotHour = localDate.getUTCHours();

    if (slot.timestamp >= currentTimestamp && slotDateKey === todayKey) {
      todaySlots.push(slot);
    }

    if (slotDateKey === tomorrowKey && slotHour >= 6 && slotHour < 12) {
      tomorrowMorningSlots.push(slot);
    }
  }

  return {
    today: getBestSlot(todaySlots),
    tomorrowMorning: getBestSlot(tomorrowMorningSlots),
  };
};

export const formatWalkTime = (timestamp, timezoneOffset) => {
  const startTime = getCityDate(timestamp, timezoneOffset);
  const endTime = getCityDate(timestamp + 3 * 60 * 60, timezoneOffset);

  const startHour = String(startTime.getUTCHours()).padStart(2, '0');
  const endHour = String(endTime.getUTCHours()).padStart(2, '0');

  return `${startHour}:00~${endHour}:00`;
};
