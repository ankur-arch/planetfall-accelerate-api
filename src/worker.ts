/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
	DATABASE_URL: string;
}

let client: PrismaClient;

const prisma = (env: Env) => {
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
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(
			await prisma(env)
				.$extends(withAccelerate())
				.notes.findMany({
					take: 20,
					cacheStrategy: {
						ttl: 3600,
					},
				})
				.then((data) => JSON.stringify(data))
		);
	},
};
