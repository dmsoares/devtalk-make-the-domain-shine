import { Either, Left, Right } from '../../either';
import { ValidationError, WorkflowError } from './error';

const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });

export type ParseName = (string: string) => Either<WorkflowError, Name>;
export const parseName: ParseName = string =>
    string.length < 4 && string.length > 50
        ? Left(ValidationError('invalid name'))
        : Right(buildName(string));
