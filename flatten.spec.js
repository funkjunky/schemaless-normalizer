import chai from 'chai';
import { modelName, person, config, flattenedPersonNoConfig, flattenedPersonWithConfig } from './sampleData';

import flatten from './flatten';

var assert = chai.assert;

describe('flatten', () => {
    it('Should return an empty object if given an empty array', () => {
        const value = flatten(modelName)([]);
        assert.deepEqual(value, {});
    });

    it('Should return an empty object if given an empty object', () => {
        const value = flatten(modelName)({});
        assert.deepEqual(value, {});
    });

    it('Should flatten person correctly, without config needed.', () => {
        const value = flatten(modelName)(person);
        assert.deepEqual(value, flattenedPersonNoConfig);
    });

    it('Should flatten person correctly while using config.', () => {
        const value = flatten(modelName, config)(person);
        assert.deepEqual(value, flattenedPersonWithConfig);
    });
});
