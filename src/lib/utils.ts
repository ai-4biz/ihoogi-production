
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Variable replacement for templates
export function replaceTemplateVariables(text: string, variables: Record<string, string>): string {
  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
  }, text);
}

// Format phone number for WhatsApp link
export function formatWhatsAppNumber(phone: string): string {
  // Remove any non-digit characters
  return phone.replace(/\D/g, '');
}

// Create WhatsApp link with initial message
export function createWhatsAppLink(phone: string, text?: string): string {
  const formattedPhone = formatWhatsAppNumber(phone);
  const encodedText = text ? encodeURIComponent(text) : '';
  return `https://wa.me/${formattedPhone}${encodedText ? `?text=${encodedText}` : ''}`;
}

