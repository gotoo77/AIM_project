var mysql = require('mysql');

var util = require('util');
var aim_utl = require('./AIM_util');

var mySQLConf = {host:"localhost", user:"root", password:"", port:3306,database:"AIMdb_TEST"}

// Connexion to the SQL database
var dbClient = mysql.createConnection( mySQLConf );

var MSG_DBCONNECT = 'Connecting to mysql db "' + mySQLConf.database + '"';
var MSG_DBQUERY = 'Executing query on "' + mySQLConf.database + '"';;

var count=0; 

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine id: ' + id);
    /*var query = req.query;
	console.log("req.query="+util.inspect(query, false, null));
    var params = req.params
	console.log("req.params="+util.inspect(params, false, null));	*/
	/*
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
	*/
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + ".wines WHERE id=" + id;
	debugger;
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery +':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery);
			console.log(util.inspect(rows, false, null));
			res.send(rows);
		}
	});
};

exports.findAll = function(req, res) {
    /*db.collection('wines', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });*/
	//res.type('text');
	//res.type('json');
	//res.type('.html');
	//res.jsonp(500, { error: 'message' })

	console.log('Retrieving all items...');
	console.log("req.query="+util.inspect(req.query, false, null));
 	console.log("req.params="+util.inspect( req.params, false, null));
	console.log("req.route="+util.inspect(req.route, false, null));	
	//console.log("req.is('html')="+util.inspect(req.is('html'), false, null));	
	//console.log("req.is('application/json')="+util.inspect(req.is('application/json'), false, null));
	//console.log("req.is('text/*')="+util.inspect(req.is('text/*'), false, null));
	
	var critere = req.query.order_by;
	var orderBy=["id","name","year","grapes","country","region","description","picture"];

	aim_utl.trace_info("critere="+critere);
	if (critere == null || critere <0 || critere >= orderBy.length)	{
		critere=3; // set default order by criteria
	}
	
	var mySQLQuery = "SELECT * FROM " + mySQLConf.database + ".wines ORDER BY "+orderBy[critere];
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery +':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery);
			console.log(util.inspect(rows, false, null));
			//res.setHeader("Content-Type", "html");
			   // res.setHeader('Content-Type', 'application/json');
				//res.end(JSON.stringify(rows));
			res.send(rows);
		}
	});

};

exports.addWine = function(req, res) {
    var wine = req.body;

	var RandYear = aim_utl.randomIntFromInterval(1990, 2010);
    console.log('Adding wine: ' + JSON.stringify(wine));
	/*
    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });*/
	// PHP :
	//$sql = "INSERT INTO wine (name, grapes, country, region, year, description) VALUES (:name, :grapes, :country, :region, :year, :description)";
	
	count++;
	var mySQLQuery = "INSERT INTO " + mySQLConf.database + ".wines (name, grapes, country, region, year, description, picture) VALUES ('new_item_"+count+"','add_grapes', 'add_country', 'add_region', '"+RandYear+"', 'add_description', 'generic.jpg')";
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(rows, false, null));
			res.send(rows);
		}
	});

}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    delete wine._id;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
	/*
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
	*/
	// PHP :
	//$sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description WHERE id=:id";
	var mySQLQuery = "UPDATE " + mySQLConf.database + ".wines SET name='up_name', grapes='up_grapes', country='up_country', region='up_region', year='up_year', description='up_description', picture='up_picture.jpg' WHERE id="+ id;
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(rows, false, null));
			//res.send(rows);
			res.send(wine);
		}
	});
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
	/*
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
	*/
	// PHP :
	//$sql = "DELETE FROM wine WHERE id=:id";
	var mySQLQuery = "DELETE  FROM " + mySQLConf.database + ".wines WHERE id="+ id;
	dbClient.query(mySQLQuery, function(err, rows){
		if (err != null) {
			aim_utl.trace_err(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery + ':'+err.code);
		} else {
			aim_utl.trace_ok(MSG_DBQUERY + ' \r\nInput query='+mySQLQuery );
			console.log(util.inspect(rows, false, null));
			//res.send(rows);
			res.send(req.body);
		}
	});	
}
