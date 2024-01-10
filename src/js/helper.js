import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        let result = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        let recipeData = await result.json();

        if (!result.ok) throw new Error(recipeData.message);
        return recipeData;
    } catch (err) {
        throw err;
    }
}