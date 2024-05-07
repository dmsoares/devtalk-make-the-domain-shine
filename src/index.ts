import { Name } from './steps/01-functor/name';
import { Person } from './steps/01-functor/person';

// Example 1.
// Building a person with a name

const createPerson = (name: Name) => new Person(name);
