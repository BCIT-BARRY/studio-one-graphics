export type ServiceType =
  | 'Vinyl Wraps'
  | 'Paint Protection Film (PPF)'
  | 'Ceramic Coatings'
  | 'Decals & Graphics'
  | 'Commercial Wraps';

export type ServiceOption = ServiceType | 'Not Sure / Need Recommendation';

export type AppointmentRequestStatus =
  | 'New'
  | 'Contacted'
  | 'Awaiting Confirmation'
  | 'Confirmed'
  | 'Archived';

export interface AppointmentRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: ServiceOption;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: AppointmentRequestStatus;
  createdAt: string;
}

export type AppointmentType =
  | 'Consultation'
  | 'Vehicle Drop-Off'
  | 'Install Day'
  | 'Pickup'
  | 'Follow-Up';

export type AppointmentStatus =
  | 'Requested'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled'
  | 'No-Show';

export interface Appointment {
  id: string;
  customer: string;
  phone: string;
  vehicle: string;
  type: AppointmentType;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes: string;
  relatedRequest?: string;
}

export type ProjectStatus =
  | 'Scheduled'
  | 'In Progress'
  | 'Waiting on Material'
  | 'Ready for Pickup'
  | 'Completed'
  | 'Cancelled';

export interface Project {
  id: string;
  customer: string;
  vehicle: string;
  service: ServiceType;
  status: ProjectStatus;
  startDate: string;
  targetDate: string;
  notes: string;
  galleryReady: boolean;
}

export type GalleryCategory = ServiceType;

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  image: string;
  featured: boolean;
  visible: boolean;
  projectId?: string;
  date: string;
}

export interface BusinessSettings {
  businessName: string;
  phone: string;
  email: string;
  location: string;
  appointmentMessage: string;
  bookingCtaText: string;
  instagram: string;
  websiteUrl: string;
  footerDescription: string;
  developerCredit: string;
}
