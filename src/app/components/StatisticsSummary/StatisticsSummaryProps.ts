export type Statistic = {
    label: string;
    value: number;
};
export type StatisticsSummaryProps = {
    stats: Statistic[];
    onCardClick: (label: string) => void;
}