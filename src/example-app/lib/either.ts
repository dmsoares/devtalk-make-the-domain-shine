import * as E from 'fp-ts/Either';
import { Either } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export const liftA3 = <L, A, B, C, D>(
    f: (a: A) => (b: B) => (c: C) => D,
    fa: Either<L, A>,
    fb: Either<L, B>,
    fc: Either<L, C>
): Either<L, D> => pipe(E.of(f), E.ap(fa), E.ap(fb), E.ap(fc));

export const bind = <L, A, B>(fa: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> =>
    pipe(fa, E.chain(f));

export const chain2 = <L, A, B, C>(
    fa: Either<L, A>,
    f: (a: A) => Either<L, B>,
    g: (b: B) => Either<L, C>
): Either<L, C> => pipe(fa, E.chain(f), E.chain(g));

export const either = <L, A, B>(fa: Either<L, A>, onLeft: (l: L) => B, onRight: (a: A) => B): B =>
    pipe(fa, E.fold(onLeft, onRight));

export const fold =
    <L, A, B>(onLeft: (l: L) => B) =>
    (onRight: (a: A) => B) =>
    (fa: Either<L, A>): B =>
        pipe(fa, E.fold(onLeft, onRight));
