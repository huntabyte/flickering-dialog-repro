<script lang="ts">
	import { box } from "svelte-toolbelt";
	import { useDialogContent } from "../dialog.svelte.js";
	import type { ContentProps } from "../index.js";
	import PresenceLayer from "$lib/utilities/presence-layer/presence-layer.svelte";
	import { mergeProps } from "$lib/internal/mergeProps.js";
	import { useId } from "$lib/internal/useId.svelte.js";

	let {
		id = useId(),
		asChild,
		children,
		child,
		el = $bindable(),
		forceMount = false,
		...restProps
	}: ContentProps = $props();

	const state = useDialogContent({
		id: box.with(() => id),
	});

	const mergedProps = $derived(mergeProps(restProps, state.props));
</script>

<PresenceLayer {...mergedProps} present={state.root.open.value || forceMount}>
	{#snippet presence({ present })}
		{#if asChild}
			{@render child?.({
				props: mergeProps(mergedProps, {
					hidden: !present.value,
				}),
			})}
		{:else}
			<div
				{...mergeProps(mergedProps, {
					hidden: !present.value,
					style: {
						pointerEvents: "auto",
					},
				})}
				bind:this={el}
			>
				{@render children?.()}
			</div>
		{/if}
	{/snippet}
</PresenceLayer>
