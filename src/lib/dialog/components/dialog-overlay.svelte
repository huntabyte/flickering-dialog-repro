<script lang="ts">
	import { box } from "svelte-toolbelt";
	import { useDialogOverlay } from "../dialog.svelte.js";
	import type { OverlayProps } from "../index.js";
	import { useId } from "$lib/internal/useId.svelte.js";
	import { mergeProps } from "$lib/internal/mergeProps.js";
	import PresenceLayer from "$lib/utilities/presence-layer/presence-layer.svelte";

	let {
		id = useId(),
		forceMount = false,
		asChild,
		child,
		children,
		el = $bindable(),
		...restProps
	}: OverlayProps = $props();

	const state = useDialogOverlay({
		id: box.with(() => id),
	});

	const mergedProps = $derived(mergeProps(restProps, state.props) as any);
</script>

<PresenceLayer {id} present={state.root.open.value || forceMount}>
	{#snippet presence({ present })}
		{#if asChild}
			{@render child?.({ props: mergeProps(mergedProps, { hidden: !present.value }) })}
		{:else}
			<div {...mergeProps(mergedProps, { hidden: !present.value })} bind:this={el}>
				{@render children?.()}
			</div>
		{/if}
	{/snippet}
</PresenceLayer>
