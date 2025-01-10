import Image from 'next/image';
import Link from 'next/link';

type SocialIconsProps = {
  socialIcons: FooterSocialIconType[];
  socialIconData: SocialIconType[];
};

export function SocialIcons({ socialIcons, socialIconData }: SocialIconsProps) {
  return (
    <div className="flex items-center gap-2">
      {socialIcons?.map(icon => (
        <Link
          key={icon.icon.key}
          className="flex items-center gap-10 p-1 lg:p-2 border border-primary-light rounded-lg hover:scale-110 hover:border-primary-light transition-all duration-300"
          href={icon.link}
        >
          {socialIconData.find(data => data.id === icon.icon.key) && (
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${
                socialIconData.find(data => data.id === icon.icon.key)?.image
              }`}
              className="w-auto h-auto"
              alt="social icon"
              width={16}
              height={16}
              unoptimized
            />
          )}
        </Link>
      ))}
    </div>
  );
}
