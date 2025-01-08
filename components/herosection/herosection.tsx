import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import Link from 'next/link';

type ButtonText = {
  text: string;
  link: string;
};

type List = {
  title: string;
  sub_title: string;
};

type HeroSectionData = {
  id: string;
  bg_img: string;
  heading: string;
  sub_heading: string;
  button_text: ButtonText[];
  Lists: List[];
};

async function HeroSection() {
  const herodata = (await directus.request(
    readItems(TableNames.HERO_SECTION)
  )) as HeroSectionData[];
  const data = herodata[0];

  const bgImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.bg_img}`;

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 flex flex-col justify-center uppercase"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content */}
        <div className="">
          {/* Main heading section */}
          <div className="max-w-xl">
            <h2 className="text-green-500 font-medium">{data.heading}</h2>
            <h1 className="text-white text-2xl lg:text-4xl md:text-5xl font-bold">
              {data.sub_heading}
            </h1>

            {/* Shop Now Button */}
            <div className="flex">
              {data.button_text?.map((btn, index) => (
                <Link
                  key={index}
                  href={btn.link}
                  className="bg-green-500 text-sm lg:text-md text-white px-4 lg:px-6 py-2 rounded hover:bg-green-600 transition-colors font-bold"
                >
                  {btn.text} →
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Features list */}
        <div className="flex flex-wrap lg:flex-row justify-center lg:gap-10 gap-5">
          {data.Lists?.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-1 lg:space-y-2 text-background font-bold "
            >
              <h3 className="text-md lg:text-xl">{item.title}</h3>
              <p className="text-xs lg:text-sm">{item.sub_title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
