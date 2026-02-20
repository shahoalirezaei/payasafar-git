import Image from "next/image";
import Link from "next/link";

export interface IBlogPost {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  link: string;
}

interface BlogCardProps extends Omit<IBlogPost, "id"> {
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  link,
  className = "",
}) => {
  return (
    /* کارت اصلی: 
       overflow-visible برای اینکه عکس بیرون بزند ضروری است.
       marginTop اضافه شده تا عکس در اسلایدر به سقف نچسبد.
    */
    <div
      className={`group relative bg-white overflow-visible !w-[374px] !h-[392px] shadow-box rounded-[24px] flex flex-col pb-10 pr-[19px] pl-[28px] mt-[27px] ${className}`}
    >
      {/* بخش تصویر:
          -top-[27px] باعث می‌شود دقیقاً ۲۷ پیکسل از کادر بیرون بزند.
          inset-x-[23px] برای رعایت فاصله از چپ و راست (طبق کد خودتان).
      */}
      <div className="absolute -top-[27px] left-[23px] right-[23px] h-[223px] rounded-[17px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 328px"
        />
      </div>
      <div style={{ height: '196px' }} className="shrink-0 mt-[25px]" aria-hidden="true" />

      {/* بخش محتوا */}
      <div className="flex flex-col flex-grow text-center">
        <h3 className="text-xl font-bold mb-[15px] leading-7 line-clamp-2">
          {title}
        </h3>

        <p className="text-[#8C9DBB] font-semibold text-sm leading-7 line-clamp-3 text-justify">
          {description}
        </p>

        {/* دکمه (بدون تغییر در استایل طبق دستور شما، فقط جایگذاری در پایین) */}
        <Link href={link} className="absolute left-1/2 -bottom-[20px] -translate-x-1/2">
          <button className="btn-blue text-[15px]">مطالعه کنید</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;