import { Either, Left, Right } from '../../either';
import { ValidationError, WorkflowError } from './error';

const sym: unique symbol = Symbol();

export type Age = {
    [sym]: typeof sym;
    value: string;
};

const buildAge = (value: string): Age => ({ [sym]: sym, value });

export const parseAge = (string: string): Either<WorkflowError, Age> => {
    try {
        const value = parseInt(string, 10);
        return isNaN(value) || value < 0 || value > 120
            ? Left(ValidationError('invalid age'))
            : Right(buildAge(value.toString()));
    } catch {
        return Left(ValidationError('invalid age'));
    }
};
