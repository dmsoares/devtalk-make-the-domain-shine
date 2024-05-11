import * as M from '../../maybe';
import { Just, Maybe, isJust } from '../../maybe';
import { Age, parseAge } from './age';
import { parseName } from './name';
import { Person, createPerson0, createPerson1 } from './person';
import { Active, Status } from './status';

// Let's imagine a new scenario where a Person has both an Age and a Status, along with a Name.

// [show the person type]

const workflow0 = (name: string, age: string) => {
    // Unfortunately, `map` cannot handle functions with more than one argument.
    const maybeCreatePerson = M.map(createPerson0);
    //                                 ^ Error: Target signature provides too few arguments. Expected 3 or more, but got 1.'
};

// We need to manually unpack the `Maybe` values and pass them to `createPerson`.
const workflow1 = (name: string, age: string) => {
    const maybeName = parseName(name);
    const maybeAge = parseAge(age);

    let person;

    if (isJust(maybeName)) {
        if (isJust(maybeAge)) {
            person = createPerson0(maybeName.value, maybeAge.value, Active());
        } else {
            console.log('Age is required');
        }
    } else {
        console.log('Name is required');
    }
};

// This is a bit verbose. What can we do to make it more concise?

// Let's first redefine `createPerson` to accept curried arguments.
// [show the curried `createPerson` function]

// We can now use `map` to apply `createPerson` to a `Maybe` value.

const workflow2 = (name: string, age: string) => {
    const maybeCreatePerson = M.map(createPerson1);
};

// [show the drawings of applying `map` to `createPerson`]
// [what is the type of `maybeCreatePerson`?]

const workflow3 = (name: string, age: string) => {
    const maybeName = parseName(name);
    const maybeAge = parseAge(age);

    const maybeCreatePerson = M.map(createPerson1);

    // Once we apply it to the first argument, we get a new function wrapped in Maybe.
    const maybeCreatePerson1: Maybe<(age: Age) => (status: Status) => Person> =
        maybeCreatePerson(maybeName);
};

// But now we have a new problem: how do we apply it to the remaining arguments?

const workflow4 = (name: string, age: string) => {
    const maybeName = parseName(name);
    const maybeAge = parseAge(age);

    const maybeCreatePerson = M.map(createPerson1)(maybeName);

    let maybePerson;

    if (isJust(maybeCreatePerson)) {
        // We need to unpack the function from the Maybe and apply it to the remaining arguments.
        const createPerson1 = maybeCreatePerson.value;

        if (isJust(maybeAge)) {
            const maybePerson1 = createPerson1(maybeAge.value)(Active());
        } else {
            console.log('Age is required');
        }
    } else {
        console.log('Name is required');
    }
};

// Oh no! We are back to where we started :(
// Well, not quite. We can use the `Applicative` pattern to solve this problem as well.

// [show the drawings of the `ap` function]

// [show Ap implementation]

const workflow5 = (name: string, age: string) => {
    const maybePerson = M.ap(M.ap(M.map(createPerson1)(parseName(name)))(parseAge(age)))(
        Just(Active())
    );
};

// Let's abstract this pattern into a function. We will call it `liftA3`, where `3` stands for the number of arguments.

const workflow6 = (name: string, age: string) => {
    const maybePerson = M.liftA3(createPerson1, parseName(name), parseAge(age), Just(Active()));
};
