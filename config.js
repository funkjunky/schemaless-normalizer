// A list of all possible odels the flattener excepts.
// Any key with these names well be assumed to be the same model.
export const models = [
    'accounts',
    'activities',
    'assets',
    'comments',
    'commits',
    'messages',
    'notifications',
    'permissions',
    'projects',
    'promotedTagCategories',
    'promotedTags',
    'releases',
    'roles',
    'tagCategories',
    'tags',
    'types',
    'tasks',
    'users',
    'workspaces',
    'goals',
];

// if there is a key that maps to a model with a different name,
// then it should be put here. ie. activeProject: projects
// Note: this well have more things, once we have relevant use case, ie. once Project is flattened.
export const keyToModel = {
    accounts: {
        activeProject: 'project',
    },
    assets: {
        assigned: 'account',
        latestActivities: 'activities',
        latestComment: 'comment',
        latestCommit: 'commit',
        latestRelease: 'release',
    },
    workspaces: {
        dependencies: 'commits',
        latestActivities: 'activities',
        workCommit: 'commit',
    },
    releases: {
        reviewer: 'account',
    },
    comments: {
        parent: 'comment',
    },
    tasks: {
        creator: 'account',
        assignee: 'account',
    },
};

// This is for objects that don't have models.
// It's also an escape hatch, if you don't want to flatten certain data yet.
export const oneToOne = {
    roles: ['permissions'],
    promotedTagCategories: ['fields'],
    promotedTags: ['fields'],
    tags: ['category'],
    types: [],
    activities: ['vars'],
    tasks: ['taskDependencies', 'project'],
    projects: ['restriction'],
};


// Model: { key: key's modelname }
export const manyToMany = {
    assets: { tags: 'assetsXtags' },
    tags: { assets: 'assetsXtags' },
};
