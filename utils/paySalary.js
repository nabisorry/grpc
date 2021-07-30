const { employees } = require("../data/employee.js");
const _ = require("lodash");

function paySalary(call) {
  const employeeIdList = call.request.employeeIdList;

  _.each(employeeIdList, (employeeId) => {
    const employee = _.find(employees, { id: employeeId });
    if (employee) {
      const responseMessage = "Salary paid for ".concat(employee.firstName, ", ", employee.lastName);
      call.write({ message: responseMessage });
    } else {
      call.write({ message: "Employee with Id" + employeeId + "not found in record" });
    }
  });
  call.end();
}

exports.paySalary = paySalary;
