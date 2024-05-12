import { Age } from '../age';
import { Name } from '../name';
import { Status } from '../status';

const sym: unique symbol = Symbol();

export type Person = {
    [sym]: typeof sym;
    name: Name;
    age: Age;
    status: Status;
};

export type CreatePerson = (name: Name) => (age: Age) => (status: Status) => Person;
export const createPerson: CreatePerson = name => age => status => ({
    [sym]: sym,
    name,
    age,
    status
});
