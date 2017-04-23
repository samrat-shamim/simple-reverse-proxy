# Simple reverse proxy server #

If you need to run multiple web server in one machine and map those servers with sub-domains, you can try this reverse proxy server


### How to start ###
* Install the package
```
npm install simple-reverse-proxy -g
```

* Create a json file with configuration data, sample is below-

```
{
  "sub-domain-1": "http://127.0.0.1:8081",
  "sub-domain-2": "http://127.0.0.1:8082",
  "sub-domain-3": "http://127.0.0.1:8083"
}
```

* Run proxy server
```
st-reverse-proxy
```