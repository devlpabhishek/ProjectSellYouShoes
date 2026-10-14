
import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error reading user details:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800">
            No user details found
          </h2>
          <p className="mt-2 text-gray-500">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl bg-white shadow-md">

        {/* Profile Header */}
        <div className="bg-blue-600 px-6 py-8 text-center text-white">
          <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-600">
            {user.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>

          <p className="mt-1 text-sm text-blue-100">
            My Shopmate Profile
          </p>
        </div>

        {/* Profile Details */}
        <div className="space-y-5 p-6 sm:p-8">
          <h2 className="border-b border-gray-200 pb-3 text-lg font-semibold text-gray-800">
            Personal Information
          </h2>

          <div>
            <label className="text-sm font-medium text-gray-500">
              First Name
            </label>
            <p className="mt-1 break-words text-base text-gray-900">
              {user.firstName || "Not available"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Last Name
            </label>
            <p className="mt-1 break-words text-base text-gray-900">
              {user.lastName || "Not available"}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Email Address
            </label>
            <p className="mt-1 break-all text-base text-gray-900">
              {user.email || "Not available"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
