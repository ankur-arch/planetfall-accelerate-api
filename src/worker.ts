import { withAccelerate } from '@prisma/extension-accelerate';
import { Env, prisma } from './lib/db';
import { Router } from 'itty-router';

const router = Router();

router.get('/', async (request: Request, env: Env, ctx: ExecutionContext) => {
	return new Response(
		await prisma(env)
			.$extends(withAccelerate())
			.notes.findMany({
				take: 20,
				cacheStrategy: {
					ttl: 64_00,
				},
			})
			.withAccelerateInfo()
			.then((data) => JSON.stringify({ ...data }))
	);
});

router.get('/no-cache', async (request: Request, env: Env, ctx: ExecutionContext) => {
	return new Response(
		await prisma(env)
			.notes.findMany({
				take: 20,
			})
			.then((data) => JSON.stringify(data))
	);
});

export default {
	fetch: async (request: Request, env: Env, context: ExecutionContext) => {
		return router.handle(request, env, context);
	},
};
