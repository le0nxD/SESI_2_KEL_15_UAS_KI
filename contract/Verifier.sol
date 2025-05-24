// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verifier {
    function verify(
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s,
        address signer
    ) public pure returns (bool) {
        return ecrecover(messageHash, v, r, s) == signer;
    }
}
