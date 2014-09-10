var assert = require("assert");
var should = require("should");
var Users = require('../local_modules/users');
describe('Users', function()
{
	describe('Test', function()
	{
		it('Testing Mocha is Working', function()
		{
		  return Users.test().should.equal("HELLO");
		})
	})
	
	describe('Properties', function()
	{
		it('Should Return a List of Properties', function()
		{
			return Users.properties().then(function(data)
			{
				data._properties.should.not.equal(undefined);
			})
		})
	})
	describe('Testing Hello MongoDB', function()
	{
		it("Should Return a Message From the Database", function()
		{
			return Users.hello().then(function(data)
			{
				data[0].message.should.equal("Test Passed");
			})
		})
	})
})
