import React from 'react';
import { IoIosMore } from 'react-icons/io';


import { Button } from '../../../components/agentDashboardComponent';
import { useStateContext } from '../../../contexts/ContextProvider';
import house1 from '../../../data/company_x-1.jpg';

const Properties = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mt-12">
      <div className='flex flex-wrap justify-center'>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Listing</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
          <div className="mt-10">
            <img
              className="md:w-96 h-50 "
              src={house1}
              alt=""
            />
            <div className="mt-8">
              <p className="font-semibold text-lg"> Semi-detached Dupluex</p>
              <p className="text-gray-400 ">Agency 1</p>
              <p className="mt-8 text-sm text-gray-400">
                This will be the small description for the news you have shown
                here. There could be some great info.
              </p>
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="View Property"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Properties