'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi"; // updated to Wagmi
import { MarketContract } from "@/lib/MarketContract";
import { MarketProgress } from "./market-progress";
import { MarketTime } from "./market-time";
import { MarketCardSkeleton } from "./market-card-skeleton";
import { MarketResolved } from "./market-resolved";
import { MarketPending } from "./market-pending";
import { MarketBuyInterface } from "./market-buy-interface";
import { MarketSharesDisplay } from "./market-shares-display";

// Props for the MarketCard component
interface MarketCardProps {
  index: number;
  filter: "active" | "pending" | "resolved";
}

interface Market {
  question: string;
  optionA: string;
  optionB: string;
  endTime: bigint;
  outcome: number;
  totalOptionAShares: bigint;
  totalOptionBShares: bigint;
  resolved: boolean;
}

interface SharesBalance {
  optionAShares: bigint;
  optionBShares: bigint;
}

export function MarketCard({ index, filter }: MarketCardProps) {
  const { address } = useAccount();

  const {
    data: marketData,
    isLoading: isLoadingMarketData,
  } = useReadContract({
    address: MarketContract.address,
    abi: MarketContract.abi,
    functionName: "getMarketInfo",
    args: [BigInt(index)],
  });

  const market: Market | undefined = marketData
    ? {
        question: marketData[0],
        optionA: marketData[1],
        optionB: marketData[2],
        endTime: marketData[3],
        outcome: marketData[4],
        totalOptionAShares: marketData[5],
        totalOptionBShares: marketData[6],
        resolved: marketData[7],
      }
    : undefined;

  const sharesBalanceQuery = address
  ? useReadContract({
      address: MarketContract.address,
      abi: MarketContract.abi,
      functionName: "getSharesBalance",
      args: [BigInt(index), address as `0x${string}`],
    })
  : { data: undefined, isLoading: false };

const sharesBalanceData = sharesBalanceQuery.data;


  const sharesBalance: SharesBalance | undefined = sharesBalanceData
    ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1],
      }
    : undefined;

  const isExpired = market ? new Date(Number(market.endTime) * 1000) < new Date() : false;
  const isResolved = market?.resolved;

  const shouldShow = () => {
    if (!market) return false;

    switch (filter) {
      case "active":
        return !isExpired;
      case "pending":
        return isExpired && !isResolved;
      case "resolved":
        return isExpired && isResolved;
      default:
        return true;
    }
  };

  if (!shouldShow()) {
    return null;
  }

  return (
    <Card key={index} className="flex flex-col">
      {isLoadingMarketData ? (
        <MarketCardSkeleton />
      ) : (
        <>
          <CardHeader>
            {market && <MarketTime endTime={market.endTime} />}
            <CardTitle>{market?.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {market && (
              <MarketProgress
                optionA={market.optionA}
                optionB={market.optionB}
                totalOptionAShares={market.totalOptionAShares}
                totalOptionBShares={market.totalOptionBShares}
              />
            )}
            {isExpired ? (
              market?.resolved ? (
                <MarketResolved
                  marketId={index}
                  outcome={market.outcome}
                  optionA={market.optionA}
                  optionB={market.optionB}
                />
              ) : (
                <MarketPending />
              )
            ) : (
              <MarketBuyInterface marketId={index} market={market!} />
            )}
          </CardContent>
          <CardFooter>
            {market && sharesBalance && (
              <MarketSharesDisplay
                market={market}
                sharesBalance={sharesBalance}
              />
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
