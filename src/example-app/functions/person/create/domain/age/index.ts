import { Either, left, right } from 'fp-ts/Either';
import { ApplicationError, ValidationError } from '../error';

const sym: unique symbol = Symbol();

export type Age = {
    [sym]: typeof sym;
    value: string;
};

const buildAge = (value: string): Age => ({ [sym]: sym, value });

export const parseAge = (string: string): Either<ApplicationError, Age> => {
    try {
        const value = parseInt(string, 10);
        return isNaN(value) || value < 0 || value > 120
            ? left(ValidationError('invalid age'))
            : right(buildAge(value.toString()));
    } catch {
        return left(ValidationError('invalid age'));
    }
};
