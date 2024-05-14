import * as E from '../../either';
import { Either } from '../../either';
import { ValidationError, WorkflowError } from './error';

const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });

export const parseName = (string: string): Either<WorkflowError, Name> =>
    string.length < 4 && string.length > 50
        ? E.Left(ValidationError('invalid name'))
        : E.Right(buildName(string));
