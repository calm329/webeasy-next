"use client";
import React, { useState } from "react";
import { domains } from "../../../../../lib/utils/common-constant";

const DomainSearch = () => {
  const [query, setQuery] = useState("");
  const [itemsLimit, setItemsLimit] = useState(10);

  const getPrice = async (domain: string) => {
    const result = await fetch(
      `https://api.vercel.com/v4/domains/price?name=${domain}&&teamId=team_9UzOhYwuxCHCBdlRnTAeIRQs&type=new`,
      {
        headers: {
          Authorization: "Bearer u2t0b2onJvyqqNHiFmURqXCB",
        },
        method: "GET",
      },
    );
    const data = await result.json();
    return data.price;
  };

  return (
    <div className="flex flex-col justify-center ">
      <h1 className="my-5 text-center text-3xl font-bold ">
        Find Your Perfect Domain
      </h1>
      <input
        type="text"
        placeholder="Search for domains..."
        onChange={(e) => setQuery(e.target.value)}
        className="mb-10 border-0 border-b-2 px-10"
      />
      {query.length > 1 && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-5 gap-10">
            {domains.map(
              (domain, i) =>
                i < itemsLimit && (
                  <p key={domain}>
                    {query}
                    {domain}
                    {/* {getPrice(query + domain)} */}
                  </p>
                ),
            )}
          </div>
          <button
            onClick={() => setItemsLimit((prev) => prev + 10)}
            className="mx-auto mt-5 rounded border bg-indigo-500 px-5 py-2 text-white"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default DomainSearch;
