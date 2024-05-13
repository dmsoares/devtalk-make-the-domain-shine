import * as E from 'fp-ts/Either';
import { Either } from 'fp-ts/Either';
import { ApplicationError, PersistenceError } from '../domain/error';
import { Person } from '../domain/person';

export const savePerson = async (person: Person): Promise<Either<ApplicationError, Person>> => {
    if (Math.random() < 0.2) {
        return E.left(PersistenceError('Failed to save person'));
    }
    return E.right(person);
};
