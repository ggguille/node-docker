# Learn Docker - DevOps with Node.js & Express

[Course vieo](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=394s)

## Commands

`docker build -t node-app-image .`
> Build image giving it a name

`docker image ls`
> Show created images

`docker run -v $(pwd):/app:ro --env-file ./.env -p 3000:4000 -d --name node-app node-app-image`
> Run image with sync code (read only), env variable (from file), specifying the port, freeing the terminal with a name

`docker ps`
> Show images running

`docker rm node-app -f`
> Force remove docker image running

`docker rm node-app -fv`
> Force remove docker image running and its volumes

`docker exec -it node-app bash`
> Enter into docker image terminal

`docker volume ls`
> Show volumes

`docker volume prune`
> Remove unused volumes

## Docker Compose Commands

`docker-compose up -d`
> Run docker images defined into the compose file

`docker-compose up -d --build`
> Run docker images defined into the compose file, forcing new build

`docker-compose down -v`
> Remove running docker images and its volumes
