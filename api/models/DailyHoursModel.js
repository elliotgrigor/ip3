
class DailyHoursModel {
  constructor(
    forDate,
    startTime,
    finishTime,
    dailyHours,
  ) {
    return {
      forDate: forDate,
      startTime: startTime,
      finishTime: finishTime,
      dailyHours: dailyHours,
    }
  }
}

module.exports = DailyHoursModel;
