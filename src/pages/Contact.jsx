import React, { useState } from "react";
import { House, Phone, Envelope } from "@phosphor-icons/react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    email: "",
    tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { message, name, email, tel } = formData;
    const chatId = "558874878";
    const token = "6890111389:AAE9Td0zd-jMQC907X_qON5jJqI60hH-97M";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const params = {
      chat_id: chatId,
      text: `
        Имя: ${name}
        Email: ${email}
        Телефон номер: ${tel}
        Сообщение: ${message}
      `,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Сообщение успешно отправлено!");
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        alert("Произошла ошибка. Сообщение не отправлено.");
      });
    setFormData({
      message: "",
      name: "",
      email: "",
      tel: "",
    });
  };
  return (
    <>
      <section className="h-[30vh] relative top-[70px]">
        <div className="container h-full flex items-center justify-center">
          <h1 className="text-red-700 text-5xl uppercase font-semibold">
            Contact
          </h1>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="container">
          <div className="grid grid-contact gap-10">
            <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  className="border p-2 outline-blue-300"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Fullname"
                />
                <input
                  className="border p-2 outline-blue-300"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                />
              </div>
              <input
                className="border p-2 outline-blue-300"
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Phone number"
              />
              <textarea
                className="border p-2 outline-blue-300"
                name="message"
                value={formData.message}
                onChange={handleChange}
                cols="30"
                rows="10"
                placeholder="Send message"
              ></textarea>
              <button
                type="submit"
                className="text-xl bg-red-800 hover:bg-red-900 py-2 text-white"
              >
                Send
              </button>
            </form>
            <ul className="flex flex-col gap-8">
              <li className="flex items-center gap-3">
                <House size={25} className="text-red-700" />
                <p>Namangan.sh Yuksalish 14-uy</p>
              </li>
              <li className="flex gap-3">
                <Phone size={25} className="text-red-700" />
                <div className="flex flex-col">
                  {" "}
                  <a href="tel: +998940725555">
                    +998 (94) 072-55-55{" "}
                    <span className="text-red-800 font-bold">
                      Chiller ventilyatsiya
                    </span>
                  </a>
                  <a href="tel: +998902220042">
                    +998 (90) 222-00-42{" "}
                    <span className="text-red-800 font-bold">
                      Kamera xolodilnik
                    </span>
                  </a>
                  <a href="tel: +998905555055">
                    +998 (90) 555-50-55{" "}
                    <span className="text-red-800 font-bold">Admin</span>
                  </a>
                  <a href="tel: +998906900052">
                    +998 (90) 690-00-52{" "}
                    <span className="text-red-800 font-bold">Menejer</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Envelope size={25} className="text-red-700" />
                <div>
                  {" "}
                  <p className="text-red-800">Samobitzer@gmail.com</p>
                  <p className="text-gray-500">
                    Istalgan vaqtda xabar jo'natish!
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="container pt-20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.8711603785077!2d71.60435493021996!3d40.98800650721313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b35d599c3e5%3A0x969d616412bd61d4!2sSAMO!5e0!3m2!1sru!2s!4v1713694239544!5m2!1sru!2s"
            loading="lazy"
            className="w-full h-[80vh]"
          ></iframe>
        </div>
      </section>
    </>
  );
};
