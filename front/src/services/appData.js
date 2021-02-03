/*
    Returns appData
    appData = {
        workout_menus = [
            {
                name: "For You",
                workout_ids = [],
                filter = ["personal"],
                workouts = [6017fd12ac151833101a62a2],
            },
            {
                name: "Popular",
                workout_ids = [601a5716f10018ca6c39dba9],
                filter = ["muscle"],
                workouts = [],
            },
        ]
    }
*/

import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/appData'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    //console('appData:', response.data)
    return response.data
}

const appDataService = { getAll }
export default appDataService