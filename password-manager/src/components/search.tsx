"use client"
import { Search } from "lucide-react"
import React, { useRef, useState } from "react"

export default function SearchComponent() {
    const [isClicked, setIsClicked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        setIsClicked(true);
    }

    function handleFocusOut(e: React.FocusEvent<HTMLInputElement>) {
        if (e.relatedTarget) {
            if (!(e.relatedTarget.id === e.target.parentElement?.id)) {
                setIsClicked(false);
            }
        } else {
            setIsClicked(false);
        }
    }
    //this can possibly be removed, I don't want to mess with it right now though.
    function handleLabelClick(e: React.MouseEvent<HTMLLabelElement>) {
        setIsClicked(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    function handleLabelMouseDown(e: React.MouseEvent<HTMLLabelElement>) {
        e.preventDefault();
        inputRef.current?.focus();
    }

    return (
        //quiero que la div en general sea la label del input y solo aqui se vea el focus
        // <label htmlFor="search" className="">
        <label htmlFor="search" onClick={handleLabelClick} onMouseDown={handleLabelMouseDown} id="labeled" ref={labelRef} className={isClicked ? "border border-blue rounded-full bg-white w-7/12 h-16 flex flex-row text-3xl items-center pr-2 ring" : "border border-black rounded-full w-7/12 h-16 flex flex-row text-3xl items-center bg-white pr-2"}>
            <Search style={{width: "1em", height: "1em"}} className="text-5xl mx-2"/>
            <input type="text" id="search" ref={inputRef} onFocus={handleFocus} onBlur={handleFocusOut} className="w-full border-none bg-transparent" />
        </label>
    )
}