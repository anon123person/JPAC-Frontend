import "./TextContainer.style.css";
function TextContainer() {
  return (
    <>
    <div className="text-container">
        <h3>Token Details</h3>
        <ul>
          <li>
            <b>Name:</b> Jetpack Algorithm Coin
          </li>
          <li>
            <b>Ticker:</b> JPAC
          </li>
          <li>
            <b>Total Supply:</b> Unlimited
          </li>
          <li>
            <b>Initial Supply:</b> 0
          </li>
          <li>
            <b>Decimals:</b> 18
          </li>
        </ul>
      </div>
      <div className="text-container">
        <h3>What is JPAC?</h3>
        <div className="text">
          <p>
            -JPAC is an experimental utility token with the goal of creating an
            automated, decentralized buyer and seller for the JPAC token at an
            increasing, algorithmically controlled price.
          </p>
          <p>
            -The algorithmically determined price is calculated by dividing the
            total amount of USDC in the smart contract's LP (+100,000,000) by
            the total amount of minted tokens (+100,000,000) which increases
            whenever a token is minted & decreases whenever a token is burned.
          </p>
        </div>
      </div>
      <div className="text-container">
        <h3>More About JPAC</h3>
        <div className="text">
          <p>
            -JPAC is meant to be used & adapted into any existing ecosystem on
            the Polygon Network.
          </p>
          <p>
            -JPAC is decentralized, and completely controlled by algorithmic
            processes and smart contracts.
          </p>
          <p>
            -The creators of JPAC will remain anonymous, but will continue to
            help maintain the front end interface to allow easy access to JPAC's
            smart contract, and also plan to bring JPAC to other blockchains
            including Solana & Ethereum.
          </p>
          <p>
            -If there are ever 0 minted JPAC tokens remaining but there is
            still USDC remaining in the LP: those USDC tokens could potentially
            be considered burned, as they will remain in the LP solely to
            maintain price, but will not be accessible.
          </p>
        </div>
      </div>

      <div className="text-container">
    <h3>Fees</h3>
    <div className="text">
        <p>
            -There is a 1.5% fee added to all mints, collected in USDC.
        </p>
        <p>
            -There is also a 1.5% fee taken from all transfers.
        </p>
        <p>
            -0.50% of all collected fees go to the Creator Wallet.
        </p>
    </div>
</div>
<div className="text-container">
    <h3>Fee Distribution</h3>
    <div className="text">
        <p>
            -All USDC collected by the contract from fees are held in the smart contract's LP, where they are held to accommodate sales.
        </p>
        <p>
            -All JPAC collected by the contract from fees are burned.
        </p>
    </div>
</div>
<div className="text-container">
    <h3>Donations & Burns</h3>
    <div className="text">
        <p>
            -JPAC tokens can also be burned without a sale, with the user receiving no USDC in exchange.
        </p>
        <p>
            -USDC can also be donated directly into the smart contract's LP.
        </p>
    </div>
</div>
<div className="text-container">
    <h3>Token Addresses</h3>
    <div className="text">
        <p>
            -JPAC (Polygon) Token Address:<code className="address"> 0xB565a465e88D0D6A06EBD3834E175d3E8b4eb6Da</code>
        </p>
        <p>
            -USDC (Polygon) Token Address: 
            <code className="address"> 0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359</code>
        </p>
        <p>
          <b>Note: </b>
        This platform does not work on mobile browsers, but should work on your wallet's in-app mobile browser.
        </p>
    </div>
</div>


      
    </>
  );
}

export default TextContainer;
