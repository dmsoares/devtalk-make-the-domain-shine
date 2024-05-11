import { Age } from './age';
import { Name } from './name';
import { Status } from './status';

const sym: unique symbol = Symbol();

export type Person = {
    [sym]: typeof sym;
    name: Name;
    age: Age;
    status: Status;
};

export type CreatePerson0 = (name: Name, age: Age, status: Status) => Person;
export const createPerson0: CreatePerson0 = (name, age, status) => ({
    [sym]: sym,
    name,
    age,
    status
});

export type CreatePerson1 = (name: Name) => (age: Age) => (status: Status) => Person;
export const createPerson1: CreatePerson1 = name => age => status => ({
    [sym]: sym,
    name,
    age,
    status
});
