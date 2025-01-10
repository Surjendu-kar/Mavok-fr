import directus from '@/directus/client';
import { TableNames } from '@/enum';
import { readItems } from '@directus/sdk';
import Image from 'next/image';

export async function PaymentPartners() {
  const paymentIcons = await directus.request<FooterFilesType[]>(
    readItems(TableNames.FOOTER_FILES)
  );

  return (
    <div className="flex items-center gap-2">
      {paymentIcons
        .filter(icon => icon.footer_id)
        ?.map(icon => (
          <Image
            key={icon.id}
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${icon.directus_files_id}`}
            alt="payment icon"
            className="w-[30px] h-[20px]"
            width={30}
            height={20}
            unoptimized
          />
        ))}
    </div>
  );
}
