import Image from "next/image";
import ArrowBack from "./svgs/arrow";
import { useRouter } from "next/navigation";
const PurchaseHeader = () => {
  const router = useRouter();

  return (
    <div className="bg-[#D6E8EB] relative">
      <ArrowBack
        className="absolute top-[40%]"
        onClick={() => router.push("/data-plans")}
      />
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
