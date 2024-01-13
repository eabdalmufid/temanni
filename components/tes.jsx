"use client"

import SearchBar from "./SearchBar";
import Card from "./CardList";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const HomePage = () => {

  const searchParams = useSearchParams();

  // Get Users
  const getUsers = useCallback(async (queryParams) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${queryParams}`);
    return res.json();
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const param = {};
      if (searchParams.get("q")) param.q = searchParams.get("q");
      if (searchParams.get("s")) param.s = searchParams.get("s");
      if (searchParams.get("t")) param.t = searchParams.get("t");
      const queryParams = new URLSearchParams(param);

      try {
        const resultCards = await getUsers(queryParams);
        const listCards = resultCards?.data || [];
        setUsers(listCards);
      } catch (err) {
        console.log("Something went wrong!" + err)
      };

    };
    fetchData();
  }, [searchParams]);

  return (
    <div className="flex justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-[70rem] w-full flex flex-col gap-5 p-3 text-textPrimary">

        {/* Search Bar n Filter */}
        <SearchBar />

        {/* List of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-5">
          { users.map((user) => (
            <Card key={user?.user_id} user={user} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default HomePage