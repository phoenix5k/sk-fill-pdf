import { prisma } from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	new: async (request) => {
		const { name, address, city, state, zip } = Object.fromEntries(
			await request.request.formData()
		) as Record<string, string>;

		// TODO proper validation
		if (!name || !address || !city || !state || !zip) {
			return { status: 400 };
		}

		const creation = await prisma.establishment.create({
			data: {
				name,
				address,
				city,
				state,
				zip
			}
		});

		if (!creation) {
			return { status: 500 };
		}

		return { status: 200 };
	}
};
