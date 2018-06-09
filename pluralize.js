export default word => {
    const lastLetter = word.slice(-1);

    if (lastLetter === 'y') return word.slice(0, -1) + 'ies';
    else                    return word + 's';
};
