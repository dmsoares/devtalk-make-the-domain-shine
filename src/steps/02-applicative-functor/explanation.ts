import { Either, Right, isLeft } from '../../either';
import * as E from '../../either';
import { Age, parseAge } from './age';
import { WorkflowError } from './error';
import { Name, parseName } from './name';
import { createPerson0, createPerson, Person } from './person';
import { Active, Status } from './status';

// Let's imagine a new scenario where a Person has both an Age and a Status, along with a Name.

// [show the person type]

const workflow0 = (rawName: string, rawAge: number) => {
    // Unfortunately, `map` cannot handle functions with more than one argument.
    const createPerson = E.map(createPerson0);
    //                         ^ Error: Target signature provides too few arguments. Expected 3 or more, but got 1.'
};

// We need to manually unpack the `Either` values and pass them to `createPerson`.
const workflow1 = (rawName: string, rawAge: number) => {
    const name: Either<WorkflowError, Name> = parseName(rawName);
    const age: Either<WorkflowError, Age> = parseAge(rawAge);

    let result: Either<WorkflowError, Person>;

    if (isLeft(name)) {
        result = name;
    } else if (isLeft(age)) {
        result = age;
    } else {
        result = Right(createPerson0(name.right, age.right, Active()));
        //       ^ we wrapped the result in `Right` to match the return type of `parseName` and `parseAge`
    }

    return result;
};

// This is a bit verbose. What can we do to make it more concise?

// Let's first redefine `createPerson` to accept curried arguments.
// [show the curried `createPerson` function]

// We can now use `map` to apply `createPerson` to a `Either` value.

const workflow = (rawName: string, rawAge: number) => {
    const tryCreatePerson = E.map(createPerson)(parseName(rawName));
};

// [show the drawings of applying `map` to `createPerson`]
// [what is the type of `maybeCreatePerson`?]

const workflow3 = (rawName: string, rawAge: number) => {
    const name = parseName(rawName);
    const age = parseAge(rawAge);

    // Once we apply it to the first argument, we get a new function wrapped in Either.
    const partiallyAppliedCreatePerson = E.map(createPerson)(name);
};

// But now we have a new problem: we need to unwrap the function and apply it to the remaining arguments.

const workflow4 = (rawName: string, rawAge: number) => {
    const name = parseName(rawName);
    const age = parseAge(rawAge);

    const partiallyAppliedCreatePerson = E.map(createPerson)(name);

    let result;

    if (isLeft(partiallyAppliedCreatePerson)) {
        result = partiallyAppliedCreatePerson;
    } else if (isLeft(age)) {
        result = age;
    } else {
        result = Right(partiallyAppliedCreatePerson.right(age.right)(Active()));
    }

    return result;
};

// Oh no! We are back to where we started :(
// Well, not quite. We can use the `Applicative` pattern to solve this problem as well.

// [show the drawings of the `ap` function]

// [show Ap implementation]

const workflow5 = (rawName: string, rawAge: number) => {
    const result = E.ap(E.ap(E.ap(E.pure(createPerson))(parseName(rawName)))(parseAge(rawAge)))(
        E.pure(Active())
    );

    return result;
};

// Ok, I admit, this is a bit hard to read.

// Let's abstract this pattern into a function. We will call it `liftA3`, where `3` stands for the number of arguments.

// [show the `liftA3` function]

const workflow6 = (rawName: string, rawAge: number) => {
    const result = E.liftA3(createPerson, parseName(rawName), parseAge(rawAge), E.pure(Active()));

    if (isLeft(result)) {
        console.error(result.left);
        return;
    }

    return result.right;
};
