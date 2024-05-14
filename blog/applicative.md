# Leveraging Functional Programming and ADTs in Typescript
## Part II: Applicative Functor

In the second part of the series, we'll go a step beyond what we did in the first part.

Whereas before we used the sum type `Maybe`, we'll now use the type `Either`. This type is also both a sum type and a Functor:

```typescript
// either.ts

interface Left<A> {
    readonly tag: 'Left';
    readonly left: A;
}

interface Right<A> {
    readonly tag: 'Right';
    readonly right: A;
}

export type Either<A, B> = Left<A> | Right<B>;

export const Left = <A>(left: A): Left<A> => ({ tag: 'Left', left });
export const Right = <A>(right: A): Right<A> => ({ tag: 'Right', right });

export const isLeft = <A, B>(m: Either<A, B>): m is Left<A> => m.tag === 'Left';
export const isRight = <A, B>(m: Either<A, B>): m is Right<B> => m.tag === 'Right';

// Functor implementation
type Map = <L, A, B>(f: (x: A) => B) => (mx: Either<L, A>) => Either<L, B>;
export const map: Map = f => mx => isLeft(mx) ? mx : Right(f(mx.right));
```

This type will also allows us to model computations that can fail. We'll use a `Left` value for that. But, differently to `Nothing`, `Left` carries a value that we'll use to store information about the error.

As you can see in the `map` implementation, the semantics are very similar to the `Maybe` type: we either propagate the `Left` value of the first errored computation or apply the mapped function to the value inside the `Right` constructor. This type can appear with different names in different languages, and is sometimes also known as the `Result` type.

### Setting the Stage: Creating Persons From Multiple Arguments

Again, let's establish our types (we'll leave the less interesting ones out):

```typescript
// name.ts

import * as E from 'either';

const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });

export const parseName = (string: string): Either<WorkflowError, Name> =>
    string.length < 4 && string.length > 50
        ? E.Left(ValidationError('invalid name'))
        : E.Right(buildName(string));
```

```typescript
// age.ts

import * as E from 'either';

const sym: unique symbol = Symbol();

export type Age = {
    [sym]: typeof sym;
    value: number;
};

const buildAge = (value: number): Age => ({ [sym]: sym, value });

export const parseAge = (age: number): E.Either<WorkflowError, Age> =>
    age < 0 || age > 120 ? E.Left(ValidationError('invalid age')) : E.Right(buildAge(age));
```

```typescript
// person.ts

const sym: unique symbol = Symbol();

export type Person = {
    [sym]: typeof sym;
    name: Name;
    age: Age;
    status: Status;
};

export type CreatePerson = (name: Name, age: Age, status: Status) => Person;
export const createPerson: CreatePerson = (name, age, status) => ({
    [sym]: sym,
    name,
    age,
    status
});
```

Let's proceed with our workflow:

```typescript
// we'll omit the import of the Either module from now on

const workflow = (rawName: string, rawAge: number) => {
    const createPerson = map(createPerson);
    //                       ^ Error: Target signature provides too few arguments.
    //                         Expected 3 or more, but got 1.
};
```
Unfortunately, `map` cannot handle functions with more than one argument. The error above is signaling that `map` will internally try to call `createPerson` with only 1 argument.

One possible approach is to manually unpack the `Either` values and pass them to `createPerson`:

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const name: Either<WorkflowError, Name> = parseName(rawName);
    const age: Either<WorkflowError, Age> = parseAge(rawAge);

    let result: Either<WorkflowError, Person>;

    if (isLeft(name)) {
        result = name;
    } else if (isLeft(age)) {
        result = age;
    } else {
        result = Right(createPerson(name.right, age.right, Active()));
        //       ^ we are applying `Right` to respect the type
        //         defined for `result`. Remember that `createPerson`
        //         returns a `Person`, but `result` has type Either<WorkflowError, Person>
    }

    return result;
};
```
This is a bit verbose. What can we do to make it more concise?

Let's first redefine `createPerson` to accept curried arguments. As we've seen in the first part, this gives us more flexibility, by allowing partial application.

```typescript
// person.ts

export const createPerson =
    (name: Name) =>
    (age: Age) =>
    (status: Status): Person => ({
        [sym]: sym,
        name,
        age,
        status
    });
