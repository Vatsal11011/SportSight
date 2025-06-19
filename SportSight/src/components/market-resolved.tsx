'use client'

import { Button } from "./ui/button";
import { MarketContract } from "@/lib/MarketContract";
import { useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

interface MarketResolvedProps {
    marketId: number;
    outcome: number;
    optionA: string;
    optionB: string;
}

export function MarketResolved({ 
    marketId,
    outcome, 
    optionA, 
    optionB
}: MarketResolvedProps) {
    const { writeContractAsync } = useWriteContract();

    const handleClaimRewards = async () => {
        try {
            await writeContractAsync({
                address: MarketContract.address,
                abi: MarketContract.abi,
                functionName: 'claimWinnings',
                args: [BigInt(marketId)]
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="mb-2 bg-green-200 p-2 rounded-md text-center text-xs">
                Resolved: {outcome === 0 ? optionA : optionB}
            </div>
            <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleClaimRewards}
            >
                Claim Rewards
            </Button>
        </div>
    );
}
