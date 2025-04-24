"use client";

import { useState } from "react";
import { deleteCarRow, editCarRow } from "@/lib/tableActions";

export default function CarTable({ initialData }) {
  const [cars, setCars] = useState([...initialData]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ brand: "", model: "", price: "" });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const startEdit = (i) => {
    setEditIndex(i);
    setEditForm({ ...cars[i] });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditForm({ brand: "", model: "", price: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (index) => {
    try {
      const res = await editCarRow({ id: index, ...editForm });
      if (res.success) {
        const newCars = [...cars];
        newCars[index] = { ...editForm };
        setCars(newCars);
        setEditIndex(null);
        setEditForm({ brand: "", model: "", price: "" });
      }
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleDelete = async (index) => {
    const res = await deleteCarRow(cars[index].id);
    if (res.success) {
      const newCars = [...cars];
      newCars.splice(index, 1);
      setCars(newCars);
    }
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-6">Car List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search cars by model or brand..."
          className="border rounded p-2 w-full max-w-sm mx-auto"
        />
      </div>

      <div className="w-full max-w-4xl">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border">No.</th>
              <th className="py-3 px-4 border">Brand</th>
              <th className="py-3 px-4 border">Model</th>
              <th className="py-3 px-4 border">Price</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car, i) => (
                <tr key={i} className="border hover:bg-gray-100 transition">
                  <td className="py-3 px-4 border text-center">{i + 1}</td>
                  {editIndex === i ? (
                    <>
                      <td className="py-3 px-4 border">
                        <input
                          name="brand"
                          value={editForm.brand}
                          onChange={handleChange}
                          className="border rounded px-2"
                        />
                      </td>
                      <td className="py-3 px-4 border">
                        <input
                          name="model"
                          value={editForm.model}
                          onChange={handleChange}
                          className="border rounded px-2"
                        />
                      </td>
                      <td className="py-3 px-4 border">
                        <input
                          name="price"
                          value={editForm.price}
                          onChange={handleChange}
                          className="border rounded px-2"
                        />
                      </td>
                      <td className="py-3 px-4 border space-x-1">
                        <button
                          className="text-green-600 font-semibold"
                          onClick={() => handleSave(i)}
                        >
                          Save
                        </button>
                        <button className="text-gray-600" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4 border">{car.brand}</td>
                      <td className="py-3 px-4 border">{car.model}</td>
                      <td className="py-3 px-4 border">{car.price}</td>
                      <td className="py-3 px-4 border space-x-1">
                        <button
                          className="text-blue-600 font-semibold"
                          onClick={() => startEdit(i)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(i)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
