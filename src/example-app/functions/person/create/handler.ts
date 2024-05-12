import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as E from 'fp-ts/Either';
import { Either } from 'fp-ts/Either';
import { bind, either, liftA3 } from '../../../lib/either';
import { ApplicationError, DeserializationError, PersistenceError } from './domain/error';
import { Person, createPerson } from './domain/person';
import { parseName } from './domain/name';
import { parseAge } from './domain/age';
import { Active } from './domain/status';

interface CreatePersonDTO {
    name: string;
    age: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const person = bind(deserializeDTO(event.body), ({ name, age }) =>
        liftA3(createPerson, parseName(name), parseAge(age), E.right(Active()))
    );

    return either(
        person,
        async err => status400(err.message),
        async person =>
            either(
                await savePerson(person),
                err => status500(err.message),
                savedPerson => status200(JSON.stringify(savedPerson))
            )
    );
};

const deserializeDTO = (body: string | null): Either<ApplicationError, CreatePersonDTO> => {
    const { name, age } = JSON.parse(body ?? '{}');
    if (typeof name !== 'string' || typeof age !== 'string') {
        return E.left(DeserializationError('Invalid data'));
    }
    return E.right({ name, age });
};

const savePerson = async (person: Person): Promise<Either<ApplicationError, Person>> => {
    if (Math.random() < 0.2) {
        return E.left(PersistenceError('Failed to save person'));
    }
    return E.right(person);
};

const status200 = (message: string): APIGatewayProxyResult => ({
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
