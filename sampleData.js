export const modelName = 'persons';

export const person = {
    id: 1,
    firstName: 'Jason',
    company: {
        id: 1,
        name: 'Quaker Oats',
    },
    favourites: [
        {
            id: 2,
            name: 'Leafs',
        },
        {
            id: 3,
            name: 'Senators',
        },
    ],
};

export const flattenedPersonWithConfig = {
    persons: {
        1: {
            id: 1,
            firstName: 'Jason',
            company: {
                id: 1,
                name: 'Quaker Oats',
            },
            favourites: [
                { id: 2 },
                { id: 3 },
            ],
        },
    },
    personsXhockeyTeams: {
        persons: {
            1: {
                id: 1,
                favourites: [
                    { id: 2 },
                    { id: 3 },
                ],
            },
            2: {
                id: 2,
                favourites: [{ id: 1 }],
            },
            3: {
                id: 3,
                favourites: [{ id: 1 }],
            },
        },
    },
    hockeyTeams: {
        2: {
            id: 2,
            name: 'Leafs',
        },
        3: {
            id: 3,
            name: 'Senators',
        },
    },
};

export const flattenedPersonNoConfig = {
    persons: {
        1: {
            id: 1,
            firstName: 'Jason',
            company: {
                id: 1,
            },
            favourites: [
                { id: 2 },
                { id: 3 },
            ],
        },
    },
    companies: {
        1: {
            id: 1,
            name: 'Quaker Oats',
        },
    },
    favourites: {
        2: {
            id: 2,
            name: 'Leafs',
        },
        3: {
            id: 3,
            name: 'Senators',
        },
    },
};


export const m2mModelsModel = 'personsXhockeyTeams';
export const m2mModelsKey1 = 'persons';
export const m2mModelsKey2 = 'hockeyTeams';

export const manyToMany = {
    personsXhockeyTeams: ['persons', 'hockeyTeams'],
};

export const oneToOne = {
    persons: ['company'],
};

export const keyToModel = {
    persons: { favourites: 'hockeyTeams' },
};

export const config = {
    models: ['persons', 'hockeyTeams'],
    oneToOne,
    keyToModel,
    manyToMany,
};
