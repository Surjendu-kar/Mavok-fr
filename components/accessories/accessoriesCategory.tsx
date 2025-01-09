import Image from 'next/image';

type Props = {
  accessoriesType: AccessoriesType[];
  selectedType: number;
  setSelectedType: (id: number) => void;
};

export default function AccessoriesCategory({
  accessoriesType,
  selectedType,
  setSelectedType,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-5">
      {accessoriesType.map(type => (
        <div
          key={type.id}
          onClick={() => setSelectedType(type.id)}
          className={`flex flex-col items-center w-[80px] lg:w-[100px] cursor-pointer rounded-lg transition-all duration-300 p-4 ${
            selectedType === type.id ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]'
          }`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${type.image}`}
            alt={type.type}
            width={50}
            height={50}
            unoptimized
            className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] object-cover mx-auto"
          />
          <p className="font-bold text-center text-xs lg:text-base">
            {type.type}
          </p>
        </div>
      ))}
    </div>
  );
}
