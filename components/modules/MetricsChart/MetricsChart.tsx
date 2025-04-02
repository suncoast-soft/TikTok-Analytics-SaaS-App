/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { displayDate, displayNumber } from '@/utils/helpers';

export default function MetricsChart({
  config,
  data
}: {
  config: ChartConfig;
  data: any[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof config>('gmv');

  const total = React.useMemo(() => {
    if (data.length === 0) return {};

    const initialAccumulator = Object.keys(data[0]).reduce(
      (acc: Record<string, number>, key) => {
        acc[key] = 0;
        return acc;
      },
      {} as Record<string, number>
    );

    return data.reduce((acc, curr) => {
      Object.entries(curr).forEach(([key, value]) => {
        acc[key] += Number(value);
      });
      return acc;
    }, initialAccumulator);
  }, [data]);

  return (
    <Card className="border-navy-100/30 mb-12">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-navy-100/30 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-3xl">Overview</CardTitle>
        </div>

        <div className="flex flex-col lg:flex-row">
          {Object.keys(config).map((key) => {
            const chart = key as keyof typeof config;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-navy-100/30 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-navy-600 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {config[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-2xl">
                  {displayNumber(total[key as keyof typeof total])}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={config}
          className="aspect-auto h-[360px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(date) => {
                return displayDate(date);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[200px] bg-navy-900"
                  nameKey="label"
                  labelFormatter={(date) => {
                    return displayDate(date);
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
