/**
 * SLA Calculator utilities for interview deadlines
 */

export interface SLAStatus {
  timeRemaining: number; // milliseconds
  displayText: string;
  isExpired: boolean;
  isWarning: boolean; // Less than 24 hours remaining
  isCritical: boolean; // Less than 1 hour remaining
}

export function calculateSLA(slaDeadline: string): SLAStatus {
  const now = new Date();
  const deadline = new Date(slaDeadline);
  const timeRemaining = deadline.getTime() - now.getTime();
  
  const isExpired = timeRemaining <= 0;
  const isWarning = timeRemaining > 0 && timeRemaining <= 24 * 60 * 60 * 1000;
  const isCritical = timeRemaining > 0 && timeRemaining <= 60 * 60 * 1000;
  
  const displayText = formatTimeRemaining(timeRemaining);
  
  return {
    timeRemaining,
    displayText,
    isExpired,
    isWarning,
    isCritical,
  };
}

export function formatTimeRemaining(milliseconds: number): string {
  if (milliseconds <= 0) {
    return 'Expired';
  }
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

export function getSLAColor(slaStatus: SLAStatus): string {
  if (slaStatus.isExpired) return 'text-destructive';
  if (slaStatus.isCritical) return 'text-red-500';
  if (slaStatus.isWarning) return 'text-yellow-500';
  return 'text-green-500';
}

export function getSLABackgroundColor(slaStatus: SLAStatus): string {
  if (slaStatus.isExpired) return 'bg-destructive/10';
  if (slaStatus.isCritical) return 'bg-red-500/10';
  if (slaStatus.isWarning) return 'bg-yellow-500/10';
  return 'bg-green-500/10';
}
