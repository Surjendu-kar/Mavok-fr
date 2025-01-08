import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import React from 'react';

async function Feature() {
  const herodata = await directus.request(
    readItems(TableNames.FEATURE_SECTION)
  );
  // console.log(herodata);
  const data = herodata[0];

  const bgImageUrl = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.bg_img}`;
  console.log(bgImageUrl);
  return <div></div>;
}

export default Feature;
