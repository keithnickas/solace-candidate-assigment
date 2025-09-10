"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import { findAdvocates } from "./utils/find-advocates";
import { Advocates } from "./types/advocates-types";
import { getAdvocates } from "./utils/get-advocates";
import Image from "next/image";
import solaceLogo from "./assets/images/solace-logo.svg";
import { formatAdvocatePhoneNumber } from "./utils/format-advocate-data";
import { ThemeContext } from "./contexts/theme";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocates>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocates>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const context = useContext(ThemeContext);
  const { theme, setTheme } = context ?? {};

  /* Load advocates on initial render */
  useEffect(() => {
    async function advocateData() {
      const data = await getAdvocates();
      setAdvocates(data);
      setFilteredAdvocates(data);
      setLoading(false);
    }
    advocateData();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const onClick = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const toggleTheme = () => {
    console.log("Toggling theme from:", theme);
     if (typeof setTheme === "function") {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }
  };

  const advocateRows = loading ? (
    <tr>
      <td colSpan={7} className="px-4 py-2 text-center">
        Loading...
      </td>
    </tr>
  ) : filteredAdvocates.length > 0 ? (
    filteredAdvocates.map((advocate) => (
      <tr key={advocate.id} className="even:bg-gray-100 dark:even:bg-gray-800">
        <td className="px-4 py-2">{advocate.firstName}</td>
        <td className="px-4 py-2">{advocate.lastName}</td>
        <td className="px-4 py-2">{advocate.city}</td>
        <td className="px-4 py-2">{advocate.degree}</td>
        <td className="px-4 py-2">{advocate.specialties.join(", ")}</td>
        <td className="px-4 py-2">{advocate.yearsOfExperience}</td>
        <td className="px-4 py-2">
          {formatAdvocatePhoneNumber(advocate.phoneNumber)}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} className="px-4 py-2 text-center">
        No advocates found
      </td>
    </tr>
  );

  /* Filter advocates when search term changes */
  useEffect(() => {
    if (searchTerm !== "") {
      const filteredAdvocates = findAdvocates(searchTerm, advocates);
      setFilteredAdvocates(filteredAdvocates);
    } else {
      setFilteredAdvocates(advocates);
    }
  }, [advocates, searchTerm]);

  return (
    <main className="container lg:mx-auto md:m-0 p-4">
      <div className="flex mb-4 justify-between items-center mb-8">
        <a href="https://solace.health" target="_blank" rel="noopener noreferrer">
          <Image src={solaceLogo} alt="Solace Logo" width={150} height={50} />
        </a>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </div>
      <h1 className="text-2xl mb-8">Solace Advocates</h1>
      <div className="flex gap-4 items-center">
        <label id="search-label">
          Search for:
        </label>
        <input
          className="border border-black dark:border-gray-700 dark:text-black p-2"
          onChange={onChange}
          value={searchTerm}
          aria-labelledby="search-label"
        />
        <button
          className="bg-[#d7a13b] bg-gradient-to-r from-[#deb260] to-[#d39009] dark:text-black p-2 rounded hover:scale-[.95] transition-transform"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table className="sm:table-fix lg:table-auto border-collapse w-full">
        <thead>
          <tr className="bg-[#265b4e] text-white text-left">
            <th className="px-4 py-2" scope="col">
              First Name
            </th>
            <th className="px-4 py-2" scope="col">
              Last Name
            </th>
            <th className="px-4 py-2" scope="col">
              City
            </th>
            <th className="px-4 py-2" scope="col">
              Degree
            </th>
            <th className="px-4 py-2" scope="col">
              Specialties
            </th>
            <th className="px-4 py-2" scope="col">
              Years of Experience
            </th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          <Suspense fallback={<div>Loading...</div>}>{advocateRows}</Suspense>
        </tbody>
      </table>
    </main>
  );
}
