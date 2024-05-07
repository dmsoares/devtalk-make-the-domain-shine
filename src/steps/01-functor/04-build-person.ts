// Step 04
// Building a person from a name

import { Just, Maybe, Nothing, isNothing } from '../../maybe';
import { Name } from '../../name';
import { Person } from '../../person';

const string = 'Virginia';

const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));

type CreatePerson = (name: Maybe<Name>) => Person;
const createPerson: CreatePerson = name => {
    if (isNothing(name)) {
        // what should we do here??
        throw new Error('Name is required');
    }
    return new Person(name.value);
};

// this now works because createPerson expects a Maybe<Name> and parseName returns a Maybe<Name>
const parseNameAndCreatePerson = (string: string) => createPerson(parseName(string));

// but... this violates the principle of least surprise:
// we would need to make sure that we handle the error in the calling code
// but the type signature of createPerson does not indicate that it can throw an error
