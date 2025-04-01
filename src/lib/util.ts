export type Branded<T> = T & {
    readonly _brand: unique symbol
}
