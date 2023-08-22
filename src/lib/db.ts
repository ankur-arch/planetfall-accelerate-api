import { PrismaClient } from '@prisma/client/edge';
export interface Env {
	DATABASE_URL: string;
}

export function prisma(env: Env) {
	return new PrismaClient({
		datasources: {
			db: {
				url: env.DATABASE_URL,
			},
		},
	});
}
