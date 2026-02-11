
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, EventProposal, EventStatus, User } from './types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  events: EventProposal[];
  setEvents: React.Dispatch<React.SetStateAction<EventProposal[]>>;
  updateEventStatus: (id: string, status: EventStatus, reason?: string) => void;
  addEvent: (event: Omit<EventProposal, 'id' | 'status' | 'createdAt' | 'currentRegistrations'>) => void;
}

const initialEvents: EventProposal[] = [
  {
    id: '1',
    title: 'Inter-College Tech Symposium 2024',
    description: 'A grand symposium for engineering students to showcase their technical prowess featuring paper presentations and live coding.',
    category: 'Technical',
    date: '2024-05-15',
    time: '09:00',
    venue: 'Main Auditorium',
    organizerId: 'org1',
    organizerName: 'Dr. Sarah Wilson',
    department: 'Computer Science',
    college: 'Anna University',
    district: 'Chennai',
    budget: 50000,
    expectedParticipants: 300,
    objectives: ['Foster technical innovation', 'Promote networking', 'Industry-academia bridge'],
    status: EventStatus.APPROVED,
    createdAt: '2024-03-01',
    currentRegistrations: 145,
    capacity: 300
  },
  {
    id: '2',
    title: 'Annual Cultural Fest: Heritage 24',
    description: 'Celebrating our cultural roots through music, dance, and art. Includes traditional food stalls and folk performances.',
    category: 'Cultural',
    date: '2024-06-10',
    time: '18:00',
    venue: 'Open Air Theatre',
    organizerId: 'org2',
    organizerName: 'Prof. James Bond',
    department: 'Arts & Humanities',
    college: 'PSG College of Technology',
    district: 'Coimbatore',
    budget: 120000,
    expectedParticipants: 1000,
    objectives: ['Cultural exchange', 'Showcase talent', 'Preserve heritage'],
    status: EventStatus.PENDING,
    createdAt: '2024-03-05',
    currentRegistrations: 0,
    capacity: 1000
  },
  {
    id: '3',
    title: 'AI Ethics Workshop',
    description: 'A discussion on the ethical implications of artificial intelligence in modern society, led by industry experts.',
    category: 'Workshop',
    date: '2024-04-20',
    time: '14:00',
    venue: 'Seminar Hall 1',
    organizerId: 'org1',
    organizerName: 'Dr. Sarah Wilson',
    department: 'Computer Science',
    college: 'Anna University',
    district: 'Chennai',
    budget: 5000,
    expectedParticipants: 50,
    objectives: ['Critical thinking', 'Ethics awareness', 'Responsible AI use'],
    status: EventStatus.COMPLETED,
    createdAt: '2024-02-15',
    currentRegistrations: 48,
    capacity: 50,
    outcomes: ['Students understood AI bias', 'Ethical guidelines drafted for project work'],
    winners: ['Alice Cooper', 'Bob Marley']
  },
  {
    id: '4',
    title: 'Campus Basketball League',
    description: 'Inter-departmental basketball tournament aimed at promoting sportsmanship and physical health.',
    category: 'Sports',
    date: '2024-04-12',
    time: '16:00',
    venue: 'Indoor Sports Complex',
    organizerId: 'org3',
    organizerName: 'Coach Mike Tyson',
    department: 'Physical Education',
    college: 'Thiagarajar College of Engineering',
    district: 'Madurai',
    budget: 25000,
    expectedParticipants: 120,
    objectives: ['Improve fitness', 'Team building', 'Competitive spirit'],
    status: EventStatus.APPROVED,
    createdAt: '2024-03-10',
    currentRegistrations: 88,
    capacity: 120
  },
  {
    id: '5',
    title: 'Machine Learning Masterclass',
    description: 'Hands-on intensive masterclass on Deep Learning and Neural Networks for final year students.',
    category: 'Technical',
    date: '2024-07-05',
    time: '10:00',
    venue: 'Lab 4 - IT Dept',
    organizerId: 'org4',
    organizerName: 'Dr. Emily Chen',
    department: 'Information Technology',
    college: 'NIT Trichy',
    district: 'Trichy',
    budget: 15000,
    expectedParticipants: 40,
    objectives: ['Skill development', 'Career readiness', 'Project mentoring'],
    status: EventStatus.PENDING,
    createdAt: '2024-03-15',
    currentRegistrations: 0,
    capacity: 40
  },
  {
    id: '6',
    title: 'Cybersecurity Awareness Seminar',
    description: 'Critical seminar on personal digital security, phishing prevention, and safe internet practices.',
    category: 'Seminar',
    date: '2024-04-28',
    time: '11:00',
    venue: 'Main Auditorium',
    organizerId: 'org1',
    organizerName: 'Dr. Sarah Wilson',
    department: 'Computer Science',
    college: 'IIT Madras',
    district: 'Chennai',
    budget: 2000,
    expectedParticipants: 200,
    objectives: ['Security awareness', 'Risk mitigation', 'Best practices'],
    status: EventStatus.APPROVED,
    createdAt: '2024-03-18',
    currentRegistrations: 45,
    capacity: 200
  },
  {
    id: '7',
    title: 'Business Plan Pitch Deck 2024',
    description: 'Startup pitching event for aspiring student entrepreneurs to present their business models to a panel of investors.',
    category: 'Academic',
    date: '2024-05-22',
    time: '14:30',
    venue: 'Conference Room B',
    organizerId: 'org5',
    organizerName: 'Prof. Robert Kiyosaki',
    department: 'Management Studies',
    college: 'Loyola College',
    district: 'Chennai',
    budget: 35000,
    expectedParticipants: 100,
    objectives: ['Entrepreneurship growth', 'Pitching skills', 'Funding opportunities'],
    status: EventStatus.PENDING,
    createdAt: '2024-03-20',
    currentRegistrations: 0,
    capacity: 100
  },
  {
    id: '8',
    title: 'Sustainable Living Exhibition',
    description: 'A showcase of eco-friendly projects, organic farming techniques, and zero-waste lifestyles.',
    category: 'Academic',
    date: '2024-03-10',
    time: '10:00',
    venue: 'Campus Green Belt',
    organizerId: 'org6',
    organizerName: 'Dr. Jane Goodall',
    department: 'Environmental Science',
    college: 'SRM Institute of Science and Technology',
    district: 'Kanchipuram',
    budget: 12000,
    expectedParticipants: 250,
    objectives: ['Sustainability education', 'Eco-awareness', 'Innovation'],
    status: EventStatus.COMPLETED,
    createdAt: '2024-01-20',
    currentRegistrations: 310,
    capacity: 250,
    outcomes: ['Planted 100 saplings', 'Zero-waste guidelines adopted by cafeteria'],
    winners: ['Green Warriors Team', 'Eco-Tech Innovators']
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<EventProposal[]>(initialEvents);

  const updateEventStatus = (id: string, status: EventStatus, reason?: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status, rejectionReason: reason } : e));
  };

  const addEvent = (eventData: Omit<EventProposal, 'id' | 'status' | 'createdAt' | 'currentRegistrations'>) => {
    const newEvent: EventProposal = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      status: EventStatus.PENDING,
      createdAt: new Date().toISOString(),
      currentRegistrations: 0
    };
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, events, setEvents, updateEventStatus, addEvent }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
