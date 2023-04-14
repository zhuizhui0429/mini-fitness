import { addDietRecordBodyType, queryOneDayDietBodyType, updateDietRecordWeightQueryType } from './diet.service'

const addDietRecordBodyExample: addDietRecordBodyType = {
    foodId: 1,
    creatorId: 1,
    weight: 22,
    type: 'breakfast'
}
const queryOneDayDietBodyExample: queryOneDayDietBodyType = {
    userId: 1,
    date: new Date().toString()
}
const updateDietRecordWeightQueryExample: updateDietRecordWeightQueryType = {
    weight: 999,
    id: 23
}

export {addDietRecordBodyExample,queryOneDayDietBodyExample,updateDietRecordWeightQueryExample}