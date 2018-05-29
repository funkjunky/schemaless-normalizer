import _expandModel from './expand_model';
import _removeModel from './remove_model';
import _flatten from './flatten';

import * as config from './config';

export const removeModel = (...args) => _removeModel(...args, config);
export const expandModel = (modelName, model, state, deepness=2) =>
    _expandModel(modelName, model, state, deepness, config);
export const flatten = (...args) => _flatten(...args, config);
