// Step 08
// Building a person from a name

import { Just, Maybe, isNothing } from '../../maybe';
import { Name } from './name';
import { Person } from './person';

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

type MaybeCreatePerson = <A, B>(f: (x: A) => B) => (value: Maybe<A>) => Maybe<B>;
const maybecreatePerson: MaybeCreatePerson = f => name =>
    isNothing(name) ? name : Just(f(name.value));
