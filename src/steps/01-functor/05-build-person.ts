// Step 05
// Building a person from a name

import { Just, Maybe, Nothing, isNothing } from '../../maybe';
import { Name } from './name';
import { Person } from './person';

const string = 'Virginia';

const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));

// we know how to avoid exceptions... we can use Maybe:
type MaybeCreatePerson = (name: Maybe<Name>) => Maybe<Person>;
const maybeCreatePerson: MaybeCreatePerson = name =>
    isNothing(name) ? name : Just(new Person(name.value));

// parseNameAndCreatePerson now returns a Maybe<Person>
type ParseNameAndCreatePerson = (string: string) => Maybe<Person>;
const parseNameAndCreatePerson: ParseNameAndCreatePerson = string =>
    maybeCreatePerson(parseName(string));
