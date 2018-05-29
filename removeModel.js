import { pluralize, getPropertyTree } from 'utilities/helpers';
import expandable from './expandable';

// Used to remove / nullify related members
// ie. removeModel dependency, removing from asset.dependencies, etc.
export default (modelName, model, state, config={}) => {
    const { keyToModel={}, oneToOne={} } = config;
    let result = {};

    Object.keys(model).forEach(key => {
        //The keys after keyToModel mapping
        let mappedKey = getPropertyTree(keyToModel, key, modelName, key);
        let relatedMappedKey = getPropertyTree(keyToModel, modelName, mappedKey, modelName);

        //given the model member, add related nulls and filtered arrays to the result.
        const addToResult = (keyModel, modelState) => {
            const relatedModel = modelState.entities[keyModel.id];
            let relatedValue = null; //many-to-one
            if (Array.isArray(relatedModel[relatedMappedKey])) { //many-to-many
                relatedValue = relatedModel[relatedMappedKey].filter(({ id }) => id !== model.id);
            }

            //nullify, or remove the removed-model from the related-model.
            mappedKey = pluralize(mappedKey);
            if (!result[mappedKey]) result[mappedKey] = {};
            result[mappedKey][keyModel.id] = {
                id: keyModel.id,
                [relatedMappedKey]: relatedValue,
            };
        };

        if (Array.isArray(model[key])) {
            //We have to remove for every related-model in the array
            model[key].forEach(keyModel => addToResult(keyModel, state[mappedKey]));
        } else if (expandable(model, key, modelName, oneToOne)) {
            addToResult(model[key], state[pluralize(mappedKey)]);
        }   // else. We ignore primitives and null.
    });

    return result;
};
