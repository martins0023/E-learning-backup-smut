"use client"
import React, { useEffect, useState } from 'react';
import { GetApi } from '../../../../../utils/Actions';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
// import Welcome from '../../../../../components/Welcome';

const page = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({});

  const Welcome = dynamic(() => import('../../../../../components/Welcome'), { ssr: false })
  
  useEffect(() => {
    const FetchStudent = async () => {
      try {
        setLoading(true);
        const response = await GetApi(`api/lecturer/get-user/${params.id}`);
        if (response.success) {
          setData(response.data);
        } else {
          setErrorMsg(response.message);
          return setData({});
        }
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    }

    FetchStudent()

  }, [])

  if(loading) return <>Loading...</>

  return (
    <Welcome data={data} />
  )
}

export default page