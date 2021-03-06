const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '/protos/user-manager.proto');
const userManagerImpl = require('./service-impls/user-service-impl');
const { appConfig } = process;

let packageDefinition = protoLoader.loadSync(PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
let server = new grpc.Server();
let UserManager = protoDescriptor.UserManager.service;
server.addService(UserManager, userManagerImpl);
server.bind(`${appConfig.address}:${appConfig.port}`, grpc.ServerCredentials.createInsecure());

module.exports = server;