var express = require('express');
var httpProxy = require('http-proxy');
var router = express.Router();
var apiProxy = httpProxy.createProxyServer();
var API_GATEWAY_HOST = process.env.API_GATEWAY_HOST || 'localhost:4000';

/* GET home page. */
router.all('/*', function(req, res, next) {
    console.log(req.body);
    console.log("forwarding to "+'http://' + API_GATEWAY_HOST);
    apiProxy.web(req, res, { target: 'http://' + API_GATEWAY_HOST },next);
});



apiProxy.on('proxyRes',(proxyRes,req,res)=>{
    //console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
  });
  
  //restream parsed body before proxying
  apiProxy.on('proxyReq', (proxyReq, req, res, options)=> {
    if (!req.body || !Object.keys(req.body).length) {
      return;
    }
  
    var contentType = proxyReq.getHeader('Content-Type');
    var bodyData;
  
    if ( contentType.includes( 'application/json' ) ) {
      bodyData = JSON.stringify( req.body );
    }
  
    if ( contentType.includes( 'application/x-www-form-urlencoded' ) ) {
      bodyData = queryString.stringify( req.body );
    }
  
    if ( bodyData ) {
      proxyReq.setHeader( 'Content-Length', Buffer.byteLength( bodyData ) );
      proxyReq.write( bodyData );
    }
  });


module.exports = router;
