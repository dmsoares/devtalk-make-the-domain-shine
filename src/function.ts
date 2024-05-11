// credits to: https://github.com/gcanti/fp-ts/blob/a94d4f84d346da271e0450d7341b98e0a5739a0e/src/function.ts#L237
type Flow = <A extends ReadonlyArray<unknown>, B, C>(
    ab: (...a: A) => B,
    bc: (b: B) => C
) => (...a: A) => C;

export const flow: Flow =
    (ab, bc) =>
    (...a) =>
        bc(ab(...a));
