import { DynamoDB } from 'aws-sdk';

const {
  env: { IS_OFFLINE },
} = process;

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8080',
};

const isOffline = () => IS_OFFLINE;

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
