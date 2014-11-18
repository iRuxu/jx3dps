/* jx3dps.com
Version: 0.1
Author: iRuxu
Github: https://github.com/iRuxu/jx3dps
Lincense: GPL v2
Creat: 2014.11.8
Modifed : 2014.11.18
*/
var ROLE,CAT;
$(function(){
	//*界面------------------------------------------
	//第三方UI初始化 2014.11.8
		$("#box").tooltip();
		$("#option").dialog({modal:true,closeText:'关闭',width:400,height:200,autoOpen:false,});
		$("#main select").selectmenu();
		$("#role").select2();
		$("input[type='button']").button();
		$(".dps-raid").buttonset();
		$("#raidZY,#raidXQ,#raidL,#raidJH").buttonset();
		$("#raidALL").button('destroy');
		console.log('> 初始化界面,如果不习惯可以点击设置取消皮肤');
	
	//属性区表单验证 2014.11.9
		//会心会效命中区间正则
	    $.validator.addMethod('hx', function (value, element) {
	        var tel = /^[1-9][0-9]*$|^(?:[1-9][0-9]*\.[0-9]+|0\.(?!0+$)[0-9]+)$/; 
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
				weapAP1 : {
					maxlength : 4,
			        digits:true,
				},
				weapAP2 : {
					maxlength : 4,
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
			        min:150,
				},
			    baseCF2 : {
			        maxlength : 6,
			        hx:true,
			        max:300,
			        min:150,
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
			        hx:true,
				},
			    baseWS : {
			        maxlength : 5,
			        hx:true,
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

	//设置面板  2014.11.13
			$("#open-option").click(function(event) {
				$("#option").dialog('open');
			});
			$("#skin").change(function(event) {
				var skin_state = $("#skin").prop('checked');
				if(skin_state){
					$("#main select").selectmenu();
					/*$("#main select").selectmenu('refresh');*/
					$(".dps-raid input").not('#raidALL,#raidZF,#raidBY').buttonset();
					$("#raidZY,#raidXQ,#raidL,#raidJH").buttonset();
				}else{
					$("#main select").selectmenu('destroy');
					$(".dps-raid input").not('#raidALL,#raidZF,#raidBY').button('destroy');
				}
			});
		
	//全选功能 2014.11.9
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

	//数据生成提示 2014.11.17
		function showdate(){
			$(".date").addClass('update');
			setTimeout(function(){
				$(".date").removeClass('update');
			},2000);
		}

		function errordate(){
			$(".date").addClass('error');
			setTimeout(function(){
				$(".date").removeClass('error');
			},2000);
		}

	//*过滤------------------------------------------
	//过滤事件绑定 - 2014.11.15
		
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
	
	//定义过滤对象 - 2014.11.14
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

	//定义局部过滤方法 2014.11.13 ～ 2014.11.14
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

	//定义全局过滤方法 2014.11.15
		function Filter(){
			//全部隐藏,通用类型恢复
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

	//*数据------------------------------------------
	//定义数据表头 2014.11.14
		date_tDPS = ['91木桩','92木桩','93木桩','94木桩','DXC','QHL','NaN','NaN'];
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
	
	//定义职业心法与急速加成 2014.11.16

		//propAdCat: 0元气,1根骨,2力道,3身法,4体质
		var adt = {
			bx : {
				propAdCat : 1,
				propApAdd : 0.25,
				speedAd : 4.88,
			},
			hj : {
				propAdCat : 0,
				propApAdd : 0.25,
			},
			dj : {
				propAdCat : 1,
				propApAdd : 0.25,
			},
			ax : {
				propAdCat : 2,
				propApAdd : 0.25,
				propCtAdd : 0.25,
			},
			fy : {
				propAdCat : 0,
				propApAdd : 0.25,
			},
			yj : {
				propAdCat : 0,
				propApAdd : 0.25,
			},
			qc : {
				propAdCat : 1,
				propApAdd : 0.25,
			},
			jc : {
				propAdCat : 3,
				propApAdd : 0.25,
			},
			tl : {
				propAdCat : 0,
				propApAdd : 0.25,
			},
			jy : {
				propAdCat : 2,
				propApAdd : 0.25,
			},
			cj : {
				propAdCat : 3,
				propApAdd : 0.25,
			},
			gb : {
				propAdCat : 2,
				propApAdd : 0.25,
			},
			fs : {
				propAdCat : 3,
				propApAdd : 0.25,
			},
			nx : {
				propAdCat : 1,
				propApAdd : 0.25,
			},
			nh : {
				propAdCat : 1,
				propApAdd : 0.25,
			},
			nd : {
				propAdCat : 1,
				propApAdd : 0.25,
			},
		}

	//定义职业技能加成 2014.11.18
		adSkill = { 
		//各职业技能循环算法需求基数之奇穴,秘籍,技能基础攻击单独加成
		//0基础攻击加成,1会心加成,2会效加成,3命中,4运功时间,5破防,6无双,7急速
			bx : {
				skill_name : [0.4,0.4,0.2,0.12,3]   
			},
			hj : {
				skill_name : [0.2,0.1,0.1]   
			},
			dj : {
				skill_name : [0.2,0.1,0.1]   
			},
			ax : {
				skill_name : [0.2,0.1,0.1]   
			},
			fy : {
				skill_name : [0.2,0.1,0.1]   
			},
			yj : {
				skill_name : [0.2,0.1,0.1]   
			},
			qc : {
				skill_name : [0.2,0.1,0.1]  
			},
			jc : {
				skill_name : [0.2,0.1,0.1]  
			},
			tl : {
				skill_name : [0.2,0.1,0.1]   
			},
			jy : {
				skill_name : [0.2,0.1,0.1]  
			},
			cj : {
				skill_name : [0.2,0.1,0.1]   
			},
			gb : {
				skill_name : [0.2,0.1,0.1]  
			},
			fs : {
				skill_name : [0.2,0.1,0.1]  
			},
			nx : {
				skill_name : [0.2,0.1,0.1]  
			},
			nh : {
				skill_name : [0.2,0.1,0.1]  
			},
			nd : {
				skill_name : [0.2,0.1,0.1]  
			},
		};

	//定义增益兑换比例 2014.11.18
		var s_HT = 4500,
			s_CT = 4500,
			s_CF = 1800,
			s_WS = 3375,
			s_SP = 5478.2;

	//定义目标系数 2014.11.17
		//90木桩,91木桩,92木桩,93木桩,94木桩,DXC,QHL,副本..
		var HT_NEED = [102.5,105,110,120,110,110],
			WS_NEED = [15,20,25,30,25,35],
			DF_TAR = [290,570,873,1145,873,873],
			PF_CFT = [5964,6201,6439,6676,6439,6439],
			PF_CEIL = [4763,5221,5702,6152,5702,5702];
			/*DF_NEED = [4295,4473,4651,4829,5007],*/
			
	//定义固定增益对象 2014.11.16～2014.11.18重写结构
		var buffcat = ['ng_Y','ng_G','wg_L','wg_S',
						'ng_AP','ng_APc','ng_APs','wg_AP','wg_APc','wg_APs','wp_AP','zl_AP','zl_APc',
						'ng_HT','wg_HT','ng_CT','wg_CT','ng_CF','wg_CF','ng_PF','wg_PF','ng_PFc','wg_PFc',
						'ty_SP','ty_WS'];
		//ng_Y元气，ng_G根骨，wg_L力道，wg_S身法
		//ng_AP内功基础攻击点数，ng_APc内功基础攻击%，ng_APs内功易伤%
		//wg_AP外功基础攻击点数，wg_APc外功基础攻击%，wg_APs外功易伤%，wp_AP武器攻击
		//zl_AP基础治疗量点数，zl_APc基础治疗量%
		//ng_HT内功命中，wg_HT外功命中，ng_CT内功会心，wg_CT外功会心，ng_CF内功会效，wg_CF外功会效
		//ng_PF内功破防，wg_PF外功破防，ng_PFc内功破防%，wg_PFc外功破防%
		//ty_SP加速%，ty_WS无双%
		var buff = [
			[//feast:团队宴席	
				{},
				{ng_Y : 122,ng_G:122,wg_L:122,wg_S:122},//1芙蓉出水宴
			],
			[//fish:帮会宴席
				{},
				{ng_HT:0.01,wg_HT:0.01,ty_WS:0.03}, //1蒸鱼菜盘
			],
			[//sp1:食品辅助
				{},
				{ng_Y:73,}, //1佳·逍遥固元汤(元气)
				{ng_G:73,}, //2佳·白芷增骨汤(根骨)
				{wg_L:73,}, //3佳·安荣力劲汤(力道)
				{wg_S:73,}, //4佳·君子知身汤(身法)
			],
			[//sp2:食品增强
				{},
				{ng_CF:195/s_CF},//1佳·合饼卷菜(会效)
				{ng_PF:195}, //2佳·虎皮凤爪(破防)
				{wg_CF:195/s_CF}, //3佳·佛手排骨(会效)
				{wg_PF:195}, //4佳·芋丝蒸肉糕(破防)
				{wg_AP:220}, //5佳·麻香软骨脆(外功基础)
			],
			[//yp1 :药品辅助
				{},
				{ng_CF:195/s_CF},//1壮骨香囊(会效)
				{ng_PF:195}, //2提神香囊(破防)
				{ng_Y:110}, //3尚·紫荷香囊(元气)
				{ng_G:110}, //4尚·栀仁香囊(根骨)
				{wg_CF:195/s_CF},//5润肺香囊(会效)
				{wg_PF:195}, //6健体香囊(破防)
				{wg_L:110}, //7尚·柏桂香囊(力道)
				{wg_S:110}, //8尚·桂枝香囊(身法)
			],
			[//yp2 :药品增强
				{},
				{ng_CF:292/s_CF},//1尚·上品玉露丹(会效)
				{ng_CT:195/s_CT}, //2上品玉露散(会心)
				{ng_HT:195/s_HT}, //3中品聚元丹(命中)
				{ng_CF:292/s_CF},//4尚·上品万花丹(会效)
				{ng_CT:195/s_CT}, //5中品万花丹(会心)
				{ng_HT:195/s_HT}, //6中品聚神丹(命中)
			],
			[//moshi :磨石
				{},
				{ng_AP:264}, //1内功
				{wg_AP:220}, //2外功
				{zl_AP:521}, //3治疗
			],
			[//jz : 饺子
				{},
				{ng_Y : 25,ng_G:25,wg_L:2,wg_S:25}, //1戏凤饺
				{ng_Y : 15,ng_G:15,wg_L:15,wg_S:15}, //2煮烂饺子
			],
			[//qiu : 五彩球
				{},
				{ng_AP : 170}, //1红球
				{wg_AP : 170,zl_AP:340}, //2蓝球
				{ng_AP : 170,wg_AP:170,zl_AP:340}, //3红蓝球
			],
			[//sp : 特殊食物
				{},
				{wg_AP : 116,ng_AP:116},  //1红烧青鱼
			],
			[//xiuqi : 袖气
				{},
				{ng_Y : 74,ng_G:74,wg_L:74,wg_S:74}, //1大袖气
				{ng_Y : 37,ng_G:37,wg_L:37,wg_S:37}, //2小袖气
			],
			[//jiehuo : 戒火斩
				{},
				{wg_APs : 0.05,ng_APs : 0.05,}, //1大戒火
			 	{wg_APs : 0.03,ng_APs : 0.03,}, //2小戒火
			],
			[//lei : 憾如雷
				{},
				{wg_AP : 217}, //憾如雷
			],
			[//qichang : 气场
				{},
				{ng_CT:0.05,ng_CF:0.1},	//1破苍穹
				{wg_CT:0.05,wg_CF:0.1}, //2碎星辰
				{ng_CT:0.05,ng_CF:0.1,wg_CT:0.05,wg_CF:0.1}, //3破苍穹+碎星辰
			],
			[//manwu : 曼舞
				{},
				{ws : 84/s_WS,} //曼舞
			],
			[//kc : 枯残
				{},
				{wg_APs : 0.06,ng_APs : 0.06,} //枯残
			],
			[//yj : 金刚怒目
				{},
				{ng_APc : 0.15,}, //金刚
			],
			[//jy : 命陨
				{},
				{wg_APs: 0.1,}, //惊羽
			], 
			[//cj : 梅隐香
				{},
				{wg_HT : 61/s_HT,wg_PFc : 0.2,}, //藏剑
			],
			[//gb : 丐帮
				{},
				{wg_CT : 0.1,}, //丐帮
			],
			[//buyu : 不语
				{},
				{ty_SP : 400/s_SP,}, //急速不语
				{ng_CT:200,ng_CF:200,wg_CT:200,wg_CF:200}, //会心不语
			],
			/*[//zf : 阵法
				{},
			],
			[//zy : 阵眼
				{},
			],*/
		]

		//遍历定义未定义属性为0
		function TraversalBuff(){
			for (i=0;i<buff.length;i++){
				for (j=0;j<buff[i].length;j++){
					for (x=0;x<buffcat.length;x++){
						if(buff[i][j][buffcat[x]] == undefined){
							buff[i][j][buffcat[x]] = 0;
						}	
					}
				}
			}
		}; 
		TraversalBuff();
		//console.log(buff[0][1]['ng_AP']);
		
	//构造数据对象 - 2014.11.15～2014.11.18
		function JX3DPS(){
		//职业
			this.role = window.ROLE;
			this.cat = window.CAT;
		//原始属性
			this.baseY = Number($("#baseY").val());
			this.baseG = Number($("#baseG").val());
			this.baseS = Number($("#baseS").val());
			this.baseL = Number($("#baseL").val());
			this.baseAP1 = Number($("#baseAP1").val());
			this.baseAP2 =  Number($("#baseAP2").val());
			this.baseAP3 = Number($("#baseAP3").val());
			this.weapAP1 = Number($("#weapAP1").val());
			this.weapAP2 = Number($("#weapAP2").val());
			this.baseHT1 = Number($("#baseHT1").val());
			this.baseHT2 = Number($("#baseHT2").val());
			this.baseCT1 = Number($("#baseCT1").val());
			this.baseCT2 = Number($("#baseCT2").val());
			this.baseCF1 = Number($("#baseCF1").val());
			this.baseCF2 = Number($("#baseCF2").val());
			this.basePF1 = Number($("#basePF1").val());
			this.basePF2 = Number($("#basePF2").val());
			this.baseSP = Number($("#baseSP").val());
			this.baseWS = Number($("#baseWS").val());
		//小药索引取值
			this.addFeast= Number($("#addFeast").val());
			this.addFish= Number($("#addFish").val());
			this.addSP1= Number($("#addSP1").val());
			this.addSP2= Number($("#addSP2").val());
			this.addYP1= Number($("#addYP1").val());
			this.addYP2= Number($("#addYP2").val());
			this.addMS= Number($("#addMS").val());
			this.addJZ= Number($("#addJZ").val());
			this.addQQ= Number($("#addQQ").val());
			this.addSP= Number($("#addSP").val());
			this.addTX1= Number($("#addTX1").val());
			this.addTX2= Number($("#addTX2").val());
			this.addTX3 = Number($("#addTX3").val());
		//团队Buff索引取值
			this.raidZF = Number($("#raidZF").val());
			this.raidZY = Number($("#raidZY input[name='raidZY']:checked").val());
			this.raidBY = Number($("#raidBY").val());
			this.raidXQ = Number($("#raidXQ input[name='raidXQ']:checked").val());
			this.raidJH = Number($("#raidJH input[name='raidJH']:checked").val());
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
			this.raidMW = $("#raidMW").prop('checked') ? 1 : 0;
			this.raidKC = $("#raidKC").prop('checked') ? 1 : 0;
			this.raidJG = $("#raidJG").prop('checked') ? 1 : 0;
			this.raidMY = $("#raidMY").prop('checked') ? 1 : 0;
			this.raidCJ = $("#raidCJ").prop('checked') ? 1 : 0;
			this.raidGB = $("#raidGB").prop('checked') ? 1 : 0;
			this.raidDQ = $("#raidDQ").prop('checked') ? 1 : 0;
			this.raidCSY= $("#raidCSY").prop('checked') ? 1 : 0;
			this.raidFY = $("#raidFY").prop('checked') ? 1 : 0;
			this.raidTC = $("#raidTC").prop('checked') ? 1 : 0;
			this.raidCW = $("#raidCW").prop('checked') ? 1 : 0;
		//职业方案索引取值
			this.roleTZ = Number($("#roleTZ").val());
			this.roleMJ = Number($("#roleMJ").val());
			this.roleQX = Number($("#roleQX").val());
			this.roleFM = Number($("#roleFM").val());
		//计算过渡值 - 2014.11.18
			var buffValue = [this.addFeast,this.addFish,this.addSP1,this.addSP2,this.addYP1,this.addYP2,
			this.addMS,this.addJZ,this.addQQ,this.addSP,
			this.raidXQ,this.raidJH,this.raidL,this.raidQC,
			this.raidMW,this.raidKC,this.raidJG,this.raidMY,this.raidCJ,this.raidGB,
			this.raidBY
			];
			//！important --- 待添加阵法+阵眼+覆盖率buff等

			function addBuff(buffcat){
				var zbuff = 0;
				for (i=0;i<buff.length;i++){
					zbuff += buff[i][buffValue[i]][buffcat];
				}
				return zbuff;
			};
			//武器平均攻击
				this.weapAP = (this.weapAP1 + this.weapAP2 ) / 2 + addBuff('wp_AP');

			//基础攻击增益点数 = 食品类 + BUFF类
				this.adAP1 = addBuff('ng_AP');
				this.adAP2 = addBuff('wg_AP');
				this.adAP3 = addBuff('zl_AP');

			//基础攻击增益百分比 = BUFF类 + 阵法
				this.adAP1c = addBuff('ng_APc');
				this.adAP2c = addBuff('wg_APc');
				this.adAP3c = addBuff('zl_APc');
			
			//固定攻击 = 职业属性点数 × {属性点加成}
				var adtBase = [this.baseY,this.baseG,this.baseL,this.baseS];
				this.propAP = adtBase[adt[ROLE]['propAdCat']]*adt[ROLE]['propApAdd'];

			//R基础攻击 = （基础攻击 + 基础攻击增益点数）×（1+基础攻击增益百分比）
				this.R_AP1 = ( this.baseAP1 + this.adAP1 ) * ( 1 + this.adAP1c);
				this.R_AP2 = ( this.baseAP2 + this.adAP2 ) * ( 1 + this.adAP2c);
				this.R_AP3 = ( this.baseAP3 + this.adAP3 ) * ( 1 + this.adAP3c);
			//R面板攻击 = R基础攻击 + 固定攻击
				this.R_MAP1 = this.R_AP1 + this.propAP;
				this.R_MAP2 = this.R_AP2 + this.propAP;
				this.R_MAP3 = this.R_AP3 + this.propAP;
			//Z基础攻击 = （基础攻击 + 基础攻击增益点数）×（1+基础攻击增益百分比+{基础攻击加成}）
				//this.Z_AP1 = ( this.baseAP1 + this.adAP1 ) * ( 1 + this.adAP1c + adSkill[ROLE]['skill_name'][0]);
				//this.Z_AP2 = ( this.baseAP2 + this.adAP2 ) * ( 1 + this.adAP2c + adSkill[ROLE]['skill_name'][0]);
				//this.Z_AP3 = ( this.baseAP3 + this.adAP3 ) * ( 1 + this.adAP3c + adSkill[ROLE]['skill_name'][0]);
			//Z面板攻击 = Z基础攻击 + 固定攻击
				//this.Z_MAP1 = this.Z_AP1 + this.propAP;
				//this.Z_MAP2 = this.Z_AP2 + this.propAP;
				//this.Z_MAP3 = this.Z_AP3 + this.propAP;
			//命中增益
				this.adHT1 = addBuff('ng_HT');
				this.adHT2 = addBuff('wg_HT');
			//R命中 = 命中 + 命中增益
				this.R_HT1 = this.baseHT1/100 + this.adHT1;
				this.R_HT2 = this.baseHT2/100 + this.adHT2;
			//Z命中 = R命中 + {命中加成：秘籍+奇穴}
				//this.Z_HT1 = this.R_HT1 + adSkill[ROLE]['skill_name'][3];
				//this.Z_HT2 = this.R_HT2 + adSkill[ROLE]['skill_name'][3];
			//偏离率 = ([命中需求]-Z命中<0) ? 0 : ([命中需求]-Z命中)
				var that = this;
				function GET_MISS(R_HT){
					var miss = [];
					for (var i=0;i<HT_NEED.length;i++) {
						miss[i] = (HT_NEED[i] - R_HT*100)<=0 ? 0 : (HT_NEED[i] - R_HT*100)/100;
					};
					return miss;
				};
				this.R_MISS1 = GET_MISS(that.R_HT1);
				this.R_MISS2 = GET_MISS(that.R_HT2);
			//R无双 = 无双 + 无双增益
				this.adWS = addBuff('ty_WS');
				this.R_WS = this.baseWS/100 + this.adWS;
			//识破率 = ([无双需求]-Z无双<0) ? 0 : ([无双需求]-Z无双<0)
				function GET_ST(){
					var shipo = [];
					for (var i=0;i<WS_NEED.length;i++) {
						shipo[i] = (WS_NEED[i] - that.R_WS*100)<=0 ? 0 : (WS_NEED[i] - that.R_WS*100)/100;
					};
					return shipo;
				};
				this.R_ST = GET_ST();
			//R会效 = 会效 + 会效增益
				function GET_CF(basecat,addcat){
					var round_CF = basecat/100 + addBuff(addcat);
					if(round_CF<1.75){
						round_CF=1.75;
					}else if(round_CF>3){
						round_CF=3;
					}else{
						round_CF = basecat/100 + addBuff(addcat);
					}
					return round_CF;
				};
				this.R_CF1 = GET_CF(that.baseCF1,'ng_CF');
				this.R_CF2 = GET_CF(that.baseCF2,'wg_CF');
			//Z会效 = R会效 + {会效加成：秘籍+奇穴}
				//this.Z_CF1 = this.R_CF1 + adSkill[ROLE]['skill_name'][2];
				//this.Z_CF2 = this.R_CF2 + adSkill[ROLE]['skill_name'][2];
			//R会心 = 会心 + 会心增益
				this.adCT1 = addBuff('ng_CT');
				this.adCT2 = addBuff('wg_CT');
				this.CT1_now = that.baseCT1/100 + that.adCT1;
				this.CT2_now = that.baseCT2/100 + that.adCT2;
				function GET_CT(missArr,ct_now){
					var CT_space = [];
					for (i=0;i<that.R_ST.length;i++){
						CT_space[i] = 1-missArr[i]-that.R_ST[i]
					};
					var CT_true = [];
					for (j=0;j<CT_space.length;j++){
						CT_true[j] = ct_now>CT_space[j] ? CT_space[j] : ct_now;
					};
					return CT_true;
				};
				this.R_CT1 = GET_CT(that.R_MISS1,that.CT1_now);
				this.R_CT2 = GET_CT(that.R_MISS2,that.CT2_now);
			//Z会心 = R会心 + {会心加成：秘籍+奇穴}
				//this.Z_CT1_now = this.CT1_now + adSkill[ROLE]['skill_name'][1];
				//this.Z_CT2_now = this.CT2_now + adSkill[ROLE]['skill_name'][1];
				//this.Z_CT1 = GET_CT(that.R_MISS1,that.Z_CT1_now);
				//this.Z_CT2 = GET_CT(that.R_MISS2,that.Z_CT2_now);
			//R破防 = (破防 + 破防增益) * (1+破防百分比增益)
				this.adPF1 = addBuff('ng_PF');
				this.adPF1c = addBuff('ng_PFc');
				this.adPF2 = addBuff('wg_PF');
				this.adPF2c = addBuff('wg_PFc');
				this.R_PF1 = (this.basePF1 + this.adPF1)*(1+this.adPF1c);
				this.R_PF2 = (this.basePF2 + this.adPF2)*(1+this.adPF2c);
			//破防加成 = （最终破防-目标内防）/目标内防系数
				/*DF_TAR = [290,570,873,1145,873,873],
				PF_CFT = [5964,6201,6439,6676,6439,6439],*/
				function GET_PFX(pfvalue){
					var PFX = [];
					for (i=0;i<DF_TAR.length;i++){
						PFX[i] = (pfvalue - DF_TAR[i]) / PF_CFT[i];
					}
					return PFX;
				};
				this.R_PA1 = GET_PFX(that.R_PF1);
				this.R_PA2 = GET_PFX(that.R_PF2);
			//R加速与技能实际运功时间方法
				this.R_SP = this.baseSP/100 + addBuff('ty_SP');
				//R运功实际时间 = floor( T/0.0625*1024/floor(S*10.24+S1+1024) )*0.0625
				//T = {} 技能初始释放时间  S=默认急速 S1 = 急速加成，转换为数值

				//设置和入库技能原始时间
				var skillTime = adSkill[ROLE]['skill_name'][4];
				//设置急速加成 = 职业加成 + BUFF增益
				var adtSP = adt[ROLE]['speedAd'] + addBuff('ty_SP');
				//获取技能当前运功时间方法
				function GET_SKT(skilltime,adtspeed){
					return Math.floor( skillTime / 0.0625*1024 / Math.floor(that.R_SP*10.24+adtspeed*10.24+1024) )*0.0625;
				};
				//var test = GET_SKT(3,11.88);
				//console.log(test);

		//计算方法 - 2014.11.17
			this.dpsMethod = Number($("#dpsMethod").val());
			this.MethodList = [
				function(){	//0未选择计算方案
					alert('未选择计算方案');
				},
				function(){	//1龙蔡倍数通用算法
						console.log('> 计算方案：龙蔡倍数通用算法');
					//记录各项准备入库值
						var result_to = this.realL + this.weapAP;
						console.log(result_to);
					//声明存储数组
						var result_list = [];
					//执行命中迭代
						(function(){
							for(i=0;i<needHT.length;i++){
								var result_go = result_to - needHT[i];
								result_list.push(result_go);
							}
						})();
					//console.log(result_list);
						return result_list;
				},
			]
			this.go = this.MethodList[this.dpsMethod];

		}

	//计算事件绑定 - 2014.11.17
		$("#go").on('click',function(){
			//判定是否已选择职业
			if(ROLE == undefined){
				alert('你还未选择职业！');
			}else{
				//创建实例
				var ex = new JX3DPS();
				console.log(ex);

				//运算获取方案结果
				var finalist = new JX3DPS().go();
				var validate_finalist = function(){
					for(i=0;i<finalist.length;i++){
						if ( isNaN(finalist[i]) ){
							(function(){
								for(j=0;j<finalist.length;j++){
									finalist[j] = 'NaN';
								}
							})();
							return false;
						}else{
							return true;
						}
					}
				};
				validate_finalist();
				console.log(finalist);

				//数据获取成功/错误提示
				if (validate_finalist()){
					showdate();
				}else{
					errordate();
				}
				
				//添加入数据面板
				$("#date td").html(function(i){
					return finalist[i];
				})
			}
		})
	
	//*存储------------------------------------------
	/*//数据处理
	$("#save").click(function(){
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


})