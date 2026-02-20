import { User } from "lucide-react";
import React from "react";

interface IComment {
  id: number;
  name: string;
  experience: string;
  text: string;
}

const CommentCard = ({ comment }: { comment: IComment }) => {
  return (
    <div className="bg-white rounded-[20px] px-7 py-5 shadow-box h-full flex flex-col">
      {/* هدر کارت: آیکون و نام */}
      <div className="flex items-center justify-start gap-4 mb-4">
        {/* آیکون پروفایل مشابه عکس */}
        <div className="w-[50px] h-[50px] rounded-full bg-[#EBEFFB] flex items-center justify-center blue600">
          <User size={24} />
        </div>
        <div className="text-right">
          <h3 className="text-[#1B217C] font-semibold text-base">
            {comment.name}
          </h3>
          <span className="text-[#6C93E5] text-xs font-normal">
            {comment.experience}
          </span>
        </div>
        
      </div>

      {/* متن نظر */}
      <p className=" text-right text-sm leading-7 font-medium line-clamp-2">
        {comment.text}
      </p>
    </div>
  );
};

export default CommentCard