'use strict';
// key: タスクの文字列 value: 完了しているかどうかの真偽値
const tasks = new Map();
const fs = require('fs');
const fileName = './tasks.json';

// 同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(data));
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした');
}


/** タスクをファイルに保存する */
function saveTasks() {
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}

/** TODOを追加する @param {string} task */

function todo(task) {
    tasks.set(task, false);
    saveTasks();
}

/** @param {array} taskAndIsDonePair
* @return {boolean} 完了したかどうか*/

function isDone(taskAndIsDonePair) {
    return taskAndIsDonePair[1];
}

/**
* @param {array} taskAndIsDonePair
* @return {boolean} 完了していないかどうか
*/

function isNotDone(taskAndIsDonePair) {
    return !isDone(taskAndIsDonePair);
}

/**
* TODOの一覧の配列を取得する
* @return {array}
*/

function list() {
    return Array.from(tasks)
        .filter(isNotDone)
        .map(t => t[0]);
}

/** TODOを完了状態にする
* @param {string} task 
*/

function done(task) {
    if (tasks.has(task)) {
	tasks.set(task, true);
        saveTasks();   
    }
}

/** 完了済みのタスクの一覧の配列を取得する
* @return {array}
*/

function donelist() {
    return Array.from(tasks)
	.filter(isDone)
	.map(t => t[0]);
}

/** 項目を削除する
* @param {string} task
*/

function del(task) {
    tasks.delete(task);
    saveTasks();
}
	

module.exports = {
    todo: todo,
    list: list,
    done: done,
    donelist: donelist,
    del: del
};
