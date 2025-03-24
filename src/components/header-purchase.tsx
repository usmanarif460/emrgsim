import Image from "next/image";

const PurchaseHeader = () => {
  return (
    <div className="bg-[#D6E8EB]">
      <Image
        width={5000}
        height={5000}
        className="cell"
        src="/assets/saudi/group-2.png"
        alt=""
      />
    </div>
  );
};

export default PurchaseHeader;
