import * as E from '../../either';
import { Either } from '../../either';
import { ValidationError, WorkflowError } from './error';

const sym: unique symbol = Symbol();

export type Age = {
    [sym]: typeof sym;
    value: number;
};

const buildAge = (value: number): Age => ({ [sym]: sym, value });

export const parseAge = (age: number): Either<WorkflowError, Age> =>
    age < 0 || age > 120 ? E.Left(ValidationError('invalid age')) : E.Right(buildAge(age));
