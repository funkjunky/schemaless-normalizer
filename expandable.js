// Used to determine whether to proceed in a lot of normalization functions
export default (modelName, model, key, oneToOne={}) =>
    model[key] !== null
    && typeof model[key] === 'object'
    && (!oneToOne[modelName] || !oneToOne[modelName].includes(key));
