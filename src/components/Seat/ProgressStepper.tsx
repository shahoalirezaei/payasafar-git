"use client";

import React from "react";
import {
  TicketIcon,
  SeatIcon,
  DetailsIcon,
  InvoiceIcon,
  PaymentIcon,
  GetTicketIcon,
  ChevronRight,
} from "./../ui/StepperIcons"
import Icon from "../ui/Icon";

// تعریف مراحل
const STEPS = [
  { id: 6, title: "دریافت بلیط", icon: GetTicketIcon },
  { id: 5, title: "درگاه پرداخت", icon: PaymentIcon },
  { id: 4, title: "فاکتور", icon: InvoiceIcon },
  { id: 3, title: "مشخصات", icon: DetailsIcon, mobileOnly: true },
  { id: 2, title: "انتخاب صندلی", icon: SeatIcon },
  { id: 1, title: "انتخاب بلیط", icon: TicketIcon },
];

interface ProgressStepperProps {
  currentStep: number; // عددی بین 1 تا 6
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full px-4 py-8"> {/* LTR direction as requested */}
      {/* Container with horizontal scroll for mobile safety */}
      <div className="flex items-start justify-between md:justify-center min-w-full sm:gap-2 md:gap-0">
        
        {STEPS.map((step, index) => {
          const isLastStep = index === STEPS.length - 1;
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div className={`flex flex-col items-center ${step.mobileOnly ? "md:hidden" : ""}`}>
                {/* Circle & Icon */}
                <div
                  className={`
                    max-w-[32px] max:h-[32px] rounded-full flex items-center justify-center transition-all duration-300 border-2 
                    ${isCompleted 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" 
                      : isActive 
                        ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200 scale-110" 
                        : "bg-gray-200 border-gray-200 text-gray-400"
                    }
                  `}
                >
                  <step.icon className="w-[18px] h-[18px]" />
                </div>

                {/* Title */}
                <span
                  className={`
                    mt-2 text-[8px] md:text-[10px] font-semibold whitespace-nowrap
                    ${isCompleted ? "text-blue-600" : isActive ? "text-amber-500" : "text-gray-400"}
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Separator (Line for Desktop / Arrow for Mobile) */}
              {!isLastStep && (
                <div className={`flex-1 flex items-center justify-center px-1 md:px-2 w-auto md:min-w-[20px] ${step.mobileOnly ? "md:hidden" : ""}`}>
                  {/* Desktop: Dashed Line */}
                  {/* کانتینر نگهدارنده خط و مثلث */}
<div className="hidden mt-2 md:flex items-center w-full mx-2">
  {/* ۲. مثلث کوچک (ساخته شده با تکنیک Border) */}
  <div 
    className={`
     
      /* رنگ مثلث */
      ${isCompleted || isActive ? "border-l-blue-500" : "border-l-gray-200"}
       w-0 h-0 
      border-t-[4px] border-t-transparent 
      border-b-[4px] border-b-transparent 
      border-l-[6px] /* طول مثلث */
      transition-colors duration-300
      
      
    `} 
  />
  
  {/* ۱. خط‌چین (flex-1 دادیم که کل فضای خالی رو پر کنه) */}
  <div 
    className={`
      h-0.5 flex-1 border-t-2 border-dashed transition-colors duration-300
      ${isCompleted || isActive ? "border-blue-500" : "border-gray-200"}
    `} 
  />

  
  
</div>
                  
                  {/* Mobile: Arrow Icon */}
                  <div className={`block md:hidden mb-1 text-gray-400 ${isCompleted || isActive ? "blue600" : ""}`}>
                     <Icon name="solar--arrow-left-broken" className="rotate-180 w-3 h-3" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;