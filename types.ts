
export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  PARTICIPANT = 'PARTICIPANT'
}

export enum EventStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface EventProposal {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizerId: string;
  organizerName: string;
  department: string;
  college: string;
  district: string;
  budget?: number;
  expectedParticipants: number;
  objectives: string[];
  status: EventStatus;
  rejectionReason?: string;
  createdAt: string;
  currentRegistrations: number;
  capacity: number;
  outcomes?: string[];
  winners?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  // Added college and district to match institutional context requirements
  college?: string;
  district?: string;
}

export interface DashboardStats {
  totalEvents: number;
  pendingApprovals: number;
  participationCount: number;
  certificatesIssued: number;
  budgetUtilization: number;
}
