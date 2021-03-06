const passport = require('../passport/index');
const User = require('../database/models/user')

module.exports = function (app) {
//Route to restrive all information on a username
    app.get('/stats/:id', (req,res)=>{
	let username= req.params.id
	// console.log(username)
	// console.log("This is the username we are searching",username)
	User.findOne({ username:username}, (err,data)=> {
		if (err) {
			console.log("Some kind of err",err)
		}
		else {
			res.json(data)
			console.log(data)
		}
	})
})

//Route to get pet info into database
app.post("/pets/:id",(req,res)=>{
    passport.authenticate('local')
	let username = req.params.id
    // console.log("posting pet info", req.body)
    const { petname, petType, petColor, petAccess } = req.body
    User.findOneAndUpdate({ username:username}, 
        {$set:{
                petname:petname,
                petType:petType,
                petColor:petColor,
                petAccess:petAccess
        }},        
        (err,data)=> {
		if (err) {
			console.log("Some kind of err",err)
		}
	})
})

//Route to signal a win in the Tower
app.put('/tower/win/:id', (req,res)=>{
	let username = req.params.id
	// console.log("hitting win route for:" + username)
	User.updateOne({username:username}, { $inc: {"ratio.win" : 1}},(err,response) => {
		if (err) {
			(err);
		} else {
			(response)
		}
	})
	console.log("Win call complete")
})
//Route to signal a lose in the Tower
app.put('/tower/lose/:id', (req,res)=>{
	let username= req.params.id
	// console.log("hitting lose route for:" + username)
	User.update({username:username}, { $inc: {"ratio.lose" : 1}},(err,response) => {
		if (err) {
			(err);
		} else {
			(response)
		}
	})
})
//Route to level up strength
app.post('/levelUp/:id/strength', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	// console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.strength" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
	})
//Route to level up magic
app.post('/levelUp/:id/magic', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	// console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.magic" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
    })

//Route to level up hp
app.post('/levelUp/:id/hp', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	// console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.hp" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
    })
//Route to level up agility
app.post('/levelUp/:id/agility', (req, res)=>{
	let user = req.params.id 
	let stat= req.params.stat
	// console.log(stat)
	User.findOneAndUpdate({username:user}, { $inc: { "stat.agility" : 10 } }, {new:true}, function(err,response){
		if (err) {
			(err);
		} else {
			(response)
		}
	})
	})
	
    //Route to find leader
app.get('/leaderboard', (req, res)=>{
	User.findOne().sort({'ratio.win':-1}).then(function(data){
		// console.log(data)
		res.json(data)
		})
	})
}