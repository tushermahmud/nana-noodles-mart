'use client';

interface VirtualStoreHeaderProps {
  title?: string;
  subtitle?: string;
}

const VirtualStoreHeader = ({
  title = 'Welcome to Nana&apos;s Virtual Store',
  subtitle = 'Browse our interactive shelves and discover the perfect ramen for your taste buds.',
}: VirtualStoreHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 anime-title">
        {title.includes('Nana&apos;s Virtual Store') ? (
          <>
            Welcome to{' '}
            <span className="gradient-text anime-text-shadow">Nana&apos;s Virtual Store</span>
          </>
        ) : (
          title
        )}
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto pop-text">{subtitle}</p>
    </div>
  );
};

export default VirtualStoreHeader;
