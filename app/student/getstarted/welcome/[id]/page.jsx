"use client"
import React, { useEffect, useState } from 'react';
// import Welcome from '../../../components/Welcome';
import { useParams } from 'next/navigation';
import { GetApi } from '../../../../../utils/Actions';
import dynamic from 'next/dynamic';

const page = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({});

  const Welcome = dynamic(() => import('../../../components/Welcome'), { ssr: false })

  useEffect(() => {
    const FetchStudent = async () => {
      try {
        setLoading(true);
        const response = await GetApi(`api/student/get-user/${params.id}`);
        if (response.success) {
          console.log(response.data)
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
    <>
    {
      data && (
        <Welcome data={data} />
      )
    }
    </>
  )
}

export default page