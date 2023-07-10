import { getQsIndexByTopic } from "../utils/getQsIndexByTopic";

let listeners = []
const localState = {
    questions: {
        allQuestions: [],
        answeredQuestionsIndexes: [],
        activeQuestion: [],
        //this.questions.allQuestions[getQsIndexByTopic(this.questions.allQuestions, this.activeTopic)]
    },
    activeTopic: '',
}

function useState() {
    //Active topic
    const setActiveTopic = (newActiveTopic) => {
        localState.activeTopic = newActiveTopic;
    };

    const getActiveTopic = () => {
        return localState.activeTopic;
    };
    
    //All qs
    const setAllQuestions = (newAllQuestions) => {
        if(!Array.isArray(newAllQuestions)) return

        // TODO: understand WTF and how we did this
        // const testArr = [] create test arr
        // newAllQuestions.forEach(qs => { for each obj in newAllQuestions
        //     const arrayOfValues = []
        //     Object.values(qs)[0].forEach(value => { for each value
        //         if(value) arrayOfValues.push(value) if value excist -> push it
        //     })
        //     Object.keys(qs).forEach(t => { for each key
        //         testArr.push({ [t]: arrayOfValues }) push key(topic) and value(arr of qs) in testArr
        //     })
        // });
        localState.questions.allQuestions = newAllQuestions.map(item => { //map -> creates an arr of returned values
            const entries = Object.entries(item).flat(); //entries -> creates an arr of obj, and adds an iterator for each value [{0: value}, {1: value}] 
                                                        //flat -> makes a single arr of sub-arrs
            const key = entries[0]
            const value = entries[1].filter(el => el !== '') //filter -> if el is not "" => add it
            
            return {
                [key]: value //returns an obj for newAllQuestions (40)
            }
        })
    }

    const getAllQuestions = () => {
        console.log(localState.questions.allQuestions)
        return localState.questions.allQuestions;
    }

    //Active qs
    const setActiveQuestion = (newActiveQuestion) => {
        localState.questions.activeQuestion = newActiveQuestion
    }

    const getActiveQuestion = () => {
        return localState.questions.activeQuestion;
    }

    return {
        setAllQuestions,
        getAllQuestions,
        setActiveQuestion,
        getActiveQuestion,
        setActiveTopic,
        getActiveTopic
    }
}

export { useState }