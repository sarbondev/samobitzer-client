import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export default function AddTeamateModal({ setIsModalActive, mutate }) {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));

    e.target.value = "";
  };

  const removePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: "",
    }));

    setPreview(null);

    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя мастера обязательно";
      isValid = false;
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Описание обязательно";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Добавьте хотя бы одну фотографию";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsUploading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append(`image`, formData.image);

      await Axios.post("/team/create", formDataToSend);

      alert("Проект успешно добавлен!");
      setIsModalActive(false);
      mutate();
    } catch (error) {
      console.log(error);
      alert(error.response?.data.message || "Произошла ошибка");
    } finally {
      setIsUploading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalActive(false);
    }
  };

  return (
    <div
      className="w-full h-screen fixed left-0 top-0 bg-black bg-opacity-75 backdrop-blur-md flex justify-end modal-overlay z-50"
      onClick={handleOutsideClick}
    >
      <form
        onSubmit={handleSubmit}
        className="h-full w-full md:max-w-lg flex flex-col gap-6 p-6 bg-white overflow-y-auto"
      >
        <h1 className="text-center text-xl font-bold">Добавить мастера</h1>
        <label className="flex flex-col gap-2 text-[14px]">
          <p>
            Введите имя мастера<span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="name"
            className={`outline-none border p-2 rounded-md ${
              errors.name ? "border-red-600" : "border-black"
            }`}
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </label>
        <label className="flex flex-col gap-2 text-[14px]">
          <p>
            Введите описание
            <span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="experience"
            className={`outline-none border p-2 rounded-md ${
              errors.experience ? "border-red-600" : "border-black"
            }`}
            value={formData.experience}
            onChange={handleInputChange}
          />
          {errors.experience && (
            <p className="text-red-600 text-sm">{errors.experience}</p>
          )}
        </label>
        <div className="space-y-2">
          <label htmlFor="photo" className="block text-sm">
            Фотографии
            <span className="text-red-600">*</span>
          </label>

          {preview && (
            <div className="mb-4">
              <div className="relative group">
                <img
                  src={preview || "/placeholder.svg"}
                  alt={`Preview`}
                  className="w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4 relative flex justify-center items-center">
            <label
              htmlFor="photo"
              className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.image ? "border-red-600" : "border-gray-600"
              }`}
            >
              <span className="text-sm text-gray-400">
                Загрузить фотографию
              </span>
              <input
                id="photo"
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {errors.image && (
            <p className="text-red-600 text-sm">{errors.image}</p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setIsModalActive(false)}
            className="bg-red-600 text-white p-2 uppercase rounded-md text-sm"
          >
            Назад
          </button>
          <button
            type="submit"
            className="bg-black text-white p-2 uppercase rounded-md text-sm disabled:bg-gray-400"
            disabled={isUploading}
          >
            {isUploading ? "Загрузка..." : "Создать"}
          </button>
        </div>
      </form>
    </div>
  );
}
