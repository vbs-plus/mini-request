/// <reference lib="es5"/>
/// <reference lib="es2015.core"/>

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
