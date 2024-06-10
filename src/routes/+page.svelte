<script lang="ts">
	import * as Dialog from "$lib/dialog/index.js";
</script>

<div class="flex w-full items-center justify-center mt-8 flex-col">
	<p>Working fine in <code>next-143</code></p>
	<p>
		Change version in package.json to >=next-144 and open and close dialog
		twice to observe the behavior
	</p>
	<p>
		Note: Accessibility features have been slimmed down for minimal
		reproduction. To close the dialog you must click the "close" button
	</p>
</div>
<div class="preview flex min-h-[443px] w-full justify-center p-12 items-center">
	<Dialog.Root>
		<Dialog.Trigger
			class="inline-flex h-12 items-center
			justify-center whitespace-nowrap text-lg font-bold">
			Open Dialog
		</Dialog.Trigger>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
		<Dialog.Content
			class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-white p-5 shadow-popover outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[490px] md:w-full">
			<div class="flex w-full justify-center">
				<Dialog.Close class="text-xl font-bold">Close</Dialog.Close>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
