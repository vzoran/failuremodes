const expect = require('chai').expect;
const aws_proxy = require('../../src/common/aws_proxy');

describe('AWS Proxy ', function(){
  describe('generating event definition', function(){
    it('for GET event', function(){
      var req = {
        url: '/resource',
        method: 'GET',
        headers: {
          accept: 'application/json'
        },
        params: {

        },
        body: undefined
      };
      var proxyEvent = aws_proxy.createProxyEvent('/resource', req);

      expect(proxyEvent.httpMethod).to.equals('GET');
      expect(proxyEvent.path).to.equals('/resource');
      expect(proxyEvent.resource).to.equals('/resource');
      expect(proxyEvent.headers.accept).to.equals('application/json');
      
    });
  });

});