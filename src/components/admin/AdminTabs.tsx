import { DashboardStats } from '@/types/admin';

type AdminTabsProps = {
  tabs: {
    id: string;
    label: string;
    icon: React.ElementType;
    total: keyof DashboardStats;
    count: number | null;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  dashboardStats: DashboardStats | null;
};

const AdminTabs = ({ tabs, activeTab, setActiveTab, dashboardStats }: AdminTabsProps) => {
  console.log(dashboardStats);
  console.log(tabs);
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab.id
              ? 'border-pink-500 text-pink-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <tab.icon className="w-4 h-4 mr-2" />
          {tab.label}
          {dashboardStats?.[tab.total] !== null && (
            <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
              {dashboardStats?.[tab.total] ?? 0}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
