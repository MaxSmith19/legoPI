import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import LegoSetCard from '../components/LegoSetCard';

const WantedSets = () => {
    const [sets, setSets] = useState([])
    useEffect(() => {
        getSets()
    },[])
    
    const refreshSets = () =>{
        console.log("Refreshing")
    }

    const getSets = () => {
        const userCookie= Cookies.get('token')

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:5050/Storage/',
            headers: { 
                'Authorization': `Bearer ${userCookie}`
            }
        };

        axios.request(config)
        .then((response) => {
            let updatedSet = [] 
            let items = response.data
            for(let i =0;i<response.data.length;i++){
                console.log(response.data[i]["wishList"])
                if(response.data[i]["wishList"]==true){
                    updatedSet.push(response.data[i])
                }
            }
            setSets(updatedSet)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    return (
        <div  className="pt-8 px-20 w-full">
            <div className="text-center">
                <h1 className="text-5xl  border-gray-300 ">Wanted sets</h1>
                <div className="bg-gray-300 flex flex-row-reverse m-5 rounded mt-0 ml-0 w-full ">
                <button className="bg-red-500 border-white rounded-lg text-white m-3 pl-8 pr-8" onClick={()=>refreshSets()}>Refresh</button>
                </div>
                <div className="flex flex-row flex-wrap w-full ">
                    {sets.map((set) => ( 
                        <div key={set._id} className="border-2 border-gray-300 rounded-xl m-2 p-2 w-full text-left">
                            <p className="text-2xl">{set.additionalData["Name"]}</p>
                            <p className="text-lg">{set.additionalData["Year released"]}</p>
                            <p className="text-lg">{set.additionalData["Theme"]}</p>
                            <p className="text-lg text-right ">{set.additionalData["Price"]}</p>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}

export default WantedSets