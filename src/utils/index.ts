import {
  TransactionExecutionError,
  TransactionReceipt,
  parseEther,
  parseUnits,
} from "viem";
import {
  contract_abi,
  contract_address,
  feePercentage,
  token_abi,
  token_address,
} from "../contract";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../config";

async function executeContractFunction(
  CallFunction: any,
  functionName: string,
  args: any[],
  address: string,
  abi: any,
  config: any
): Promise<TransactionReceipt> {
  try {
    const hash = await CallFunction({
      functionName,
      args,
      address,
      abi,
    });
    const txReceipt = await waitForTransactionReceipt(config, { hash });
    return txReceipt;
  } catch (error) {
    const err = error as TransactionExecutionError;
    alert(err.message);
    console.error(error);
    throw new Error(err.message);
  }
}

async function handleMint(
  mintAmount: number,
  CallFunction: any,
  tokenPrice: bigint
) {
  const amount = parseEther(mintAmount.toString());

  if (mintAmount <= 0) {
    return;
  }
  try {
    const feeAmount = (amount * BigInt(feePercentage)) / BigInt(1000);
    const TokensToApprove =
      (((amount + feeAmount) * tokenPrice) / BigInt(10 ** 18))/BigInt(10 ** 12);

    const receipt = await executeContractFunction(
      CallFunction,
      "approve",
      [contract_address, TokensToApprove],
      token_address,
      token_abi,
      config
    );
    alert("Tokens Approved");
    console.log("Tx receipt: ", receipt);
    const receipt2 = await executeContractFunction(
      CallFunction,
      "mint",
      [amount],
      contract_address,
      contract_abi,
      config
    );
    alert("Tokens Minted Successfully");
    console.log("Tx receipt: ", receipt2);
  } catch (error) {
    let err = error as TransactionExecutionError;
    alert(err.message);
    console.error(error);
  }
}

async function handleBurn(burnAmount: number, CallFunction: any) {
  const amount = parseEther(burnAmount.toString());
  if (burnAmount <= 0) {
    return;
  }
  try {
    const receipt = await executeContractFunction(
      CallFunction,
      "burn",
      [amount],
      contract_address,
      contract_abi,
      config
    );
    alert("Tokens Burned Successfully");
    console.log("Tx receipt: ", receipt);
  } catch (error) {
    let err = error as TransactionExecutionError;
    alert(err.message);
    console.error(error);
  }
}
async function handleDonate(donateAmount: number, CallFunction: any) {
  const amount = parseUnits(donateAmount.toString(),6);
  if (donateAmount <= 0) {
    return;
  }
  try {
    const receipt = await executeContractFunction(
      CallFunction,
      "approve",
      [contract_address, amount],
      token_address,
      token_abi,
      config
    );
    alert("Tokens Approved");
    console.log("Tx receipt: ", receipt);
    const receipt2 = await executeContractFunction(
      CallFunction,
      "donate",
      [amount],
      contract_address,
      contract_abi,
      config
    );
    alert("Tokens Donated Successfully");
    console.log("Tx receipt: ", receipt2);
  } catch (error) {
    let err = error as TransactionExecutionError;
    alert(err.message);
    console.error(error);
  }
}
async function handleSell(sellAmount: number, CallFunction: any) {
  const amount = parseEther(sellAmount.toString());
  if (sellAmount <= 0) {
    return;
  }
  try {
    const receipt = await executeContractFunction(
      CallFunction,
      "approve",
      [contract_address, amount],
      contract_address,
      contract_abi,
      config
    );
    alert("Tokens Approved");
    console.log("Tx receipt: ", receipt);
    const receipt2 = await executeContractFunction(
      CallFunction,
      "sale",
      [amount],
      contract_address,
      contract_abi,
      config
    );
    alert("Tokens Donated Successfully");
    console.log("Tx receipt: ", receipt2);
  } catch (error) {
    let err = error as TransactionExecutionError;
    alert(err.message);
    console.error(error);
  }
}
async function handleSubmit(
  option: "mint" | "burn" | "donate" | "sale",
  tokenAmount: number,
  CallFunction: any,
  tokenPrice: bigint,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  console.log("Token Amount", tokenAmount);
  if (option === "mint") {
    setIsLoading(true);
    await handleMint(tokenAmount, CallFunction, tokenPrice);
    setIsLoading(false);
  } else if (option === "burn") {
    setIsLoading(true);
    handleBurn(tokenAmount, CallFunction);
    setIsLoading(false);
  } else if (option === "donate") {
    setIsLoading(true);
    handleDonate(tokenAmount, CallFunction);
    setIsLoading(false);
  } else if (option === "sale") {
    handleSell(tokenAmount, CallFunction);
    setIsLoading(false);
  }
}
export { handleMint, handleSubmit };
