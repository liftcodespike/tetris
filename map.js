$(document).ready(function(){

	function GenShape (){
		var shapeArr = [t,square,I,z,s,L,j]
		var rand = Math.floor(Math.random()* ((shapeArr.length)))
		newShape = new shapeArr[rand]
		return newShape
	}
	var cur_piece = GenShape()
	var clear_map = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	]

	var map =  clear_map;

	$(document).on('keydown', function(e){
		if(e.keyCode== 65){
			var results = cur_piece.rotate(map)
			if(!results){
				Draw()
			}
		}else if(e.keyCode == 37){
			cur_piece.moveLeft(map)
			Draw()
		}else if(e.keyCode == 39){
			cur_piece.moveRight(map)
			Draw()
		}else if(e.keyCode == 40){
			cur_piece.moveDown(map)
			Draw()
		}
	})

	function Draw(){
		$('#map').html('');
		for(var y = 0; y < map.length; y++){	
			for(var x = 0; x< map[y].length; x++){
				var results = cur_piece.checkpiece(y,x)
				if(results){
					$('#map').append('<div class="one"></div>')	
				}else if(map[y][x] == 0){
					$('#map').append('<div class="zero"></div>')
				}else if(map[y][x] == 1){
					$('#map').append('<div class="one"></div>')
				}
			}
		}
	}
	Draw()

	function update(){
		results = cur_piece.moveDown(map)
		if(!results){
			settle()
		}
		Draw()

	}

	function settle(){
		for(var i = 0; i < cur_piece.rotations[cur_piece.state].length; i++){
			map[cur_piece.rotations[cur_piece.state][i]['y']][cur_piece.rotations[cur_piece.state][i]['x']] = 1
		}
		clearLines()
		cur_piece = GenShape()
	}

	function clearLines(){
		var status = false
		for(var y = map.length-1; y >= 0; y--){
			if(status){
				status = false;
				y++
			}
			var sum = 0	
			for(var x = 0; x< map[y].length; x++){
				if(map[y][x]> 0){
					sum += 1
				}
				if(sum >=10){
					empty(y)
					status = true
				}
			}
		}
	}

	function empty(y){
		for(var z = 0; z< map[y].length; z++){
			map[y][z] = 0
		}
		shiftLines(y)
	}

	function shiftLines(num){
		for(var y = num; y>0;y-- ){
			map[y] = map[y-1]
		}
		map[0] = [0,0,0,0,0,0,0,0,0,0]
	}
	setInterval(update,1000)
})