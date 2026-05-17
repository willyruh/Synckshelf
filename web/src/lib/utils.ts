import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(date));
}

export function timeAgo(date: string | Date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getExpiryUrgency(expiryDate: string | Date): 'critical' | 'warning' | 'safe' {
  const diff = new Date(expiryDate).getTime() - Date.now();
  const hours = diff / 3600000;
  if (hours <= 24) return 'critical';
  if (hours <= 72) return 'warning';
  return 'safe';
}

export function getHealthColor(score: number) {
  if (score >= 80) return '#4edea3';
  if (score >= 50) return '#ddb7ff';
  return '#ffb4ab';
}

export function getRiskColor(risk: number) {
  if (risk >= 70) return 'text-error';
  if (risk >= 40) return 'text-tertiary';
  return 'text-primary';
}
