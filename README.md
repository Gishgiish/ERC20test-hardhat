# ERC-20 Token Vulnerability Testing

This is a test suite for an ERC-20 token smart contract using Hardhat. The purpose of this test suite is to verify the correctness of basic ERC-20 functions and to check for vulnerabilities like griefing, front-running, and signature-related attacks.

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Hardhat (Solidity development environment)

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Gishgiish/ERC20test-hardhat.git
   cd ERC20test-hardhat

   ```

2. Install dependencies
   npm install

3. Compile and run the tests
   npx hardhat compile
   npx hardhat test

## Test Cases
   This test suite includes the following test cases:

   i. Basic ERC20 Functions
   ii. Verify the correctness of the token's name, symbol, and decimals.
   iii. Test token transfers and balance updates.
   iv. Test approvals and token transfers using transferFrom.

## Vulnerability Testing:
   v. Check if self-transfers are allowed.
   vi. Attempt unauthorized minting by addresses not in the minter list.
   vii. Try to make unauthorized changes to the governance address.
   viii. Test unauthorized additions/removals of minters by non-governance addresses.

## Contributing
   Feel free to contribute to this test suite by opening issues, suggesting improvements, or submitting pull requests.

## License
   This test suite is provided under the MIT License.

## Disclaimer
   This test suite is for educational and informational purposes only. It is not a comprehensive security audit, and vulnerabilities may still exist. Always conduct a thorough code review and testing before deploying smart contracts on a production network.
