pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./MyToken.sol";

/**
 * @title MintedCrowdsale
 * @dev Extension of Crowdsale contract whose tokens are minted in each purchase.
 * Token ownership should be transferred to MintedCrowdsale for minting.
 */
contract MintedCrowdsale is Crowdsale {
    /**
     * @dev Overrides delivery by minting tokens upon purchase.
     * @param beneficiary Token purchaser
     * @param tokenAmount Number of tokens to be minted
     */
    function _deliverTokens(address beneficiary, uint256 tokenAmount)  internal override {
            // Potentially dangerous assumption about the type of the token.
            require(
                MyToken(address(token())).mint(beneficiary, tokenAmount),
                    "MintedCrowdsale: minting failed"
            );
        }

        constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token
    )
        Crowdsale(rate, wallet, token)
        public
    {

    }

}