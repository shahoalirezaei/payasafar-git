import QuickActionsGrid from '@/components/QuickAction/QuickActionsGrid'
import TerminalsGrid from '@/components/Terminal/TerminalsGrid'
import React from 'react'

function QuickActionvTerminal() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[27px] items-stretch">
        <TerminalsGrid />
        <QuickActionsGrid />
    </div>
  )
}

export default QuickActionvTerminal