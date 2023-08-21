import { PrismaClient } from '@prisma/client/edge';
export interface Env {
	DATABASE_URL: string;
}

// keeping this to be any to avoid multiple instantiation
let client: PrismaClient;

export function prisma(env: Env) {
	if (client) {
		return client;
	}

	client = new PrismaClient({
		datasources: {
			db: {
				url: env.DATABASE_URL,
			},
		},
	});

	return client;
}
