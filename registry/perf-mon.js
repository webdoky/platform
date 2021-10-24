const { performance, PerformanceObserver } = require('perf_hooks');

const markAndMeasure = (measureName, previousMark, currentMark) => {
  performance.mark(currentMark);
  performance.measure(measureName, previousMark, currentMark);
};

const mark = (label) => performance.mark(label);

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry.name, `${entry.duration.toFixed(2)}ms`);
  });
});
observer.observe({ entryTypes: ['measure'] });

module.exports = {
  start: () => performance.mark('timerStart'),
  end: () => perfMon.observer.disconnect(),
  observer,
  mark,
  markAndMeasure,
};
