import type { Snippet } from "svelte";
import type { PresenceLayerProps } from "../utilities/presence-layer/types.js";
import type {
	OnChangeFn,
	PrimitiveButtonAttributes,
	PrimitiveDivAttributes,
	WithAsChild,
} from "$lib/internal/types.js";
import type { PortalProps } from "$lib/utilities/portal/index.js";
import type { EventCallback } from "$lib/internal/mergeProps.js"

type DialogRootPropsWithoutHTML = {
	/**
	 * The open state of the dialog.
	 */
	open?: boolean;

	/**
	 * A callback that is called when the popover's open state changes.
	 */
	onOpenChange?: OnChangeFn<boolean>;

	children?: Snippet;
};

export type DialogRootProps = DialogRootPropsWithoutHTML;

type DialogContentPropsWithoutHTML = WithAsChild<PresenceLayerProps>;

export type DialogContentProps = DialogContentPropsWithoutHTML & PrimitiveDivAttributes

type DialogOverlayPropsWithoutHTML = WithAsChild<PresenceLayerProps>;
export type DialogOverlayProps = DialogOverlayPropsWithoutHTML &
	PrimitiveDivAttributes;

type DialogPortalPropsWithoutHTML = PortalProps;
export type DialogPortalProps = DialogPortalPropsWithoutHTML;

type DialogTriggerPropsWithoutHTML = WithAsChild<{
	onclick?: EventCallback<MouseEvent>;
}>;

export type DialogTriggerProps = DialogTriggerPropsWithoutHTML &
	PrimitiveButtonAttributes;

type DialogTitlePropsWithoutHTML = WithAsChild<{
	/**
	 * The heading level of the dialog title.
	 */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
}>;

export type DialogTitleProps = DialogTitlePropsWithoutHTML &
	PrimitiveDivAttributes;

type DialogClosePropsWithoutHTML = DialogTriggerPropsWithoutHTML;
export type DialogCloseProps = DialogTriggerProps;

type DialogDescriptionPropsWithoutHTML = WithAsChild<{}>;
export type DialogDescriptionProps = DialogDescriptionPropsWithoutHTML &
	PrimitiveDivAttributes;
