pragma solidity ^0.5.10;

import "./Interfaces/InterfaceToken.sol";
import "./Interfaces/PromissoryContract.sol";

//
/// @title Crypto CRYPTO contract - from gnosis, see source : https://github.com/maurelian/Crypto-CRYPTO
/// improved with latest solidity syntax
contract crypto-bliz {

    /*
     *  Events
     */
    event BidSubmission(address indexed sender, uint256 amount);
    event logPayload(bytes _data, uint _lengt);

    /*
     *  Constants
     */
    uint constant public MAX_TOKENS_SOLD = 10000000 * 10**18; // 10M
    uint constant public WAITING_PERIOD = 45 days;

    /*
     *  Storage
     */


    address payable public pWallet;
    Token public crypto-blizToken;
    address public owner;
    PromissoryToken public PromissoryTokenIns; 
    address constant public promissoryAddr = 0x0348B55AbD6E1A99C6EBC972A6A4582Ec0bcEb5c;
    uint public ceiling;
    uint public priceFactor;
    uint public startBlock;
    uint public endTime;
    uint public totalReceived;
    uint public finalPrice;
    mapping (address => uint) public bids;
    Stages public stage;

    /*
     *  Enums
     */
    enum Stages {
        CRYPTODeployed,
        CRYPTOSetUp,
        CRYPTOStarted,
        CRYPTOEnded,
        TradingStarted
    }

    /*
     *  Modifiers
     */
    modifier atStage(Stages _stage) {
        require(stage == _stage);
            // Contract not in expected state
        _;
    }

    modifier isOwner() {
        require(msg.sender == owner);
            // Only owner is allowed to proceed
        _;
    }

    modifier isWallet() {
         require(msg.sender == address(pWallet));
            // Only wallet is allowed to proceed
        _;
    }

    modifier isValidPayload() {
        emit logPayload(msg.data, msg.data.length);
        require(msg.data.length == 4 || msg.data.length == 36, "No valid payload");
        _;
    }

    modifier timedTransitions() {
        if (stage == Stages.CRYPTOStarted && calcTokenPrice() <= calcStopPrice())
            finalizeCRYPTO();
        if (stage == Stages.CRYPTOEnded && now > endTime + WAITING_PERIOD)
            stage = Stages.TradingStarted;
        _;
    }

    /*
     *  Public functions
     */
    /// @dev Contract constructor function sets owner.
    /// @param _pWallet crypto-bliz promissory wallet.
    /// @param _ceiling CRYPTO ceiling.
    /// @param _priceFactor CRYPTO price factor.
    constructor(address payable _pWallet, uint _ceiling, uint _priceFactor)
        public
    {
        if (_pWallet == address(0) || _ceiling == 0 || _priceFactor == 0)
            // Arguments are null.
            revert();
        owner = msg.sender;
        PromissoryTokenIns = PromissoryToken(promissoryAddr);
        pWallet = _pWallet;
        ceiling = _ceiling;
        priceFactor = _priceFactor;
        stage = Stages.CRYPTODeployed;
    }

    /// @dev Setup function sets external contracts' addresses.
    /// @param _kittieToken  token address.
    function setup(address _kittieToken)
        public
        isOwner
        atStage(Stages.CRYPTODeployed)
    {
        if (_kittieToken == address(0))
            // Argument is null.
            revert();
        crypto-blizToken = Token(_kittieToken);
        // Validate token balance
        if (crypto-blizToken.balanceOf(address(this)) != MAX_TOKENS_SOLD)
            revert();
        stage = Stages.CRYPTOSetUp;
    }

    /// @dev Starts CRYPTO and sets startBlock.
    function startCRYPTO()
        public
        isOwner
        atStage(Stages.CRYPTOSetUp)
    {
        stage = Stages.CRYPTOStarted;
        startBlock = block.number;
    }

    /// @dev Changes CRYPTO ceiling and start price factor before CRYPTO is started.
    /// @param _ceiling Updated CRYPTO ceiling.
    /// @param _priceFactor Updated start price factor.
    function changeSettings(uint _ceiling, uint _priceFactor)
        public
        isWallet
        atStage(Stages.CRYPTOSetUp)
    {
        ceiling = _ceiling;
        priceFactor = _priceFactor;
    }

    /// @dev Calculates current token price.
    /// @return Returns token price.
    function calcCurrentTokenPrice()
        public
        timedTransitions
        returns (uint)
    {
        if (stage == Stages.CRYPTOEnded || stage == Stages.TradingStarted)
            return finalPrice;
        return calcTokenPrice();
    }

    /// @dev Returns correct stage, even if a function with timedTransitions modifier has not yet been called yet.
    /// @return Returns current CRYPTO stage.
    function updateStage()
        public
        timedTransitions
        returns (Stages)
    {
        return stage;
    }

    /// @dev Allows to send a bid to the CRYPTO.
    /// @param receiver Bid will be assigned to this address if set.
    function bid(address payable receiver)
        public
        payable
        //isValidPayload
        timedTransitions
        atStage(Stages.CRYPTOStarted)
        returns (uint amount)
    {
        // If a bid is done on behalf of a user via ShapeShift, the receiver address is set.
        if (receiver == address(0))
            receiver = msg.sender;
        amount = msg.value;
        // Prevent that more than 90% of tokens are sold. Only relevant if cap not reached.
        uint maxWei = (MAX_TOKENS_SOLD / 10**18) * calcTokenPrice() - totalReceived;
        uint maxWeiBasedOnTotalReceived = ceiling - totalReceived;
        if (maxWeiBasedOnTotalReceived < maxWei)
            maxWei = maxWeiBasedOnTotalReceived;
        // Only invest maximum possible amount.
        if (amount > maxWei) {
            amount = maxWei;
            // Send change back to receiver address. In case of a ShapeShift bid the user receives the change back directly.
            if (!receiver.send(msg.value - amount))
                // Sending failed
                revert();
        }
        // Forward funding to ether pWallet
        if (amount == 0 || !address(pWallet).send(amount))
            // No amount sent or sending failed
            revert();
        bids[receiver] += amount;
        totalReceived += amount;
        if (maxWei == amount)
            // When maxWei is equal to the big amount the CRYPTO is ended and finalizeCRYPTO is triggered.
            finalizeCRYPTO();
        emit BidSubmission(receiver, amount);
    }

    /// @dev Claims tokens for bidder after CRYPTO.
    /// @param receiver Tokens will be assigned to this address if set.
    function claimTokens(address receiver)
        public
        isValidPayload
        timedTransitions
        atStage(Stages.TradingStarted)
    {
        if (receiver == address(0))
            receiver = msg.sender;
        uint tokenCount = bids[receiver] * 10**18 / finalPrice;
        bids[receiver] = 0;
        crypto-blizToken.transfer(receiver, tokenCount);
    }

    /// @dev Calculates stop price.
    /// @return Returns stop price.
    function calcStopPrice()
        view
        public
        returns (uint)
    {
        return totalReceived * 10**18 / MAX_TOKENS_SOLD + 1;
    }

    /// @dev Calculates token price.
    /// @return Returns token price.
    function calcTokenPrice()
        view
        public
        returns (uint)
    {
        return priceFactor * 10**18 / (block.number - startBlock + 7500) + 1;
    }

    /*
     *  Private functions
     */
    function finalizeCRYPTO()
        private
    {
        stage = Stages.CRYPTOEnded;

        if (totalReceived == ceiling)
            finalPrice = calcTokenPrice();
        else
            finalPrice = calcStopPrice();

        endTime = now;
    }


}
