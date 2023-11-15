
import Experience from "./Experience";


export default function Home() {
  return (
    <main className="w-full h-full relative pt-[8rem]">
      <section className="relative h-[200vh]">
        <div className="sticky top-36 ">
          <h3 className="absolute z-40 text-6xl uppercase text-white font-thin left-28 top-1/3 w-3/4">
            En el mar, la tempestad es un desafío para los <span className="font-medium">navegantes</span> 
          </h3>
          <Experience />
        </div>
      </section>
    </main>
  )
}
