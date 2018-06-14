module.exports = function () {
 
    var opers = {
        ListDB: function(db, callback){
            db.admin().listDatabases(function (err, dbs) {
            if (err) console.log(err)
            else {
                for(var i=0;i<dbs.databases.length;i++){
                    console.log(i, dbs.databases[i].name)
                    if(dbs.databases[i].name == "admin"|| dbs.databases[i].name == "config"|| dbs.databases[i].name == "local"){
                        dbs.databases.splice(i,1);
                        i--;
                    }
                }
                console.log(dbs.databases) 
                callback(dbs.databases)                                
            }
         })
        },
        
        SelectAll: function (collection, callback) {
            collection.find({}).toArray(function (err, items) {
                console.log(items)
                if(err) console.log(err)
                else callback(items)
            });
        },

        Insert: function (collection, data, callback) {
                collection.insert(data, function (err, result) {
                    callback(result)                
                    console.log(result)
                });          
        },

        ListColl: function(db, callback){
            db.listCollections().toArray(function (err, colls) {
            if (err) console.log(err)
            else {
                callback(colls)                   
               console.log(colls) 
               // uwaga: podczas projektowania aplikacji proszę wykluczyć 
               // z listy systemowe bazy danych: admin, local, config                  
            }
         })
        },

        AddColl: function(db,coll, callback){
            db.createCollection(coll.toString(), function (err, colls) {
            if (err) console.log(err)
            else {
                callback(colls)                   
               console.log(colls) 
               // uwaga: podczas projektowania aplikacji proszę wykluczyć 
               // z listy systemowe bazy danych: admin, local, config                  
            }
         })
        },

        RemoveColl: function(db,coll){
            console.log(coll)
            db.collection(coll).drop(function (err, colls) {
                if (err) console.log(err)
                else {            
                   console.log(colls)     
                }   
            })
        },

        RemoveDb: function(db, dbName){
            console.log(dbName)
            db.db(dbName).dropDatabase(function (err, colls) {
            if (err) console.log(err)
            else {            
               console.log(colls)        
            }
         })
        },

        UseDb: function(db, dbName, callback){
            console.log("DZIALA")
            db.db(dbName, function(){
                /* if (err) console.log(err)
                else { */
                    console.log("DB switched to " + db)
                    callback(db)
                /* } */
            })
        }
    }

    return opers;

}