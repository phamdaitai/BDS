export const ratesAverage = (rates) => {
    if (!rates?.length) return 0;
    
    let average = rates.reduce((a, b) => {
        return a + b.rate;
    }, 0)
    return average;
}