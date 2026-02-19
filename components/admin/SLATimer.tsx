'use client';

import { useEffect, useState } from 'react';
import { calculateSLA, getSLAColor } from '@/lib/utils/slaCalculator';
import { Clock, AlertTriangle, AlertCircle } from 'lucide-react';

interface SLATimerProps {
  deadline: string;
  showIcon?: boolean;
  showLabel?: boolean;
}

export function SLATimer({ deadline, showIcon = true, showLabel = true }: SLATimerProps) {
  const [slaStatus, setSLAStatus] = useState(calculateSLA(deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setSLAStatus(calculateSLA(deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  const textColor = getSLAColor(slaStatus);
  
  let icon = null;
  if (showIcon) {
    if (slaStatus.isExpired) {
      icon = <AlertCircle className="w-4 h-4" />;
    } else if (slaStatus.isCritical) {
      icon = <AlertTriangle className="w-4 h-4" />;
    } else {
      icon = <Clock className="w-4 h-4" />;
    }
  }

  return (
    <div className={`flex items-center gap-2 ${textColor}`}>
      {icon}
      <span className="font-mono text-sm font-semibold">
        {slaStatus.displayText}
      </span>
    </div>
  );
}
