import { Role } from '@prisma/client';

export const testUser = {
  email: 'test@example.com',
  password: 'password123',
  role: Role.BASIC,
};

export function extractLastCode(logContent: string): string | null {
  const codeRegex = /Verification code: (\d+)/g;
  const matches = Array.from(logContent.matchAll(codeRegex));
  
  if (matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    if (lastMatch && lastMatch[1]) {
      return lastMatch[1];
    }
  }
  
  return null;
}