import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/Images/Mobilelogo-removebg-preview.png";
import { MapPin, User, ShoppingCart } from "lucide-react"; // icons

const menuData = {
  "Exclusive At Croma": [],
  "Top Brands": [],
  "Croma Store Locator": [],
  "Gift Card": [],
  "Shop by Category": {
    "Televisions & Accessories": ["Smart TVs", "LED TVs", "TV Accessories"],
    "Home Appliances": [
      "Washing Machines & Dryers",
      "Air Conditioners",
      "Refrigerators & Freezers",
      "Air Treatment Devices",
      "Vacuum Cleaners",
    ],
    "Phones & Wearables": ["Smartphones", "Smartwatches", "Accessories"],
    "Computers & Tablets": ["Laptops", "Desktops", "Tablets", "Monitors"],
    "Kitchen Appliances": ["Microwave Ovens", "Mixers", "Coffee Makers"],
    "Audio & Video": ["Speakers", "Headphones", "Soundbars"],
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  return (
    <nav className="w-full bg-black text-white  flex items-center justify-between">
      {/* Left - Logo + Menu */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-40 h-30 " />
        <button onClick={() => setMenuOpen(true)} className="p-2">
          <Menu className="w-6 h-6 text-white" />
          <span className="ml-1">Menu</span>
        </button>
      </div>

      {/* Middle - Search Bar */}
      <div className="flex-1 mx-4 hidden md:flex">
        <input
          type="text"
          placeholder="What are you looking for ?"
          className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
        />
      </div>

      {/* Right - Dummy Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2">
          <MapPin className="w-6 h-6 text-white" />
        </button>
        <button className="p-2">
          <User className="w-6 h-6 text-white" />
        </button>
        <button className="relative p-2">
          <ShoppingCart className="w-6 h-6 text-white" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"></span>
        </button>
      </div>

      {/* Sidebar */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Sidebar Container */}
          <div className="fixed top-0 left-0 w-3/4 md:w-1/2 lg:w-1/3 h-full bg-[#111] text-white z-50 flex">
            {/* Left Panel (Main Categories) */}
            <div className="w-1/3 border-r border-gray-700 p-4 overflow-y-auto">
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              {Object.keys(menuData).map((category) => (
                <div
                  key={category}
                  className={`flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-800 ${
                    activeCategory === category ? "bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSubCategory(null);
                  }}
                >
                  <span>{category}</span>
                  {menuData[category] &&
                    Object.keys(menuData[category]).length > 0 && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                </div>
              ))}
            </div>

            {/* Middle Panel (Subcategories) */}
            {activeCategory && menuData[activeCategory] && (
              <div className="w-1/3 border-r border-gray-700 p-4 overflow-y-auto">
                {Object.keys(menuData[activeCategory]).map((sub) => (
                  <div
                    key={sub}
                    className={`flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-800 ${
                      activeSubCategory === sub ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setActiveSubCategory(sub)}
                  >
                    <span>{sub}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ))}
              </div>
            )}

            {/* Right Panel (Nested Subcategories) */}
            {activeSubCategory && (
              <div className="w-1/3 p-4 overflow-y-auto">
                {menuData[activeCategory][activeSubCategory].map((item, i) => (
                  <div
                    key={i}
                    className="py-2 px-2 hover:bg-gray-800 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
