<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
	let establishments = data.establishments;

	let toRemove: number = 0;
</script>

<svelte:head>
	<title>Establishments</title>
</svelte:head>

<div class="h-full">
	<div
		class="text-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-10 md:p-6 gap-4 items-center"
	>
		<!--  -->
		{#each establishments as item, index}
			<div class="card h-[225px] rounded-none backdrop-blur-lg !bg-opacity-5 hover:bg-primary-300">
				<header class="card-header text-primary-500"><strong>{item.name}</strong></header>
				<div class="p-4 text-secondary-500">
					<p>{item.address}</p>
					<p>{item.city}</p>
					<p>{item.state}</p>
					<p>{item.zip}</p>
				</div>
				<footer class="card-footer absolute bottom-0 w-full">
					<form
						method="POST"
						use:enhance={() => {
							return async ({ update, result }) => {
								console.log(result);

								if (result.data.status != 200) return;

								console.log('go');

								establishments = establishments.filter((item) => {
									return item.id != toRemove;
								});
							};
						}}
						action="?/remove"
					>
						<input type="hidden" name="id" value={item.id} />
						<button
							type="submit"
							on:click={() => {
								toRemove = item.id;
							}}
							class="btn variant-soft-error btn-sm text-warning-300">REMOVE</button
						>
					</form>
				</footer>
			</div>
		{/each}
	</div>
</div>

<div class="fixed bottom-0 left-0 m-4">
	<a href="/establishments/new" class="btn btn-lg variant-soft-success">+</a>
</div>
