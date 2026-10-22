export const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg' });
export const iso = (d: Date) => d.toISOString().slice(0, 10);
