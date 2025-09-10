export interface AdminPledge {
	id: string;
	// Add pledge-specific fields as needed
}

export interface ProjectRow {
	id: string;
	name: string;
	// Add project-specific fields as needed
}

export interface AdminStats {
	totalUsers: number;
	totalProducts: number;
	totalOrders: number;
	totalRevenue: number;
	pendingOrders: number;
	completedOrders: number;
	cancelledOrders: number;
	averageOrderValue: number;
}
