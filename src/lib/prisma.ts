import { PrismaClient } from '@prisma/client';

import { browser } from '$app/environment';

let prisma: PrismaClient;
if (!browser) {
	prisma = global.__prisma || new PrismaClient();
}

export { prisma };
