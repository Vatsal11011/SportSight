'use client'

import { useReadContract } from 'wagmi'
import { MarketContract } from '@/lib/MarketContract'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketCard } from './marketCard'
import Navbar from './navbar'
import { MarketCardSkeleton } from './market-card-skeleton'

export function DashBoard() {
    const { data: marketCount, isLoading: isLoadingMarketCount } = useReadContract({
        address: MarketContract.address,
        abi: MarketContract.abi,
        functionName: "marketCount",
        args: []
    });

    const skeletonCards = Array.from({ length: 6 }, (_, i) => (
        <MarketCardSkeleton key={`skeleton-${i}`} />
    ));

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto p-4">

                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending Resolution</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    </TabsList>

                    {isLoadingMarketCount ? (
                        <TabsContent value="active" className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {skeletonCards}
                            </div>
                        </TabsContent>
                    ) : (
                        <>
                            <TabsContent value="active">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="active"
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="pending">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="pending"
                                        />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="resolved">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index}
                                            index={index}
                                            filter="resolved"
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </div>
            <footer className="w-full border-t bg-background mt-12">
                <div className="container max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 py-12 md:h-32 md:flex-row md:py-0">
                    <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Built by{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                Vatsal Devra
                            </a>
                            . The source code is available on{" "}
                            <a
                                href="https://github.com/yourusername/your-repo"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                GitHub
                            </a>
                            .
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/yourusername/your-repo"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="text-muted-foreground hover:text-foreground"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.778 8.205 11.387.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.118-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.404 11.52 11.52 0 0 1 3 .404c2.291-1.552 3.297-1.23 3.297-1.23.656 1.653.244 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.37.823 1.1.823 2.222 0 1.606-.015 2.899-.015 3.293 0 .32.216.694.825.576C20.565 22.275 24 17.789 24 12.5 24 5.87 18.627.5 12 .5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
