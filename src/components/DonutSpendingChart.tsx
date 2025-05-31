"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { PieChart, Pie, Label } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type SpendingCategory = {
    category: string;
    amount: number;
};

type DonutSpendingChartProps = {
    data: SpendingCategory[];
    period: string;
    previousTotal?: number;
};

function formatPeriodToMonthYear(period: string): string {
    const [year, month] = period.split("-").map(Number);
    return new Date(year, month - 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });
}

export function DonutSpendingChart({
    data,
    period,
    previousTotal,
}: DonutSpendingChartProps) {
    const total = React.useMemo(
        () => data.reduce((acc, curr) => acc + curr.amount, 0),
        [data],
    );

    const trend: "up" | "down" | "flat" = React.useMemo(() => {
        if (previousTotal === undefined) return "flat";
        if (total > previousTotal) return "up";
        if (total < previousTotal) return "down";
        return "flat";
    }, [total, previousTotal]);

    const chartConfig: ChartConfig = {
        amount: { label: "Amount" },
        ...Object.fromEntries(
            data.map((item, i) => [
                item.category.toLowerCase(),
                {
                    label: item.category,
                    color: `var(--chart-${(i % 6) + 1})`,
                },
            ]),
        ),
    };

    const coloredData = data.map((item, i) => ({
        ...item,
        fill: `var(--chart-${(i % 6) + 1})`,
    }));

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{formatPeriodToMonthYear(period)}</CardTitle>
                <CardDescription>Spending Breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-[250px] max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={coloredData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-xl font-bold font-[family-name:var(--font-geist-mono)]"
                                                >
                                                    ${total.toFixed(2)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {trend === "up" && (
                        <>
                            Spending increased{" "}
                            <TrendingUp className="h-4 w-4 text-red-500" />
                        </>
                    )}
                    {trend === "down" && (
                        <>
                            Spending decreased{" "}
                            <TrendingDown className="h-4 w-4 text-green-500" />
                        </>
                    )}
                    {trend === "flat" && (
                        <>
                            Spending flat{" "}
                            <MoveRight className="h-4 w-4 text-gray-400" />
                        </>
                    )}
                </div>
                <div className="text-muted-foreground leading-none">
                    Based on {data.length} categories
                </div>
            </CardFooter>
        </Card>
    );
}
