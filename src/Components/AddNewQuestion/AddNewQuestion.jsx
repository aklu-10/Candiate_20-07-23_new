import React, { useRef, useState } from 'react'
import Field from '../Field/Field';
import Label from '../Label/Label';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import AddNewQuestionOptions from '../AddNewQuestionOptions/AddNewQuestionOptions';
import axios from 'axios';

const AddNewQuestion = ({setShowAddNewForm, testTypeOptions}) => {

    const [addNewQuestionData, setAddNewQuestionState] = useState({
        technology:'',
        questionType:'',
        questionTitle:'',
        options:{ option1:{ value:'', isCorrect:false }, }
    });

    function handleAddNewInput(fieldName, e)
    {

        if(fieldName.includes("option"))
        {
            setAddNewQuestionState({...addNewQuestionData, options: {...addNewQuestionData.options, [fieldName]: { ...addNewQuestionData.options[fieldName], value : e.target.value } }})
        }
        else
        {
            setAddNewQuestionState({...addNewQuestionData, [fieldName]: e.target.value })
        }

    }

    function addNewQuestionOnBoard()
    {   
        
        if(!addNewQuestionData.technology || !addNewQuestionData.questionType || !addNewQuestionData.questionTitle)
        {
            toast.error("Please provide the required fields")
            return;
        }
        else if(!Object.keys(addNewQuestionData.options).filter(option=>addNewQuestionData.options[option].isCorrect).length)
        {
            toast.error("Please provide the required fields")
            return;
        }

        toast.success("Question successfully created");
        setShowAddNewForm(false)
        console.log(addNewQuestionData);

        let tech = addNewQuestionData.technology;

        let correctAns = Object.keys(addNewQuestionData.options).filter(option=>(
            addNewQuestionData.options[option]._isCorrect=true
        ))

        let base = {
            question: addNewQuestionData.questionTitle,
            option: addNewQuestionData.options,
            correct_answer: correctAns[0]
            }

        axios.post("http://localhost:3000/"+tech, base)
        .then(console.log)
        .catch(console.log)
            
    }

    function saveAndNewQuestionOnBoard()
    {
        console.log(addNewQuestionData);
        setShowAddNewForm(false)
        setTimeout(()=>
        {
            setShowAddNewForm(true)
        },10)

    }

    function handleAddNewOption()
    {
        let optionLen = Object.keys(addNewQuestionData.options).length
        if( optionLen )
        {   
            if(optionLen===4)
            {
                toast.info("Cannot add more options.");
                return;
            }
            let lastOptionIndex = Number(Object.keys(addNewQuestionData.options).slice(-1)[0].slice(-1))
            setAddNewQuestionState({...addNewQuestionData, options:{...addNewQuestionData.options, ['option'+(lastOptionIndex+1)]: { value:'', isCorrect:false }}})
        }
        else
        {

            setAddNewQuestionState({...addNewQuestionData, options:{'option1': { value:'', isCorrect:false }}})
        }
        
    }

    return (

        <>
            <div className='absolute top-[180px] right-[10px] my-4 bg-white shadow-lg z-10 p-4 py-4' >

                <h1>Add New Question</h1>

                <Field
                    control="select"
                    fieldName="technology"
                    fieldLabel="Technology"
                    fieldOptions={testTypeOptions}
                    fieldClass="w-[500px]"
                    onClick={(e)=>handleAddNewInput("technology", e)}
                />

                <Field
                    control="select"
                    fieldName="questionType"
                    fieldLabel="Question Type"
                    fieldOptions={["Mcq", "Programming", "Descriptive"]}
                    fieldClass="w-[500px]"
                    onClick={(e)=>handleAddNewInput("questionType", e)}
                />

                <Field
                    control="input"
                    fieldName="questionTitle"
                    fieldType="text"
                    fieldLabel="Question Title"
                    fieldPlaceHolder="Question Title"
                    fieldClass="w-[500px]"
                    allowDebounce={true}
                    onChange={(e)=>handleAddNewInput("questionTitle", e)}
                />


                {/* options */}
                <div>
                    <div className='flex items-center'>
                        <Label labelName={"Answer Options"}/>
                        <button type='button' className='ml-5 bg-green-400 h-[25px] rounded-xl text-white px-2' onClick={handleAddNewOption}>+</button>
                    </div>

                    <div>

                        {
                        
                            <AddNewQuestionOptions addNewQuestionData={addNewQuestionData} setAddNewQuestionState={setAddNewQuestionState}/>
                        }

                    </div>

                    <Button
                        btnClass={'rounded bg-blue-600 text-white p-2 mr-[20px]'}
                        onClick={addNewQuestionOnBoard}
                        >
                        Create
                    </Button>
                    <Button
                        btnClass={'rounded bg-blue-600 text-white p-2 mr-[20px]'}
                        onClick={saveAndNewQuestionOnBoard}
                        >
                        Save & Create New 
                    </Button>
                    <Button
                        btnClass={'rounded bg-red-600 text-white p-2 mr-[20px]'}
                        onClick={()=>setShowAddNewForm(false)}
                        >
                        Cancel
                    </Button>


                </div>

            </div>
        </>

    )
}

export default AddNewQuestion