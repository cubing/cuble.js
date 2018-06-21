
.PHONY: deploy
deploy: 
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		--exclude .gitignore \
		--exclude .gitmodules \
		./ \
		cubing.net:~/bluetooth.cubing.net/
	echo "\nDone deploying. Go to https://bluetooth.cubing.net/\n"
