"use client";

import { useState } from "react";
import { addCarToCSV } from "@/lib/tableActions";

export default function AddCarForm() {
  const [form, setForm] = useState({ brand: "", model: "", price: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addCarToCSV(form);
    setMessage(res.message);
    if (res.success) {
      setForm({ brand: "", model: "", price: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full border rounded px-4 py-2"
      />
      <button
        type="submit"
        className="w-full bg-green-600 font-medium text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
      >
        Add Car
      </button>
      {message && (
        <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
      )}
    </form>
  );
}
