import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://studioonegraphics.up.railway.app'),
  title: {
    default: 'Studio One Graphics',
    template: '%s | Studio One Graphics',
  },
  description:
    'Premium automotive wraps, paint protection film, ceramic coatings, and window tinting in Surrey, BC. By appointment only.',
  openGraph: {
    siteName: 'Studio One Graphics',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Studio One Graphics',
  description:
    'Premium automotive wraps, paint protection film, ceramic coatings, and window tinting in Surrey, BC.',
  url: 'https://studioonegraphics.up.railway.app',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Surrey',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
