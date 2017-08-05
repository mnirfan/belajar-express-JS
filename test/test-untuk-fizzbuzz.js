var chai = require('chai')

var should = chai.Should()

var fizzBuzzTest = require('../helpers/fizzbuzz')

describe('FizzBuzz Test', function(){
    it('If multiple by 3 should be print Fizz', function(){
        fizzBuzzTest.fizzBuzz(3).should.equal("Fizz")
    })

    it('if multiple by 5 should print Bazz', function(){
        fizzBuzzTest.fizzBuzz(5).should.equal("Buzz")
    })

    it('if multiple by 3 & 5 should print FizzBuzz', function(){
        fizzBuzzTest.fizzBuzz(15).should.equal("FizzBuzz")
    })
})
