pragma solidity ^0.5.10;

/// @title Abstract promissory contract - with function made available to using contract.

interface PromissoryToken {

	function claim() payable external;
	function lastPrice() external returns(uint256);
}
