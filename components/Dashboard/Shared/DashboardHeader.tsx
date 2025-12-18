import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader({
    title,
    description,
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="border-b border-border flex justify-between items-center">
            <div className="flex flex-col items-start justify-between p-4 md:px-8">
                <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                {description && <p className="text-secondary">{description}</p>}
            </div>
            <div>
                <div className="flex items-center gap-3 px-3">
                  <Link
                    href="/profile" 
                    className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                     <Image src="/images/avatar.png" alt="User" width={40} height={40} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium truncate text-foreground">
                        Nayon
                      </p>
                      <p className="text-sm text-secondary truncate">
                        Super Admin
                      </p>
                    </div>
                  </Link>
                </div>
            </div>
        </div>
    )
}