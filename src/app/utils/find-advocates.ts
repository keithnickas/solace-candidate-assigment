import { Advocates } from "../types/advocates-types";

/**
 * Find advocates by search term.
 * @param searchTerm string search term to filter by
 * @param advocates array of advocates
 * @returns {Advocates[]} filtered array of advocates
 */
export function findAdvocates(
  searchTerm: string,
  advocates: Advocates
): Advocates {
  return advocates.filter(
    (advocate) =>
      advocate.firstName.toLowerCase().includes(searchTerm) ||
      advocate.lastName.toLowerCase().includes(searchTerm) ||
      advocate.city.toLowerCase().includes(searchTerm) ||
      advocate.degree.toLowerCase().includes(searchTerm) ||
      advocate.specialties.find((s) => s.toLowerCase().includes(searchTerm)) ||
      parseInt(advocate.yearsOfExperience).toString().includes(searchTerm)
  );
}
