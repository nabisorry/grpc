const PROTO_PATH = __dirname + "/../proto/employee.proto";

// 외부모듈
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

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

  const employeeIdList = [1, 10, 2];
  const call = client.paySalary({ employeeIdList: employeeIdList });

  call.on("data", (msg) => {
    console.log(msg);
  });

  call.on("end", () => {
    console.log("All Salaries have been paid");
  });
}

main();
