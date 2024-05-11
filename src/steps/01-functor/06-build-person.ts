// Step 06
// Building a person from a name

import { Just, Maybe, isNothing } from '../../maybe';
import { Name } from './name';
import { Person } from './person';

// it would be nice to re-use the original createPerson function,
// as this function may be coming from a library or another module
type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

type MaybeCreatePerson = (name: Maybe<Name>) => Maybe<Person>;
const maybeCreatePerson: MaybeCreatePerson = name =>
    isNothing(name) ? name : Just(createPerson(name.value));
