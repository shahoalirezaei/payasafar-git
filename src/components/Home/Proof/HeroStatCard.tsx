// HeroStatCard.tsx
import AnimatedCounter from '@/components/utils/AnimatedCounter';
import Image from 'next/image';

interface HeroStatProps {
  mainValue: number;
  mainLabel: string;
  subValue: number;
  subLabel: string;
  imageSrc: string;
}

const HeroStatCard: React.FC<HeroStatProps> = ({ mainValue, mainLabel, subValue, subLabel, imageSrc }) => {
  return (
    <div className="bg-white rounded-[25px] shadow-box p-6 md:p-8 h-full flex items-center justify-center gap-6 md:gap-10 border border-gray-50 transition-all hover:shadow-xl">
      <div className="relative w-28 h-28 md:w-40 md:h-40 shrink-0">
        <Image src={imageSrc} alt="Travel Bag" fill priority className="object-contain" />
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* بخش آمار اصلی */}
        <div className="flex flex-col">
          <div className="flex items-center flex-row-reverse self-start text-3xl md:text-5xl font-extrabold text-orange-500">
            <span>+</span>
            <AnimatedCounter end={mainValue} />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-600 mt-1">{mainLabel}</span>
        </div>

        {/* بخش آمار فرعی */}
        <div className="flex flex-col">
          <div className="flex items-center flex-row-reverse self-start text-2xl md:text-3xl font-bold text-orange-400">
            <span>%</span>
            <AnimatedCounter end={subValue} />
          </div>
          <span className="text-xs md:text-sm font-bold text-gray-500">{subLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroStatCard;