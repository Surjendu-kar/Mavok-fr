import Image from 'next/image';

type ImgCardData = {
  id: string;
  img: string;
  alt: string;
  link: string | null;
};

async function ImgCard({ allData }: { allData: ImgCardData[] }) {
  return (
    <div>
      {allData.map(item => (
        <div key={item.id}>
          <Image src={item.img} alt={item.alt} width={50} height={50} />
        </div>
      ))}
    </div>
  );
}

export default ImgCard;
