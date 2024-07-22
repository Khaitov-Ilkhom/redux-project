import { Flex, Spin } from 'antd';
import {Suspense} from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Flex align="center" gap="middle">
        <Spin tip="Loading..." size="large" />
      </Flex>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const SuspenseElement = ({children}) => {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  )
}


export {Loading, SuspenseElement}
