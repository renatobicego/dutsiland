import FirstAnimation from "./animations/FirstAnimation";
import SecondAnimation from "./animations/SecondAnimation";

export default function Home() {
  return (
    <main className="w-full h-full relative pt-[6.5rem]">
      {/* storm animation */}
      <FirstAnimation />
      {/* lighthouse animation */}
      <SecondAnimation />
    </main>
  );
}
