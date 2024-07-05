import React, { useEffect, useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { styles } from '../styles/style'
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useCreateFaqMutation } from '../../redux/features/fag/faqApi';
import { toast } from 'react-toastify';

type Props = {}

export default function ManageFaq({ }: Props) {
    const [createFaq, { isLoading, isSuccess, error }] = useCreateFaqMutation()
    const navigate = useNavigate()


    const [faqInfo, setFaqInfo] = useState({
        "name": "",
        "description": "",
    })
    const [faqData, setFaqData] = useState([{
        question: "",
        answer: ""
    }])

    const formattedFaqData = faqData.map((content) => ({
        question: content.question,
        answer: content.answer
    }));
    const data = {
        name: faqInfo.name,
        description: faqInfo.description,
        faq: formattedFaqData
    }

    const handleSubmit = async () => {
        if (!isLoading) {
            await createFaq(data)
        }
    }


    useEffect(() => {
        if (isSuccess) {
            toast.success("Faq created successfully")
            navigate("/help-center")
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isLoading, isSuccess, error])


    const addNewFAQ = () => {
        setFaqData([...faqData, { question: '', answer: '' }]);
    };

    const deleteFAQ = (index: any) => {
        const updatedFAQ = [...faqData];
        updatedFAQ.splice(index, 1);
        setFaqData(updatedFAQ);
    };

    const handleQuestionChange = (e: any, index: number) => {
        const updatedFAQ = [...faqData];
        updatedFAQ[index].question = e.target.value;
        setFaqData(updatedFAQ);
    };

    const handleAnswerChange = (e: any, index: number) => {
        const updatedFAQ = [...faqData];
        updatedFAQ[index].answer = e.target.value;
        setFaqData(updatedFAQ);
    };


    return (
        <div className='w-full flex flex-col bg-gray-900 h-screen overflow-auto'>
            <div className='fixed top-0 right-0 left-0 border-b border-gray-700 shadow-md'>
                <div className='max-container items-center padding-container pb-3 justify-between lg:justify-between flex flex-col lg:flex-row bg-gray-900'>
                    <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-6 flex flex-row gap-5 items-center'>
                        <Link to="/">
                            <div>
                                <IoArrowBackOutline className='text-3xl text-blue-100 cursor-pointer' />
                            </div>
                        </Link>


                        <div className='text-[25px] font-semibold text-white'>FAQ Setup</div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 md:px-0 md:w-[80%] lg:w-[45%] m-auto mt-24'>
                <form onSubmit={handleSubmit} className={`${styles.label}`}>
                    <div>
                        <label htmlFor=''>
                            FAQ Title
                        </label>
                        <input
                            type='name'
                            name=''
                            required
                            value={faqInfo.name}
                            onChange={(e: any) => setFaqInfo({ ...faqInfo, name: e.target.value })}
                            id="name"
                            placeholder='Faq title'
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className='my-5'>
                        <label htmlFor=''>
                            FAQ Description
                        </label>
                        <textarea name='' id='' cols={30} rows={2}
                            placeholder='Write something nice...'
                            value={faqInfo.description}
                            onChange={(e: any) => setFaqInfo({ ...faqInfo, description: e.target.value })}
                            className={`${styles.input} !h-min !py-2`}></textarea>
                    </div>
                    <br />
                    <div>
                        <label htmlFor=''>
                            FAQs
                        </label>
                        {faqData.map((faq: any, index: number) => (
                            <div key={index} className='flex flex-col' >
                                <input
                                    type="text"
                                    placeholder="Question"
                                    value={faq.question}
                                    className={`${styles.input}`}
                                    onChange={(e) => handleQuestionChange(e, index)}
                                />
                                <textarea
                                    placeholder="Answer"
                                    className={`${styles.input} !h-min py-2`}
                                    value={faq.answer}
                                    onChange={(e) => handleAnswerChange(e, index)}
                                />

                                <div className='inline-block my-4'>
                                    <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                        onClick={() => deleteFAQ(index)}>
                                        <AiOutlineMinusCircle className="mr-2" />
                                        Delete
                                    </p>
                                </div>

                            </div>
                        ))}
                        <div className='inline-block mb-4'>
                            <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                onClick={addNewFAQ}
                            >
                                <AiOutlinePlusCircle className="mr-2" />
                                Add FAQ
                            </p>
                        </div>

                    </div>
                    <div className='w-full flex items-center justify-end'>
                        <input
                            type='submit'
                            value="Create Faq"
                            className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
                    </div>
                </form>

            </div>
        </div>
    )
}