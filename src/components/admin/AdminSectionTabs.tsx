import { motion } from "framer-motion";

type AdminSectionTabsProps = {
	tabs: {
		id: string;
		label: string;
		icon: React.ElementType;
		count: number | null;
	}[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

const AdminSectionTabs = ({tabs, activeTab, setActiveTab}: AdminSectionTabsProps) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer"
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{tab.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tab.count !== null ? tab.count : "—"}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  activeTab === tab.id 
                    ? "bg-gradient-to-r from-pink-500 to-orange-500" 
                    : "bg-gray-100"
                }`}>
                  <tab.icon className={`w-6 h-6 ${
                    activeTab === tab.id ? "text-white" : "text-gray-600"
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
	);
};

export default AdminSectionTabs;