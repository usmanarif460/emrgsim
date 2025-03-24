import Image from "next/image";
import ArrowBack from "./svgs/arrow";
import { useRouter } from "next/navigation";
const HeaderTerms = () => {
  const router = useRouter();
  return (
    <div className="relative flex items-center justify-center h-[7.5rem] bg-[#c8dbe2]">
      <ArrowBack
        className="absolute top-[40%] left-2  text-white"
        onClick={() => router.push("/create-account")}
      />
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
