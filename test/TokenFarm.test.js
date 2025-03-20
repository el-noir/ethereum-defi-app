const DaiToken = artifacts.require('DaiToken')
const DappToken = artifacts.require('DappToken')
const TokenFarm = artifacts.require('TokenFarm')

const { assert } = require('chai')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('TokenFarm', (accounts) => {

  describe('Mock DAI deployment', async () => {
    it('Has a name', async () => {
      let daiToken = await DaiToken.new()
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

})
