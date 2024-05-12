import { APIGatewayProxyResult } from 'aws-lambda';
import { ApplicationError } from './domain/error';

export const status200 = (message: string): APIGatewayProxyResult => ({
    statusCode: 200,
    body: JSON.stringify({ message })
});

const status400 = (message: string): APIGatewayProxyResult => ({
    statusCode: 400,
    body: JSON.stringify({ message })
});

const status500 = (message: string): APIGatewayProxyResult => ({
    statusCode: 500,
    body: JSON.stringify({ message })
});

export const handleError = (err: ApplicationError): APIGatewayProxyResult => {
    switch (err.tag) {
        case 'DeserializationError':
            return status400(err.message);
        case 'PersistenceError':
            return status500(err.message);
        default:
            return status500('Unknown error');
    }
};
