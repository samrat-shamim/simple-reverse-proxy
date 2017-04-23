# Simple reverse proxy server #
To run multiple web server in one machine and map them to sub domains, try this proxy server.

## How to start ##
* Open command prompt
* Install simple-reverse-proxy server
```
npm install simple-reverse-proxy -g

```
* Create configuration json file, sample is given below-
```
{
 "mainDomain": "http://127.0.0.1:8080",
  "subDomains": {
    "sub-domain-1": "http://127.0.0.1:8081",
    "sub-domain-2": "http://127.0.0.1:8082",
    "sub-domain-3": "http://127.0.0.1:8083"
  }
}
```
* Run simple-reverse-proxy server
```
st-reverse-proxy

```
* Enter configuration file path