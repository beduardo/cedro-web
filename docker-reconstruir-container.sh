docker stop cedro-web-container
docker rm cedro-web-container
docker run --name cedro-web-container --restart=always --network=rede_bistro -td -p 5000:80 cedro-web-image