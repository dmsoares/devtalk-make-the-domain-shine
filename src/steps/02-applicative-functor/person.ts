import { Age } from './age';
import { Name } from './name';

type Status = 'active' | 'inactive';

export class Person {
    constructor(readonly name: Name, readonly age: Age, readonly status: Status) {}
}

type CreatePerson = (name: Name) => (age: Age) => (status: Status) => Person;
export const createPerson: CreatePerson = name => age => status => new Person(name, age, status);
