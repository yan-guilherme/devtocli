'use strict';

// Native import
const inquirer = require('inquirer');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

/**
 * This is a function to show autocomplete prompt for tag search
 * @param {Object<string>} tags - Tags fetched from dev.to
 * @returns {Promise} The promise with the tag choosen
 */

const searchTags = (tags) => {
    return inquirer.prompt([{
        type: 'autocomplete',
        name: 'tag',
        message: '🕵🏻‍♂️  Search popular tags:',
        pageSize: 4,
        source: function (answers, input) {
            return new Promise((resolve) => {
                resolve(tags.filter(data => data.indexOf(input) > -1))
            });
        }
    }])
}


/**
 * This is a function to show prompt for all fetched Posts
 * @param {Object<string>} titles - titles of fetched Posts
 * @returns {Promise} The promise with the post choosen
 */

const showPosts = (titles) => {
    if(titles.length === 0){
        console.error("😱 No posts found. Please try again.");
        process.exit(1);
    }
    
    return inquirer.prompt([{
        type: 'list',
        name: 'title',
        message: '📚 Here are your posts:',
        choices: titles,
        paginated: true
    }])
}

/**
 * This is a function to show prompt for timeline suggestion in searching top posts
 * @param {null} null 
 * @returns {Promise} The promise with the timeline choosen
 */

const selectTimline = () => {
    return inquirer.prompt([{
        type: 'list',
        name: 'timeline',
        message: '📆 Please choose the timeline:',
        choices: ["week","month","year","infinity"],
        paginated: true
    }])
}

module.exports = {
    showPosts,
    searchTags,
    selectTimline
};