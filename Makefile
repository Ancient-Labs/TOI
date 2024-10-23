sclean:
	rm -fr ./server/dist/ 

sbuild:
	cd ./server/ && tsc

srun:
	cd ./api/ && deno run --watch --allow-read --allow-env --allow-net server.ts
