import { getQsIndexByTopic } from "../utils/getQsIndexByTopic";

let listeners = []
const localState = {
    questions: {
        allQuestions: [],
        activeQuestion: [],
    },
    activeTopic: '',
    score: {
        all: 0,
        user: 0
    }
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
        if (!Array.isArray(newAllQuestions)) return
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
        return localState.questions.allQuestions;
    }

    const updateAllQuestions = () => {
        let topicQs = null
        getAllQuestions().forEach((element) => {
            if (getActiveTopic() === Object.keys(element)[0].toLowerCase()) {
                topicQs = Object.values(element)[0]
            }
        });
        let newAllQuestions = []
        const answeredQuestion = (topicQs.splice(
            topicQs.findIndex((el) => el == getActiveQuestion()),
            1))[0]
        topicQs.forEach((element) => {
            if(element != answeredQuestion) {
                newAllQuestions.push(element)
            }
        })
        getAllQuestions().forEach((element) => {
            if (getActiveTopic() === Object.keys(element)[0].toLowerCase()) {
                Object.values(element)[0] = newAllQuestions
            }
        });

        console.log(getAllQuestions())
    }

    //Active qs
    const setActiveQuestion = (newActiveQuestion) => {
        localState.questions.activeQuestion = newActiveQuestion
    }

    const getActiveQuestion = () => {
        return localState.questions.activeQuestion;
    }

    //Score

    const updateScore = (price, answered) => {
        localState.score.all = localState.score.all + price
        if (answered) {
            localState.score.user = localState.score.user + price
        }
    }

    const getScore = () => {
        return `${localState.score.user}/${localState.score.all}`
    }

    return {
        setAllQuestions,
        getAllQuestions,
        updateAllQuestions,
        setActiveQuestion,
        getActiveQuestion,
        setActiveTopic,
        getActiveTopic,
        updateScore,
        getScore
    }
}

export { useState }