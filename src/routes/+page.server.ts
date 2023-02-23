import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import blankPdf from '$lib/blank.pdf';

export const load = (async () => {
	const establishments = prisma.establishment.findMany();

	return { establishments };
}) satisfies PageServerLoad;
