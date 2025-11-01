"use client";

import { Address } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type TokenBalanceProps = {
  address?: Address;
  className?: string;
};

export const TokenBalance = ({ address, className = "" }: TokenBalanceProps) => {
  const { address: connected } = useAccount();
  const account = address ?? (connected as Address | undefined);

  const { data: decimals } = useScaffoldReadContract({
    contractName: "MamayaTokenExternal",
    functionName: "decimals",
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "MamayaTokenExternal",
    functionName: "symbol",
  });

  const { data: rawBalance, isLoading, isError } = useScaffoldReadContract({
    contractName: "MamayaTokenExternal",
    functionName: "balanceOf",
    args: [account as Address | undefined] as readonly [Address | undefined],
  });

  if (!account || isLoading || !decimals) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (isError || rawBalance == null) {
    return (
      <div className="border-2 border-base-content/30 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer">
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const d = Number(decimals);
  const divisor = 10 ** d;
  const formatted = Number(rawBalance as unknown as bigint) / divisor;

  return (
    <div className={`btn btn-sm btn-ghost flex flex-col font-normal items-center hover:bg-transparent ${className}`}>
      <div className="w-full flex items-center justify-center">
        <span>{formatted.toFixed(4)}</span>
        <span className="text-[0.8em] font-bold ml-1">{symbol ?? "MMT"}</span>
      </div>
    </div>
  );
};


