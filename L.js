



var L =  function(){

	this.state = 0,

	this.rotations = {
		0:[{y:0,x:5},{y:1,x:5},{y:2,x:5},{y:2,x:6}],
		1:[{y:2,x:4},{y:1,x:4},{y:1,x:5},{y:1,x:6}],
		2:[{y:0,x:5},{y:1,x:5},{y:2,x:5},{y:0,x:4}],
		3:[{y:0,x:6},{y:1,x:4},{y:1,x:5},{y:1,x:6}]
	},
	this.moveLeft = function(map){
		this.checkLeft = function(){
			for(var i = 0; i < this.rotations[this.state].length; i++){
				if(!map[this.rotations[this.state][i]['y']] ||map[this.rotations[this.state][i]['y']][this.rotations[this.state][i].x-1] == undefined||
				map[this.rotations[this.state][i]['y']][this.rotations[this.state][i].x-1] != 0 ){
					return false
				}
			}
			return true
		}
		results = this.checkLeft(this)
		if(results){
			for(each in this.rotations){
				for(var i = 0; i < this.rotations[each].length; i++){
					this.rotations[each][i]['x']--
				}
			}
		}
	}

	this.moveRight = function(map){
		this.checkRight = function(){
			for(var i = 0; i < this.rotations[this.state].length; i++){
				if(!map[this.rotations[this.state][i]['y']] ||map[this.rotations[this.state][i]['y']][this.rotations[this.state][i].x+1] == undefined||
				map[this.rotations[this.state][i]['y']][this.rotations[this.state][i].x+1] != 0 ){
					return false
				}
			}
			return true
		}
		results = this.checkRight(this)
		if(results){
			for(each in this.rotations){
				for(var i = 0; i < this.rotations[each].length; i++){
					this.rotations[each][i]['x']++
				}
			}
		}
	}

	this.rotate = function(map){
		if(this.state ==3){
			var results = this.isclear(0, map)
		}else{
			var results = this.isclear(this.state+1, map)
		}
		if(!results){
			if(this.state == 3){
				this.state = 0
			}else{
				this.state +=1
			}	
		}
		return results
	},
	this.isclear = function(num, map){
		for(var i = 0; i< this.rotations[num].length; i++){
			if(!map[this.rotations[num][i]['y']]|| map[this.rotations[num][i]['y']][this.rotations[num][i]['x']]== undefined || map[this.rotations[num][i]['y']][this.rotations[num][i]['x']] != 0){
				return true
			}
		}
		return false
	},
	this.checkpiece = function(y,x){
		for(var i = 0; i< this.rotations[this.state].length; i++){
			if(this.rotations[this.state][i]['y'] == y && this.rotations[this.state][i]['x'] == x){
				return true
			}
		}

		return false
	},

	this.moveDown = function(map){
		this.checkDown = function(){
			for(var i = 0; i < this.rotations[this.state].length; i++){
				if(!map[this.rotations[this.state][i].y +1] ||map[this.rotations[this.state][i].y+1][this.rotations[this.state][i].x] == undefined||
				map[this.rotations[this.state][i].y+1][this.rotations[this.state][i].x] != 0 ){
					return false
				}
			}
			return true
		}
		results = this.checkDown()
		if(results){
			for(each in this.rotations){
				for(var i = 0; i < this.rotations[each].length; i++){
					this.rotations[each][i]['y']++
				}
			}
		}
		return results
	}
}