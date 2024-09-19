import React, { useState,Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { X } from "lucide-react"

export const Modal = ({ isModalOpen, setModalOpen, title, children }) => {
  
  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 top-2 w-[50%]" onClose={() => setModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 flex justify-between w-100">
                  {title}
                  <X className='cursor-pointer' onClick={()=>setModalOpen(false)}></X>
                </Dialog.Title>
                <div>
                  {children}

                </div>

                <div className="mt-4 flex flex justify-center gap-2">
                <button
                    type="button"
                    className="bg-green-500 hover:bg-danger-600 text-white px-4 py-2 rounded-md flex items-center"
                    onClick={() => setModalOpen(false)}
                  >
                  Guardar
                  </button>
                  <button
                    type="button"
                    className="bg-red-500   text-white px-4 py-2 rounded-md flex items-center"
                    onClick={() => setModalOpen(false)}
                  >
                  Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div >
        </Dialog >
      </Transition >
    </>
  );
};


