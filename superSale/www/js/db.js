var db;
var result;
function abrirbd()
{	
	try{
		if(window.openDatabase)
		{
			var nomb = 'oferta';
			var version = '1.0';
			var mostrar = 'SuperSale';
			var max = '200000';
			db = openDatabase(nomb,version,mostrar,max);
			console.log("bd abierta");
		}
	}
	catch(e){
		alert(e);
	}
}
function ejecutasql($query,callback)
{
	try
	{
		if(window.openDatabase)
		{
			db.transaction(function(tx)
			{
				tx.executeSql($query,[],function(tx,result)
				{
					console.log(""+$query);
					if(typeof(callback) == "function")
					{
						callback(result);
					}
					else
					{
						if(callback != undefined)
						{
							eval(callback+"(result)");
						}
					}
				}
				,function(tx,error)
				{
					alert(error);
				});
				console.log(""+$query);
			});
			return result;
		}
	}catch(e)
	{
		alert(e);
	}
}
function creartabla()
{
	//var sql = 'drop table oferta';
	//ejecutasql(sql);
	var sql2 = 'CREATE TABLE oferta (nombre varchar(20),precio varchar(20),marca varchar(20),supermercado varchar(20),detalle varchar(20))';
	ejecutasql(sql2);
}

function insertar()
{
	var nombre = document.getElementById("nombre").value;
	var precio = document.getElementById("precio").value;
	var marca = document.getElementById("marca").value;
	var supermercado = document.getElementById("supermercado").value;
	var detalle = document.getElementById("detalle").value;
	var sql = 'insert into oferta(nombre,precio,marca,supermercado,detalle) values ("'+nombre+'", "'+precio+'", "'+marca+'","'+supermercado+'","'+detalle+'")'; 	
	console.log(sql);
	ejecutasql(sql);
}

function printoferta(tx, results) 
{
	var sql = 'select nombre, precio, marca, supermercado,detalle from usuario';
	var totalofertas = results.rows.length; 
	console.log("Total ofertas: " + totalofertas); 
	for (var i=0; i<total; i++)
	{
		console.log(" Nombre = " +results.rows.item(i).nombre + " Precio = " + results.rows.item(i).precio + " Marca = "+results.rows.item(i).marca + " Supermercado = "+results.rows.item(i).supermercado+" Detalle = "+results.rows.item(i).detalle);
	}
	function transaction_error(tx, error) 
	{
		alert("Database Error: " + error);
	}
}