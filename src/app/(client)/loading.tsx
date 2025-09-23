import Spinner from "@/components/common/Spinner";

export default function Loading() {
	return (
		<div className="flex flex-col min-h-[calc(100vh-70px)] w-full items-center justify-center">
            <img src="/logo.png" alt="Loading" width={200} height={200} />
			<Spinner className="w-20 h-20"/>
		</div>
	);
}