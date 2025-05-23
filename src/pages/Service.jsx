import { ServiceModule } from "../modules/ServiceModule";
import { useTranslation } from "react-i18next";

export const Service = () => {
  const { t } = useTranslation();
  return (
    <>
      <input type="checkbox" autoFocus={true} className="opacity-0" />
      <section className="h-[30vh] relative top-[70px]">
        <div className="container h-full flex items-center justify-center">
          <h1 className="text-red-700 text-5xl uppercase font-semibold">
            {t("headings.services.mainTitle")}
          </h1>
        </div>
      </section>
      <ServiceModule />
    </>
  );
};
