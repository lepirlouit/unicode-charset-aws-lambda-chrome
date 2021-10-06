```sh


mkdir -p ./home/sbx_user1051/.fonts
chmod -R 777 ./home

docker run --rm -v "$PWD"/home:/home -v "$PWD":/var/task:ro,delegated lambci/lambda:nodejs12.x handler.handler
```