# Learn Docker - DevOps with Node.js & Express

[Course vieo](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=394s)

## Commands

`docker build -t node-app-image .`
> Build image giving it a name

`docker image ls`
> Show created images

`docker run -v $(pwd):/app:ro -p 3000:3000 -d --name node-app node-app-image`
> Run image with sync code (read only), specifying the port, freeing the terminal with a name

`docker ps`
> Show images running

`docker rm node-app -f`
> Force remove docker image running

`docker exec -it node-app bash`
> Enter into docker image terminal
