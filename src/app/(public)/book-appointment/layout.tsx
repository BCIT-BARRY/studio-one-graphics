import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description:
    'Schedule your automotive wrap, paint protection film, ceramic coating, or window tinting appointment at Studio One Graphics in Surrey, BC.',
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
