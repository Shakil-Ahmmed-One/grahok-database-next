"use client";

import { useEffect, useState } from "react";
import {
  FaBullseye,
  FaDollarSign,
  FaEye,
  FaHashtag,
  FaLocationDot,
  FaPencil,
  FaPhone,
  FaTrash,
  FaUser,
} from "react-icons/fa6";
import { fetchEntries, deleteEntry } from "./actions";

export default function AllEntries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await fetchEntries();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    }

    loadEntries();
  }, []);

  async function handleDelete(entryId) {
    try {
      await deleteEntry(entryId);
      setEntries((prev) => prev.filter((entry) => entry._id !== entryId));
      console.log("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-3xl font-bold">All Entries:</h1>
      <table className="table-auto [&_th,_td]:border [&_th,_td]:p-3 [&_div]:flex [&_div]:justify-self-center text-center">
        <thead>
          <tr>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>ID</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaUser />
                <span>Customer</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Purchase Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Sell Price</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaHashtag />
                <span>Total Quantity</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Discount</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaDollarSign />
                <span>Total Profit</span>
              </div>
            </th>
            <th>
              <div className="flex gap-1 items-center">
                <FaBullseye />
                <span>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id} className="hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{entry.customer?.name}</td>
              <td>{entry.totalPurchasePrice}</td>
              <td>{entry.totalSellPrice}</td>
              <td>{entry.totalQuantity}</td>
              <td>{entry.totalDiscount}</td>
              <td>{entry.netProfit}</td>
              <td>
                <div className="flex gap-1">
                  <a
                    href={`/entries/view/${entry._id}`}
                    className="p-2 bg-blue-600 text-white rounded-md"
                  >
                    <FaEye />
                  </a>
                  <a
                    href={`/entries/edit/${entry._id}`}
                    className="p-2 bg-green-600 text-white rounded-md"
                  >
                    <FaPencil />
                  </a>
                  <button
                    className="p-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => handleDelete(entry._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
