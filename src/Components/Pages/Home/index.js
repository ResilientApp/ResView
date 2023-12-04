import React, {useState} from 'react'
import Wrapper from '../../Shared/Wrapper'
// TODO: Remove the below import and entire components after demo is done
import { WebSocketDemo } from '../../../Socket'
import homePageBackground from '../../../Resources/Images/homePageBackground.png'
import { Icon } from '../../Shared/Icon';
import { anglesDownIcon } from '../../../Resources/Icons';
import { sendGet, sendPost } from '../../../API';

const ScrollBelow = () => {
  return (
    <div className='flex flex-col items-center justify-center hover:text-blue-200 cursor-pointer text-gray dark:text-white'>
      <div className='text-20p bold mb-10p'>Scroll</div>
      <div>
        <Icon
          path={anglesDownIcon}
          fill={"gray"}
          height={"1.8em"}
          viewBox={"0 0 448 512"}
        />
      </div>
    </div>
  );
};

const index = () => {
  let messageHistory={};

  const onMessage = (newData)=>{
    messageHistory = newData;

    console.log(messageHistory, 'MESSAGE HISTORY')
  };

  return (
    <Wrapper customWidth={"w-full"} style={{ border: "1px solid red" }}>
      <div className='h-720p w-full text-black dark:text-white text-22p'>
        <WebSocketDemo onMessage={onMessage} />
      </div>
      <div>
        <ScrollBelow />
      </div>
    </Wrapper>
  );
}

export default index