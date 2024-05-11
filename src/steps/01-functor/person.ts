import { Name } from './name';

const sym: unique symbol = Symbol();

export type Person = {
    [sym]: typeof sym;
    name: Name;
};

export type CreatePerson = (name: Name) => Person;
export const createPerson: CreatePerson = name => ({ [sym]: sym, name });
