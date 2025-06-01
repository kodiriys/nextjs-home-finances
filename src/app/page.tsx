import { promises as fs } from "fs";
import path from "path";
// import { DonutChart } from "@/components/DonutChart";
import { DonutSpendingChart } from "@/components/DonutSpendingChart";

import { HandCoins, Baby, Banknote } from "lucide-react"

import Image from "next/image";

type CategorySpending = {
  category: string
  amount: number
}

type MonthlySpending = {
  period: string
  categories: CategorySpending[]
}

export default async function Home() {
    const filePath = path.join(process.cwd(), "public", "spending.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const spendingData: MonthlySpending[] = JSON.parse(fileContents);


    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-secondary">
            <main className="flex flex-col gap-[32px] items-center sm:items-start bg-background p-8 rounded-xl ring-1 ring-border shadow-sm">
                <div className="flex flex-row gap-4 items-center justify-start w-full text-4xl">
                    <Banknote className="size-6" />
                    <HandCoins className="size-6" />
                    <span className="font-bold text-lg">Family Finance Dashboard</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-2">
                    {/* <DonutChart /> */}
                    {spendingData.map(({ period, categories }, i) => {
                        // const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
                        const previousTotal =
                            i > 0
                                ? spendingData[i - 1].categories.reduce((sum, cat) => sum + cat.amount, 0)
                                : undefined;

                      return (
                        <DonutSpendingChart
                          key={period}
                          data={categories}
                          period={period}
                          previousTotal={previousTotal}
                        />
                      )
                    })}
                </div>

                <span className="text-sm font-light font-[family-name:var(--font-geist-mono)]">Made by Suhayl Kodiriy</span>


            </main>

        </div>
    );
}
