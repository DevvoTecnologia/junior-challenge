"use client"
import "./styles/ChangeThemeElement.css"
import React, { useState } from "react"
import { IoIosSunny, IoIosMoon } from "react-icons/io"

export const ChangeThemeElement = () => {
    const [darkThemeActive, setDarkThemeActive] = useState<boolean>(false)

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            document.body.setAttribute("data-theme", "t-dark")
            setDarkThemeActive(true)
        } else {
            document.body.setAttribute("data-theme", "t-light")
            setDarkThemeActive(false)
        }
    }

    return (
        <div className="input_change_theme_container">
            <input onChange={(event) => handleCheckboxChange(event)} type="checkbox" id="checkbox_input" />
            <label htmlFor="checkbox_input">
                {darkThemeActive ? (<IoIosMoon />) : (<IoIosSunny />)}
            </label>
        </div>
    )
}
