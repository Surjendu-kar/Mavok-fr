import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { Legal } from '@/public';
import { readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { PaymentPartners } from '../payment-partners';
import { SocialIcons } from './social-icons';

async function Footer() {
  // fetch category data
  const category = await directus.request<CategoryType>(
    readItems(TableNames.FOOTER)
  );

  // fetch social icons
  const socialIconData = await directus.request<SocialIconType[]>(
    readItems(TableNames.FOOTER_SOCIAL_ICONS)
  );

  const socialIcons = category?.social_icons;

  return (
    <div className="mt-auto flex flex-col px-5 lg:px-10 py-10 gap-10 lg:gap-10 bg-background-light">
      <div className="flex flex-wrap lg:flex-row gap-6 lg:gap-0 justify-between bg-background-light ">
        {/* Footer Category */}
        {category?.category?.map(category => (
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
            <input
              type="checkbox"
              id="newsletter-consent"
              className="mt-1 cursor-pointer"
            />
            <label
              htmlFor="newsletter-consent"
              className="text-sm text-gray-600"
            >
              You agree to receive newsletters and marketing emails from MAVOK
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-7 lg:gap-0">
        {/* payment icons */}
        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-primary font-bold uppercase text-xs">
            PAYMENT METHODS WE ACCEPT
          </p>
          <PaymentPartners />
        </div>
        
        {/* social icons */}
        <SocialIcons
          socialIcons={socialIcons}
          socialIconData={socialIconData}
        />
      </div>

      {/* legal */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Image src={Legal} alt="legal" width={16} height={16} />
          <p className="font-[500] text-primary-light text-sm lg:text-[15px]">
            2024 MAVOK. All right reserved
          </p>
        </div>
        <select
          name="language"
          id="language"
          className="text-primary font-bold text-sm lg:text-[15px] cursor-pointer uppercase outline-none border-none focus:ring-0 focus:outline-none"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
      </div>
    </div>
  );
}

export default Footer;
