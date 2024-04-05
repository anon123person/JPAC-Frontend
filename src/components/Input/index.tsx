import { FC } from "react";
import "./InputForm.style.css";
import { formatEther, parseEther } from "viem";
interface SubmitButton {
  handleSubmit: () => void;
}
interface FunctionDropdownProps {
  functionSelected: "mint" | "burn" | "donate" | "sale";
  setFunctionSelected: React.Dispatch<React.SetStateAction<"mint" | "burn" | "donate" | "sale">>;
}
interface InputFieldProps {
  functionSelected: "mint" | "burn" | "donate" | "sale";
  setFunctionSelected: React.Dispatch<React.SetStateAction<"mint" | "burn" | "donate" | "sale">>;
  tokenAmount: number;
  tokenPrice: bigint;
  setTokenAmount: React.Dispatch<React.SetStateAction<number>>;
  }
const calculateAmountOfToken = (tokenAmount: number,tokenPrice:bigint): bigint=> {
  tokenAmount = isNaN(tokenAmount)?0:tokenAmount;
  return BigInt(tokenAmount) * tokenPrice;
}
const calculateAmountOfUSDC = (tokenAmount: number,tokenPrice:bigint): bigint => {
 
  const amount = isNaN(tokenAmount)?0n:parseEther(tokenAmount.toString());
  const feeAmount = ((amount * BigInt(15) ) / BigInt(1000));
  const actualAmount = amount - feeAmount
  return actualAmount* tokenPrice / parseEther("1");
}
const FunctionDropdown: FC<FunctionDropdownProps> = ({functionSelected,setFunctionSelected}) => {
  
  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="duration">
        Select Function
      </label>
      <select
        className="dropdown"
        id="duration"
        value={functionSelected}
        onChange={(event)=>{setFunctionSelected(event.target.value as "mint" | "burn" | "donate" | "sale")}}
      >
        <option value="mint">Mint</option>
        <option value="donate">Donate</option>
        <option value="burn">Burn</option>
        <option value="sale">Sale</option>
      </select>
    </div>
  );
};

const ConnectAndHowButtons: FC = () => {
  return (
    <div className="btn2-container">
      <w3m-button size="md" balance="hide" />
    </div>
  );
};
const DisconnectAndSubmitButtons: FC<SubmitButton> = ({ handleSubmit }) => {
  return (
    <div className="btn2-container">
      <w3m-button size="md" balance="hide" />
      <button className="stake" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
const InputField: FC<InputFieldProps> = ({functionSelected,setFunctionSelected,tokenAmount,tokenPrice,setTokenAmount}): JSX.Element => {
  const amountToDisplay = (functionSelected==="mint")?calculateAmountOfToken(tokenAmount,tokenPrice):calculateAmountOfUSDC(tokenAmount,tokenPrice);
  //Label text should contain usdc for mint and jpac for sale
  const labelText = (functionSelected==="mint") || (functionSelected==="donate")?"USDC":"JPAC";
  const labelText2 = (functionSelected==="mint") || (functionSelected==="donate")?"JPAC":"USDC";
  return (
    <>
      <div className="input-container">
        <label className="token-inp-label" htmlFor="token-amount">
          Please add an amount in {labelText}
        </label>
        {((functionSelected=== "mint") || (functionSelected=== "sale")) && <p className="calculations">Amount you will receive = {formatEther(amountToDisplay)} {labelText2}</p>}
        <input
          className="token-inp"
          value={tokenAmount}
          name="token-amount"
          type="number"
          onChange={(e) => setTokenAmount(parseInt(e.target.value))}
        />
      </div>
      <FunctionDropdown functionSelected={functionSelected} setFunctionSelected={setFunctionSelected}></FunctionDropdown>
    </>
  );
};
export {
  InputField,
  FunctionDropdown,
  ConnectAndHowButtons,
  DisconnectAndSubmitButtons,
};
