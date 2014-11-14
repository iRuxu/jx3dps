/* jx3dps.com
Version: 0.1
Author: iRuxu
Github: https://github.com/iRuxu/jx3dps
Lincense: GPL v2
Creat: 2014.11.8
*/

$(function(){
	//全局变量声明 2014.11.14
		$("#role").on('change',function(){
				ROLE =  $(this).val();
				console.log(ROLE);
		})
			
		var NG = 'bx' || 'hj' || 'dj' || 'mj' || 'hs' || 'qc',
			WG = 'tc' || 'jc' || 'jy' || 'cj' || 'gb' || 'fs',
			DPS = NG || WG ,
			ZL = 'nx' || 'nh' || 'nd',
			MT = 'tl' || 'xs' || 'mz',
			TL = 'tl',
			QX = 'bx' || 'nx',
			NX = 'nx',
			BX = 'bx',
			WH = 'hj' || 'nh',
			HJ = 'hj',
			NH = 'nh',
			WD = 'dj' || 'nd',
			DJ = 'dj',
			ND = 'nd',
			TC = 'tc' || 'tl',
			MJ = 'mj' || 'mz',
			HS = 'hs' || 'xs',
			CY = 'qc' || 'jc',
			TM = 'tl' || 'jy',
			CJ = 'cj',
			GB = 'gb',
			CX = 'fs' || 'ty';
			
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
					$(".dps-raid :checkbox").attr('aria-pressed','true').button('refresh');
				}else{
					$(".dps-raid :checkbox").prop('checked',false);
					$(".dps-raid :checkbox").attr('aria-pressed','false').button('refresh');
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

	//表单区验证 2014.11.9
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
	                required : true,
	                maxlength : 4,
	                digits:true,
	        	},
	    	    baseG : {
	    	        required : true,
	    	        maxlength : 4,
	    	        digits:true,
	    		},
			    baseS : {
			        required : true,
			        maxlength : 4,
			        digits:true,
				},
			    baseL : {
			        required : true,
			        maxlength : 4,
			        digits:true,
				},
			    baseAP1 : {
			        required : true,
			        maxlength : 5,
			        digits:true,
				},
			    baseAP2 : {
			        required : true,
			        maxlength : 5,
			        digits:true,
				},
			    baseAP3 : {
			        required : true,
			        maxlength : 5,
			        digits:true,
				},
			    baseHT1 : {
			        required : true,
			        maxlength : 6,
			        hx:true,
			        max:200,
			        min:90,
				},
			    baseHT2 : {
			        required : true,
			        maxlength : 6,
			        hx:true,
			        max:200,
			        min:90,
				},
			    baseCT1 : {
			        required : true,
			        maxlength : 5,
			        hx:true,
			        max:100,
			        min:1,
				},
			    baseCT2 : {
			        required : true,
			        maxlength : 5,
			        hx:true,
			        max:100,
			        min:1,
				},
			    baseCF1 : {
			        required : true,
			        maxlength : 6,
			        hx:true,
			        max:300,
			        min:155,
				},
			    baseCF2 : {
			        required : true,
			        maxlength : 6,
			        hx:true,
			        max:300,
			        min:155,
				},
			    basePF1 : {
			        required : true,
			        maxlength : 4,
			        digits:true,
				},
			    basePF2 : {
			        required : true,
			        maxlength : 4,
			        digits:true,
				},
			    baseSP1 : {
			        required : true,
			        maxlength : 4,
			        digits:true,
			        max:1350,
				},
			    baseSP2 : {
			        required : true,
			        maxlength : 4,
			        digits:true,
			        max:1350,
				},
			    baseWS : {
			        required : true,
			        maxlength : 5,
			        hx:true,
			        max:100,
				},
	        },
	        messages : {
	        	baseSP1 : {
	        		max:'加速已超出阈值',
	        	},
	        	baseSP2 : {
	        		max:'加速已超出阈值',
	        	}
	        }
		})

	//第三方UI职业关联过滤 2014.11.13
		//小药过滤
		function ngShow(){
			$(".filter select").on('selectmenuopen',function(event,ui){
				var ngui_id = '#' + $(this)[0].id + '-menu';
				$(ngui_id).children('li').show();
				var wglist = $(ngui_id).children('li:contains("外功")').hide().nextAll().hide();
			})
		}
		function wgShow(){
			$(".filter select").on('selectmenuopen',function(event,ui){
				var wgui_id = '#' + $(this)[0].id + '-menu';
				$(wgui_id).children('li').show();
				var nglist = $(wgui_id).children('li:contains("内功")').hide().nextUntil('li:contains("外功")').hide();
			})
		}
		//职业过滤
		function roleshow(role){
			var rolelist = {
				bx : '冰心',
				hj : '花间',
				dj : '毒经',
				tc : '傲血',
				mj : '焚影',
				hs : '易经',
				qc : '气纯',
				jc : '剑纯',
				tl : '天罗',
				jy : '惊羽',
				cj : '藏剑',
				gb : '丐帮',
				fs : '分山',
				nx : '奶秀',
				nh : '奶花',
				nd : '奶毒'
			};
			var myrole = rolelist[role];
			$(".filter select").on('selectmenuopen',function(event,ui){
				var theid = $(this)[0].id;
				var uiid = '#' + theid + '-menu';
				var uilist = $(uiid).children('li').hide();
				var thisrole = 'li:contains("' + myrole + '")';
				var mylist = $(uiid).children(thisrole).show().nextUntil('.ui-selectmenu-optgroup').show();
			})
		}

	//原始UI关联过滤 2014.11.14
		//职业过滤
		function o_roleshow(role){
			$(".dps-role .filter optgroup").hide();
			$(".dps-role .filter option").hide();
			var o_role = '.dps-role .' + role + ' option';
			$(o_role).show();
		}

		//小药过滤
		function spshow(role){
			$(".dps-add .filter optgroup").hide();
			$(".dps-add .filter option").hide();
			var o_sp = '.dps-add .filter .' + role + ' option';
			$(o_sp).show();
		}

	//职业关联过滤 2014.11.13
		$("#role").on('change',function(){
			var role = $(this).val();
			$("#main li").show();
			switch(role){
				case 'bx':
					$(".wg,.zl").hide();
					$(".ng,.bx").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'hj':
					$(".wg,.zl").hide();
					$(".ng,.hj").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'dj':
					$(".wg,.zl").hide();
					$(".ng,.dj").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'tc':
					$(".ng,.zl").hide();
					$(".wg,.tc").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'mj':
					$(".wg,.zl").hide();
					$(".ng,.mj").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'hs':
					$(".wg,.zl").hide();
					$(".ng,.hs").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'qc':
					$(".wg,.zl").hide();
					$(".ng,.qc").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'jc':
					$(".ng,.zl").hide();
					$(".wg,.jc").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'tl':
					$(".zl,.gengu,.lidao,.wgap,.ngmz,.nghx,.nghxx,.wgpf,.hanrulei,.jilei,.mingyun,.hejiu,.myx").hide();
					$(".dps-add .filter optgroup").hide();
					$(".dps-add .filter option").hide();
					$(".tl").show();
					roleshow(role);
					o_roleshow(role);
					break;
				case 'jy':
					$(".ng,.zl").hide();
					$(".wg,.jy").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'cj':
					$(".ng,.zl").hide();
					$(".wg,.cj").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'gb':
					$(".ng,.zl").hide();
					$(".wg,.gb").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'fs':
					$(".ng,.zl").hide();
					$(".wg,.fs").show();
					wgShow();
					spshow('wg');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'nx':
					$(".wg").hide();
					$(".yuanqi,.ngap,.ngmz,.ngpf,.wushuang,.jiehuo,.fanyin,.kucan,.jingang,.manwu,.guanzi,.allbuff").hide();
					$(".zl,.nx").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'nh':
					$(".wg").hide();
					$(".ngap,.ngmz,.ngpf,.wushuang,.jiehuo,.fanyin,.kucan,.jingang,.manwu,.guanzi,.allbuff").hide();
					$(".zl,.nh").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
				case 'nd':
					$(".wg").hide();
					$(".yuanqi,.ngap,.ngmz,.ngpf,.wushuang,.jiehuo,.fanyin,.kucan,.jingang,.manwu,.guanzi,.allbuff").hide();
					$(".zl,.nd").show();
					ngShow();
					spshow('ng');
					roleshow(role);
					o_roleshow(role);
					break;
			}
		})

	//数据输出块关联 2014.11.14
		date_tDPS = ['91木桩','92木桩','93木桩','94木桩','DMG/XZ','DXC/QHL','特殊情况','浮动区间'];
		date_tNX = ['翔舞','翔鸾舞柳','上元点鬟','王母挥袂','风袖低昂','回雪飘摇','玲珑箜篌','浮动区间'];
		date_tNH = ['握针','彼针','述怀','清疏','局针','提针','长针','长针溅射'];
		date_tND = ['醉舞九天','小冰蚕','大冰蚕','小圣手','大圣手','小蝶旋','大蝴蝶','浮动区间'];
		date_num = [0,0,0,0,0,0,0,0];
			$("#role").on('change',function(){
				var role =  $(this).val();
				$("#date th").html(function(i,value){
					switch(role){
						case DPS:
							return date_tDPS[i];
							break;
						case NX:
							return date_tNX[i];
							break;
						case NH:
							return date_tNH[i];
							break;
						case ND:
							return date_tND[i];
							break;
						default:
							return date_tDPS[i];
							break;
					}
				});
			})
			



	
	

	//创建对象
	/*var Jx3dps = {*/
		//对象属性
		/*baseAP : $("#baseAP").val(),
		raidFeast : $("#raidFeast").val(),
		raidFish : Number(Boolean($("#raidFish").button('widget').attr('aria-pressed'))),
		raidXQ : $("#raidXQ label[aria-pressed='true']").prev('input').val(),*/


		//对象方法
		/*bx1 : function(){*/
			//加成计算
		/*}*/
	/*};*/


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