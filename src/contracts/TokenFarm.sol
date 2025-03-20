pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address=> uint) public stakingBalance;
    mapping(address=>bool) public hasStacked;
    mapping(address=>bool) public isStaking;

constructor(DappToken _dappToken, DaiToken _daiToken) public {

       dappToken = _dappToken;
       daiToken = _daiToken;  
    }

    // 1) Stake Tokens (Deposit)

       funtion stakeTokens(uint _amount) public {
             // Transfer Moch Dai tokens to this contract for staking
             daiToken.transferFrom(msg.sender, address(this), _amount);
             
             // Update staking balance
             stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

             // add user to stakers array if they haven't staked yet
             if(!hasStacked[msg.sender]){
                stakers.push(msg.sender);
             }
              
              hasStacked[msg.sender] = true;
              isStaking[msg.sender] = true;
       }

    // 2) Unstacking Tokens (Withdraw)
          

    // 3) Issuing Tokens (interest)
           


}

