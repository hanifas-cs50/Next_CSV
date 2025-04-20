import AddCarForm from "@/components/AddCarForm";
import Link from "next/link";

export default function AddPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add a New Car
        </h1>
        <AddCarForm />
      </div>
      <Link href="/view">
        <button className="w-full mt-6 px-4 py-2 font-medium text-white bg-zinc-500 rounded cursor-pointer">
          See Table
        </button>
      </Link>
    </main>
  );
}
