import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useSelector } from 'react-redux';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

const chartConfig = {
  percent: {
    label: 'Percent',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const SkillChart = () => {
  const globalData = useSelector((state: RootStateRepos) => state.repos);

  const chartData = globalData.languagesCount.map((language) => ({
    language: language.name,
    percent: language.percentage,
  }));

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Skill chart</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="language" />
            <PolarGrid />
            <Radar dataKey="percent" fill="var(--color-percent)" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none text-muted-foreground">Datas from github</div>
      </CardFooter>
    </Card>
  );
};

export default SkillChart;
