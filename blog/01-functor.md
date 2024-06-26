# Leveraging Functional Programming and ADTs in Typescript
## Part I: Functor

In the realm of software development, especially in the domain-driven design paradigm, clarity and safety are paramount. How do we ensure that our code not only functions correctly but also remains comprehensible and resilient to errors? One approach gaining traction for a few years now is the fusion of functional programming concepts with Algebraic Data Types (ADTs). In this article, we'll explore some scenarios that can help illustrate what programming with functional programming and ADTs can look like.

### Setting the Stage: Parsing Names and Creating Persons

Consider a scenario where we need to parse a name from a string and subsequently create a person object. 

First, let's establish our types:
```typescript
// name.ts
const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });
```

```typescript
// person.ts
const sym: unique symbol = Symbol();

export type Person = {
    [sym]: typeof sym;
    name: Name;
};

export type CreatePerson = (name: Name) => Person;
export const createPerson: CreatePerson = name => ({ [sym]: sym, name });
```

Traditionally, this process might involve techniques like exception handling. 

```typescript
// name.ts
const unsafeParseName = (string: string): Name => {
    if (string.length < 2 || string.length > 50) {
        throw new Error('Invalid name');
    }
    return buildName(string);
};
```

Though there is a place for it, one of the drawbacks of throwing exceptions is that the type signature says nothing about them. Also, when an exception is thrown, the control flow jumps to the nearest exception handler, which might be in a different part of the codebase, and may or may not be prepared to handle that error in a business-appropriate way. This can lead to unexpected behavior and make it difficult to reason about the program's control flow.

However, armed with functional programming principles and sum types, we can chart a more elegant course.

### Embracing Maybe: Handling Nullable Values

`Maybe` is a sum type that encapsulates the possibility of a value being absent.

In programming, a sum type, also known as a tagged union or disjoint union, is a type that can hold one of several different possible values, but only one at a time. It's called a "sum" type because the total number of possible values is the sum of the possible values of its constituent types.

We'll employ the `Maybe` type constructor to handle potential parsing errors:

```typescript
// maybe.ts
interface Nothing {
    readonly tag: 'Nothing';
}

interface Just<A> {
    readonly tag: 'Just';
    readonly value: A;
}

export type Maybe<A> = Nothing | Just<A>;

export const Nothing = (): Nothing => ({ tag: 'Nothing' });
export const Just = <A>(value: A): Just<A> => ({ tag: 'Just', value });

export const isNothing = <A>(m: Maybe<A>): m is Nothing => m.tag === 'Nothing';
export const isJust = <A>(m: Maybe<A>): m is Just<A> => !isNothing(m);
```

And define a new `parseName` function:

```typescript
// name.ts
import * as M from 'maybe'

type ParseName = (s: string) => Maybe<Name>;
const parseName: ParseName = string =>
    string.length < 4 && string.length > 50 ? M.Nothing() : M.Just(buildName(string));
```

Our initial attempt might look like this:
```typescript
const workflow = (name: string) => {
    const person: Person = createPerson(parseName(name));
    //                                  ^ Error: Argument of type 'Maybe<Name>'
    //                                    is not assignable to parameter of type 'Name'
};
```
But alas, `parseName` now returns a `Maybe<Name>`, necessitating a change in strategy. It's important to note that we simply don't want to redefine the `createPerson` to accept values of type `Maybe<Name>`. That function could be coming from a library, for example. Functional programming has modularity and composition as it greatest goals, which means we should find a way to reuse the original function in a new context. 

Let's begin by unwrapping this `Maybe<Name>`, and match on both the `Nothing` and `Just` cases:
```typescript
import * as M from 'maybe'

const workflow = (name: string) => {
    const maybeName = parseName(name);
    const maybePerson = M.isNothing(maybeName) ? M.Nothing() : M.Just(createPerson(maybeName.value))
};
```
What did we do here? Well, if creating a `Person` depends on a `Name` that may not exist then a `Person` may also not exist.

While functional, this approach introduces conditional complexity. There is a pattern here, though, which we can abstract away into its own structure.

### Harnessing the Power of Functors

Simply put, a Functor is a generic container with a `map` function. You may be familiar with the `map` method on arrays. That method is but an instance of a more general concept. If we look closely, whenever we call `map` we are transforming a function of type `(x: A) => B` into a new function of type `(xs: Array<A>) => Array<B>` and applying it to the array.

In much the same way, we want our `map` on `Maybe` to take a function of type `(x: A) => B` into a function of type `(mx: Maybe<A>) => Maybe<B>`:

```typescript
// maybe.ts

// we are using curried arguments for extra flexibility
type Map = <A, B>(f: (x: A) => B) => (mx: Maybe<A>) => Maybe<B>;
const map: Map = f => mx => M.isNothing(mx) ? mx : M.Just(f(mx.value));
```

By transforming our `Maybe` type into a Functor, we can simplify our original approach, and proceed with the workflow:

```typescript
import * as M from 'maybe'

const workflow = (name: string) => {
    const maybePerson = M.map(createPerson)(parseName(name));

    if (M.isJust(maybePerson)) {
        // we can now safely use the person
        const person = maybePerson.value;
    }
};
```

We can also map multiple times:
```typescript
import * as M from 'maybe'

const workflow = (name: string) => {
    const getNameFromPerson = (person: Person) => person.name;

    const maybePersonName = M.map(getNameFromPerson)(M.map(createPerson)(parseName(name)));
};
```

A different scenario where we want to create multiple `Person` objects from a list of unparsed strings, and simply ignore invalid ones:
```typescript
import * as M from 'maybe'

const workflow = (names: string[]) => {
    const persons = names
        .map(x => M.map(createPerson)(parseName(x)))
        .filter(M.isJust)
        .map(j => j.value);
};
```

Just for comparison, here's what it could look like had we used exceptions:
```typescript
const workflow = (names: string[]) => {
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
```

This, to my taste, is less declarative and it is harder to see what we are trying to achieve.

### Conclusion

In conclusion, I hope this small example can spark the curiosity to know more about functional programming and ADTs, in particular in contexts where the domain and business logic should take center stage.

If you are interested, you can check libraries such as [fp-ts](https://gcanti.github.io/fp-ts/), with many implementations of functional programming patterns.