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

export const createPerson0 = (name: Name, age: Age, status: Status): Person => ({
    [sym]: sym,
    name,
    age,
    status
});

export const createPerson =
    (name: Name) =>
    (age: Age) =>
    (status: Status): Person => ({
        [sym]: sym,
        name,
        age,
        status
    });
