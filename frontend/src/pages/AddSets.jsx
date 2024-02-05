import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

const AddSets = () => {
    const [set, setSet] = useState([])
    const [setCode, setSetCode] = useState('')
    const [isAutoFilled, setIsAutoFilled] = useState(false)
    useEffect(() => {
        setIsAutoFilled(false)
        console.log(isAutoFilled)
    },[])
    
    useEffect(() => {
        console.log(set["Year released"]);
    }, [set]);

    const autoFillSet = async () => {
        console.log(setCode);
    
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:5050/Storage/additionalData/${setCode}`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        
        try {
            const response = await axios.request(config);
            setSet(response.data.additionalData);
            setIsAutoFilled(true);
        } catch (error) {
            console.log(error);
        }
    };
    const confirmSet = async () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `http://localhost:5050/Storage/`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            data : {"setCode": setCode, "additionalData": set}
        };
        
        try {
            const response = await axios.request(config);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div  className="pt-8 px-20 w-full">
            <div className="text-center">
                <h1 className="text-5xl border-b-2 border-gray-300 ">Add a set</h1>
                <div className="flex flex-wrap justify-center">
                    <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setCode" type="text" placeholder="Set Code for your lego set" onChange={(e)=>setSetCode(e.target.value)}/>
                    <button className={isAutoFilled? "hidden":"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} onClick={()=>autoFillSet()}>AutoFill</button>
                </div>
                <div>
                    <div className="flex flex-wrap justify-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode"> Name of the set </label>
                        <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setName" type="text" placeholder="Set Name" value={set.Name} onChange={(e)=>setSet({...set, Name: e.target.value})}/>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode"> Theme </label>
                        <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setTheme" type="text" placeholder="Set Theme" value={set["Theme"]} onChange={(e)=>setSet({...set, Theme: e.target.value})}/>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode"> Year released </label>
                        <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setYear" type="text" placeholder="Set Year" value={set["Year released"]} onChange={(e)=>setSet({...set, Year: e.target.value})}/>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode"> Price </label>
                        <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setPrice" type="text" placeholder="Set Price" value={set["Price"]} onChange={(e)=>setSet({...set, Price: e.target.value})}/>
                    </div>
                    <div className="flex flex-wrap justify-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setCode"> RRP </label>
                        <input className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="setRRP" type="text" placeholder="Set RRP" value={set["RRP"]} onChange={(e)=>setSet({...set, RRP: e.target.value})}/>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>confirmSet()}>Add Set</button>
                </div>
            </div>
        </div>
    )
}

export default AddSets