import { useTranslation } from "react-i18next";

export const PartnersModule = () => {
  const partners = [
    "./bananza.png",
    "./ecobozor.png",
    "./lactel.png",
    "./makro.png",
    "./mumtoz.png",
    "./nestle.png",
    "./rashmilk.png",
    "./rozmetov.png",
    "./sherin.png",
    "./uzbegimqora.png",
  ];

  const { t } = useTranslation();

  return (
    <section className="py-20 bg-slate-100">
      <h1 className="pb-20 text-center text-3xl md:text-5xl text-red-800 font-bold">
        {t("partners")}
      </h1>
      {partners.length > 0 ? (
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
          {partners.map((item, index) => (
            <img
              data-aos="fade-up"
              key={index}
              src={item}
              alt=""
              className="object-cover p-[25px] md:p-[50px]"
            />
          ))}
        </div>
      ) : (
        <div className="flex h-[40vh] items-center justify-center">
          <h1>Пока что нет партнеров</h1>
        </div>
      )}
    </section>
  );
};