```

We can now `map` `createPerson`, and apply it to the result of `parseName`, just as we did in part I of the series:

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const partiallyAppliedCreatePerson = map(createPerson)(parseName(rawName));
};
```

Only now, notice the type of `partiallyAppliedCreatePerson`: 

```typescript
const partiallyAppliedCreatePerson: Either<WorkflowError, (age: Age) => (status: Status) => Person>;
```

The partially applied `createPerson` is wrapped in an `Either` type! We seem to be in trouble! Let's brute-force our way through it:

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const name = parseName(rawName);
    const age = parseAge(rawAge);

    const partiallyAppliedCreatePerson = map(createPerson)(name);

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
```

As you could have guessed, this is not the end of the story...

### Harnessing the Power of Applicative Functors

Taking a step back, we can see how useful it would be to be able to apply the partially applied function that got wrapped inside the `Either` structure. In fact, though it is hard to see, that was exactly what we did with our brute-force approach!

We just need to abstract it away into its own pattern. That is exactly what an Applicative Functor is all about!

```typescript
// either.ts

type Pure = <L, A>(a: A) => Either<L, A>;
export const pure: Pure = Right;

type Ap = <L, A, B>(fab: Either<L, (a: A) => B>) => (fa: Either<L, A>) => Either<L, B>;
export const ap: Ap = fab => fa => isLeft(fab) ? fab : isLeft(fa) ? fa : Right(fab.right(fa.right));
```

`pure` is a simple enough function that all it does is to _lift_ some value into the `Either` type. It does that by applying the `Right` constructor to the value.

`ap` does exactly what we said we needed: it applies a wrapped function to a wrapped value, and produces a wrapped result.

Let's see how we can use this abstraction. Notice how we need to _lift_ the `Active` value, so that we can use `ap` on it.

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const result = ap(ap(map(createPerson)(parseName(rawName)))(parseAge(rawAge)))(
        pure(Active())
    );

    return result;
};
```

The next snippet is equivalent to the one above:

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const result = ap(ap(ap(pure(createPerson))(parseName(rawName)))(parseAge(rawAge)))(
        pure(Active())
    );

    return result;
};
```

That is because `map` can also be defined in terms of `ap` and `pure`: `const map = x => ap(pure(x))`. As an exercise, try to convince yourself that that is the case.

I can already hear your indignation, that is an ugly piece of code! I have to agree with you, and we'll get into that. As an aside, I mostly blame Typescript. This what it would look like in Haskell:

```haskell
workflow rawName rawAge =
    let result = 
        createPerson 
            <$> parseName rawName 
            <*> parseAge rawAge 
            <*> pure Active
    in result
```
We seem forever doomed to live with languages bearing the syntax of their imperative grandfathers... But I digress! Let's make this pattern easier on the eyes. What we need to do is to extract it into its own function. I'm calling it `liftA3` because that is its name in other languages. _lift_ means we are _lifting_ the function into another type (`Either` in this case) and _3_ stands for the number of arguments of that function. We can define others with a different arity.

```typescript
// either.ts

export const liftA3 = <L, A, B, C, D>(
    f: (a: A) => (b: B) => (c: C) => D,
    fa: Either<L, A>,
    fb: Either<L, B>,
    fc: Either<L, C>
): Either<L, D> => {
    const fab: Either<L, (a: A) => (b: B) => (c: C) => D> = pure(f);
    return ap(ap(ap(fab)(fa))(fb))(fc);
};
```

Once we have this utility function, we can simplify the above code a lot:

```typescript
const workflow = (rawName: string, rawAge: number) => {
    const result = liftA3(createPerson, parseName(rawName), parseAge(rawAge), pure(Active()));

    // we may need to match on it for further logic...
    if (isRight(result)) {
        doSomething(result.right);
    } else {
        reportError(result.left);
        //                 ^ this would carry an error such as
        //                   ValidationError('invalid name')
    }
};
```

And here we have it! I'd say this is pretty good for code that is doing so much behind the scenes. What do you think?

### Conclusion

Once again, the purpose of these examples is to nudge you into trying design patterns that may bring you advantages in certain situations.

In particular, the __Applicative Functor__ is a very useful and elegant pattern, that allows us to focus on the domain and business logic, while doing serious heavy-lifting in the background. And we barely scratched the surface. 

If you are interested, you can check libraries such as [fp-ts](https://gcanti.github.io/fp-ts/), with many implementations of functional programming patterns.