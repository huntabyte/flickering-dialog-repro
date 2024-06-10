import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

type HTMLDivAttributes = HTMLAttributes<HTMLDivElement>;

export type OnChangeFn<T> = (value: T) => void;

type Primitive<T> = Omit<T, "style" | "id" | "children"> & { id?: string };
export type PrimitiveButtonAttributes = Primitive<HTMLButtonAttributes>;
export type PrimitiveDivAttributes = Primitive<HTMLDivAttributes>;

type AsChildProps<Props, SnippetProps, El> = {
	child: Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
	children?: never;
	asChild: true;
	el?: El;
	style?: {};
} & Omit<Props, "children" | "asChild">;

type DefaultProps<Props, El> = {
	asChild?: never;
	child?: never;
	children?: Snippet;
	el?: El;
	style?: {};
} & Omit<Props, "child" | "asChild">;

export type WithAsChild<
	Props,
	SnippetProps extends Record<PropertyKey, unknown> = {},
	El = HTMLElement
> = DefaultProps<Props, El> | AsChildProps<Props, SnippetProps, El>;

export type Arrayable<T> = T[] | T;

export type Fn = () => void;
// eslint-disable-next-line ts/no-explicit-any
export type AnyFn = (...args: any[]) => any;
