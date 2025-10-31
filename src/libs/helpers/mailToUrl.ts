import { profile } from '../constants/profile';

export default function mailtoUrl(subject: string, body: string) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
