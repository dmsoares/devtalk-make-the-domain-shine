import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { TaskEither } from 'fp-ts/TaskEither';
import { Either } from 'fp-ts/Either';
import { liftA3 } from '../../../lib/either';
import { ApplicationError, DeserializationError } from './domain/error';
import { Person, createPerson } from './domain/person';
import { parseName } from './domain/name';
import { parseAge } from './domain/age';
import { Active } from './domain/status';
import { pipe } from 'fp-ts/function';

interface CreatePersonDTO {
    name: string;
    age: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const workflow = pipe(
        TE.fromEither(
            pipe(
                deserializeDTO(event.body),
                E.chain(({ name, age }) =>
                    liftA3(createPerson, parseName(name), parseAge(age), E.right(Active()))
                )
            )
        ),
        TE.chain(savePerson)
    );

    const result = await workflow();

    return E.match(
        error => status400(String(error)),
        () => status200('Person created')
    )(result);
};

const deserializeDTO = (body: string | null): Either<ApplicationError, CreatePersonDTO> => {
    const { name, age } = JSON.parse(body ?? '{}');
    if (typeof name !== 'string' || typeof age !== 'string') {
        return E.left(DeserializationError('Invalid data'));
    }
    return E.right({ name, age });
};

const savePerson = (person: Person): TaskEither<ApplicationError, Person> => {
    console.log('Saving person...');
    return TE.of(person);
};

const status200 = (message: string): APIGatewayProxyResult => ({
    statusCode: 200,
    body: JSON.stringify({ message })
});

const status400 = (message: string): APIGatewayProxyResult => ({
    statusCode: 400,
    body: JSON.stringify({ message })
});
