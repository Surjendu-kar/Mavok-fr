import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';

type CategoryData = {
  id: string;
  category: string;
};

type OptionData = {
  id: string;
  cat_id: string;
  options: string;
  slug: string;
};

async function Footer() {
  const allCategories = (await directus.request(
    readItems(TableNames.FOOTER_CATEGORY)
  )) as CategoryData[];

  const allOptions = (await directus.request(
    readItems(TableNames.FOOTER_OPTIONS)
  )) as OptionData[];

  const optionsByCategory = allOptions.reduce((acc, option) => {
    if (!acc[option.cat_id]) {
      acc[option.cat_id] = [];
    }
    acc[option.cat_id].push(option);
    return acc;
  }, {} as Record<string, OptionData[]>);

  return (
    <div className="mt-auto flex justify-around bg-background-light py-10">
      {allCategories.map(category => (
        <div key={category.id}>
          <p className="text-primary font-bold uppercase">{category.category}</p>
          {(optionsByCategory[category.id] || []).map(option => (
            <div key={option.id}>
              <p className="text-primary-light">{option.options}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Footer;
