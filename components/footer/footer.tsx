import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import Link from 'next/link';

type FooterOptionType = {
  name: string;
  slug: string;
};

type FooterCategoryType = {
  name: string;
  options: FooterOptionType[];
};

type FooterSocialIconType = {
  icon: {
    collection: string;
    key: string;
  };
  link: string;
  name: string;
};

type FooterDataType = {
  id: number;
  category: FooterCategoryType[];
  social_icons: FooterSocialIconType[];
};

async function Footer() {
  //fetch all footer data
  const footerData = (await directus.request(
    readItems(TableNames.FOOTER)
  )) as unknown as FooterDataType;

  // console.log(footerData);

  return (
    <div className="mt-auto flex flex-wrap lg:flex-row gap-4 lg:gap-0 justify-around bg-background-light py-10">
      {/* Footer Category */}
      {footerData?.category?.map(category => (
        <div key={category.name}>
          <p className="text-primary font-bold uppercase">{category.name}</p>
          {category.options?.map((option, index) => (
            <Link key={index} href={`/${option.slug}`}>
              <p className="text-primary-light hover:text-primary transition-colors">
                {option.name}
              </p>
            </Link>
          ))}
        </div>
      ))}

      {/* Newsletter */}
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-[#E5E5E5] rounded-lg p-2"
        />
        <button className="bg-[#107C11] text-background p-2 rounded-lg uppercase font-bold">
          subscribe
        </button>
        <div className="flex items-start gap-2">
          <input type="checkbox" id="newsletter-consent" className="mt-1" />
          <label htmlFor="newsletter-consent" className="text-sm text-gray-600">
            You agree to receive newsletters and marketing emails from MAVOK
          </label>
        </div>
      </div>
    </div>
  );
}

export default Footer;
