<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
</script>

<div class="container mt-10 mx-auto flex justify-center items-center">
	<!--  -->
	<div class="card p-10 variant-soft-surface">
		<form
			method="POST"
			use:enhance={() => {
				return async ({ update, result }) => {
					if (result.data.status != 200) {
						return;
					}

					goto('/establishments');
				};
			}}
			action="?/new"
		>
			<label class="label">
				<span>Name</span>
				<input type="text" name="name" class="input variant-form-material" />
			</label>

			<label class="label">
				<span>Address</span>
				<input type="text" name="address" class="input variant-form-material" />
			</label>

			<label class="label">
				<span>City</span>
				<input type="text" name="city" class="input variant-form-material" />
			</label>

			<label class="label">
				<span>State</span>
				<input type="text" name="state" class="input variant-form-material" />
			</label>

			<label class="label">
				<span>Zip</span>
				<input type="text" name="zip" class="input variant-form-material" />
			</label>

			<button type="submit" class="w-full mt-5 btn variant-soft-success">Add</button>
		</form>
	</div>
</div>
