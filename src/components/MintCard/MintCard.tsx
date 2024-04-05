import { FC, useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ConnectAndHowButtons, DisconnectAndSubmitButtons } from "../Input";
import { InputField } from "../Input";
import { formatEther, formatUnits } from "viem";
import { handleSubmit } from "../../utils";
import "./StakingCard.style.css";
import { contract_abi, contract_address, token_abi, token_address } from "../../contract";
import {readContract } from "@wagmi/core";
import { config } from "../../config";
interface MintCardProps {
  tokenPrice: bigint;
  usdtInLP: bigint;
  JpacInLP: bigint;
}
const MintDetails: FC<MintCardProps> = ({ tokenPrice,usdtInLP,JpacInLP }) => {
  return (
    <div className="detail-container">
      <div className="text1-container">
        <p className="t1 text2">Total USDC in LP:</p>
        <p className="t1 total-amount">{formatUnits(usdtInLP,6)} USDC</p>
        <p className="t1 text2">Total Minted Tokens:</p>
        <p className="t1 total-amount">{formatEther(JpacInLP)} JPAC</p>
      </div>
      <div className="text2-container">
        <p className="t1 text2">Token Price for 1 JPAC</p>
        <p className="t1 total-amount">{formatEther(tokenPrice)} USDC</p>
      </div>
    </div>
  );
};

const Card: FC = (): JSX.Element => {
  const [functionSelected, setFunctionSelected] = useState<
    "mint" | "burn" | "donate" | "sale"
  >("mint");
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const {writeContractAsync:approveToken} = useWriteContract();
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [tokenPrice, setTokenPrice] = useState<bigint>(0n);
  const [UsdcTokens, setUsdcTokens] = useState<bigint>(0n);
  const [JpacTokens, setJpacTokens] = useState<bigint>(0n);
  async function fetchData(){
    try{

      const data = await readContract(config,{
        abi:contract_abi,
        address:contract_address,
        functionName:"PricePerToken"
      })
      const  usdcTokens  = await readContract(config,{
        abi: token_abi,
        address: token_address,
        functionName: "balanceOf",
        args:[contract_address]
      });
      const  jpacTokens  = await readContract(config,{
        abi: contract_abi,
        address: contract_address,
        functionName: "totalSupply"
      });
      if(usdcTokens){
        setUsdcTokens(usdcTokens as bigint);
      }
      if(data){
        setTokenPrice(data as bigint);
        
      }
      if(jpacTokens){
        setJpacTokens(jpacTokens as bigint);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    const intervalId = setInterval(async ()=>{
      await fetchData();
      
    },1000);
    return ()=>{
      clearInterval(intervalId);
    }
  })
  const isAccountConnected = useAccount().isConnected;
  
  console.log("isAccountConnected:", isAccountConnected);
  return (
    <>
      <div className={`main-container`}>
        <MintDetails tokenPrice={tokenPrice} usdtInLP={UsdcTokens} JpacInLP={JpacTokens} />
        { (
          <InputField
            functionSelected={functionSelected}
            setFunctionSelected={setFunctionSelected}
            tokenAmount={tokenAmount}
            tokenPrice={tokenPrice}
            setTokenAmount={setTokenAmount}

          />
        )}
        {!isAccountConnected && <ConnectAndHowButtons />}
        {isAccountConnected && (
          <DisconnectAndSubmitButtons handleSubmit={()=>{handleSubmit(functionSelected,tokenAmount,approveToken,tokenPrice,setIsLoading)}} />
        )}
        {isLoading &&(
          <div className="loading-container">
            Loading.......
          </div>
        )}
      </div>
    </>
  );
};

const MintCard: FC = () => {
  
  return (
    <>
      <div className="heading-container"></div>
      <div className="card-container">
        <Card />
      </div>
      
    </>
  );
};

export default MintCard;
