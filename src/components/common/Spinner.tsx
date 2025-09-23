import { Loader2, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Spinner({ className, ...props }: LucideProps) {
	return <Loader2 className={cn("animate-spin", className)} {...props} />;
}