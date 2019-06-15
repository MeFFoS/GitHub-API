var express = require("express");

const axios = require('axios');
const app = express();

var cors = require('cors');
app.use(cors());

app.get("/api/:owner/:repos", function(req, res){
      
	(async() => {
		  try {
			const owner = req.params.owner;
			const repos = req.params.repos;
			const response = await axios.get(`https://api.github.com/repos/${owner}/${repos}`);
			
			res.send(response.data);
		  } catch (error) {
			res.send(error);
		  }
	})();      

});

app.get("/api/:owner/:repos/:forks", function(req, res){
      
	(async() => {
		  try {
			const owner = req.params.owner;
			const repos = req.params.repos;
			const forks = req.params.forks;
			const page = req.query.page;
			const per_page = req.query.per_page
			
			const response = await axios.get(`https://api.github.com/repos/${owner}/${repos}/${forks}?page=${page}&per_page=${per_page}`);
			
			res.send(response.data);
		  } catch (error) {
			res.send(error);
		  }
	})();      

});



app.get("", function(req, res){
	res.send('zdarova');
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Сервер ожидает подключения...");
});