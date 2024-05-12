import { Either, left, right } from 'fp-ts/Either';
import { ApplicationError, ValidationError } from '../error';

const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });

export type ParseName = (string: string) => Either<ApplicationError, Name>;
export const parseName: ParseName = string =>
    string.length < 4 && string.length > 50
        ? left(ValidationError('invalid name'))
        : right(buildName(string));
