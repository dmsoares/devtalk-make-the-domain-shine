// Step 01
// Building a person from a name

import { Name } from './name';
import { Person } from './person';

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);
