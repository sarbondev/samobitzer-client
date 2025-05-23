import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section
      className="h-screen w-full"
      style={{
        background: `linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.57),
      rgba(0, 0, 0, 0.584)
    ),url("https://www.cdc.gov/niosh/media/images/2024/08/GettyImages-1718507948.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex h-full mx-auto max-w-6xl flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          SINCE 2002
        </span>

        <h1 className="mb-8 max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          МЫ БУДЕМ <span className="text-red-600">РАДЫ</span> ПОЗАБОТИТЬСЯ О
          ВАШЕЙ РАБОТЕ
        </h1>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="bg-gray-800 text-white hover:bg-gray-700 p-2">
            <Link to="/projects">Посметреть наши работы</Link>
          </button>
        </div>
      </div>
    </section>
  );
};
