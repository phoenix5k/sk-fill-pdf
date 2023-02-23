import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const establishments = prisma.establishment.findMany();

	return { establishments };
}) satisfies PageServerLoad;
