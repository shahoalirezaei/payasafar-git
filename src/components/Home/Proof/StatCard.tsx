// StatCard.tsx
import Image from 'next/image';
import AnimatedCounter from '@/components/utils/AnimatedCounter';

interface StatCardProps {
  value: number;
  label: string;
  prefix?: string; // علامت مثل + یا %
}

const StatCard: React.FC<StatCardProps> = ({ value, label, prefix = "" }) => {
  return (
    <div className="bg-white rounded-[20px] shadow-box p-4 flex items-center justify-center border border-gray-50 h-full">
      {/* گندم راست */}
      <div className="relative w-6 h-12 md:w-8 md:h-16 shrink-0 opacity-80">
        <Image src="/images/images/gandom.webp" alt="decoration" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center text-center px-1">
        {/* استفاده از flex-row-reverse برای نشاندن علامت در سمت چپ عدد */}
        <div className="flex items-center justify-center flex-row-reverse text-xl md:text-2xl font-bold text-blue-600 mb-1">
          <span className="inline-block">{prefix}</span>
          <AnimatedCounter end={value} />
        </div>
        <span className="text-[10px] md:text-xs font-semibold text-gray-500 leading-tight">
          {label}
        </span>
      </div>

      {/* گندم چپ */}
      <div className="relative w-6 h-12 md:w-8 md:h-16 shrink-0 opacity-80">
        <Image src="/images/images/gandom.webp" alt="decoration" fill className="object-contain scale-x-[-1]" />
      </div>
    </div>
  );
};

export default StatCard;