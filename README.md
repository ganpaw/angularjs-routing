AngularJS Routing - Simple CRUD Static Web Application
==========
[Demo](http://ganpaw.github.io/angularjs-routing)
This is an AngularJS based static webapp for demonstration purpose.

![Alt text](/images/list.PNG?raw=true "List")

![Alt text](/images/create.PNG?raw=true "Create")

![Alt text](/images/update.PNG?raw=true "Update")


## Steps:

**1- Install http-server**

```
 npm install http-server -g
```

**2- Run http server**

```
http-server .
```

**3- Verify site running**
```
curl http://localhost:8080
```

##Using Docker:
**1- Build docker image based on NGINX**
```
docker build -t angular-routing:1.0 .
```
**2- Verify image**
```
docker images
```
**3- Run docker container**

```
docker run -d -p 8080:80 --name angular-routing-static-webapp angular-routing:1.0
```
**4- Verify site running**
```
curl http://localhost:8080
```
