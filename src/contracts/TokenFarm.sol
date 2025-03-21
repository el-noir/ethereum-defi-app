pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;
    mapping(address=> uint) public stakingBalance;
    mapping(address=>bool) public hasStacked;
    mapping(address=>bool) public isStaking;

constructor(DappToken _dappToken, DaiToken _daiToken) public {

       dappToken = _dappToken;
       daiToken = _daiToken;  
       owner = msg.sender;
    }

    // 1) Stake Tokens (Deposit)

       function stakeTokens(uint _amount) public {
             
             require(_amount>0, "amount cannot be 0");

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

        // 3) Issuing Tokens 
        function issueToken() public {
         require(msg.sender==owner, "caller must be the owner");         for (uint i=0; i<stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];

            if(balance>0){
              dappToken.transfer(recipient, balance);

            }
          
         }

        }

    // 2) Unstacking Tokens (Withdraw)
          

   
           


}

