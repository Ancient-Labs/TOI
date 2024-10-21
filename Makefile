sclean:
	rm -fr ./server/dist/ 

sbuild:
	cd ./server/ && tsc

srun:
	nodemon ./server/dist/server.js
