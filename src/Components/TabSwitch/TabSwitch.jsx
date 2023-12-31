import FormContext from '../../context/FormContext';
import Button from '../Button/Button';
import PredefinedQuestions from '../PredefinedQuestions/PredefinedQuestions';
import RandomQuestions from '../RandomQuestions/RandomQuestions';
import { useContext } from 'react';
import React, { useEffect, useRef, useState } from 'react'

const TabSwitch = ({formSectionData, tabs}) => {

    const {masterData, setMasterData} = useContext(FormContext);
    const [currentTab, setCurrentTab] = useState(tabs[0]);

    if(formSectionData.managedBy.testName || !formSectionData.totalQuestions || formSectionData.totalQuestions <= 0 || !formSectionData.testType || !formSectionData.managedBy.name || !formSectionData.screeningType) return;

  return (

    <div>
        <div className='flex my-5'>
        {
            tabs.map((tab, index)=>(
                <Button
                  key={index}
                  btnClass={`w-[800px] text-center ${ (tab.label===currentTab.label) ? ' border-b-4 border-indigo-500' : '' }`}
                  onClick={()=>setCurrentTab(tab)}
                >
                  {tab.label}
                </Button>
            ))
        }
        </div>

        {
          console.log(tabs)
        }

        <div>
        {
          currentTab.value
        }
        </div>
    </div>
  )
}

export default TabSwitch