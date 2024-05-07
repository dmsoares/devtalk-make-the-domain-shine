import { Just, Maybe, Nothing, mapMaybe } from '../../maybe';
import { Name } from './name';
import { Person } from './person';

const invalidName = '';
const validName = 'Virginia';

const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

const nothing = mapMaybe(createPerson)(parseName(invalidName)); // { tag: 'Nothing' }
const justPerson = mapMaybe(createPerson)(parseName(validName)); // { tag: 'Just', value: Person { name: Name { value: 'Virginia' } }
