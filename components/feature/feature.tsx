import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';

type FeatureDataType = {
  bg_img: string;
  heading: [
    {
      heading: string;
      sub_heading: string;
      description: string;
    }
  ];
};

async function Feature() {
  const featureData = (await directus.request(
    readItems(TableNames.FEATURE_SECTION)
  )) as FeatureDataType[];

  const data = featureData[0];
  const bgImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.bg_img}`;

  return (
    <div className="p-2 lg:p-[120px] bg-primary">
      <div
        className="relative min-h-screen flex flex-col uppercase"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content */}
        <div className="absolute inset-0 z-0 left-5 lg:left-16 top-16 lg:top-16 lg:w-[50%]">
          {data.heading.map((heading, index) => (
            <div key={index}>
              <p className="text-green-500 text-sm lg:text-md font-medium">
                {heading.heading}
              </p>
              <p className="text-white text-2xl lg:text-4xl font-bold">
                {heading.sub_heading}
              </p>
              <p className="text-white text-sm lg:text-md pr-5 lg:pr-0  font-normal  lg:font-medium">
                {heading.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feature;
