// import {SetStateAction, useEffect, useState} from "react";
// import axios from "axios";
// import {actors, directors} from "../../types";
// import DisplayData from "../DisplayData";
// import { useQuery } from "@tanstack/react-query";
//
//
// interface DataProps{
//     data: actors | directors | undefined
// }
//
// export default function DeleteData({data}:DataProps) {
//     const [returnData, setData] = useState<any[]>();
//    
//     function deleteData(){
//         axios.delete(`http://3.149.27.3:8080/api/actors/${data?.id}`)
//             .then(response =>
//                 setData(response.data))
//     }
//     // console.log(data)
//     useQuery({
//         queryKey:[data],
//         queryFn: deleteData
//     })
//
//     return (
//         <>
//             <DisplayData data={returnData}/>
//         </>
//     )
// }