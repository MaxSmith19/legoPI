import { HiChevronDown, HiCog } from 'react-icons/hi';
import { BiChevronDownSquare, BiChevronUpSquare, BiLogOut } from 'react-icons/bi';
const { useNavigate, NavLink } = require("react-router-dom");
const { useState } = require("react");
const Navigation = (props) => {
    const navigate = useNavigate()
    const [setsActive, setSetsActive] = useState(false)
    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        props.onLogout(true);
        navigate("/")
    }

    return(
        <div className="flex flex-col justify-between h-screen w-1/5 text-black shadow-lg font-mono">
            <div>
                <h1 className="flex items-center text-center h-14 px-8 py-12 bg-gray-300 border-b">Lego PI</h1>
                <NavLink to="/dashboard" className="flex items-center h-14 px-8 border-b border-gray-100 hover:bg-gray-200" >Dashboard</NavLink>
                
                <div className="flex justify-between items-center h-14 px-8 border-b border-gray-100 hover:bg-gray-200 cursor-pointer w-full" onClick={()=>setSetsActive(!setsActive)}>
                    <div >Your sets</div>
                    <div >{setsActive? <BiChevronDownSquare /> : <BiChevronUpSquare />}</div>
                </div>
                    <NavLink to="/storedSets" className={setsActive ? "flex items-center bg-slate-300 h-14 px-8 border-b border-gray-300 hover:bg-slate-400 " :
                     "hidden"}>Stored sets</NavLink>
                    <NavLink to="/wantedSets" className={setsActive ? "flex items-center bg-slate-300 h-14 px-8 border-b border-gray-300 hover:bg-slate-400" : 
                    "hidden"}>Wanted sets</NavLink>
                    <NavLink to="/addSets" className={setsActive ? "flex items-center bg-slate-300 h-14 px-8 border-b border-gray-300 hover:bg-slate-400" : 
                    "hidden"}>Add a new set</NavLink>
            </div>
            <div>
                <div className="flex justify-between items-center h-14 px-8 border-b border-t border-gray-100 hover:bg-blue-200 cursor-pointer">
                    <div>Settings</div>
                    <div><HiCog /></div>
                </div>
                <div className="flex justify-between items-center h-14 px-8 border-b border-t border-gray-100 hover:bg-red-200 cursor-pointer" onClick={()=>logout()}>
                    <div>Logout</div> 
                    <div><BiLogOut /></div>
                </div>
            </div>
        </div>
    )
}

export default Navigation