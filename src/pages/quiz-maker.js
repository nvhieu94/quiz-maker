import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { QuizMakerContext } from "../quiz-provider/QuizProvider";
import { useNavigate } from "react-router-dom";

const QuizMakerPageWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const QuizMakerpageTitle = styled.div`
    margin-bottom: 15px;
    font-size: 24px;
    font-weight: 700;
`

const QuizMakerContainer = styled.div`
    width: 800px;
    padding: 50px;
`
const CategoryWrapper = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 15px;
`

const SelectWrapper = styled.select`
    padding: 8px;
    border-radius: 4px;
`

const SelectOption = styled.option`

`
const ButtonWrapper = styled.button`
    border-radius: 4px;
    border: 1px solid;
    cursor: pointer;
    &#submitBtn {
        width: 100px;
        padding: 10px;
        width: 100%;
    }
`

const QuestionWrapper = styled.div`
    gap: 16px;

`
const QuestionItem = styled.div`
    text-align: start;
    margin-bottom: 20px;

`
const Question = styled.div`

`
const AnswerWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`

const AnswerItem = styled.button`
   
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    &.default {
        background-color: #fff;
        color: green;
        border: 1px solid green;
    }
    &.selected {
        background-color: #198754;
        color: #fff;
        border: 1px solid #198754;
    }

    &:hover {
        background-color: #198754;
        color: #fff;
        border: 1px solid #198754;
    }
    
`

const QuizMaker = () => {
    const { categories, filter, setFilter, questions, handleGetQuestion, setUserAnswers } = useContext(QuizMakerContext);
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({})

    const handleSelect = (event) => {
        setFilter((prev) => ({
            ...prev,
            [event?.target?.name]: event?.target?.value
        }))
    }

    const disableBtn = useMemo(() => {
        return !filter?.category || !filter?.difficulty
    }, [filter])

    const renderAnswerItem = (answersList, idQuestion) => {
        return answersList?.map((item, idx) => {
            return <AnswerItem className={answers?.[idQuestion] === item ? "selected" : "default"} dangerouslySetInnerHTML={{ __html: item }} onClick={() => {
                setAnswers((prev) => ({
                    ...prev,
                    [idQuestion]: item
                }))
            }} key={idx}></AnswerItem>
        })
    }

    const handleSubmitAnswers = ()=> {
        if(setUserAnswers) setUserAnswers(answers)
        navigate("/result");
    }


    const handleCreateQuestion = ()=> {
        if(handleGetQuestion) {
            handleGetQuestion(()=> {
                setAnswers({});
            });
        }
    }

    return (<QuizMakerPageWrapper>
        <QuizMakerContainer>
            <QuizMakerpageTitle>Quiz Maker</QuizMakerpageTitle>
            <CategoryWrapper>
                <SelectWrapper name="category" id="categorySelect" onChange={handleSelect} value={filter?.category}>
                    <SelectOption value=""  >Select a category</SelectOption>
                    {categories && categories?.map((item, idx) => (
                        <SelectOption value={item.id} key={idx}>{item?.name}</SelectOption>
                    ))}

                </SelectWrapper>
                <SelectWrapper name="difficulty" id="difficultySelect" onChange={handleSelect} value={filter?.difficulty}>
                    <SelectOption value="" >Select difficulty </SelectOption>
                    <SelectOption value="easy"  >Easy </SelectOption>
                    <SelectOption value="medium" >Medium</SelectOption>
                    <SelectOption value="hard" >Hard</SelectOption>
                </SelectWrapper>
                <ButtonWrapper id="createBtn" disabled={disableBtn} onClick={handleCreateQuestion} >Create</ButtonWrapper>
            </CategoryWrapper>
            <QuestionWrapper>
                {questions?.length > 0 && questions?.map((item, idx) => {
                    return (
                        <QuestionItem key={idx}>
                            <Question dangerouslySetInnerHTML={{ __html: item?.question }} />
                            
                            <AnswerWrapper>
                                {renderAnswerItem(item?.amswers || [], item?.id)}
                            </AnswerWrapper>
                        </QuestionItem>
                    )
                })}

            </QuestionWrapper>
            {Object.keys(answers)?.length === questions?.length && questions?.length > 0 && <ButtonWrapper id="submitBtn" onClick={handleSubmitAnswers} >Summit</ButtonWrapper>}
            
        </QuizMakerContainer>
    </QuizMakerPageWrapper>)
}

export default QuizMaker;
