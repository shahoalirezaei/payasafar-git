// components/ui/StepperIcons.tsx
import React from "react";

export const TicketIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 1 0-6.364-2.636"></path>
    <path d="m16 10l-3.598 4.318c-.655.786-.983 1.18-1.424 1.2s-.803-.343-1.527-1.067L8 13"></path>
  </svg>
);

export const SeatIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path fill="none" d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
    <path d="M3.468 16.745c.495-.958 1.54-1.6 2.804-1.441a34 34 0 0 1 3.97.726c2.01.502 3.771 1.467 5.073 2.348l.44.306l.4.295l.358.276l.314.254l.267.226l.22.192c.843.751.27 1.978-.685 2.068l-.112.005H7.923c-1.682 0-3.08-.845-4.104-2.126c-.774-.967-.84-2.183-.35-3.129ZM19 2c.893 0 1.278.84 1.467 1.61l.06.268l.024.128c.144.797.221 1.842.252 2.916c.06 2.125-.062 4.602-.327 5.795c-.462 2.082-1.14 3.529-1.952 4.401c-.826.89-1.942 1.291-2.971.776c-.789-.394-1.26-1.331-1.518-2.13a5.73 5.73 0 0 1 .017-3.58c.21-.632.588-1.142 1.004-1.627l.363-.411c.442-.495.885-.99 1.187-1.593c.44-.88.56-1.843.597-2.81l.014-.58l.009-.56l.006-.138l.02-.28C17.347 3.107 17.716 2 19 2"></path>
  </svg>
);

export const DetailsIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.55 3c-3.852.007-5.87.102-7.159 1.39C2 5.783 2 8.022 2 12.5s0 6.717 1.391 8.109C4.783 22 7.021 22 11.501 22c4.478 0 6.717 0 8.108-1.391c1.29-1.29 1.384-3.307 1.391-7.16"></path>
    <path d="M11.056 13C10.332 3.866 16.802 1.276 21.98 2.164c.209 3.027-1.273 4.16-4.093 4.684c.545.57 1.507 1.286 1.403 2.18c-.074.638-.506.95-1.372 1.576c-1.896 1.37-4.093 2.234-6.863 2.396"></path>
    <path d="M9 17c2-5.5 3.96-7.364 6-9"></path>
  </svg>
);

export const InvoiceIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26" fill="currentColor">
    <path d="M9.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"></path>
    <path fillRule="evenodd" d="M10.5 9a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2h-7a1 1 0 0 1-1-1" clipRule="evenodd"></path>
    <path fillRule="evenodd" d="M13 24c6.075 0 11-4.925 11-11S19.075 2 13 2S2 6.925 2 13s4.925 11 11 11m0 2c7.18 0 13-5.82 13-13S20.18 0 13 0S0 5.82 0 13s5.82 13 13 13" clipRule="evenodd"></path>
  </svg>
);

export const PaymentIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.017 14C4.217 14 6 15.783 6 17.983M6 4.017C6 6.217 4.217 8 2.017 8M18 4.017C18 6.197 19.769 7.97 21.942 8"></path>
    <path d="M22 11v-1c0-2.828 0-4.243-.879-5.121C20.243 4 18.828 4 16 4H8c-2.828 0-4.243 0-5.121.879C2 5.757 2 7.172 2 10v2c0 2.828 0 4.243.879 5.121C3.757 18 5.172 18 8 18h3"></path>
    <path d="M15 11a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-1 7s1 0 2 2c0 0 3.177-5 6-6"></path>
  </svg>
);

export const GetTicketIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="M7.444 40.543c-2.23-.166-3.913-1.762-4.12-3.99A97 97 0 0 1 3 31.369c-.035-.925.6-1.718 1.4-2.181a5.99 5.99 0 0 0 3-5.187a5.99 5.99 0 0 0-3-5.186c-.8-.464-1.435-1.257-1.4-2.181c.085-2.2.203-3.897.323-5.187c.207-2.227 1.89-3.823 4.12-3.99C10.417 7.235 15.553 7 24 7s13.583.234 16.556.457c2.23.166 3.913 1.762 4.12 3.99c.12 1.289.237 2.986.322 5.185c.036.925-.6 1.717-1.4 2.181A5.99 5.99 0 0 0 40.6 24a5.99 5.99 0 0 0 3 5.187c.8.463 1.435 1.256 1.4 2.18a97 97 0 0 1-.323 5.187c-.207 2.227-1.89 3.823-4.12 3.99c-2.973.222-8.11.456-16.556.456s-13.583-.234-16.556-.457Z"></path>
    <path strokeLinecap="round" d="M30 37v3.75M30 27v4m0-14v4m0-13.75V11"></path>
  </svg>
);

// آیکون فلش برای موبایل
export const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);