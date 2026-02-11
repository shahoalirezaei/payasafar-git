// "use client";

// import React, { useState } from 'react';
// import FilterContent, { FilterState } from './FilterContent';
// import { X, Filter, ArrowLeft } from 'lucide-react';

// interface MobileFilterContentProps {
//   filters: FilterState;
//   setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
// }

// export default function MobileFilterContent({ filters, setFilters }: MobileFilterContentProps) {

//   return (
//     <div className="lg:hidden">
      
//        {/* <p>اعمال فیلتر</p>
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//             <path
//               fill="currentColor"
//               d="M10.733 19.79a.75.75 0 0 0 1.034-1.086L5.516 12.75H20.25a.75.75 0 0 0 0-1.5H5.516l6.251-5.955a.75.75 0 0 0-1.034-1.086l-7.42 7.067a1 1 0 0 0-.3.58a.8.8 0 0 0 .001.289a1 1 0 0 0 .3.579z"
//             ></path>
//           </svg>
//         </div> */}


//       {/* مودال فیلترها */}
      
//         <div className="fixed flex flex-col inset-0 bg-[#FCFDFF]  z-[60] px-4 sm:px-10 overflow-y-auto animate-in slide-in-from-bottom duration-300">
//           {/* هدر مودال - این بخش می‌تواند ثابت بماند یا آن را هم داخل اسکرول ببرید */}
//           <div className=" top-0  flex items-center justify-between p-6 border-b z-10">
//             <div className="w-6" /> 
//             <h2 className="text-lg font-bold">اعمال فیلتر</h2>
//             <button onClick={() => setIsOpen(false)}><ArrowLeft size={24} /></button>
//           </div>
          
//           {/* محتوای فیلترها */}
//           <div className="px-6 py-4">
//             <FilterContent filters={filters} setFilters={setFilters} />
//           </div>
         
          

//           {/* دکمه پایین که حالا با محتوا اسکرول می‌شود */}
//           <div className="p-6 mt-auto w-full border-t border-t-[#EDEDED] shadow-box  bottom-0 bg-white px-8 pt-6 pb-10">
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="w-full py-4 bg-btn-blue text-white rounded-[16px] font-bold shadow-md"
//             >
//                اعمال فیلتر(۳)
//             </button>
//           </div>
//         </div>
//     </div>
//   );
// }