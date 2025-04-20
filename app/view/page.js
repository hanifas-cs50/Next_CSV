import { readCarsCSV } from "@/lib/tableActions";
import CarTable from "@/components/CarTable";
import Link from "next/link";

export default async function ViewPage() {
  const cars = await readCarsCSV();

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Car List</h1>
      <div className="w-full max-w-4xl">
        <CarTable initialData={cars} />
      </div>

      <div className="flex gap-2">
        <Link href="/">
          <button className="w-full mt-6 px-4 py-2 font-medium text-white bg-blue-500 rounded cursor-pointer">
            Upload CSV
          </button>
        </Link>
        <Link href="/add">
          <button className="w-full mt-6 px-4 py-2 font-medium text-white bg-zinc-500 rounded cursor-pointer">
            Add to list
          </button>
        </Link>
      </div>
    </main>
  );
}
