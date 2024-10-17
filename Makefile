sclean:
	rm -fr ./server/dist/ 

sbuild:
	cd ./server/dist/ && tsc

srun:
	nodemon ./server/dist/server.js
