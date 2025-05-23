import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../middlewares/Axios";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await Axios.get(`/services/${id}`);
        setService(res.data.data);
      } catch (err) {
        setError("Failed to load service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-64 object-cover rounded-lg mb-4 shadow"
        />
      )}
      <p className="text-lg text-gray-700">{service.description}</p>
    </div>
  );
};

export default ServiceDetail;
