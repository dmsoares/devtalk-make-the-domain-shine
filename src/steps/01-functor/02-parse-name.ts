// Step 02
// Parsing a name from a string

import { Just, Maybe, Nothing } from '../../maybe';
import { Name } from '../../name';

const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));

const name: Maybe<Name> = parseName('Virginia');
