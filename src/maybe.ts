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

type Map = <A, B>(f: (x: A) => B) => (mx: Maybe<A>) => Maybe<B>;
export const map: Map = f => mx => isNothing(mx) ? mx : Just(f(mx.value));

type Ap = <A, B>(fab: Maybe<(a: A) => B>) => (fa: Maybe<A>) => Maybe<B>;
export const ap: Ap = fab => fa =>
    isNothing(fab) ? Nothing() : isNothing(fa) ? Nothing() : Just(fab.value(fa.value));

type LiftA3 = <A, B, C, D>(
    f: (a: A) => (b: B) => (c: C) => D,
    fa: Maybe<A>,
    fb: Maybe<B>,
    fc: Maybe<C>
) => Maybe<D>;
export const liftA3: LiftA3 = (f, fa, fb, fc) => ap(ap(map(f)(fa))(fb))(fc);
