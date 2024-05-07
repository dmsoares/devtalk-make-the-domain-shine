// Step 03
// Building a person from a name

import { Just, Maybe, Nothing } from '../../maybe';
import { Name } from '../../name';
import { Person } from '../../person';

const string = 'Virginia';

const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

// we would like to apply createPerson to the result of applying parseName to string
// in other words, we would like to compose createPerson and parseName

// but... we can't do this directly because createPerson expects a Name and parseName returns a Maybe<Name>
const parseNameAndCreatePerson = (string: string) => createPerson(parseName(string));
//                                                                ^ Error: Argument of type 'Maybe<Name>'
//                                                                  is not assignable to parameter of type 'Name'
