import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
    name: string;
    description: string;
    logo: React.ComponentType<{ className?: string }>;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ name, description, logo: Logo }) => (
    <Card className="transition-all hover:shadow-lg">
        <CardHeader>
            <Logo className="h-12 w-12 mb-2" />
            <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </CardContent>
    </Card>
);