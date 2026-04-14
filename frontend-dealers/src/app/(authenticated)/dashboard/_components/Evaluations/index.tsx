"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { fetchVehicles } from "@/src/networks/vehicles";
import { VehicleResponse } from "@/src/networks/vehicles/types";

const Evaluations = () => {
  const [vehicles, setVehicles] = useState<VehicleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadVehicles = async () => {
      try {
        setLoading(true);
        const res = await fetchVehicles(1, 20);
        if (!cancelled) {
          setVehicles(res.data);
        }
      } catch (err: any) {
        console.error("Failed to fetch vehicles:", err);
        if (!cancelled) {
          setError(err?.message || "Failed to load evaluations");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadVehicles();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border shadow-md p-8 animate-pulse"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-lg" />
              </div>
              <div className="space-y-3 mt-5 mb-4">
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex gap-2 justify-center mt-4">
                <div className="h-9 w-24 bg-gray-200 rounded" />
                <div className="h-9 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-12 max-w-6xl mx-auto text-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="px-4 py-16 max-w-6xl mx-auto text-center">
        <div className="text-slate-400 mb-3">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 17h6m-3-3v3m-4.5 3h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H7.5A2.25 2.25 0 005.25 8.75v9A2.25 2.25 0 007.5 20z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">
          No evaluations yet
        </h3>
        <p className="text-sm text-slate-500">
          Create your first car evaluation to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Evaluations;