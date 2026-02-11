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

// تعریف مراحل
const STEPS = [
  { id: 1, title: "انتخاب بلیط", icon: TicketIcon },
  { id: 2, title: "انتخاب صندلی", icon: SeatIcon },
  { id: 3, title: "مشخصات", icon: DetailsIcon },
  { id: 4, title: "فاکتور", icon: InvoiceIcon },
  { id: 5, title: "درگاه پرداخت", icon: PaymentIcon },
  { id: 6, title: "دریافت بلیط", icon: GetTicketIcon },
];

interface ProgressStepperProps {
  currentStep: number; // عددی بین 1 تا 6
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full px-4 py-6" dir="ltr"> {/* LTR direction as requested */}
      {/* Container with horizontal scroll for mobile safety */}
      <div className="flex items-center justify-between md:justify-center overflow-x-auto no-scrollbar min-w-full gap-2 md:gap-0">
        
        {STEPS.map((step, index) => {
          const isLastStep = index === STEPS.length - 1;
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div className="flex flex-col items-center min-w-[80px] z-10">
                {/* Circle & Icon */}
                <div
                  className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2
                    ${isCompleted 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" 
                      : isActive 
                        ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200 scale-110" 
                        : "bg-gray-200 border-gray-200 text-gray-400"
                    }
                  `}
                >
                  <step.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>

                {/* Title */}
                <span
                  className={`
                    mt-2 text-[10px] md:text-xs font-bold whitespace-nowrap px-1
                    ${isCompleted ? "text-blue-600" : isActive ? "text-amber-500" : "text-gray-400"}
                  `}
                >
                  {step.title}
                </span>
              </div>

              {/* Separator (Line for Desktop / Arrow for Mobile) */}
              {!isLastStep && (
                <div className="flex-1 flex items-center justify-center px-1 md:px-2 min-w-[20px]">
                  {/* Desktop: Dashed Line */}
                  <div 
                    className={`
                      hidden md:block h-0.5 w-full border-t-2 border-dashed mx-2 transition-colors duration-300
                      ${isCompleted ? "border-blue-500" : "border-gray-200"}
                    `} 
                  />
                  
                  {/* Mobile: Arrow Icon */}
                  <div className="block md:hidden text-gray-400">
                     <ChevronRight className={`w-4 h-4 ${isCompleted ? 'text-blue-500' : ''}`} />
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