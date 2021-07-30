const PROTO_PATH = __dirname + "/../proto/employee.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  const client = new employee_proto.Employee("localhost:5555", grpc.credentials.createInsecure());

  const call = client.generateReport(function (error, response) {
    console.log("Reports successfully generated for: ", response.successfulReports);
    console.log("Reports failed since Following Employee Id's do not exist: ", response.failedReports);
  });

  const employeeIdList = [1, 10, 2];
  _.each(employeeIdList, function (employeeId) {
    call.write({ id: employeeId });
  });

  call.end();
}

main();
