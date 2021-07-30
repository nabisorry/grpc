const { employees } = require("../data/employee.js");
const _ = require("lodash");

function generateReport(call, callback) {
  const successfulReports = [];
  const failedReports = [];
  call.on("data", (employeeStream) => {
    const employeeId = employeeStream.id;
    const employee = _.find(employees, { id: employeeId });
    if (employee != null) {
      successfulReports.push(employee.firstName);
    } else {
      failedReports.push(employeeId);
    }
  });
  call.on("end", () => {
    callback(null, {
      successfulReports: successfulReports.join(),
      failedReports: failedReports.join(),
    });
  });
}

exports.generateReport = generateReport;
