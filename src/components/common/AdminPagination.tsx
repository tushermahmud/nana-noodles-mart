"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { getQueryEndpoint } from "@/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

interface Props extends React.ComponentProps<"nav"> {
	totalCount: number;
	visiblePages?: number;
	defaultPageSize?: number;
	scroll?: boolean;
}

export default function AdminPagination({
	totalCount,
	visiblePages = 3,
	defaultPageSize = 5,
	className,
	scroll = true,
	...rest
}: Props) {
	const searchParams = useSearchParams();
	const pathName = usePathname();
	const page = searchParams.get("page");
	const pageSize = searchParams.get("pageSize");
	const currentPage = page ? parseInt(page) : 1;
	const currentPageSize = pageSize ? parseInt(pageSize) : defaultPageSize;
	const totalPages = Math.ceil(totalCount / currentPageSize);

	const renderPaginationItems = () => {
		const paginationItems = [];

		// Previous Page
		paginationItems.push(
			<PaginationPrevious 
				key="previous"
				href={currentPage > 1 ? getQueryEndpoint(pathName, {
					page: currentPage - 1,
					pageSize: currentPageSize,
				}) : undefined}
				style={currentPage <= 1 ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
			/>
		);

		// Render only a subset of page numbers around the current page
		const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
		const endPage = Math.min(totalPages, startPage + visiblePages - 1);

		// Render ellipsis if needed before the start page
		if (startPage > 1) {
			paginationItems.push(
				<PaginationItem key="start-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		// Individual Page Links
		for (let i = startPage; i <= endPage; i++) {
			paginationItems.push(
				<PaginationLink 
					key={`page-${i}`} 
					isActive={currentPage === i}
					href={getQueryEndpoint(pathName, {
						page: i,
						pageSize: currentPageSize,
					})}
				>
					{i}
				</PaginationLink>
			);
		}

		// Render ellipsis if needed after the end page
		if (endPage < totalPages) {
			paginationItems.push(
				<PaginationItem key="end-ellipsis">
					<PaginationEllipsis />
				</PaginationItem>
			);
		}

		// Next Page
		paginationItems.push(
			<PaginationNext 
				key="next"
				href={currentPage < totalPages ? getQueryEndpoint(pathName, {
					page: currentPage + 1,
					pageSize: currentPageSize,
				}) : undefined}
				style={currentPage >= totalPages ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
			/>
		);

		return paginationItems;
	};

	return (
		<Pagination className={className} {...rest}>
			<PaginationContent>{renderPaginationItems()}</PaginationContent>
		</Pagination>
	);
}
