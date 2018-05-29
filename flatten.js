import { pluralize, getPropertyTree } from 'utilities/helpers';
import expandable from './expandable';

// const flattenUsers = flatten('users')
// examples: yield put(mergeUsers(flattenUsers(unnormalizedUsers)))
// format:
//  {
//      assets: {
//          1: { id: 1, commits: [{ id: 7 }], ... },
//          2: { id: 2, ... },
//      },
//      commits: {
//          7: { id: 7, asset: { id: 1 } }
//      }
//  }
export default (modelName, config={}) => data => {
    const { models=[], oneToOne={}, keyToModel={}, manyToMany={} } = config;

    let result = {};

    const flattenModel = (modelName, model) => {
        if (!models.includes(modelName)) {
            console.warn('model name doesnt exist: ', modelName);
            return;
        }

        // if first model of type modelName, then create the modelName hash
        if (!result[modelName])
            result[modelName] = {};

        // if it's the first model with this ide, then create the model object
        if (!result[modelName][model.id])
            result[modelName][model.id] = {};

        Object.keys(model).forEach((key) => {
            // if member is an object, then we need to extract it into our flattened data
            if (expandable(modelName, model, key, oneToOne)) {

                const mappedKey = getPropertyTree(keyToModel, key, modelName, key);
                // if member is an array, then extract all the models into flattened data
                if (Array.isArray(model[key])) {
                    flattenArrayOfModels(mappedKey, model[key]);

                    const m2mKey = getPropertyTree(manyToMany, false, modelName, mappedKey);
                    if (!m2mKey) {
                        result[modelName][model.id][key] = model[key].map(({ id }) => ({ id }));
                    } else {
                        if (!result[m2mKey]) result[m2mKey] = {};
                        if (!result[m2mKey][modelName]) result[m2mKey][modelName] = {};
                        result[m2mKey][modelName][model.id] = {
                            id: model.id,
                            [key]: model[key].map(({ id }) => ({ id })),
                        };
                    }

                // Else it's a plain object, just recurse
                } else {
                    flattenModel(pluralize(mappedKey), model[key]);
                    result[modelName][model.id][key] = { id: model[key].id };
                }
            } else {
                result[modelName][model.id][key] = model[key];
            }
        });
    };

    const flattenArrayOfModels = (modelName, models) => {
        models.forEach(model => {
            flattenModel(modelName, model);
        });
    };

    // This is where we start the flattening process.
    if (Array.isArray(data)) {
        flattenArrayOfModels(modelName, data);
    } else {
        flattenModel(modelName, data);
    }

    // We return the result of flattening, which is computer through recursion.
    return result;
};
