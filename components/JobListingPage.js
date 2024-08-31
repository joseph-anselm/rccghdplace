"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanityClient";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";


const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const query = `*[_type == "jobListing"] | order(_createdAt desc) {
          _id,
          title,
          description,
          datePosted,
          contactDetails,
          location,
          additionalDetails
        }`;
        const data = await client.fetch(query);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="bg-white py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Job Opportunities</h2>
        {currentJobs.length > 0 ? (
          <div className="space-y-4">
            {currentJobs.map((job) => (
              <Disclosure key={job._id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                      <span>{job.title}</span>
                      <ChevronDownIcon
                        className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-600">
                      <p><strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()}</p>
                      <p><strong>Location:</strong> {job.location}</p>
                      <p><strong>Contact Details:</strong> {job.contactDetails}</p>
                      <p><strong>Description:</strong> {job.description}</p>
                      {job.additionalDetails && (
                        <p><strong>Additional Details:</strong> {job.additionalDetails}</p>
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No job opportunities found.</div>
        )}
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex">
            {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default JobsPage;
