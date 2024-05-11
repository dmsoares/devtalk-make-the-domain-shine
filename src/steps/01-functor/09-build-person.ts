// Step 09
// Building a person from a name

import { Just, Maybe, isNothing } from '../../maybe';
import { Name } from './name';
import { Person } from './person';

type CreatePerson = (name: Name) => Person;
const createPerson: CreatePerson = name => new Person(name);

type MapMaybe = <A, B>(f: (x: A) => B) => (value: Maybe<A>) => Maybe<B>;
const mapMaybe: MapMaybe = f => mx => isNothing(mx) ? mx : Just(f(mx.value));

const maybeCreatePerson = mapMaybe(createPerson);
