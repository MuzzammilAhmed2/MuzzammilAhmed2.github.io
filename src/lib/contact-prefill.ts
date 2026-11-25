// Lets any button open the contact form with a topic already written in the message.
// Same page: a window event fills the form. Other pages: the topic travels in ?enquiry= and is read on load.

export const PREFILL_EVENT = "contact-prefill";

export const contactHref = (topic: string) => `/?enquiry=${encodeURIComponent(topic)}#contact`;

export function prefillContact(topic: string) {
  window.dispatchEvent(new CustomEvent<string>(PREFILL_EVENT, { detail: topic }));
}

export function readEnquiry(): string | null {
  return new URLSearchParams(window.location.search).get("enquiry");
}
