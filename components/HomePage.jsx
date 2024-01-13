"use client"

import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from 'react-infinite-scroll-component';
import CardList from "./CardList";

const HomePage = () => {

  const searchParams = useSearchParams();

  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  
  const fetchData = async () => {
    
    const limit = 30;
    
    const param = { page: pageRef.current, limit };
    if (searchParams.get("q")) param.q = searchParams.get("q"); // Query
    if (searchParams.get("s")) param.s = searchParams.get("s"); // Sex
    if (searchParams.get("t")) param.t = searchParams.get("t"); // Tag
    const queryParams = new URLSearchParams(param);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?${queryParams}`);
      const resultCards = await response.json();
      const listCards = resultCards?.data || [];

      if (listCards.length < limit) setHasMore(false);
      setUsers((prev) => [...prev, ...listCards]);
      pageRef.current = pageRef.current + 1;

    } catch (err) {
      console.log("Something went wrong!" + err)
    };

  };

  // Initial Data Fetch
  useEffect(() => {
    setUsers([]);
    setHasMore(true);
    pageRef.current = 1;

    fetchData();
  }, [searchParams]);

  return (
    <div className="flex justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-[70rem] w-full flex flex-col gap-5 p-3 text-textPrimary">

        {/* Search Bar n Filter */}
        <SearchBar />

        {/* List of Cards */}
        <InfiniteScroll
          dataLength={users.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<span className="loading loading-spinner loading-md table mt-2 my-0 mx-auto"></span>}
        >
          <CardList users={users} />
        </InfiniteScroll>

      </div>
    </div>
  )
}

export default HomePage