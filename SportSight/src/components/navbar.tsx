'use client'

import { useState, useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useBlockNumber,
} from 'wagmi'
import { Button } from '@/components/ui/button'
import { BetCoin } from '@/lib/tokenContract'
import { formatUnits } from 'viem'
import Image from 'next/image'

export default function Navbar() {
  const { address, status } = useAccount()
  const { connectors, connect, error, status: connectStatus } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  const { data: blockNumber } = useBlockNumber({ watch: true })

  const {
    data: balance,
    isLoading: isBalanceLoading,
    refetch,
  } = useReadContract({
    address: BetCoin.address,
    abi: BetCoin.abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const {
    writeContract,
    isPending: isClaimPending,
    isSuccess: isClaimSuccess,
    error: claimError,
  } = useWriteContract()

  useEffect(() => {
    if (blockNumber) {
      refetch()
    }
  }, [blockNumber, refetch])

  const handleClaim = () => {
    writeContract({
      address: BetCoin.address,
      abi: BetCoin.abi,
      functionName: 'claim',
    })
  }


  return (
    <header className="w-full px-6 py-4 border-b shadow-sm bg-white flex justify-between items-center">
      {/* Logo + Name */}
      <div className="flex items-center gap-2">
        <Image src="/logo.webp" alt="Logo" width={32} height={32} />
        <span className="text-lg font-semibold tracking-wide">SportSight</span>
      </div>

      {/* Wallet section */}
      {status === 'connected' ? (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-right text-muted-foreground">
            <div className="font-mono text-black">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            {isBalanceLoading ? (
              <span className="text-xs text-muted-foreground">Fetching...</span>
            ) : (
              <span className="text-xs text-black">
                🪙 {formatUnits(balance ?? 0n, 18)} BetCoin
              </span>
            )}
          </div>
          <Button onClick={handleClaim} disabled={isClaimPending}>
            {isClaimPending ? 'Claiming...' : 'Claim 100 🪙'}
          </Button>
          <Button variant="destructive" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="space-x-2">
          {showConnectors ? (
            <>
              {connectors
                .filter((c) =>
                  ['Injected', 'WalletConnect', 'Coinbase Wallet'].includes(c.name)
                )
                .map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    variant="secondary"
                  >
                    {connector.name}
                  </Button>
                ))}
              <Button variant="ghost" onClick={() => setShowConnectors(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowConnectors(true)}>Connect Wallet</Button>
          )}
          {connectStatus === 'pending' && (
            <span className="text-sm">Connecting...</span>
          )}
          {error && <span className="text-sm text-destructive">{error.message}</span>}
        </div>
      )}
    </header>
  )
}
