import Image from "next/image";

const HeaderEid = () => {
  return (
    <div className="Header  h-[13rem] bg-[#fed762] flex items-center justify-center">
      <Image
        className="cell "
        src="/assets/saudi/group-1.png"
        alt=""
        width={500}
        height={500}
      />
    </div>
  );
};

export default HeaderEid;
