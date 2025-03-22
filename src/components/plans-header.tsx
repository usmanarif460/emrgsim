import Image from "next/image";

const PlansHeader = () => {
  return (
    <div className="relative h-[14rem] flex items-center justify-center bg-[#D6E8EB]">
      <Image
        src="/assets/saudi/new-group.png"
        alt=""
        width={10000}
        height={10000}
      />
    </div>
  );
};

export default PlansHeader;
