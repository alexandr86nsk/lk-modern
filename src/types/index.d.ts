export type CallbackFunctionType = <T>(args?: T) => void;

export type CallbackEventFunctionType<T> = (event: T) => void;
