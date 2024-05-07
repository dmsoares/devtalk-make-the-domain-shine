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

type MapMaybe = <A, B>(f: (x: A) => B) => (value: Maybe<A>) => Maybe<B>;
export const mapMaybe: MapMaybe = f => mx => isNothing(mx) ? mx : Just(f(mx.value));
