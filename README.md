AngularJS Routing - Simple CRUD Static Web Application
==========
This is an AngularJS based static webapp for demonstration purpose.

![Alt text](/images/list.PNG?raw=true "List")

![Alt text](/images/create.PNG?raw=true "Create")

![Alt text](/images/update.PNG?raw=true "Update")


#### Steps:

Install http-server

```
 npm install http-server -g
```

Run http server

```
http-server .
```

Verify site running
```
curl http://localhost:8080
```

#### Using Docker:
Build docker image based on NGINX
```
docker build -t angular-routing:1.0 .
```
Verify image
```
docker images
```
Run docker container

```
docker run -d -p 8080:80 --name angular-routing-static-webapp angular-routing:1.0
```
Verify site running
```
curl http://localhost:8080
```
