import React from "react"

const ToggleButton = () => {
  const toggleDarkMode = () => {
    let htmlClasses = document.querySelector("html").classList
    if (localStorage.theme === "dark") {
      htmlClasses.remove("dark")
      localStorage.removeItem("theme")
    } else {
      htmlClasses.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <label htmlFor="default-toggle-2" className="inline-flex relative items-center cursor-pointer lg:top-1.5">
    <input type="checkbox" value="" id="default-toggle-2" className="sr-only peer" onClick={toggleDarkMode} />
    <div className="w-7 h-3 lg:w-11 lg:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 lg:after:h-5 lg:after:w-5 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    <span className="ml-1 text-[10px] lg:text-[14px] font-semibold text-gray-900 dark:text-gray-300">Night Mode</span>
  </label>
  )
}

export default ToggleButton
