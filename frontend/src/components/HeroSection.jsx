const HeroSection = () => {
  return (
    <section className="relative h-[95vh] bg-[url('/images/blob-scene-haikei.svg')] bg-cover bg-center flex items-center justify-center text-white text-center px-4 mb-10">
      <div className="">
        <h1 className="text-6xl md:text-5xl font-bold">This is Kreatify Hub</h1>
        <p className="mt-4 text-lg md:text-xl">Find the best Non-screen Resources for your Children</p>
        <button className="mt-6 px-10 py-3 border-1 rounded transition">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
