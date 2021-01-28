export type CallbackFunctionType = <T>(args?: T) => void;

export type CallbackEventFunctionType<T> = (event: T) => void;

export type InferTypeFromArray<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer InferTypeFromArray
>
  ? InferTypeFromArray
  : never;

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type Nullable<T> = T | null;
