module.exports = (on, config) => {
  // Create an array to store error logs
  const errorLogs = [];

  on('task', {
    // Task to save the error log
    saveErrorLog: (log) => {
      errorLogs.push(log);
      return null;
    },

    // Task to get all error logs
    getErrorLogs: () => {
      return errorLogs;
    },
  });

  on('after:run', (results) => {
    // Check if there were any failed tests
    const failedTests = results.tests.filter((test) => test.state === 'failed');

    if (failedTests.length > 0) {
      failedTests.forEach((test) => {
        test.commands.forEach((command) => {
          if (command.state === 'failed') {
            // Save the error log using the custom task
            cy.task('saveErrorLog', command);
          }
        });
      });
    }
  });
};
