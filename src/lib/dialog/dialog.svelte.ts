import { box } from "svelte-toolbelt";
import { getAriaExpanded, getDataOpenClosed } from "$lib/internal/attrs.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "$lib/internal/box.svelte.js";
import { createContext } from "$lib/internal/createContext.js";

const CONTENT_ATTR = "data-dialog-content";
const TRIGGER_ATTR = "data-dialog-trigger";
const OVERLAY_ATTR = "data-dialog-overlay";
const CLOSE_ATTR = "data-dialog-close";

type DialogRootStateProps = WritableBoxedValues<{
	open: boolean;
}>;

class DialogRootState {
	open: DialogRootStateProps["open"];
	contentNode = box<HTMLElement | null>(null);
	contentId = box.with<string | undefined>(() => undefined)
	titleId = box.with<string | undefined>(() => undefined)
	triggerId = box.with<string | undefined>(() => undefined)
	descriptionId = box.with<string | undefined>(() => undefined)

	constructor(props: DialogRootStateProps) {
		this.open = props.open;
	}

	openDialog() {
		if (this.open.value) return;
		this.open.value = true;
	}

	closeDialog() {
		if (!this.open.value) return;
		this.open.value = false;
	}

	createTrigger(props: DialogTriggerStateProps) {
		return new DialogTriggerState(props, this);
	}

	createContent(props: DialogContentStateProps) {
		return new DialogContentState(props, this);
	}

	createOverlay(props: DialogOverlayStateProps) {
		return new DialogOverlayState(props, this);
	}

	createClose() {
		return new DialogCloseState(this);
	}

	sharedProps = $derived.by(
		() =>
			({
				"data-state": getDataOpenClosed(this.open.value),
			}) as const
	);
}

type DialogTriggerStateProps = ReadableBoxedValues<{
	id: string;
}>;

class DialogTriggerState {
	#id: DialogTriggerStateProps["id"];
	#root: DialogRootState;

	constructor(props: DialogTriggerStateProps, root: DialogRootState) {
		this.#id = props.id;
		this.#root = root;
		this.#root.triggerId = this.#id
	}

	#onclick = () => {
		this.#root.openDialog();
	};

	props = $derived.by(
		() =>
			({
				id: this.#id.value,
				"aria-haspopup": "dialog",
				"aria-expanded": getAriaExpanded(this.#root.open.value),
				"aria-controls": this.#root.contentId,
				[TRIGGER_ATTR]: "",
				onclick: this.#onclick,
				...this.#root.sharedProps,
			}) as const
	);
}

class DialogCloseState {
	#root: DialogRootState;

	constructor(root: DialogRootState) {
		this.#root = root;
	}

	#onclick = () => {
		this.#root.closeDialog();
	};

	props = $derived.by(
		() =>
			({
				[CLOSE_ATTR]: "",
				onclick: this.#onclick,
				...this.#root.sharedProps,
			}) as const
	);
}


type DialogContentStateProps = ReadableBoxedValues<{
	id: string;
}>;

class DialogContentState {
	#id: DialogContentStateProps["id"];
	root: DialogRootState;

	constructor(props: DialogContentStateProps, root: DialogRootState) {
		this.#id = props.id;
		this.root = root;
		this.root.contentId = this.#id
	}

	props = $derived.by(
		() =>
			({
				id: this.#id.value,
				role: "dialog",
				"aria-describedby": this.root.descriptionId,
				"aria-labelledby": this.root.titleId,
				[CONTENT_ATTR]: "",
				...this.root.sharedProps,
			}) as const
	);
}

type DialogOverlayStateProps = ReadableBoxedValues<{
	id: string;
}>;

class DialogOverlayState {
	#id: DialogOverlayStateProps["id"];
	root: DialogRootState;

	constructor(props: DialogOverlayStateProps, root: DialogRootState) {
		this.#id = props.id;
		this.root = root;
	}

	props = $derived.by(
		() =>
			({
				id: this.#id.value,
				[OVERLAY_ATTR]: "",
				...this.root.sharedProps,
			}) as const
	);
}

const [setDialogRootContext, getDialogRootContext] = createContext<DialogRootState>("Dialog.Root");

export function useDialogRoot(props: DialogRootStateProps) {
	return setDialogRootContext(new DialogRootState(props));
}

export function useDialogTrigger(props: DialogTriggerStateProps) {
	return getDialogRootContext().createTrigger(props);
}



export function useDialogContent(props: DialogContentStateProps) {
	return getDialogRootContext().createContent(props);
}

export function useDialogOverlay(props: DialogOverlayStateProps) {
	return getDialogRootContext().createOverlay(props);
}


export function useDialogClose() {
	return getDialogRootContext().createClose();
}
