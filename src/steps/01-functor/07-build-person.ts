// Step 07
// Building a person from a name

import { Just, Maybe, isNothing } from '../../maybe';
import { Name } from '../../name';
import { Person } from '../../person';

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

// let's see if we can generalize the enhanced createPerson function:
// createPersonOriginal is now an argument to createPerson
type MaybeCreatePerson = (f: CreatePerson) => (value: Maybe<Name>) => Maybe<Person>;
const maybeCreatePerson: MaybeCreatePerson = f => name =>
    isNothing(name) ? name : Just(f(name.value));
