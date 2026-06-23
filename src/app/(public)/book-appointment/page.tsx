'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/mock';
import type { ServiceOption } from '@/types';

const serviceOptions: ServiceOption[] = [
  ...services.map((s) => s.title),
  'Not Sure / Need Recommendation',
];

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const d = new Date();
    d.setDate(d.getDate() + 2);
    while (dates.length < 14) {
      if (d.getDay() !== 0) dates.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return dates;
  }, []);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const formatDate = (d: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return { day: days[d.getDay()], date: d.getDate(), month: months[d.getMonth()] };
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  if (submitted) {
    return (
      <div>
        <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '100px 32px 96px' }}>
          <div
            className="text-center py-20 px-8"
            style={{
              background: 'var(--color-surface-1)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <h2 className="m-0 text-[28px] font-semibold tracking-[-0.5px]" style={{ color: 'var(--color-ink)' }}>
              Appointment request received
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] max-w-[500px] mx-auto" style={{ color: 'var(--color-ink-muted)' }}>
              Your appointment request has been received. Studio One will contact you to confirm availability and next steps.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '100px 32px 36px' }}>
        <span className="text-[11px] font-semibold tracking-[1.5px] uppercase block" style={{ color: 'var(--color-ink-subtle)' }}>
          Book
        </span>
        <h1
          className="mt-3 mb-3"
          style={{
            color: 'var(--color-ink)',
            fontSize: 'clamp(36px, 4.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-1.6px',
          }}
        >
          Book an appointment
        </h1>
        <p className="m-0 max-w-[520px] text-[17px] leading-[1.65]" style={{ color: 'var(--color-ink-muted)' }}>
          Select your service, pick a date and time, and we&apos;ll confirm your appointment.
        </p>
      </section>

      {/* Progress */}
      <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 36px' }}>
        <div className="flex gap-2 items-center">
          {['Service', 'Date & Time', 'Details'].map((label, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isComplete = step > stepNum;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className="w-8 h-px"
                    style={{ background: isComplete ? 'rgba(255,255,255,0.3)' : 'var(--color-hairline)' }}
                  />
                )}
                <div
                  className="flex items-center gap-2"
                  style={{ opacity: isActive || isComplete ? 1 : 0.4, cursor: isComplete ? 'pointer' : 'default' }}
                  onClick={() => isComplete && setStep(stepNum)}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0"
                    style={{
                      background: isActive ? 'var(--color-inverse-canvas)' : isComplete ? 'var(--color-surface-3)' : 'var(--color-surface-2)',
                      color: isActive ? 'var(--color-inverse-ink)' : 'var(--color-ink)',
                      border: `1px solid ${isActive ? 'transparent' : 'var(--color-hairline)'}`,
                    }}
                  >
                    {isComplete ? '✓' : stepNum}
                  </div>
                  <span className="text-[13px] font-medium hidden sm:inline" style={{ color: 'var(--color-ink)' }}>
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step 1: Service */}
      {step === 1 && (
        <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className="cursor-pointer transition-all duration-150 flex flex-col gap-1.5"
                style={{
                  background: selectedService === s.id ? 'var(--color-surface-3)' : 'var(--color-surface-1)',
                  border: `1px solid ${selectedService === s.id ? 'rgba(255,255,255,0.2)' : 'var(--color-hairline)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                }}
              >
                <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>{s.title}</h3>
                <p className="m-0 text-[14px] leading-[1.5]" style={{ color: 'var(--color-ink-muted)' }}>{s.desc}</p>
                <span className="text-[12px] mt-1" style={{ color: 'var(--color-ink-subtle)' }}>Typical duration: {s.duration}</span>
              </div>
            ))}
            <div
              onClick={() => setSelectedService('not-sure')}
              className="cursor-pointer transition-all duration-150 flex flex-col gap-1.5"
              style={{
                background: selectedService === 'not-sure' ? 'var(--color-surface-3)' : 'var(--color-surface-1)',
                border: `1px solid ${selectedService === 'not-sure' ? 'rgba(255,255,255,0.2)' : 'var(--color-hairline)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-lg)',
              }}
            >
              <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Not Sure / Need Recommendation</h3>
              <p className="m-0 text-[14px] leading-[1.5]" style={{ color: 'var(--color-ink-muted)' }}>
                Not sure what you need? Book an appointment and we&apos;ll help you figure it out.
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button size="lg" disabled={!selectedService} onClick={() => setStep(2)}>Continue</Button>
          </div>
        </section>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
          <div className="mb-9">
            <h3 className="m-0 mb-4 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Select a date</h3>
            <div className="flex gap-2.5 flex-wrap sm:flex-nowrap overflow-x-auto pb-2">
              {availableDates.map((d, i) => {
                const f = formatDate(d);
                const isSelected = selectedDate === i;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className="shrink-0 w-[56px] sm:w-[64px] py-3 flex flex-col items-center gap-0.5 cursor-pointer transition-all duration-[120ms]"
                    style={{
                      background: isSelected ? 'var(--color-inverse-canvas)' : 'var(--color-surface-1)',
                      border: `1px solid ${isSelected ? 'transparent' : 'var(--color-hairline)'}`,
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.5px]"
                      style={{ color: isSelected ? 'var(--color-inverse-ink)' : 'var(--color-ink-subtle)' }}
                    >
                      {f.day}
                    </span>
                    <span
                      className="text-[20px] font-semibold leading-none"
                      style={{ color: isSelected ? 'var(--color-inverse-ink)' : 'var(--color-ink)' }}
                    >
                      {f.date}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: isSelected ? 'var(--color-inverse-ink)' : 'var(--color-ink-muted)' }}
                    >
                      {f.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedDate !== null && (
            <div className="mb-9">
              <h3 className="m-0 mb-4 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Select a time</h3>
              <div className="flex gap-2.5 flex-wrap">
                {timeSlots.map((t) => {
                  const isSelected = selectedTime === t;
                  return (
                    <div
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className="cursor-pointer transition-all duration-[120ms] px-5 py-2.5 text-[14px] font-medium"
                      style={{
                        background: isSelected ? 'var(--color-inverse-canvas)' : 'var(--color-surface-1)',
                        border: `1px solid ${isSelected ? 'transparent' : 'var(--color-hairline)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: isSelected ? 'var(--color-inverse-ink)' : 'var(--color-ink)',
                      }}
                    >
                      {t}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button size="lg" disabled={selectedDate === null || !selectedTime} onClick={() => setStep(3)}>Continue</Button>
          </div>
        </section>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <section className="max-w-[var(--container-max)] mx-auto" style={{ padding: '0 32px 96px' }}>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-16"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {/* Form */}
            <div className="flex flex-col gap-5">
              <h3 className="m-0 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Your details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldInput label="Full name" placeholder="Your name" required />
                <FieldInput label="Phone" placeholder="(604) 555-0000" type="tel" />
              </div>
              <FieldInput label="Email" placeholder="you@email.com" type="email" required />
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Vehicle details</label>
                <textarea
                  placeholder="Year, make, model, color — anything that helps us prepare..."
                  required
                  className="resize-y outline-none"
                  style={{
                    background: 'var(--color-surface-1)',
                    color: 'var(--color-ink)',
                    fontSize: '15px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-hairline-strong)',
                    minHeight: '80px',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>Project details / notes</label>
                <textarea
                  placeholder="Anything else you'd like us to know..."
                  className="resize-y outline-none"
                  style={{
                    background: 'var(--color-surface-1)',
                    color: 'var(--color-ink)',
                    fontSize: '15px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-hairline-strong)',
                    minHeight: '80px',
                  }}
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="m-0 mb-4 text-[18px] font-semibold" style={{ color: 'var(--color-ink)' }}>Appointment summary</h3>
              <div
                className="flex flex-col gap-4"
                style={{
                  background: 'var(--color-surface-1)',
                  border: '1px solid var(--color-hairline)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                }}
              >
                <SummaryRow label="Service" value={selectedServiceData?.title || 'Not Sure / Need Recommendation'} />
                <div className="h-px" style={{ background: 'var(--color-hairline)' }} />
                <SummaryRow
                  label="Date"
                  value={selectedDate !== null ? (() => { const f = formatDate(availableDates[selectedDate]); return `${f.day}, ${f.month} ${f.date}`; })() : ''}
                />
                <div className="h-px" style={{ background: 'var(--color-hairline)' }} />
                <SummaryRow label="Time" value={selectedTime || ''} />
                <div className="h-px" style={{ background: 'var(--color-hairline)' }} />
                <SummaryRow label="Location" value="Surrey, BC" />
                {selectedServiceData && (
                  <>
                    <div className="h-px" style={{ background: 'var(--color-hairline)' }} />
                    <SummaryRow label="Est. duration" value={selectedServiceData.duration} />
                  </>
                )}
              </div>
              <p className="mt-3 text-[12px] italic" style={{ color: 'var(--color-ink-subtle)' }}>
                We&apos;ll confirm your appointment via email or phone.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between md:col-span-2 mt-4">
              <Button variant="ghost" type="button" onClick={() => setStep(2)}>Back</Button>
              <Button size="lg" type="submit">Confirm Appointment</Button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

function FieldInput({ label, placeholder, type = 'text', required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold" style={{ color: 'var(--color-ink)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="outline-none"
        style={{
          background: 'var(--color-surface-1)',
          color: 'var(--color-ink)',
          fontSize: '15px',
          padding: '12px 14px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-hairline-strong)',
        }}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[13px] uppercase tracking-[1px] font-semibold" style={{ color: 'var(--color-ink-subtle)' }}>{label}</span>
      <span className="text-[15px] font-medium" style={{ color: 'var(--color-ink)' }}>{value}</span>
    </div>
  );
}
