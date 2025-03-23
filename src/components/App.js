import React, {Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Main from './Main'
class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3;
  
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] }); // Investor account
  
    const networkId = await web3.eth.net.getId();
  
    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      this.setState({ daiToken });
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call();
      this.setState({ daiTokenBalance: daiTokenBalance.toString() });
    } else {
      console.error('DaiToken contract not deployed to detected network.');
      window.alert('DaiToken contract not deployed to detected network.');
    }
  
    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address);
      this.setState({ dappToken });
      let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call();
      this.setState({ dappTokenBalance: dappTokenBalance.toString() });
    } else {
      console.error('DappToken contract not deployed to detected network.');
      window.alert('DappToken contract not deployed to detected network.');
    }
  
    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address);
      this.setState({ tokenFarm });
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      console.error('TokenFarm contract not deployed to detected network.');
      window.alert('TokenFarm contract not deployed to detected network.');
    }
  
    this.setState({ loading: false });
  }
  
  async loadWeb3(){
    if(window.ethereum){
      window.web3= new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
    }
  }

  stakeTokens = (amount) => {
    if (!this.state.daiToken) {
      console.error('DaiToken contract is not loaded.');
      return;
    }
  
    if (!this.state.tokenFarm) {
      console.error('TokenFarm contract is not loaded.');
      return;
    }
  
    this.setState({ loading: true });
  
    this.state.daiToken.methods
      .approve(this.state.tokenFarm._address, amount)
      .send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        this.state.tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: this.state.account })
          .on('transactionHash', (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '0x0',
      daiToken: {},
      dappToken: {},
      tokenFarm: {},
      daiTokenBalance: '0', // Initialize as string
      dappTokenBalance: '0', // Initialize as string
      stakingBalance: '0', // Initialize as string
      loading: true,
    };
  }
  render() {
    let content 
    if(this.state.loading){
      content = <p id='loader' className='text-center'>Loading...</p>
    } else {
      content = <Main
      stakingBalance={this.state.stakingBalance}
      dappTokenBalance={this.state.dappTokenBalance}
      daiTokenBalance={this.state.daiTokenBalance}
      stakeTokens  = {this.stakeTokens}
      />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {/* <Main
                  stakingBalance={this.state.stakingBalance}
                  dappTokenBalance={this.state.dappTokenBalance}
                /> */}
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default App;