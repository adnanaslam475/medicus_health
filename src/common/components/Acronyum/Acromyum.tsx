import TextArea from 'antd/lib/input/TextArea'
import React from 'react';
import _classes from './Acronyum.module.scss';

type Props={
    character:string,
    word:string
}
function Acromyum(props:Props) {
    const {character,word}=props
  return (
    <div className='py-2'>
        <div className='flex w-full gap-2'>
            <span className='text-base font-bold rounded text-primary  h-full px-2 bg-lightBlue'>{character}</span>
            <div className={`{${_classes["acronyum"]} w-full`}>
                <span className='text-lg font-medium text-lightBlue-1'>{word}</span>
                <TextArea/>
            </div>
        </div>
    </div>
  )
}

export default Acromyum