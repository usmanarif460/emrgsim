import Image from "next/image";

const HeaderTerms = () => {
  return (
    <div className="relative flex items-center justify-center h-[7.5rem] bg-[#c8dbe2]">
      <Image
        className="cell"
        src="/assets/saudi/group-2.png"
        alt=""
        width={500}
        height={500}
      />
    </div>
  );
};

export default HeaderTerms;
