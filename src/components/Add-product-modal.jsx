import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import { Axios } from "../middlewares/Axios";

export default function AddProductModal({ setIsModalActive, mutate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const filesArray = Array.from(e.target.files);

    const newPreviews = filesArray.map((file) => URL.createObjectURL(file));

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...filesArray],
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removePhoto = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));

    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setErrors((prev) => ({ ...prev, images: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Название проекта обязательно";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно";
      isValid = false;
    }

    if (!formData.category.trim()) {
      newErrors.category = "Категория обязательно";
      isValid = false;
    }

    if (formData.images.length === 0) {
      newErrors.images = "Добавьте хотя бы одну фотографию";
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image);
      });

      await Axios.post("/projects/create", formDataToSend);
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

  React.useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div
      className="w-full h-screen fixed left-0 top-0 bg-black bg-opacity-75 backdrop-blur-md flex justify-end modal-overlay z-50"
      onClick={handleOutsideClick}
    >
      <form
        onSubmit={handleSubmit}
        className="h-full w-full md:max-w-lg flex flex-col gap-6 p-6 bg-white overflow-y-auto"
      >
        <h1 className="text-center text-xl font-bold">Добавить новый проект</h1>
        <label className="flex flex-col gap-2 text-[14px]">
          <p>
            Введите название проекта<span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="title"
            className={`outline-none border p-2 rounded-md ${
              errors.title ? "border-red-600" : "border-black"
            }`}
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title}</p>
          )}
        </label>
        <label className="flex flex-col gap-2 text-[14px]">
          <p>
            Введите описание
            <span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="description"
            className={`outline-none border p-2 rounded-md ${
              errors.description ? "border-red-600" : "border-black"
            }`}
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description}</p>
          )}
        </label>
        <label className="flex flex-col gap-2 text-[14px]">
          <p>
            Введите категорию
            <span className="text-red-600">*</span>
          </p>
          <select
            name="category"
            className={`outline-none border p-2 rounded-md ${
              errors.category ? "border-red-600" : "border-black"
            }`}
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="unknown">Выбрать категорию</option>
            <option value="chiller">Чиллер</option>
            <option value="camera">Камера холодильняя</option>
            <option value="stellaj">Стеллажи</option>
            <option value="sandwich">Сендвич панели</option>
            <option value="other">Другие</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category}</p>
          )}
        </label>
        <div className="space-y-2">
          <label htmlFor="photo" className="block text-sm">
            Фотографии
            <span className="text-red-600">*</span>
          </label>

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove photo"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 relative flex justify-center items-center">
            <label
              htmlFor="photo"
              className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.images ? "border-red-600" : "border-gray-600"
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
          {errors.images && (
            <p className="text-red-600 text-sm">{errors.images}</p>
          )}
          {formData.images.length > 0 && (
            <p className="text-sm text-gray-500">
              Выбрано файлов: {formData.images.length}
            </p>
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
