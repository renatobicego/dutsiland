import FirstAnimation from './animations/FirstAnimation'
import SecondAnimation from './animations/SecondAnimation';

export default function Home() {
  return (
    <main className="w-full h-full relative pt-[8rem]">
      <FirstAnimation />
      <SecondAnimation />
    </main>
  );
}
