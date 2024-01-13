"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const SearchBar = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(`${searchParams.get("q") || ""}`);
    const [sex, setSex] = useState(`${searchParams.get("s") || ""}`);
    const [tag, setTag] = useState(`${searchParams.get("t") || ""}`);

    const handleSubmit = (e) => {
        e.preventDefault();
        document.activeElement.blur();

        if (!query && !sex && !tag) {
            router.push('/');
            return;
        };

        const param = {};
        if (query) param.q = query;
        if (sex) param.s = sex;
        if (tag) param.t = tag;

        const param2 = new URLSearchParams(param);
        router.push(`/search?${param2}`);
    };

    return (
        <div className="bg-baseSecondary rounded-lg flex items-center justify-center p-2">
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-2 w-full'>
                {/* Username */}
                <div className="w-full">
                    <input
                        className={`w-full p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-basePrimary text-textPrimary`}
                        type="text"
                        placeholder="Search title..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Gender */}
                <div className="w-full sm:w-60">
                    <select value={sex} onChange={(e) => setSex(e.target.value) } className={`w-full select focus:border focus:border-textSecondary focus:outline-none bg-basePrimary`}>
                        <option value={""}>Gender</option>
                        <option value={"1"}>Male</option>
                        <option value={"2"}>Female</option>
                    </select>
                </div>

                {/* Tag */}
                <div className="w-full sm:w-60">
                    <select value={tag} onChange={(e) => setTag(e.target.value) } className={`w-full select focus:border focus:border-textSecondary focus:outline-none bg-basePrimary`}>
                        <option value={""}>Tag</option>
                        <option value={"coding"}>Coding</option>
                        <option value={"english"}>English</option>
                        <option value={"friend"}>Friend</option>
                        <option value={"mabar"}>Mabar</option>
                    </select>
                </div>

                <button type='submit' className='btn bg-basePrimary hover:bg-dark-700 active:bg-dark-900 font-normal border-none'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;