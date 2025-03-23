import React, { Component } from 'react';

class Main extends Component {
  render() {
    console.log('Staking Balance:', this.props.stakingBalance);
    console.log('DAPP Token Balance:', this.props.dappTokenBalance);

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Staking Balance</th>
              <th>DAPP Token Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance || '0', 'Ether')} mDAI</td>
              <td>{window.web3.utils.fromWei(this.props.dappTokenBalance || '0', 'Ether')} DAPP</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;