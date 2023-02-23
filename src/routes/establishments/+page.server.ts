import { prisma } from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const establishments = prisma.establishment.findMany();

	return { establishments };
}) satisfies PageServerLoad;

export const actions: Actions = {
	remove: async (request) => {
		const { id } = Object.fromEntries(await request.request.formData()) as Record<string, string>;

		const deletion = await prisma.establishment.delete({
			where: { id: parseInt(id) }
		});

		if (deletion) {
			return { status: 200 };
		} else {
			return { status: 500 };
		}
	}
};
