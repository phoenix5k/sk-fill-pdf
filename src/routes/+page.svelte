<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	import type { Establishment } from '@prisma/client';

	import { Step, Stepper } from '@skeletonlabs/skeleton';

	import { PDFDocument } from 'pdf-lib';
	import blank from '$lib/public/blank.pdf';

	import { Plane } from 'svelte-loading-spinners';

	export let data: PageData;

	let pdfDoc: PDFDocument;

	onMount(async () => {
		const pdf = await fetch(blank).then((res) => res.arrayBuffer());
		var bytes = new Uint8Array(pdf);
		pdfDoc = await PDFDocument.load(bytes);
	});

	let establishments = data.establishments;
	let foundEstablishments: any[] = [];

	let addressBoxHidden = true;
	let selectedEstablishment: Establishment;

	function searchEstablishments(value: any) {
		if (value == '') {
			return (addressBoxHidden = true);
		}

		foundEstablishments = establishments.filter((establishment: any) => {
			return (
				establishment.name.toLowerCase().includes(value.toLowerCase()) ||
				establishment.address.toLowerCase().includes(value.toLowerCase()) ||
				establishment.zip.toLowerCase().includes(value.toLowerCase()) ||
				establishment.city.toLowerCase().includes(value.toLowerCase())
			);
		});

		if (foundEstablishments.length > 0) {
			addressBoxHidden = false;
		}
	}

	let lockedSteps = [true, true];

	let generatedLock = false;
	let downloadUrl = '';

	function itemSelected(item: Establishment) {
		selectedEstablishment = item;
		lockedSteps = [false, true];
	}

	async function onNextHandler(e: Event): Promise<void> {
		const currentStep = e.detail.state.current;

		if (currentStep == 1) {
			generatedLock = true;

			await new Promise((r) => setTimeout(r, 1500));

			const address = `${selectedEstablishment.address} ${selectedEstablishment.zip} ${selectedEstablishment.city}`;

			const form = pdfDoc.getForm();
			const nameField = form.getTextField('estName');
			const addressField = form.getTextField('estAddress');

			nameField.setText(selectedEstablishment.name);
			addressField.setText(address);

			const pdfBytes = await pdfDoc.save();
			const blob = new Blob([pdfBytes], { type: 'application/pdf' });
			downloadUrl = URL.createObjectURL(blob);

			generatedLock = false;
		}
	}
</script>

<svelte:head>
	<title>PDF Filler</title>
</svelte:head>

<div class="container h-full mx-auto w-11/12 md:w-3/4 justify-center items-center">
	<div class="space-y-10 text-center">
		<div class="mt-10 card variant-soft-surface">
			<Stepper on:next={onNextHandler}>
				<Step locked={lockedSteps[0]}>
					<svelte:fragment slot="header">Start typing to search</svelte:fragment>
					<label class="label">
						<input
							autocomplete="off"
							type="text"
							class="w-3/4 variant-ringed"
							placeholder="Start typing"
							name="associatedData"
							on:input={(e) => {
								if (e.target) {
									searchEstablishments(e.target.value);
								}
							}}
						/>
					</label>
					<div class=" mt-10 {addressBoxHidden ? 'hidden' : ''}">
						{#if foundEstablishments.length == 0}
							<h5 class="text-primary-400">No matching addresses</h5>
						{:else}
							<h5 class="text-primary-400">Matching addresses</h5>

							<nav class="py-5 list-nav">
								<ul class="">
									{#each foundEstablishments as item, index}
										<li class="">
											<a
												class={selectedEstablishment?.id == item.id
													? 'text-primary-400 !bg-surface-700 bg-opacity-70'
													: ''}
												href="/"
												on:click={() => {
													itemSelected(item);
												}}
											>
												<span class="md:ml-3"
													><span class="pr-2">📍</span><strong class="whitespace-normal"
														>{item.name}</strong
													>
													- <span class="whitespace-normal">{item.address}</span></span
												>
											</a>
										</li>
									{/each}
								</ul>
							</nav>
						{/if}
					</div>
				</Step>

				<Step buttonComplete="false" buttonCompleteLabel="" locked={lockedSteps[1]}>
					{#if generatedLock}
						<center><Plane size="60" color="#FF3E00" unit="px" duration="1s" /></center>
					{:else}
						<a href={downloadUrl} class="mb-5 btn w-2/3 variant-form-material"> Download PDF </a>
					{/if}
				</Step>
			</Stepper>
		</div>
	</div>
</div>
