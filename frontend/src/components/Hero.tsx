import hero from "../assets/hero.png";

export default function Hero() {
  return (
    <>
      <img
        src={hero}
        alt='hero'
        className='w-full max-h-[600px] object-cover'
      />
    </>
  );
}
