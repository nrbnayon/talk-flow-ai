export default function DashboardHeader({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="border-b border-[#D5D5D5]">
            <div className="flex flex-col items-start justify-between p-4 md:px-8">
                <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>
                {description && <p className="text-secondary">{description}</p>}
            </div>
        </div>
    )
}