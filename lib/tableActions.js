"use server";

import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync"; // sync but works with async workflows

export async function uploadCSV(formData) {
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    throw new Error("No file uploaded");
  }

  // await file.arrayBuffer()
  // Converts the uploaded file (Blob or File object) into an ArrayBuffer, a binary representation of the file data.

  // Buffer.from(...)
  // Converts the ArrayBuffer into a Node.js Buffer.
  // Node.js uses Buffer to handle binary data for file operations.

  const buffer = Buffer.from(await file.arrayBuffer());

  // path.join(...)
  // Safely joins file path segments into a valid file path.

  // process.cwd()
  // cwd = Current Working Directory (or the project's folder)
  // console.log(process.cwd());

  // Where the folder is for the file: /next_csv/public/uploads
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Where the file is going to be uploaded: /next_csv/public/uploads/cars.csv
  const filePath = path.join(uploadDir, "cars.csv");

  // Creates the uploads directory if it doesn't already exist.
  // { recursive: true } ensures that if any parent directories are missing, they'll also be created.
  await fs.mkdir(uploadDir, { recursive: true });

  // Saves the file data (buffer) to disk at the path filePath (public/uploads/cars.csv).
  await fs.writeFile(filePath, buffer);

  return { success: true, message: "cars.csv uploaded successfully" };
}

export async function readCarsCSV() {
  const filePath = path.join(process.cwd(), "public", "uploads", "cars.csv");

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");

    const records = parse(fileContent, {
      columns: true, // Convert CSV headers to object keys
      skip_empty_lines: true,
      trim: true,
    });

    return records;
  } catch (err) {
    console.error("Error reading cars.csv:", err);
    return [];
  }
}

export async function addCarToCSV({ brand, model, price }) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, "cars.csv");

  await fs.mkdir(uploadDir, { recursive: true });

  let nextId = 1;
  let header = "id,brand,model,price";

  try {
    // Check if file exists
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const lines = fileContent.trim().split("\n");

      // Extract last line and get the ID
      const lastLine = lines[lines.length - 1];
      const lastId = parseInt(lastLine.split(",")[0], 10);
      if (!isNaN(lastId)) {
        nextId = lastId + 1;
      }
    }

    const newRow = `\n${nextId},${brand},${model},${price}`;

    if (!exists) {
      await fs.writeFile(filePath, header + newRow);
    } else {
      await fs.appendFile(filePath, newRow);
    }

    return { success: true, message: "Car added successfully" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Failed to add car" };
  }
}

export async function editCarRow({ id, brand, model, price }) {
  const filePath = path.join(process.cwd(), "public", "uploads", "cars.csv");

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.trim().split("\n");
    
    // Keep the header
    const header = lines[0];
    const dataLines = lines.slice(1);
    
    // Find and update the car with matching ID
    const updatedLines = dataLines.map(line => {
      const [lineId, ...rest] = line.split(",");
      if (parseInt(lineId) === parseInt(id)) {
        return `${id},${brand},${model},${price}`;
      }
      return line;
    });

    // Combine header with updated data
    const newContent = [header, ...updatedLines].join("\n");
    await fs.writeFile(filePath, newContent);

    return { success: true, message: "Car updated successfully" };
  } catch (err) {
    console.error("Error editing car:", err);
    return { success: false, message: "Failed to update car" };
  }
}

export async function deleteCarRow(id) {
  console.log(id)
  const filePath = path.join(process.cwd(), "public", "uploads", "cars.csv");

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.trim().split("\n");
    
    // Keep the header
    const header = lines[0];
    const dataLines = lines.slice(1);
    
    // Filter out the car with matching ID
    const updatedLines = dataLines.filter(line => {
      const [lineId] = line.split(",");
      return parseInt(lineId) !== parseInt(id);
    });

    // Combine header with remaining data
    const newContent = [header, ...updatedLines].join("\n");
    await fs.writeFile(filePath, newContent);

    return { success: true, message: "Car deleted successfully" };
  } catch (err) {
    console.error("Error deleting car:", err);
    return { success: false, message: "Failed to delete car" };
  }
}
