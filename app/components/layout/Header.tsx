"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Power,
  X,
} from "lucide-react";

type HeaderProps = {
  onMenuClick?: () => void;
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // Clear your auth data here if needed
    // localStorage.removeItem("token");
    // sessionStorage.clear();

    router.push("/login");
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-30
          flex
          h-16
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-4
          sm:h-20
          sm:px-6
          lg:px-8
        "
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-slate-100
              lg:hidden
            "
          >
            <Menu
              size={24}
              className="text-slate-700"
            />
          </button>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 hidden text-sm text-slate-500 sm:block">
              Welcome back! Manage your clinic dashboard.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-white
              px-4
              py-2
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <Power size={18} />

            <span className="hidden sm:block font-medium">
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Confirm Logout
              </h2>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="mb-5 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <Power
                    size={30}
                    className="text-red-600"
                  />
                </div>
              </div>

              <p className="text-center text-slate-600">
                Are you sure you want to logout?
              </p>

              <p className="mt-2 text-center text-sm text-slate-400">
                You will be redirected to the login page.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-2.5
                  font-medium
                  text-slate-700
                  hover:bg-slate-100
                "
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  font-medium
                  text-white
                  hover:bg-red-700
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}