<script>
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
</script>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">/> pdf filler</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer"> Home </a>
				<a class="btn btn-sm variant-ghost-surface" href="/establishments" rel="noreferrer">
					Establishments
				</a>
				{#if $page.url.pathname == '/establishments'}
					<a class="btn btn-sm variant-ghost-surface" href="/establishments/new" rel="noreferrer">
						Add Establishment
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
