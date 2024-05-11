import { isJust } from '../../maybe';
import { parseAge } from './age';
import { parseName } from './name';
import { createPerson } from './person';
import { Active } from './status';

// We need to manually unpack the `Maybe` values and pass them to `createPerson`.
const workflow1 = (name: string, age: string) => {
    const maybeName = parseName(name);
    const maybeAge = parseAge(age);

    let person;

    if (isJust(maybeName)) {
        if (isJust(maybeAge)) {
            person = createPerson(maybeName.value, maybeAge.value, Active());
        }
    }
};
