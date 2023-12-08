const { useNavigate } = require("react-router-dom");

const Navigation = () => {
    const navigate = useNavigate()
    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/")
    }

    return(
    <div className="flex flex-col h-4/5 w-1/5 bg-white text-black shadow-sm font-mono">
        <h1 className="flex items-center text-center h-14 px-8 py-12 bg-gray-300 border-b">Lego PI</h1>
        <a href="#" className="flex items-center h-14 px-8 border-b border-gray-100">Dashboard </a>
        <a href="#" className="flex items-center h-14 px-8 border-b border-gray-100">Your lego sets</a>
        <a href="#" className="flex items-center h-14 px-8 border-b border-gray-100" onClick={()=>logout()}>Logout</a>
    </div>
    )
}

export default Navigation