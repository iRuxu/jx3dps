/* jx3dps.com
Version: 0.1
Author: iRuxu
Github: https://github.com/iRuxu/jx3dps
Lincense: GPL v2
Creat: 2014.11.8
*/

$(function(){
	//定义全局变量 - 2014.11.15修改
		var NG = 'bx' || 'hj' || 'dj' || 'fy' || 'yj' || 'qc',
			WG = 'ax' || 'jc' || 'jy' || 'cj' || 'gb' || 'fs',
			MIX = 'tl',
			DPS = 'bx' || 'hj' || 'dj' || 'fy' || 'yj' || 'qc'|| 'ax' || 'jc' || 'jy' || 'cj' || 'gb' || 'fs'|| 'tl',
			ZL = 'nx' || 'nh' || 'nd',
			MT = 'tct' || 'xs' || 'mz' || 'ty';
			/*QX = 'bx' || 'nx',
			NX = 'nx',
			BX = 'bx',
			WH = 'hj' || 'nh',
			HJ = 'hj',
			NH = 'nh',
			WD = 'dj' || 'nd',
			DJ = 'dj',
			ND = 'nd',
			TC = 'ax' || 'tct',
			AX = 'ax',
			TCT = 'tct',
			MJ = 'fy' || 'mz',
			FY = 'fy',
			MZ = 'mz',
			HS = 'yj' || 'xs',
			YJ = 'yj',
			XS = 'xs',
			CY = 'qc' || 'jc',
			QC = 'qc',
			JC = 'jc',
			TM = 'tl' || 'jy',
			TL = 'tl',
			JY = 'jy',
			CJ = 'cj',
			GB = 'gb',
			CX = 'fs' || 'ty',
			FS = 'fs',
			TY = 'ty';*/
		var rolelist = {
			bx : '冰心',
			hj : '花间',
			dj : '毒经',
			ax : '傲血',
			fy : '焚影',
			yj : '易经',
			qc : '气纯',
			jc : '剑纯',
			tl : '天罗',
			jy : '惊羽',
			cj : '藏剑',
			gb : '丐帮',
			fs : '分山',
			nx : '奶秀',
			nh : '奶花',
			nd : '奶毒',
			tct : '铁牢',
			mz : '明尊',
			xs : '洗髓'
		};
		var rolecat = {
			ng : '内功',
			wg : '外功',
			zl : '治疗',
			mt : '坦克',
			mix : '混合'
		};

	//过滤事件驱动 - 2014.11.15
		
		$("#role").on('change',function(){
				//更新职业
				window.ROLE =  $(this).val();
				console.log('+ 当前职业为：'+ROLE);

				//更新职业类别
				switch(ROLE){
					case 'bx':
					case 'dj':
					case 'hj':
					case 'fy':
					case 'yj':
					case 'qc':
						window.CAT = 'ng';
						break;
					case 'ax':
					case 'jc':
					case 'jy':
					case 'cj':
					case 'gb':
					case 'fs':
						window.CAT = 'wg';
						break;
					case 'tl':
						window.CAT = 'mix';
						break;
					case 'nx':
					case 'nh':
					case 'nd':
						window.CAT = 'zl';
						break;
					case 'tct':
					case 'xs':
					case 'mz':
					case 'ty':
						window.CAT = 'mt';
						break;
				};
				console.log('+ 当前职业类别为：'+CAT);

				//执行过滤规则
				Filter();

				//数据表头变更
				ADD_DATE_NAME();
		})

	//小药区信息 to be ..

	//第三方UI初始化 2014.11.8
		$("#box").tooltip();
		$("#option").dialog({modal:true,closeText:'关闭',width:400,height:200,autoOpen:false,});
		$("#main select").selectmenu();
		$("#role").select2();
		$("input[type='button']").button();
		$(".dps-raid").buttonset();
		$("#raidZY").buttonset();
		$("#raidXQ").buttonset();
		$("#raidL").buttonset();
		$("#raidALL").button('destroy');
		console.log('> 初始化界面,如果不习惯可以点击设置取消皮肤');
		
	//表单项目帮助信息 2014.11.9
		$(".help").hover(
			function(){
				$(this).children('span').show();
			},
			function(){
				$(this).children('span').hide();
			}
		)
		$(".coverage").hover(
			function(){
				var cover = $(this).html();
				$(this).attr('title',function(){
					return '以' + cover + '覆盖率计算';
				});
			}
		)
		console.log('> 帮助信息载入完成');

	//界面小功能 2014.11.14
		//设置面板
			$("#open-option").click(function(event) {
				$("#option").dialog('open');
			});
			$("#skin").change(function(event) {
				var skin_state = $("#skin").prop('checked');
				if(skin_state){
					$("#main select").selectmenu();
					$("#main select").selectmenu('refresh');
					$(".dps-raid input").not('#raidALL,#raidZF').buttonset();
					$("#raidZY").buttonset();
					$("#raidXQ").buttonset();
					$("#raidL").buttonset();
				}else{
					$("#main select").selectmenu('destroy');
					$(".dps-raid input").not('#raidALL,#raidZF').button('destroy');
				}
			});
		
		//全选功能
			$("#raidALL").change(function(){
				var checkall = $(this).prop('checked');
				if (checkall) {
					$(".dps-raid :checkbox").prop('checked',true);
					console.log('> 全选常用成功');
					$(".dps-raid :checkbox").attr('aria-pressed','true').button('refresh');
				}else{
					$(".dps-raid :checkbox").prop('checked',false);
					console.log('> 取消全选成功');
					$(".dps-raid :checkbox").attr('aria-pressed','false').button('refresh');
				}
			})

	//属性区表单验证 2014.11.9
		//会心会效命中区间正则
	    $.validator.addMethod('hx', function (value, element) {
	        var tel = /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/;
	        return this.optional(element) || (tel.test(value));
	    }, '请填写正确的区间数值');

		//属性验证规则
		$("#dpsForm").validate({
			ignoreTitle : true, 
			errorClass : 'errorDate',
			rules:{
	            baseY : {
	                maxlength : 4,
	                digits:true,
	        	},
	    	    baseG : {
	    	        maxlength : 4,
	    	        digits:true,
	    		},
			    baseS : {
			        maxlength : 4,
			        digits:true,
				},
			    baseL : {
			        maxlength : 4,
			        digits:true,
				},
			    baseAP1 : {
			        maxlength : 5,
			        digits:true,
				},
			    baseAP2 : {
			        maxlength : 5,
			        digits:true,
				},
			    baseAP3 : {
			        maxlength : 5,
			        digits:true,
				},
			    baseHT1 : {
			        maxlength : 6,
			        hx:true,
			        max:200,
				},
			    baseHT2 : {
			        maxlength : 6,
			        hx:true,
			        max:200,
				},
			    baseCT1 : {
			        maxlength : 5,
			        hx:true,
			        max:100,
				},
			    baseCT2 : {
			        maxlength : 5,
			        hx:true,
			        max:100,
				},
			    baseCF1 : {
			        maxlength : 6,
			        hx:true,
			        max:300,
				},
			    baseCF2 : {
			        maxlength : 6,
			        hx:true,
			        max:300,
				},
			    basePF1 : {
			        maxlength : 4,
			        digits:true,
				},
			    basePF2 : {
			        maxlength : 4,
			        digits:true,
				},
			    baseSP : {
			        maxlength : 4,
			        digits:true,
			        max:1350,
				},
			    baseWS : {
			        maxlength : 5,
			        hx:true,
			        max:100,
				},
	        },
	        messages : {
	        	baseSP : {
	        		max:'加速已超出阈值',
	        	},
	        	baseWS : {
	        		max:'无双已超出阈值,此处为百分比',
	        	}
	        }
		})

	//局部过滤方法定义
		//第三方UI职业过滤  - 2014.11.13
		function roleshow(){
			$(".dps-role").on('selectmenuopen','.filter select',function(event,ui){
				var theid = $(this)[0].id;
				var uiid = '#' + theid + '-menu';
				var uilist = $(uiid).children('li').hide();
				var thisrole = 'li:contains("' + rolelist[ROLE] + '")';
				var mylist = $(uiid).children(thisrole).show().nextUntil('.ui-selectmenu-optgroup').show();
			})
		}
		//第三方UI小药过滤  - 2014.11.15 改写函数，精简和通用判定
		function spshow(){
			$(".dps-add").on('selectmenuopen','.filter select',function(event,ui){
				var theid = $(this)[0].id;
				var uiid = '#' + theid + '-menu';
				var uilist = $(uiid).children('li').hide();
				var thiscat = 'li:contains("' + rolecat[CAT] + '")';
				var splist = $(uiid).children(thiscat).show().nextUntil('.ui-selectmenu-optgroup').show();
			})
		}
		//原始UI职业过滤 - 2014.11.14
		function o_roleshow(){
			$(".dps-role .filter optgroup").hide();
			$(".dps-role .filter option").hide();
			var o_role = '.dps-role .filter .' + ROLE + ' option';
			$(o_role).show();
		}
		//原始UI小药过滤 - 2014.11.14
		function o_spshow(){
			$(".dps-add .filter optgroup").hide();
			$(".dps-add .filter option").hide();
			var o_sp = '.dps-add .filter .' + CAT + ' option';
			$(o_sp).show();
		}

	//全局过滤方法 2014.11.15
		function Filter(){
			//全部恢复
			$("#main li").hide();
			$(".ty").show();
			//1次过滤：插入自属大类显示
			var catclass = '.'+CAT;
			$(catclass).show();
			//2次过滤：插入自属子类显示
			var roleclass = '.'+ROLE;
			$(roleclass).show();
			//3次过滤：执行职业子列表过滤
			roleshow();
			o_roleshow();
			//4次过滤：执行小药子列表过滤
			spshow();
			o_spshow();
			//5次过滤：特殊职业天罗单独过滤
			if(ROLE=='tl'){
				$(".dps-add .filter optgroup").hide();
				$(".dps-add .filter option").hide();
				$(".tl").show();
				$(".dps-add").on('selectmenuopen','.filter select',function(event,ui){
					$("#addSP1-menu li:eq(2)").show();
					$("#addSP2-menu li:eq(3),#addSP2-menu li:eq(5)").show();
					$("#addYP1-menu li:eq(3),#addYP1-menu li:eq(4),#addYP1-menu li:eq(7)").show();
					$("#addYP2-menu li:eq(6),#addYP2-menu li:eq(7),#addYP2-menu li:eq(8)").show();
					$("#addMS-menu li:eq(2)").show();
					$("#addTX1-menu li,#addTX2-menu li,#addTX3-menu li").show();
				});
			}
			//6次过滤：治疗单独过滤规则
			if(CAT=='zl'){
				$(".nozl").hide();
				$(".dps-add").on('selectmenuopen','.filter select',function(event,ui){
					$("#addSP1-menu li:contains('内功')").show().nextUntil('.ui-selectmenu-optgroup').show();
					$("#addSP2-menu li:contains('内功')").show().nextUntil('.ui-selectmenu-optgroup').show();
					$("#addYP1-menu li:contains('内功')").show().nextUntil('.ui-selectmenu-optgroup').show();
					$("#addYP2-menu li:contains('内功')").show().nextUntil('.ui-selectmenu-optgroup').show();
				})
			}
			//7次过滤：特殊职业奶花单独补充过滤规则
			if(ROLE=='nh'){
				$(".yuanqi").show();
			}
			//提示
			console.log('> 职业关联项过滤完成');
		}

	//数据表头 2014.11.14
		date_tDPS = ['91木桩','92木桩','93木桩','94木桩','DMG/XZ','DXC/QHL','特殊情况','浮动区间'];
		date_tNX = ['翔舞','翔鸾舞柳','上元点鬟','王母挥袂','风袖低昂','回雪飘摇','玲珑箜篌','浮动区间'];
		date_tNH = ['握针','彼针','述怀','清疏','局针','提针','长针','长针溅射'];
		date_tND = ['醉舞九天','小冰蚕','大冰蚕','小圣手','大圣手','小蝴蝶','大蝴蝶','浮动区间'];
		function ADD_DATE_NAME(){
			$("#date th").html(function(i,value){
					switch(ROLE){
						case 'nx':
							return date_tNX[i];
							break;
						case 'nh':
							return date_tNH[i];
							break;
						case 'nd':
							return date_tND[i];
							break;
						default:
							return date_tDPS[i];
							break;
					}
			});
			console.log('> 数据输出模式切换成功');
		}
	
	//数据对象构造函数创建 - 2014.11.15
		function JX3DPS(){
		//职业
			this.role = window.ROLE;
			this.cat = window.CAT;
		//属性
			this.baseY = Number($("#baseY").val());
			this.baseG = Number($("#baseG").val());
			this.baseS = Number($("#baseS").val());
			this.baseL = Number($("#baseL").val());
			this.baseAP1 = Number($("#baseAP1").val());
			this.baseAP2 =  Number($("#baseAP2").val());
			this.baseAP3 = Number($("#baseAP3").val());
			this.baseHT1 = (function(){
				var HT_NEED = [100,105,110,120];
				var miss = [];
				var hit = parseFloat($("#baseHT1").val());
				var hit = isNaN(hit) ? 90 : hit;
				for (var i=0;i<HT_NEED.length;i++) {
					miss[i] = (HT_NEED[i] - hit)<=0 ? 0 : (HT_NEED[i] - hit);
				};
				return miss;
			})();
			this.baseHT2 = (function(){
				var HT_NEED = [100,105,110,120];
				var miss = [];
				var hit = parseFloat($("#baseHT2").val());
				var hit = isNaN(hit) ? 90 : hit;
				for (var i=0;i<HT_NEED.length;i++) {
					miss[i] = (HT_NEED[i] - hit)<=0 ? 0 : (HT_NEED[i] - hit);
				};
				return miss;
			})();
			this.baseCT1 =  (function(){
				var baseProp = parseFloat($("#baseCT1").val());
				var baseProp = isNaN(baseProp) ? 0 : baseProp;
				var baseProp = (baseProp>100) ? 100 : baseProp;
				return baseProp;
			})();
			this.baseCT2 = (function(){
				var baseProp = parseFloat($("#baseCT2").val());
				var baseProp = isNaN(baseProp) ? 0 : baseProp;
				var baseProp = (baseProp>100) ? 100 : baseProp;
				return baseProp;
			})();
			this.baseCF1 = (function(){
				var baseProp = parseFloat($("#baseCF1").val());
				var baseProp = isNaN(baseProp) ? 0 : baseProp;
				var baseProp = (baseProp<=175) ? 175 : baseProp;
				var baseProp = (baseProp>300) ? 300 : baseProp;
				return baseProp;
			})();
			this.baseCF2 = (function(){
				var baseProp = parseFloat($("#baseCF2").val());
				var baseProp = isNaN(baseProp) ? 0 : baseProp;
				var baseProp = (baseProp<=175) ? 175 : baseProp;
				var baseProp = (baseProp>300) ? 300 : baseProp;
				return baseProp;
			})();
			this.basePF1 = Number($("#basePF1").val());
			this.basePF2 = Number($("#basePF2").val());
			this.baseSP = Number($("#baseSP").val());
			this.baseWS = (function(){
				var baseProp = parseFloat($("#baseWS").val());
				var baseProp = isNaN(baseProp) ? 0 : baseProp
				return baseProp;
			})();
		//小药
			this.addFeast= Number($("#addFeast").val());
			this.addFish= Number($("#addFish").val());
			this.addSP1= Number($("#addSP1").val());
			this.addSP2= Number($("#addSP2").val());
			this.addYP1= Number($("#addYP1").val());
			this.addYP2= Number($("#addYP2").val());
			this.addMS= Number($("#addMS").val());
			this.addJZ= Number($("#addJZ").val());
			this.addSP= Number($("#addSP").val());
			this.addTX1= Number($("#addTX1").val());
			this.addTX2= Number($("#addTX2").val());
			this.addTX3 = Number($("#addTX3").val());
		//团队
			this.raidZF = Number($("#raidZF").val());
			this.raidZY = Number($("#raidZY input[name='raidZY']:checked").val());
			this.raidXQ = Number($("#raidXQ input[name='raidXQ']:checked").val());
			this.raidL = Number($("#raidL input[name='raidL']:checked").val());
			this.raidQC = (function(){
				var qc_a = $("#raidQC1").prop('checked');
				var qc_b = $("#raidQC2").prop('checked');
				if (qc_a && !qc_b) {
					return 1;
				}else if (qc_b && !qc_a) {
					return 2;
				}else if (qc_a && qc_b) {
					return 3;
				}else if (!qc_a && !qc_b) {
					return 0;
				}
			})();
			this.raidDQ = $("#raidDQ").prop('checked') ? 1 : 0;
			this.raidJH = $("#raidJH").prop('checked') ? 1 : 0;
			this.raidKC = $("#raidKC").prop('checked') ? 1 : 0;
			this.raidCSY= $("#raidCSY").prop('checked') ? 1 : 0;
			this.raidFY = $("#raidFY").prop('checked') ? 1 : 0;
			this.raidJG = $("#raidJG").prop('checked') ? 1 : 0;
			this.raidTC = $("#raidTC").prop('checked') ? 1 : 0;
			this.raidMY = $("#raidMY").prop('checked') ? 1 : 0;
			this.raidCJ = $("#raidCJ").prop('checked') ? 1 : 0;
			this.raidGB = $("#raidGB").prop('checked') ? 1 : 0;
			this.raidCW = $("#raidCW").prop('checked') ? 1 : 0;
			this.raidMW = $("#raidMW").prop('checked') ? 1 : 0;
		//职业
			this.roleTZ = Number($("#roleTZ").val());
			this.roleMJ = Number($("#roleMJ").val());
			this.roleQX = Number($("#roleQX").val());
			this.roleFM = Number($("#roleFM").val());
			this.dpsMethod = Number($("#dpsMethod").val());
		}

	//计算事件绑定 - to be continue
	$("#go").on('click',function(){
		
		var test = new JX3DPS();
		console.log('+ 构造函数实例化');
		console.log(test);
	})
	
	/*JX3DPS.*/






	//生成数据
	/*$("#go").click(function(){
		$("result").show();
		//验证数据有效性


		//数据块变更提示
		$("#date").addClass('update');
		setTimeout(function(){
			$("#date").removeClass('update');
		},2000)
			
	})*/

	//数据处理
	/*$("#save").click(function(){
		//如果成功
			$("p.success").slideDown(200);
			setTimeout(function(){
				$("p.success").fadeOut();
			},800)
		//如果失败
			$("p.error").slideDown(200);
			setTimeout(function(){
				$("p.error").fadeOut();
			},2000)
	})*/


	//监听事件
	/*$("#dpsForm").change(function(){
		//数据更新
		var dpsMethod = $("#dpsMethod").val();
		//根据算法方案click触发对应的内置方法
		$("#go").click(function(){
			//获取对应的结果
			var result = 
			switch(dpsMethod){
				case 0 :
					return Jx3dps.bx1();
				break;
			}
			//将结果加入表格
			$("#result").html(result);
			//将结果存储到本地storage

		})	
	})*/

})