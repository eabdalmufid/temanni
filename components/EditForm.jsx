"use client"

import { blobToBase64 } from '@/lib/utils';
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EditForm = ({ user }) => {

    const router = useRouter();

    // Update User Profile
    const updateUser = useCallback(async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            method: "PATCH",
            body: JSON.stringify(data),
            cache: 'no-store'
        });
        return res.json();
    }, []);

    const [loading, setLoading] = useState(false);

    // Form State
    const [username, setUsername] = useState("");
    const [sex, setSex] = useState(0);
    const [age, setAge] = useState(0);
    const [contact, setContact] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag]= useState("");
    const [profile, setProfile] = useState(null);
    const [status, setStatus] = useState(0);

    // Error State
    const [errorUsername, setErrorUsername] = useState("");
    const [errorSex, setErrorSex] = useState("");
    const [errorAge, setErrorAge] = useState("");
    const [errorContact, setErrorContact] = useState("");
    const [errorTitle, setErrorTitle] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorTag, setErrorTag] = useState("");
    const [errorProfile, setErrorProfile] = useState("");
    const [errorStatus, setErrorStatus] = useState("");

    // Initial Hydration
    useEffect(() => {
        setUsername(user?.username);
        setSex(user?.sex);
        setAge(user?.age);
        setContact(user?.contact);
        setTitle(user?.title);
        setDescription(user?.description);
        setTag(user?.tag);
        setProfile(user?.profile);
        setStatus(user?.status);
    }, [user]);

    // State Form Handler - Controlled Input
    const handleUsername = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setErrorUsername("");
            setUsername(inputText);
        };
    };

    const handleTitle = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setErrorTitle("");
            setTitle(inputText);
        };
    };

    const handleDescription = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setErrorDescription("");
            setDescription(inputText);
        };
    };

    const handleContact = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setErrorContact("");
            setContact(inputText);
        };
    };

    const handleAge = (e) => {
        const inputNumber = e.target.value;
        setErrorAge("");
        if(!/^\d+$/.test(inputNumber) && inputNumber.length > 0){
            setErrorAge("only numbers");
            return;
        };
        setAge(inputNumber);
    };

    const handleProfile = (e) => {
        if (e.target.files.length > 0 && !e.target.files[0]?.type?.startsWith('image/')) {
          setErrorProfile("format png/jpg/jpeg");
          return;
        };
 
        if (e.target.files.length > 0 && e.target.files[0].size / 1024 > 2048) {
            setErrorProfile("max 2 mb");
            return;
        };
            
        if (e.target.files.length > 0) {
          setErrorProfile("");
          setProfile(e.target.files[0]);
        };
    };

    const handleSubmit = async (e) => {

        // Validation
        e.preventDefault();

        // Username - Min 5, Max 100
        if (username.trim().length < 5 || username.length > 100) {
            setErrorUsername("min 5 characters!");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        };

        // Sex - 1 (Male) or 2 (Female)
        if (parseInt(sex) !== 1 && parseInt(sex) !== 2) {
            setErrorSex("Gender must be defined");
            window.scrollTo({ top: 100, behavior: 'smooth' });
            return;
        };

        // Age - Min 10, Max 120
        if (parseInt(age) < 10 || parseInt(age) > 120) {
            setErrorAge("min 10 - 120!");
            window.scrollTo({ top: 150, behavior: 'smooth' });
            return;
        };

        // Contact - Min 1, Max 100
        if (contact.trim().length < 5 || contact.length > 100) {
            setErrorContact("min 5 characters!");
            window.scrollTo({ top: 300, behavior: 'smooth' });
            return;
        };

        // Tag - Not Empty
        if (!tag) {
            setErrorTag("choose a tag!");
            window.scrollTo({ top: 500, behavior: 'smooth' });
            return;
        };

        // Title - Min 5, Max 100
        if (title.trim().length < 5 || title.length > 100) {
            setErrorTitle("min 5 characters!");
            window.scrollTo({ top: 500, behavior: 'smooth' });
            return;
        };

        // Description - Min 5, Max 1000
        if (description.trim().length < 5 || description.length > 1000) {
            setErrorDescription("min 5 characters!");
            window.scrollTo({ top: 600, behavior: 'smooth' });
            return;
        };

        // Profile - if new Image uploaded, not more than 2mb
        if (profile && typeof(profile) !== 'string' && profile.size / 1024 > 2048) {
            setErrorProfile("max 2 mb");
            window.scrollTo({ top: 1000, behavior: 'smooth' });
            return;
        };

        // Update Profile
        const userData = {
            age: parseInt(age),
            contact,
            description,
            profile: typeof(profile) === "object" ?  await blobToBase64(profile) : profile,
            sex: parseInt(sex),
            status,
            tag,
            title,
            username
        };

        try {
            setLoading(true);
            await updateUser(userData);
        } catch (err) {
            console.log("Updated Failed");
        } finally {
            router.refresh();
            router.replace(`/user/${user.user_id}`);
        };

    };

    return (
        <form onSubmit={handleSubmit} className='pt-10 flex flex-col gap-5'>

            { loading ? 
                <div className='h-[calc(100dvh-22rem)] flex items-center justify-center'>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
                :
                <>
                    {/* Username */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-textPrimary">
                            Username
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">min 5 characters</span>
                        </label>

                        <input
                            className={`p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-baseSecondary text-textPrimary ${errorUsername && "border border-red-500"}`}
                            type="text"
                            id="username"
                            placeholder="Your username..."
                            value={username}
                            onChange={handleUsername}
                        />

                        <div className={`flex items-center ${errorUsername ? "justify-between" : "justify-end"}`}>
                            {errorUsername && <p className="text-red-500 text-xs">{errorUsername}</p>}
                            <div className="text-textSecondary text-sm">{username.length}/100</div>
                        </div>
                    </div>

                    {/* Sex */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="sex" className="font-medium text-textPrimary">
                            Gender
                        </label>

                        <select id='sex' value={sex} onChange={(e) => { setErrorSex(""); setSex(e.target.value) }} className={`select focus:border focus:border-textSecondary focus:outline-none bg-baseSecondary ${errorSex && "border-red-500"} `}>
                            <option value={0}>Choose Gender</option>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                        </select>

                        {errorSex && <p className="text-red-500 text-xs">{errorSex}</p>}
                    </div>

                    {/* Age */}
                    <div className="flex flex-col gap-2 pt-5">
                        <label htmlFor="age" className="font-medium text-textPrimary">
                            Age
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">max 120</span>
                        </label>

                        <input
                            className={`p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-baseSecondary text-textPrimary ${errorAge && "border border-red-500"}`}
                            type="text"
                            id="age"
                            placeholder="How old are you?"
                            value={age}
                            onChange={handleAge}
                            inputMode="numeric"
                        />

                        {errorAge && <p className="text-red-500 text-xs">{errorAge}</p>}
                    </div>

                    {/* Contact Me */}
                    <div className="flex flex-col gap-2 pt-5">
                        <label htmlFor="contact" className="font-medium text-textPrimary">
                            Contact Me
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">min 5 characters</span>
                        </label>

                        <input
                            className={`p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-baseSecondary text-textPrimary ${errorContact && "border border-red-500"}`}
                            type="text"
                            id="contact"
                            placeholder="Put your social media..."
                            value={contact}
                            onChange={handleContact}
                        />

                        <div className={`flex items-center ${errorContact ? "justify-between" : "justify-end"}`}>
                            {errorContact && <p className="text-red-500 text-xs">{errorContact}</p>}
                            <div className="text-textSecondary text-sm">{contact.length}/100</div>
                        </div>
                    </div>

                    {/* Tag */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tag" className="font-medium text-textPrimary">
                            Tag
                        </label>

                        <select id='tag' value={tag} onChange={(e) => { setErrorTag(""); setTag(e.target.value) }} className={`select focus:border focus:border-textSecondary focus:outline-none bg-baseSecondary ${errorTag && "border-red-500"} `}>
                            <option value={""}>Choose Tag</option>
                            <option value={"coding"}>Coding</option>
                            <option value={"english"}>English</option>
                            <option value={"friend"}>Friend</option>
                            <option value={"mabar"}>Mabar</option>
                        </select>

                        {errorTag && <p className="text-red-500 text-xs">{errorTag}</p>}
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-2 pt-5">
                        <label htmlFor="title" className="font-medium text-textPrimary">
                            Title
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">min 5 characters</span>
                        </label>

                        <input
                            className={`p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-baseSecondary text-textPrimary ${errorTitle && "border border-red-500"}`}
                            type="text"
                            id="title"
                            placeholder="What are you looking for..."
                            value={title}
                            onChange={handleTitle}
                        />

                        <div className={`flex items-center ${errorTitle ? "justify-between" : "justify-end"}`}>
                            {errorTitle && <p className="text-red-500 text-xs">{errorTitle}</p>}
                            <div className="text-textSecondary text-sm">{title.length}/100</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-medium text-textPrimary">
                            Description
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">min 5 characters</span>
                        </label>

                        <textarea
                            className={`p-3 rounded-md focus:outline-none placeholder:text-textSecondary focus:border focus:border-textSecondary bg-baseSecondary text-textPrimary ${errorDescription && "border border-red-500"}`}
                            rows={8}
                            id="description"
                            placeholder="Describe yourself and what do you like..."
                            value={description}
                            onChange={handleDescription}
                        />

                        <div className={`flex items-center ${errorDescription ? "justify-between" : "justify-end"}`}>
                            {errorDescription && <p className="text-red-500 text-xs">{errorDescription}</p>}
                            <div className="text-textSecondary text-sm">{description.length}/1000</div>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="flex flex-col gap-2 mt- relative">
                        <label htmlFor="profile" className="font-medium text-textPrimary">
                            Profile
                            <span className="text-textSecondary text-xs pl-3 italic font-normal">.jpg .jpeg .png</span>
                        </label>

                        { profile && <div onClick={() => { setErrorProfile(""); setProfile(""); }} className="absolute cursor-pointer right-0 text-red-500 text-xs top-1 hover:text-red-900">Remove</div> }
                        
                        <div className={`flex flex-col items-center justify-center gap-5 p-5 bg-baseSecondary rounded-md focus:outline-none ${errorProfile && "border border-red-500"}`}>

                            <label htmlFor="profile" className="cursor-pointer">
                                <Image src={`${(typeof profile !== 'string' && profile) ? URL.createObjectURL(profile) : profile ? profile : "/assets/images/profile.svg"}`} width={100} height={100} alt="profile" className='w-24 h-24 rounded-full'/>
                            </label>

                            <input type="file" id="profile" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleProfile}/>
                            
                        </div>

                        {errorProfile && <p className="text-red-500 text-xs">{errorProfile}</p>}
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2 pt-5">
                        <label className="font-medium text-textPrimary">
                            Profile Status
                        </label>

                        <div className={`flex gap-2 p-3 rounded-md bg-baseSecondary ${errorStatus && "border border-red-500"}`}>
                            <span className='text-textSecondary'>Hidden</span>
                            <input type="checkbox" className="toggle" value={status} onChange={(e) => setStatus(e.target.checked)} checked={status} />
                            <span className='text-textSecondary'>Actively Looking</span>
                        </div>

                        {errorStatus && <p className="text-red-500 text-xs">{errorStatus}</p>}
                    </div>
                </>
            }

            <button type="submit" disabled={loading} className={`w-full my-10 text-textPrimary rounded-md bg-baseSecondary h-12 font-medium hover:bg-baseSecondaryHover ${loading && "bg-baseSecondaryHover"}`}>
                {loading ? "Loading..." : "Update"}
            </button>

        </form>
    )
}

export default EditForm