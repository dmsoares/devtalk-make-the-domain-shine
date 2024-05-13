import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as E from 'fp-ts/Either';
import { Either } from 'fp-ts/Either';
import { bind, either, liftA3 } from '../../../lib/either';
import { ApplicationError, DeserializationError } from './domain/error';
import { createPerson } from './domain/person';
import { parseName } from './domain/name';
import { parseAge } from './domain/age';
import { Active } from './domain/status';
import { handleError, status200 } from './error';
import { savePerson } from './services/save-person';

interface CreatePersonDTO {
    name: string;
    age: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const result = bind(deserializeDTO(event.body), ({ name, age }) =>
        liftA3(createPerson, parseName(name), parseAge(age), E.right(Active()))
    );

    return either(
        result,
        async err => handleError(err),
        async person =>
            either(await savePerson(person), handleError, savedPerson =>
                status200(JSON.stringify(savedPerson))
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
