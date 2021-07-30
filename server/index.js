const PROTO_PATH = __dirname + "/../proto/employee.proto";

// 외부모듈
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// 내부모듈
const { generateReport } = require("../utils/generateReport");
const { paySalary } = require("../utils/paySalary");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const emloyee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  const server = new grpc.Server();
  server.addService(emloyee_proto.Employee.service, { paySalary, generateReport });
  server.bind("localhost:5555", grpc.ServerCredentials.createInsecure());
  server.start();
  console.log(grpc.status);
}

main();
