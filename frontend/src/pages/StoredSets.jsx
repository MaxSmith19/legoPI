import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

const StoredSets = () => {
    const [sets, setSets] = useState([])
    useEffect(() => {
        getSets()
    },[])

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
            setSets(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    return (
        <div  className="pt-8 px-20 w-full">
            <div className="text-center">
                <h1 className="text-5xl border-b-2 border-gray-300 ">Stored sets</h1>
                <div className="flex flex-row flex-wrap w-full ">
                    {sets.map((set) => ( 
                        console.log(set.additionalData["Name"]),
                        <div key={set._id} className="border-2 border-gray-300 rounded-xl m-2 p-2 w-full text-left">
                            <p className="text-2xl">{set.additionalData["Name"]}</p>
                            <p className="text-lg">{set.additionalData["Year released"]}</p>
                            <p className="text-lg">{set.additionalData["Theme"]}</p>
                            <p className="text-lg text-right">{set.additionalData["Price"]}</p>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}

export default StoredSets