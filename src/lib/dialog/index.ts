export { default as Root } from "./components/dialog.svelte";
export { default as Close } from "./components/dialog-close.svelte";
export { default as Portal } from "$lib/utilities/portal/portal.svelte";
export { default as Content } from "./components/dialog-content.svelte";
export { default as Overlay } from "./components/dialog-overlay.svelte";
export { default as Trigger } from "./components/dialog-trigger.svelte";

export type {
	DialogRootProps as RootProps,
	DialogCloseProps as CloseProps,
	DialogContentProps as ContentProps,
	DialogOverlayProps as OverlayProps,
	DialogTriggerProps as TriggerProps,
	DialogPortalProps as PortalProps
} from "./types.js";
