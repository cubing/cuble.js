
.PHONY: deploy
deploy: 
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		--exclude .gitignore \
		--exclude .gitmodules \
		./ \
		cubing.net:~/wireless.cubing.net/
	echo "\nDone deploying. Go to https://wireless.cubing.net/\n"
