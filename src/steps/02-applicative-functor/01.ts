import { mapMaybe } from '../../maybe';
import { parseName } from './name';
import { createPerson } from './person';

const name = 'Virginia';

const age = '42';

const person = mapMaybe(createPerson)(parseName(name));
