// Making the Domain shine with functional programming and ADTs

import { Just, Maybe, isJust, isNothing } from '../../maybe';
import { Name, parseName, unsafeParseName } from './name';
import { CreatePerson, Person, createPerson } from './person';

// Let's imagine a scenario where we would like to
// 1. parse a name from a string according to some domain rules
// 2. create a person from the name (this name has to be valid!)

// [show the name and person types]

const workflow0 = (name: string) => {
    const person: Person = createPerson(unsafeParseName(name));
};

// [show maybe type]

const workflow1 = (name: string) => {
    // Now `parseName` returns a `Maybe<Name>`.
    const person: Person = createPerson(parseName(name));
    //                                  ^ Error: Argument of type 'Maybe<Name>'
    //                                    is not assignable to parameter of type 'Name'
};

const workflow2 = (name: string) => {
    // We need to unpack the `Maybe<Name>` before we can pass `Name` to `createPerson`.
    const maybeName: Maybe<Name> = parseName(name);

    if (isNothing(maybeName)) {
        // this is not great... we created a Maybe<Name> to avoid exceptions in the first place!
        throw new Error('Name is required');
    }

    // We can now pass the `Name` to `createPerson`.
    const person: Person = createPerson(maybeName.value);
};

const workflow3 = (name: string) => {
    const maybeName = parseName(name);

    // We can use `isJust` to check if the `Maybe` contains a value.
    // If it doesn't, we can return the `Maybe` as is.
    // If it does, we can create a `Person` from the `Name` and wrap it in a `Maybe`.

    // This is already better than throwing an exception.
    const maybePerson = isNothing(maybeName) ? maybeName : Just(createPerson(maybeName.value));
};

// Still, it would be great if we could avoid the conditional
// expression altogether and focus on the business logic instead.

// Let's create a function to help us with this:

// `maybeCreatePerson` will take a `Maybe<Name>` and return a `Maybe<Person>`.
type MaybeCreatePerson1 = (name: Maybe<Name>) => Maybe<Person>;
const maybeCreatePerson1: MaybeCreatePerson1 = name =>
    isNothing(name) ? name : Just(createPerson(name.value));

// Voilà! Our function is now much cleaner.
const workflow4 = (name: string) => {
    const maybePerson = maybeCreatePerson1(parseName(name));
};

// Only, we don't want to be forced to define a new 'maybe*' version for every function.

// So let's generalize the 'maybe*' function, in 2 steps:

// 1. make the 'createPerson' function an argument to 'maybeCreatePerson'.
type MaybeCreatePerson2 = (f: CreatePerson) => (maybeName: Maybe<Name>) => Maybe<Person>;
const maybeCreatePerson2: MaybeCreatePerson2 = f => maybeName =>
    isNothing(maybeName) ? maybeName : Just(f(maybeName.value));

// 2. generalize the types of the arguments.
type MaybeCreatePerson3 = <A, B>(f: (x: A) => B) => (mx: Maybe<A>) => Maybe<B>;
const maybecreatePerson3: MaybeCreatePerson3 = f => mx => isNothing(mx) ? mx : Just(f(mx.value));

// 3. after step 2, we can see that it is no longer specific to 'createPerson'.
type MaybeFunction = <A, B>(f: (x: A) => B) => (mx: Maybe<A>) => Maybe<B>;
const maybeFunction: MaybeFunction = f => mx => isNothing(mx) ? mx : Just(f(mx.value));

// Let's use our new `maybeFunction`.
const workflow5 = (name: string) => {
    const maybePerson = maybeFunction(createPerson)(parseName(name));
};

// Our curried definition allows us to partially apply the function.
// Which, in turn, gives us more flexibility and expressiveness.

// Let's imagine a scenario where we would like to keep only valid persons.
const workflow6 = (names: string[]) => {
    const persons = names
        .map(parseName)
        .map(maybeFunction(createPerson))
        .filter(isJust)
        .map(j => j.value);
};

// For comparison, let's express the same scenario with `unsafeParseName`.
const workflow7 = (names: string[]) => {
    const validNames: Name[] = [];
    names.forEach(name => {
        try {
            validNames.push(unsafeParseName(name));
        } catch (e) {
            // ignore invalid names
        }
    });
    const persons = validNames.map(createPerson);
};

// [pros and cons of the two approaches]

// Let's pause for a bit and reflect on what we've achieved so far.
// [insert drawings of function composition with Maybe]
// [insert drawings of comparison with map on arrays]

// Here is the Maybe version of the map function.
type MapMaybe = <A, B>(f: (x: A) => B) => (mx: Maybe<A>) => Maybe<B>;
const mapMaybe: MapMaybe = f => mx => isNothing(mx) ? mx : Just(f(mx.value));

// This is a very well-known structure in functional programming and it is called a Functor.
// As a first approximation, you can think of it as a generic container with a `map` function.
// Here, we took the `Maybe` type and made it a Functor by defining a `map` function.

// We can now rewrite our `maybeFunction` using `mapMaybe`.
const workflow8 = (names: string[]) => {
    const persons = names
        .map(x => mapMaybe(createPerson)(parseName(x))) // returns `Maybe<Name>[]`
        .filter(isJust) // returns `Maybe<Person>[]`
        .map(j => j.value); // returns `Person[]`
};
