import Image from "next/image";

const HomeImage = () => {
  return (
    <Image
      src="/self-nav-logo.svg"
      alt="Self Crypto"
      height={500}
      width={500}
    />
  );
};

export default HomeImage;
