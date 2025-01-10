// header type
type HeaderData = {
  id: string;
  title: string;
  slug: string;
};

// accessories type
type AccessoriesType = {
  id: number;
  image: string;
  type: string;
};

type Accessories = {
  id: number;
  main_image: string;
  heading: string;
  sub_heading: string;
  price: number;
  type: number;
};

type AccessoriesFile = {
  id: string;
  accessories_id: string;
  directus_files_id: string;
};

// footer option type
type FooterOptionType = {
  name: string;
  slug: string;
};

// footer category type
type FooterCategoryType = {
  name: string;
  options: FooterOptionType[];
};

// footer social icon type
type FooterSocialIconType = {
  icon: {
    collection: string;
    key: string;
  };
  link: string;
  name: string;
};

// footer category type
type CategoryType = {
  id: number;
  category: FooterCategoryType[];
  social_icons: FooterSocialIconType[];
  payemnt_img: number[];
};

// footer files type
type FooterFilesType = {
  id: number;
  footer_id: number;
  directus_files_id: string;
};

// social icon type
type SocialIconType = {
  id: string;
  image: string;
};
