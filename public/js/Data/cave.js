var x=false;
var caveData ={
	info:{
		layout:[
			//[3,2,1,2,3,0,2,3,1,0,1,3,0,1,2,0,2,1,3,2,1,0,2,3,1,0,1,0,0,2,3,1,1,3,2],
			//[3,2,1,0,2,1,3,1,0,2,3,1,1,3,0,2,3,3,2,1,1,0,2,3,1,3,2,1,0,2,0,1,3,1,2],
			[3,3,2,1,0,2,3,1,0,1,3,2,1,0,1,3,2,1,0,1,3,2,1,0,3,2,1,0,0,1,2,3,2,1,0],
			[3,2,1,0,3,2,1,2,0,1,2,3,0,1,2,3,2,1,3,0,2,3,1,2,3,0,1,2,3,1,0,2,2,3,1],
			[2,1,2,3,0,2,0,11,12,14,11,11,15,14,11,11,11,14,15,15,11,11,11,11,14,15,14,11,11,11,15,15,11,14,2],
			[0,3,7,16,8,16,x,x,13,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,2],
			[2,2,4,16,5,16,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,2],
			[1,1,4,16,5,16,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,2],
			[3,0,4,16,5,16,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,2],
			[3,2,1,0,3,2,1,2,0,1,2,3,0,1,2,3,2,1,3,0,2,3,1,2,3,0,1,2,3,1,0,2,2,3,1]

			
		],
		src:`images/Cave Background.png`,
	},
	states:
	[		
			{
			fps:1,
			cycle:true,
			frames:[{width:100, height:100, startX:100, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:100, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:200, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:300, startY:0}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:0, startY:100}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:100, startY:100}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:200, startY:100}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:300, startY:100}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:0,   startY:200}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:100, startY:200}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:200, startY:200}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:300, startY:200}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:0,   startY:300}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:100, startY:300}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:200, startY:300}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:300, startY:300}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:0, startY:400}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:100, startY:400}]
			},
			{
				fps:1,
				cycle:false,
				frames:[{width:100, height:100, startX:200, startY:400}]
			}
		]
	}
	var caveBackData ={
		info:{
			layout:[
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16],
				[16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]
				
			],
			src:`images/Cave Background.png`,
		},
		states:
		[		
			    {
				fps:1,
				cycle:true,
				frames:[{width:100, height:100, startX:0, startY:0}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:100, startY:0}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:200, startY:0}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:300, startY:0}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:0, startY:100}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:100, startY:100}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:200, startY:100}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:300, startY:100}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:0,   startY:200}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:100, startY:200}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:200, startY:200}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:300, startY:200}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:0,   startY:300}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:100, startY:300}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:200, startY:300}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:300, startY:300}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:0, startY:400}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:100, startY:400}]
				},
				{
					fps:1,
					cycle:false,
					frames:[{width:100, height:100, startX:200, startY:400}]
				}
			]
		}
		var caveForegroundData ={
			info:{
				layout:[
					[x,x,x,x,1,3,2,x],
					[x,x,x,x,3,1,3,x],
					[x,x,x,x,0,2,7,x],
					[x,x,x,x,8,0,4,x],
					[x,x,x,x,5,2,4,x],
					[x,x,x,x,5,3,4,x],
					[x,x,x,x,5,1,4,x]
					
				],
				src:`images/Cave Background.png`,
			},
			states:
			[		
				{
					fps:1,
					cycle:true,
					frames:[{width:100, height:100, startX:100, startY:0}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:100, startY:0}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:200, startY:0}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:300, startY:0}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:0, startY:100}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:100, startY:100}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:200, startY:100}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:300, startY:100}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:0,   startY:200}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:100, startY:200}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:200, startY:200}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:300, startY:200}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:0,   startY:300}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:100, startY:300}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:200, startY:300}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:300, startY:300}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:0, startY:400}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:100, startY:400}]
					},
					{
						fps:1,
						cycle:false,
						frames:[{width:100, height:100, startX:200, startY:400}]
					}
				]
			}

		