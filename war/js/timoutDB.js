var timoutDB = {};
timoutDB.webdb = {};
timoutDB.webdb.db = null;


timoutDB.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024; // 5MB
	timoutDB.webdb.db = openDatabase("Timout", "0.1", "Timout - Time Management", dbSize);
}

timoutDB.webdb.createTables = function() {
	timoutDB.webdb.db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS PomodoroTask(id INTEGER PRIMARY KEY ASC, " +
			"desc TEXT, created DATETIME, status TEXT, updated DATETIME)", []);
	});
}

// delete table from db
function dropTable() {
	console.log("dropTable");
	timoutDB.webdb.db.transaction(function(tx) {
		tx.executeSql("DROP TABLE PomodoroTask", [],
			null,
			timoutDB.webdb.onError);
	});
}


//timoutDB.webdb.addPomodoroTask = function(pomodoroDesc, onSuccess, onError) {
timoutDB.webdb.addPomodoroTask = function(pomodoroDesc, callback) {
	timoutDB.webdb.db.transaction(function(tx) {
		var addedOn = new Date().getTime();
		tx.executeSql("INSERT INTO PomodoroTask(desc, created, status) VALUES (?,?,?)", [pomodoroDesc, addedOn, "RUNNING"],
			timoutDB.webdb.onSuccessAddPomodoroTask,
			timoutDB.webdb.onError);
	});
}

timoutDB.webdb.onSuccessAddPomodoroTask = function(tx, rs) {
	console.log("onSuccess: tx: " + tx);
	console.log("onSuccess: rs: " + rs);
	console.log("onSuccess: rs.insertId: " + rs.insertId);
	for (var i=0; i < rs.rows.length; i++) {
		console.log("onSuccessAddPomodoroTask: " + i + " : " + rs.rows.item(i));
	}
}

//timoutDB.webdb.updatePomodoroTask = function(taskID) {

//}

/*
html5rocks.webdb.getAllTodoItems = function(renderFunc) {
	var db = html5rocks.webdb.db;
	timoutDB.webdb.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM todo", [], renderFunc,
		html5rocks.webdb.onError);
		});
}
*/

timoutDB.webdb.onSuccess = function(tx, r) {
	console.log("onSuccess: tx: " + tx);
	console.log("onSuccess: r : " + r);
	// re-render the data.
	timoutDB.webdb.showAllPomodoroTasks(loadPomodoroTasks);
}

timoutDB.webdb.onError = function(tx, e) {
	alert("There has been an error: " + e.message);
	// show some error dialog
}


function initDB() {
	console.log("initDB");
	timoutDB.webdb.open();
//	dropTable();
	timoutDB.webdb.open();
	timoutDB.webdb.createTables();
	timoutDB.webdb.showAllPomodoroTasks(loadPomodoroTasks);
}

timoutDB.webdb.showAllPomodoroTasks = function(renderFunc) {
	timoutDB.webdb.db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM PomodoroTask", [], renderFunc, timoutDB.webdb.onError);
	});
}

//html5rocks.webdb.deleteTodo = function(id) {
//  var db = html5rocks.webdb.db;
//  db.transaction(function(tx){
//    tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
//        html5rocks.webdb.onSuccess,
//        html5rocks.webdb.onError);
//    });
//}

function loadPomodoroTasks(tx, rs) {
	var rowOutput = "";
	var todoItems = document.getElementById("lastTasksItems");
	for (var i=0; i < rs.rows.length; i++) {
		rowOutput += renderPomodoroTask(rs.rows.item(i));
	}

	todoItems.innerHTML = rowOutput;
}

function renderPomodoroTask(row) {
	return "<li>" + row.desc  + " [ " + row.created + " ]</li>";
}


