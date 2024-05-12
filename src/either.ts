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

// Functor
type Map = <L, A, B>(f: (x: A) => B) => (mx: Either<L, A>) => Either<L, B>;
export const map: Map = f => mx => isLeft(mx) ? mx : Right(f(mx.right));

// Applicative
type Pure = <L, A>(a: A) => Either<L, A>;
export const pure: Pure = a => Right(a);

type Ap = <L, A, B>(fab: Either<L, (a: A) => B>) => (fa: Either<L, A>) => Either<L, B>;
export const ap: Ap = fab => fa => isLeft(fab) ? fab : isLeft(fa) ? fa : Right(fab.right(fa.right));

export const liftA3 = <L, A, B, C, D>(
    f: (a: A) => (b: B) => (c: C) => D,
    fa: Either<L, A>,
    fb: Either<L, B>,
    fc: Either<L, C>
): Either<L, D> => {
    const fab: Either<L, (a: A) => (b: B) => (c: C) => D> = pure(f);
    return ap(ap(ap(fab)(fa))(fb))(fc);
};
