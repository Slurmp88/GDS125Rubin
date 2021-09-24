playerData ={
	info:{
		src:`images/Wizard.png`
	},
	states:{
		idle:
		{
		fps:15,
		cycle:true,
		frames:[
				{width:64, height:108, startX:20, startY:8},
				{width:64, height:108, startX:148, startY:8},
				{width:64, height:108, startX:276, startY:8},
				{width:64, height:108, startX:404, startY:8},
				{width:64, height:108, startX:532, startY:8},
				{width:64, height:108, startX:660, startY:8},
				{width:64, height:108, startX:788, startY:8}
			]
		},

		walk:
		{
		fps:2,
		cycle:true,
		frames:[
				{width:64, height:108, startX:20,  startY:136},
				{width:64, height:108, startX:148, startY:136},
				{width:64, height:108, startX:276, startY:136},
				{width:64, height:108, startX:404, startY:136},
				{width:64, height:108, startX:532, startY:136},
				{width:64, height:108, startX:660, startY:136},
				{width:64, height:108, startX:788, startY:136}
			]
		},

		jump:
		{
		fps:1,
		cycle:true,
		frames:[
				{width:64, height:108, startX:400,  startY:400}
			]
		},

		crouch:
		{
		fps:1,
		cycle:true,
		frames:[
				{width:64, height:108, startX:274,  startY:390}
			]
		},

		default:
		{
		fps:1,
		cycle:true,
		frames:[
				{width:64, height:108, startX:20, startY:8}
			]
		},

		attack:
		{
			fps:6,
			cycle:false, 
			width:120,
			frames:[
			
			{width:120, height:108, startX:148, startY:260},
			{width:120, height:108, startX:276, startY:260},
			{width:120, height:108, startX:404, startY:260},
			{width:120, height:108, startX:532, startY:260}
			]
		}
	}
		
}