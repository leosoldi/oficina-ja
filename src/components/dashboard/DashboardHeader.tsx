import React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getIniciais } from "../../utils/utils";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              <Link to="/">
                <span className="text-blue-800">Oficina</span>
                <span className="text-orange-500">Já</span>
              </Link>
            </h1>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <h2 className="hidden md:block text-lg font-semibold text-gray-700">
              Dashboard
            </h2>
          </div>

          <div className="relative">
            <button
              type="button"
              className="relative inline-flex items-center justify-center w-16 h-16 rounded-full hover:bg-orange-50 transition-colors"
              title="Notificações"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              {/* Badge (pode ser dinâmico com contador real) */}
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full animate-pulse">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
