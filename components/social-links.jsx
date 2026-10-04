import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const socialLinks = [
  { label: "Facebook", href: "https://web.facebook.com/profile.php?id=61594958160681", Icon: FaFacebookF },
  { label: "TikTok", href: "https://www.tiktok.com/@beautifulfeetmovie", Icon: FaTiktok },
  { label: "X", href: "https://x.com/beautifulfeetmo", Icon: FaXTwitter },
  { label: "Instagram", href: "https://www.instagram.com/beautifulfeetmovie/", Icon: FaInstagram },
  { label: "YouTube", href: "https://www.youtube.com/@Beautifulfeetmovie", Icon: FaYoutube },
];

export default function SocialLinks({ className = "" }) {
  return (
    <nav aria-label="Social media" className={className}>
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Beautiful Feet on ${label}`}
          title={label}
          className="inline-flex h-9 w-9 rounded-lg items-center justify-center border border-white/15 bg-white/5 text-white/75 transition hover:border-yellow-400/60 hover:bg-yellow-500/10 hover:text-yellow-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
        >
          <Icon aria-hidden="true" size={18} />
        </a>
      ))}
    </nav>
  );
}