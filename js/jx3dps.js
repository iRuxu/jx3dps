/* jx3dps.com
Version: 0.3
Author: iRuxu
Github: https://github.com/iRuxu/jx3dps
Lincense: GPL v2
Creat: 2014.11.8
Modifed : 2014.11.20
*/
var ROLE,CAT;
$(function(){
	//*界面------------------------------------------
		//第三方UI初始化 2014.11.8
			$("#box").tooltip();
			$("#option").dialog({modal:true,closeText:'关闭',width:400,height:200,autoOpen:false,});
			$("#contributors").dialog({modal:true,closeText:'关闭',width:400,height:300,autoOpen:false,});
			$("#datelist").tabs();
			$("#main select").selectmenu();
			$("#role").select2();
			$("input[type='button']").button();
			$("#to a").button();
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
				    baseAP3_X : {
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
				        max:1350,
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
			/*$(".coverage").hover(
				function(){
					var cover = $(this).html();
					$(this).attr('title',function(){
						return '以' + cover + '覆盖率计算';
					});
				}
			)*/
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
					$(".dps-raid input").not('#raidALL,#raidZF').buttonset();
					$("#raidZY,#raidXQ,#raidL,#raidJH").buttonset();
				}else{
					$("#main select").selectmenu('destroy');
					$(".dps-raid input").not('#raidALL,#raidZF').button('destroy');
				}
			});

		//贡献者名单
			$("#more").click(function(event) {
				$("#contributors").dialog('open');
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

		//手机端回到顶部 2014.11.22
			$("#go").click(function(event) {
				 $("html,body").animate({scrollTop:"0"},100);
			});

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

					//如果在存储界面
					$("#datelist").hide();
					$("#dpsForm").show();
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
					$(".dps-add .filter optgroup").show();
					$(".dps-add .filter option").show();
					$(".tl").show();
					$(".dps-add").on('selectmenuopen','.filter select',function(event,ui){
						$("#addSP1-menu li").show();
						$("#addSP2-menu li").show();
						$("#addYP1-menu li").show();
						$("#addYP2-menu li").show();
						$("#addMS-menu li").show();
						$("#addTX1-menu li,#addTX2-menu li,#addTX3-menu li").show();
					});
				}
				//6次过滤：治疗单独过滤规则
				if(CAT=='zl'){
					$(".nozl").hide();
				}
				//7次过滤：重定义部分对象数值
				//和尚·金刚怒目
				if(ROLE=='yj'){
					$("#raidJG").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
					buff[16][1]['ng_APc']=0.45;
				}else{
					$("#raidJG").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
					buff[16][1]['ng_APc']=0.15;
				}

				//和尚·拿云式+普渡四方
				if(ROLE=='yj'){
					$("#raidHS").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
					buff[31][1]['ng_APs']=0.103;
				}else if(ROLE=='fy'){
					$("#raidHS").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
					buff[31][1]['ng_APs']=0.0515;
				}else{
					$("#raidHS").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
					buff[31][1]['ng_APs']=0;
				}

				//冰心·繁音+玳弦
				if(ROLE=='bx'){
					$("#raidBX").prop('checked',true);
					$("#raidDX").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
					buff[32][1]['ng_APs']=0.15;
				}else if(ROLE=='fy'){
					$("#raidBX").prop('checked',false);
					$("#raidDX").prop('checked',false);
					
					buff[32][1]['ng_APs']=0.075;
				}else{
					$("#raidBX").prop('checked',false);
					$("#raidDX").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
					buff[32][1]['ng_APs']=0;
				}

				//花间·噬骨
				if(ROLE=='hj'){
					$("#raidHJ ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidHJ ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}

				//焚影·烈日
				if(ROLE=='fy'){
					$("#raidFY ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidFY ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}


				//傲血·激雷+破风
				if(ROLE=='ax'){
					$("#raidJL ").prop('checked',true);
					$("#raidTC ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidJL ").prop('checked',false);
					$("#raidTC ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}

				//藏剑
				if(ROLE=='cj'){
					$("#raidCJ ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidCJ ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}

				//惊羽
				if(ROLE=='jy'){
					$("#raidMY ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidMY ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}

				//丐帮
				if(ROLE=='gb'){
					$("#raidGB ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidGB ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}

				//苍云
				if(ROLE=='fs'){
					$("#raidCY ").prop('checked',true);
					$(".dps-raid").buttonset('refresh');
				}else{
					$("#raidCY ").prop('checked',false);
					$(".dps-raid").buttonset('refresh');
				}





				console.log('> 职业关联项过滤完成');
			}

	//*数据------------------------------------------
		//定义数据表头 2014.11.14
			date_tDPS = ['91木桩','92木桩','93木桩','94木桩','DXC','QHL','太原之战','试炼之地'];
			date_tNX = ['翔舞HOT','翔鸾瞬发','上元点鬟','上元末跳','王母挥袂','风袖低昂','回雪飘摇','玲珑箜篌'];
			date_tNH = ['握针','彼针','述怀','清疏','局针','提针','长针','长针溅射'];
			date_tND = ['醉舞九天','小冰蚕','大冰蚕','圣手织天','小千蝶','大千蝶','小蝴蝶','大蝴蝶'];
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
		
		//通用属性加成
			var tyAdd = {
				//0攻击，1会心，2会效，3破防
				Y : [0.3,0,0,0.25],
				G : [0,0.3,0.15,0],
				L : [0.25,0,0,0.25],
				S : [0,0.3,0.15,0],
			}

		//定义职业心法与急速加成 2014.11.16
			//propAdCat: 0元气,1根骨,2力道,3身法,4体质
			var adt = {
				bx : {
					propAdCat : 1,
					propApAdd : 2.85,
					speedAd : 4.88,
					propCountAdd : 0,
					propCTAdd:0.08,
					propCFAdd:0.02,
					propPFAdd:0,
				},
				hj : {
					propAdCat : 0,
					propApAdd : 2.85,
					speedAd : 4.88,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0.08,
				},
				dj : {
					propAdCat : 1,
					propApAdd : 2.85,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0.08,
				},
				ax : {
					propAdCat : 2,
					propApAdd : 2.4,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0.08,
				},
				fy : {
					propAdCat : 0,
					propApAdd : 2.85,
					speedAd : 5.08,
					propCountAdd : 0,
					propCTAdd:0.08,
					propCFAdd:0.02,
					propPFAdd:0,
				},
				yj : {
					propAdCat : 0,
					propApAdd : 2.7,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0.15,
					propCFAdd:0.05,
					propPFAdd:0,
				},
				qc : {
					propAdCat : 1,
					propApAdd : 2.7,
					speedAd : 6,  //新版本待修改
					propCountAdd : 0,
					propCTAdd:0.15,
					propCFAdd:0.05,
					propPFAdd:0,
				},
				jc : {
					propAdCat : 3,
					propApAdd : 2.25,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0.15,
					propCFAdd:0.05,
					propPFAdd:0,
				},
				tl : {
					propAdCat : 0,
					propApAdd : 2.6,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0.2,
					propCFAdd:0.08,
					propPFAdd:0,
				},
				jy : {
					propAdCat : 2,
					propApAdd : 2.25,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0.15,
					propCFAdd:0.05,
					propPFAdd:0,
				},
				cj : {
					propAdCat : 3,
					propApAdd : 2.4,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0.08,
				},
				gb : {
					propAdCat : 2,
					propApAdd : 2.3,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0.15,
				},
				fs : {
					propAdCat : 3,
					propApAdd : 2.5,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0,
				},
				nx : {
					propAdCat : 1,
					propApAdd : 5.75,
					speedAd : 0,
					propCountAdd : 0.05,
					propCTAdd:0.08,
					propCFAdd:0.02,
					propPFAdd:0,
				},
				nh : {
					propAdCat : 1,
					propApAdd : 5.5,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0.15,
					propCFAdd:0.05,
					propPFAdd:0,
				},
				nd : {
					propAdCat : 1,
					propApAdd : 6,
					speedAd : 0,
					propCountAdd : 0,
					propCTAdd:0,
					propCFAdd:0,
					propPFAdd:0,
				},
			}

		//定义职业技能加成 2014.11.18
			adSkill = { 
			//各职业技能循环算法需求基数之奇穴,秘籍,技能基础攻击单独加成
			//0基础攻击加成,1会心加成,2会效加成,3命中,4运功时间,5破防,6无双,7急速
				bx : {
					daixian : [0.12], 
					jianqi : [0.1], 
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
					xiangwu : [0.08], 
					xiangwufirst : [0], 
					shangyuan : [0.07], 
					shangyuanlast : [0.07], 
					wangmu : [0,0.1], 
					fengxiu : [0], 
					huixue : [0.12,0.1,0.1], 
					linglong : [0], 
				},
				nh : {
					skill_name : [0.2,0.1,0.1]  
				},
				nd : {
					skill_name : [0.2,0.1,0.1]  
				},
			};

		//定义目标系数 2014.11.17
			//91木桩,92木桩,93木桩,94木桩,DXC,QHL,太原之战,试炼之地
			var HT_NEED = [102.5,105,110,120,110,110,120,102.5],
				WS_NEED = [15,20,25,30,25,35,35,0],
				DF_TAR = [290,570,873,1145,873,873,1145,290],
				PF_CFT = [5964,6201,6439,6676,6439,6439,6676,5964],
				PF_CEIL = [4763,5221,5702,6152,5702,5702,6152,4763],
				LIST = [0,0,0,0,0,0,0,0];
				/*DF_NEED = [4295,4473,4651,4829,5007],*/

		//定义增益兑换比例 2014.11.18
			var s_HT = 4500,
				s_CT = 4500,
				s_CF = 1800,
				s_WS = 3375,
				s_SP = 5478.2;
				
		//定义固定增益对象 2014.11.16～2014.11.18重写结构
			var buffcat = ['ng_Y','ng_G','wg_L','wg_S',
							'ng_AP','ng_APc','ng_APs','wg_AP','wg_APc','wg_APs','wp_AP','zl_AP','zl_APc',
							'ng_HT','wg_HT','ng_CT','wg_CT','ng_CF','wg_CF','ng_PF','wg_PF','ng_PFc','wg_PFc',
							'ng_DF','wg_DF','ng_DFc','wg_DFc',
							'ty_SP','ty_WS',
							'ng_YC','ng_GC','wg_LC','wg_SC'];
			//ng_Y元气，ng_G根骨，wg_L力道，wg_S身法
			//ng_AP内功基础攻击点数，ng_APc内功基础攻击%，ng_APs内功易伤%
			//wg_AP外功基础攻击点数，wg_APc外功基础攻击%，wg_APs外功易伤%，wp_AP武器攻击
			//zl_AP基础治疗量点数，zl_APc基础治疗量%
			//ng_HT内功命中，wg_HT外功命中，ng_CT内功会心，wg_CT外功会心，ng_CF内功会效，wg_CF外功会效
			//ng_PF内功破防，wg_PF外功破防，ng_PFc内功破防%，wg_PFc外功破防%
			//ng_DFc内功防御降低%,wg_DFc内功防御降低%,ng_DF内功防御降低,wg_DF内功防御降低
			//ty_SP加速%，ty_WS无双%
			//ng_YC元气百分比,ng_GC根骨百分比,wg_LC力道百分比,wg_SC身法百分比
			var buff = [
				[//0feast:团队宴席	
					{},
					{ng_Y:122,ng_G:122,wg_L:122,wg_S:122,},//1芙蓉出水宴
				],
				[//1fish:帮会宴席
					{},
					{ng_HT:0.01,wg_HT:0.01,ty_WS:0.03}, //1蒸鱼菜盘
				],
				[//2sp1:食品辅助
					{},
					{ng_Y:73,}, //1佳·逍遥固元汤(元气)
					{ng_G:73,}, //2佳·白芷增骨汤(根骨)
					{wg_L:73,}, //3佳·安荣力劲汤(力道)
					{wg_S:73,}, //4佳·君子知身汤(身法)
				],
				[//3sp2:食品增强
					{},
					{ng_CF:195/s_CF},//1佳·合饼卷菜(会效)
					{ng_PF:195}, //2佳·虎皮凤爪(破防)
					{wg_CF:195/s_CF}, //3佳·佛手排骨(会效)
					{wg_PF:195}, //4佳·芋丝蒸肉糕(破防)
					{wg_AP:220}, //5佳·麻香软骨脆(外功基础)
					{wg_AP:256}, //6苍·麻香软骨脆(攻击)
					{ng_AP:308}, //7苍·走油蹄膀
					{zl_AP:607}, //8苍·葱爆肉丁(疗伤)
					{wg_PF:227}, //9苍·健体汤(破防)
					{ng_PF:227}, //10苍·提神汤(破防)
				],
				[//4yp1 :药品辅助
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
				[//5yp2 :药品增强
					{},
					{ng_CF:292/s_CF},//1尚·上品玉露丹(会效)
					{ng_CT:195/s_CT}, //2上品玉露散(会心)
					{ng_HT:195/s_HT}, //3中品聚元丹(命中)
					{ng_CF:292/s_CF},//4尚·上品万花丹(会效)
					{ng_CT:195/s_CT}, //5中品万花丹(会心)
					{ng_HT:195/s_HT}, //6中品聚神丹(命中)
					{wg_AP:385}, //7苍·上品亢龙丹(攻击)
					{ng_AP:461}, //8苍·上品展凤丹(攻击)
					{zl_AP:911}, //9苍·上品静心丸(疗伤)
					{wg_PF:195}, //10苍·健体香囊(破防)
					{ng_PF:195}, //11苍·提神香囊(破防)
				],
				[//6moshi :磨石
					{},
					{ng_AP:264}, //1内功
					{wg_AP:220}, //2外功
					{zl_AP:521}, //3治疗
				],
				[//7jz : 饺子
					{},
					{ng_Y : 25,ng_G:25,wg_L:2,wg_S:25}, //1戏凤饺
					{ng_Y : 15,ng_G:15,wg_L:15,wg_S:15}, //2煮烂饺子
				],
				[//8qiu : 五彩球
					{},
					{ng_AP : 170}, //1红球
					{wg_AP : 170,zl_AP:340}, //2蓝球
					{ng_AP : 170,wg_AP:170,zl_AP:340}, //3红蓝球
				],
				[//9sp : 特殊食物
					{},
					{wg_AP : 116,ng_AP:116},  //1红烧青鱼
				],
				[//10xiuqi : 袖气
					{},
					{ng_Y : 74,ng_G:74,wg_L:74,wg_S:74}, //1大袖气
					{ng_Y : 37,ng_G:37,wg_L:37,wg_S:37}, //2小袖气
				],
				[//11jiehuo : 戒火斩
					{},
					{wg_APs : 0.05,ng_APs : 0.05,}, //1大戒火
				 	{wg_APs : 0.03,ng_APs : 0.03,}, //2小戒火
				],
				[//12lei : 憾如雷
					{},
					{wg_AP : 217}, //憾如雷
				],
				[//13qichang : 气场
					{},
					{ng_CT:0.05,ng_CF:0.1},	//1破苍穹
					{wg_CT:0.05,wg_CF:0.1}, //2碎星辰
					{ng_CT:0.05,ng_CF:0.1,wg_CT:0.05,wg_CF:0.1}, //3破苍穹+碎星辰
				],
				[//14manwu : 曼舞
					{},
					{ws : 84/s_WS,} //曼舞
				],
				[//15kc : 枯残
					{},
					{wg_APs : 0.06,ng_APs : 0.06,} //枯残
				],
				[//16yj : 金刚怒目
					{},
					{ng_APc : 0.15,}, //金刚

				],
				[//17jy : 命陨
					{},
					{wg_APs: 0.1,}, //惊羽
				], 
				[//18cj : 梅隐香
					{},
					{wg_HT : 61/s_HT,wg_PFc : 0.2,}, //藏剑
				],
				[//19gb : 丐帮
					{},
					{wg_CT : 0.1,}, //丐帮
				],
				[//20buyu : 不语
					{},
					{ty_SP : 400/s_SP,}, //急速不语
					{ng_CT:200/s_CT,ng_CF:200/s_CF,wg_CT:200/s_CT,wg_CF:200/s_CF}, //会心不语
					{ng_AP:540,wg_AP:540}, //会心不语
				],
				[//21jilei : 激雷 8/30*100% ~ 20%外功破防
					{},
					{wg_PFc:0.0533},
				],
				[//22bx : 冰心 30/120*100% ~ 30%内功攻击
					{},
					{ng_APc:0.075},
				],
				[//23csy : 朝圣炎 8/150*100% ～ 30%基础
					{},
					{ng_APc:0.016,wg_APc:0.016,zl_APc:0.016},
				],
				[//24dq : 大旗  30/240*100% ~ 20%基础
					{},
					{ng_APc:0.025,wg_APc:0.025,zl_APc:0.025},
				],
				[//25tc : 破风+致残+致伤
					{},
					{wg_APs:0.10875},
				],
				[//26zf : 阵法
					{},
					{ng_APc:0.15,ng_HT:0.03,ng_PFc:0.2}, //1易经，天鼓雷音阵
					{ng_CT:0.08,ng_HT:0.03,ng_CF:0.1}, //2气纯,九宫八卦阵
					{ng_CT:0.03,ng_APc:0.05,ng_CF:0.1,ng_PFc:0.15}, //3毒经，万蛊噬心阵
					{ng_APc:0.05,ng_CT:0.08}, //4明教，炎威破魔阵
					{ng_APc:0.05,ng_PFc:0.2}, //5花间，七绝逍遥阵
					{ng_APc:0.075,ng_PFc:0.15}, //6冰心，九音惊弦阵
					{ng_YC:0.03}, //7天罗，千机百变阵
					
					{wg_CT:0.08,wg_HT:0.03,wg_CF:0.1}, //8剑纯，北斗七星阵
					{wg_APc:0.05,wg_PFc:0.2,wg_PF:600}, //9丐帮，降龙伏虎阵
					{wg_APc:0.05,wg_PFc:0.2,wg_LC:0.02}, //10傲血，卫公折冲阵
					{ng_SC:0.03,wg_APc:0.05,wg_CF:0.2}, //11藏剑，依山观澜阵
					{wg_LC:0.03,wg_HT:0.03,wg_PFc:0.1,wg_CT:0.025}, //12惊羽，流星赶月阵
					{wg_CT:0.03,wg_HT:0.03,wg_CF:0.1}, //13分山，锋凌横绝阵
					
					{zl_APc:0.15,ng_GC:0.03}, //14奶花，落星惊鸿阵
					{zl_APc:0.1,ng_GC:0.03}, //15奶毒，妙手织天阵
					{zl_APc:0.05,ng_GC:0.03}, //16奶秀，花月凌风阵
				],
				[//27焚影
					{},
					{ng_APs:0.05},
				],
				[//28花间
					{},
					{ng_APs:0.1},
				],
				[//29洗髓
					{},
					{ng_DFc:0.15},
				],
				[//30苍云
					{},
					{wg_APs:0.1},
				],
				[//31普渡+拿云
					{},
					{ng_APs:0.103},
				],
				[//32bx : 冰心代弦 15%阴性易伤
					{},
					{ng_APc:0.15},
				],
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
			
		//构造数据对象 - 2014.11.15～2014.11.18
			function JX3DPS(){
				var that = this;
			//职业
				this.role = window.ROLE;
				this.cat = window.CAT;
			//原始属性
				this.baseY = Number($("#baseY").val());
				this.baseG = Number($("#baseG").val());
				this.baseS = Number($("#baseS").val());
				this.baseL = Number($("#baseL").val());
				this.baseAP1 = Number($("#baseAP1").val());
				//this.baseMAP1 = Number($("#baseMAP1").val());
				this.baseAP2 =  Number($("#baseAP2").val());
				//this.baseMAP2 =  Number($("#baseMAP2").val());
				
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

				this.addBY = Number($("#addBY").val());
				this.addND = Number($("#addND").val());
				this.addZLS = Number($("#addZLS").val());

				this.addTX1= Number($("#addTX1").val());
				this.addTX2= Number($("#addTX2").val());
				this.addTX3 = Number($("#addTX3").val());
			//团队Buff索引取值
				this.raidZF = Number($("#raidZF").val());
				//this.raidZY = Number($("#raidZY input[name='raidZY']:checked").val());

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
				this.raidMW = $("#raidMW").prop('checked') ? 1 : 0;
				this.raidCHEN = $("#raidCHEN").prop('checked') ? 1 : 0;
				
				this.raidJG = $("#raidJG").prop('checked') ? 1 : 0;
				this.raidMY = $("#raidMY").prop('checked') ? 1 : 0;
				this.raidCJ = $("#raidCJ").prop('checked') ? 1 : 0;
				this.raidGB = $("#raidGB").prop('checked') ? 1 : 0;

				this.raidJL = $("#raidJL").prop('checked') ? 1 : 0;
				this.raidBX = $("#raidBX").prop('checked') ? 1 : 0;
				this.raidDX = $("#raidDX").prop('checked') ? 1 : 0;
				this.raidCSY= $("#raidCSY").prop('checked') ? 1 : 0;
				this.raidDQ = $("#raidDQ").prop('checked') ? 1 : 0;
				
				this.raidJH = Number($("#raidJH input[name='raidJH']:checked").val());
				this.raidKC = $("#raidKC").prop('checked') ? 1 : 0;
				this.raidCY = $("#raidCY").prop('checked') ? 1 : 0;

				this.raidFY = $("#raidFY").prop('checked') ? 1 : 0;
				this.raidHJ = $("#raidHJ").prop('checked') ? 1 : 0;
				this.raidTC = $("#raidTC").prop('checked') ? 1 : 0;

				this.raidXS = $("#raidXS").prop('checked') ? 1 : 0;
				this.raidHS = $("#raidHS").prop('checked') ? 1 : 0;
				
				this.raidCW = $("#raidCW").prop('checked') ? 1 : 0;
			//职业方案索引取值
				this.roleTZ = Number($("#roleTZ").val());
				//this.roleMJ = Number($("#roleMJ").val());
				//this.roleQX = Number($("#roleQX").val());
				this.roleFM = Number($("#roleFM").val());
			//计算过渡值 - 2014.11.18
				var buffValue = [this.addFeast,this.addFish,this.addSP1,this.addSP2,this.addYP1,this.addYP2,
				this.addMS,this.addJZ,this.addQQ,this.addSP,
				this.raidXQ,this.raidJH,this.raidL,this.raidQC,
				this.raidMW,this.raidKC,this.raidJG,this.raidMY,this.raidCJ,this.raidGB,
				this.addBY,this.raidJL,this.raidBX,this.raidCSY,this.raidDQ,this.raidTC,this.raidZF,
				this.raidFY,this.raidHJ,this.raidXS,this.raidCY,this.raidHS,this.raidDX
				];
				//！important --- 待添加阵眼+特效+橙武buff等

				function addBuff(buffcat){
					var zbuff = 0;
					for (i=0;i<buff.length;i++){
						zbuff += buff[i][buffValue[i]][buffcat];
					}
					return zbuff;
				};
				//武器平均攻击
					this.weapAP = (this.weapAP1 + this.weapAP2 ) / 2 + addBuff('wp_AP');
				//增益运算对象
					var adtBase = [this.baseY,this.baseG,this.baseL,this.baseS],
						adtProp = ['ng_Y','ng_G','wg_L','wg_S'],
						adtPPAD = ['ng_YC','ng_GC','wg_LC','wg_SC'];
				//基础属性增益点数 = 食品类 + BUFF类 
					this.adY = addBuff('ng_Y');
					this.adG = addBuff('ng_G');
					this.adL = addBuff('wg_L');
					this.adS = addBuff('wg_S');
				//基础属性增益百分比 = BUFF类 
					this.adYC = addBuff('ng_YC');
					this.adGC = addBuff('ng_GC');
					this.adLC = addBuff('wg_LC');
					this.adSC = addBuff('wg_SC');
				//副属性最终增益点数(含buff倍数加成)
					this.R_YADD = this.adY*(1+this.adYC);
					this.R_GADD = this.adG*(1+this.adGC);
					this.R_LADD = this.adL*(1+this.adLC);
					this.R_SADD = this.adS*(1+this.adSC);
				//主属性最终增益点数(含奇穴加成)
					this.R_PROPADD = addBuff(adtProp[adt[ROLE]['propAdCat']])*(1+adt[ROLE]['propCountAdd']);
				//propAP额外攻击&治疗量
					//额外治疗量 = 【填入根骨×(1+%阵法增益) + 增益根骨×(1+%奇穴增益)】× 职业属性加成 + 原始额外
					this.propAP = (adtBase[adt[ROLE]['propAdCat']]*(1+addBuff(adtPPAD[adt[ROLE]['propAdCat']]))+this.R_PROPADD)*adt[ROLE]['propApAdd'];
				//R_AP基础攻击 = （原始基础攻击 + 基础攻击增益点数 + 元气力道天然攻击加成）×（1+基础攻击增益百分比）
					//基础攻击增益点数 = 食品类 + BUFF类
					this.adAP1 = addBuff('ng_AP');
					this.adAP2 = addBuff('wg_AP');
					this.adAP3 = addBuff('zl_AP');
					//基础攻击增益百分比 = BUFF类 + 阵法
					this.adAP1c = addBuff('ng_APc');
					this.adAP2c = addBuff('wg_APc');
					this.adAP3c = addBuff('zl_APc');
					//天然加成攻击 = 增益力道/元气×力道/元气固定攻击加成
					//最终基础攻击 = （原始基础攻击 + 所有攻击值增益 + ( 所有力道值增益*(1+所有力道百分比增益) + 原始力道*所有力道百分比增益)*力道天然兑换攻击比 ）×（1+%基础攻击增益）
					this.R_AP1 = ( this.baseAP1 + this.adAP1 + (this.adY*(1+this.adYC) + this.baseY*this.adYC)*tyAdd.Y[0] ) * ( 1 + this.adAP1c);
					this.R_AP2 = ( this.baseAP2 + this.adAP2 + (this.adL*(1+this.adLC) + this.baseL*this.adLC)*tyAdd.L[0] ) * ( 1 + this.adAP2c);
					//原始基础治疗量 = 原始面板治疗量 - 原始额外治疗量
					this.baseAP3_X = Number($("#baseAP3_X").val());
					function GET_BASEZLAP(){
						if(ROLE=='nx'){
							return (that.baseAP3_X-adtBase[adt[ROLE]['propAdCat']]*adt[ROLE]['propApAdd'])/1.3027;
						}else{
							return (that.baseAP3_X-adtBase[adt[ROLE]['propAdCat']]*adt[ROLE]['propApAdd']);
						}
					};
					this.baseAP3 = GET_BASEZLAP();
					//基础治疗量
					function GET_RAP3(){
						var R_AP3;
						if(ROLE=='nx'){
							R_AP3 = (that.baseAP3 + that.adAP3 ) * ( 1 + 0.3027 + that.adAP3c);
						}else{
							R_AP3 = (that.baseAP3 + that.adAP3 ) * ( 1 + that.adAP3c);
						}
						return R_AP3;
					}
					this.R_AP3 = GET_RAP3();

				//R_MAP面板攻击 = 基础攻击 + 额外攻击
					this.R_MAP1 = this.R_AP1 + this.propAP;
					this.R_MAP2 = this.R_AP2 + this.propAP;
					this.R_MAP3 = this.R_AP3 + this.propAP;
				
				//R_HT命中 = 命中 + 命中总增益 + {技能加成}
					this.adHT1 = addBuff('ng_HT');
					this.adHT2 = addBuff('wg_HT');
					this.R_HT1 = this.baseHT1/100 + this.adHT1;
					this.R_HT2 = this.baseHT2/100 + this.adHT2;

				//R_MISS偏离率 = ([命中需求]-Z命中<0) ? 0 : ([命中需求]-Z命中)
					function GET_MISS(R_HT){
						var miss = [];
						for (var i=0;i<HT_NEED.length;i++) {
							miss[i] = (HT_NEED[i] - R_HT*100)<=0 ? 0 : (HT_NEED[i] - R_HT*100)/100;
						};
						return miss;
					};
					this.R_MISS1 = GET_MISS(that.R_HT1);
					this.R_MISS2 = GET_MISS(that.R_HT2);
				
				//R_WS无双 = 无双 + 无双增益
					this.adWS = addBuff('ty_WS');
					this.R_WS = this.baseWS/100 + this.adWS;
				//R_ST识破率 = ([无双需求]-Z无双<0) ? 0 : ([无双需求]-Z无双)
					function GET_ST(){
						var shipo = [];
						for (var i=0;i<WS_NEED.length;i++) {
							shipo[i] = (WS_NEED[i] - that.R_WS*100)<=0 ? 0 : (WS_NEED[i] - that.R_WS*100)/100;
						};
						return shipo;
					};
					this.R_ST = GET_ST();
				//R_CF会效 = 会效 + 会效总增益 + {技能加成}
					this.adCF1 = addBuff('ng_CF');
					this.adCF2 = addBuff('wg_CF');
					//最终会效 = 填入会效 + 会效增益%
					//+ 最终主属性增益点数 × 主属性职业会效加成
					//+ 最终主类型增益点数 × 通用属性加成
					this.CF1_now = this.baseCF1/100 + this.adCF1 + this.R_PROPADD*adt[ROLE]['propCFAdd']/s_CF + this.R_GADD*(1+addBuff('ng_GC'))*tyAdd.G[2]/s_CF;
					this.CF2_now = this.baseCF2/100 + this.adCF2 + this.R_PROPADD*adt[ROLE]['propCFAdd']/s_CF + this.R_SADD*(1+addBuff('wg_SC'))*tyAdd.S[2]/s_CF;
					function Round_CF(cf){
						if(cf<1.75){
							cf=1.75;
						}else if(cf>3){
							cf=3;
						}
						return cf;
					};
					this.R_CF1 = Round_CF(that.CF1_now);
					this.R_CF2 = Round_CF(that.CF2_now);
				//R_CT会心 = 会心 + 会心总增益 + {技能加成}
					this.adCT1 = addBuff('ng_CT');
					this.adCT2 = addBuff('wg_CT');
					function Round_CT(ct){
						if (ct > 1) {
							return 1;
						}
						else{
							return ct;
						}
					}
					//最终会心 = 填入会心 + 会心增益%
					//+ 主属性增益点数×（1+主属性点数倍数增益加成+职业奇穴主属性倍数增益）× 主属性职业会心加成
					//+ 主类型（根骨/身法）增益点数 × （1+属性点数倍数增益加成）× 通用属性加成
					this.CT1_now = that.baseCT1/100 + that.adCT1 + this.R_PROPADD*adt[ROLE]['propCTAdd']/s_CT + this.R_GADD*(1+addBuff('ng_GC'))*tyAdd.G[1]/s_CT;
					this.CT1_now = Round_CT(that.CT1_now);
					this.CT2_now = that.baseCT2/100 + that.adCT2 + this.R_PROPADD*adt[ROLE]['propCTAdd']/s_CT + this.R_SADD*(1+addBuff('wg_SC'))*tyAdd.S[1]/s_CT;
					this.CT2_now = Round_CT(that.CT2_now);
					function GET_CT(ct_now){
						var CT_space = [];
						for (i=0;i<that.R_ST.length;i++){
							if(CAT=='ng'){
								CT_space[i] = 1-that.R_MISS1[i]-that.R_ST[i];
							}else if(CAT=='wg'){
								CT_space[i] = 1-that.R_MISS2[i]-that.R_ST[i];
							}
						};
						var CT_true = [];
						for (j=0;j<CT_space.length;j++){
							CT_true[j] = ct_now>CT_space[j] ? CT_space[j] : ct_now;
						};
						return CT_true;
					};
					this.R_CT1 = GET_CT(that.CT1_now);
					this.R_CT2 = GET_CT(that.CT2_now);
				//R_PF破防 = (破防 + 破防增益 + 力道元气天然破防加成) * (1+破防百分比增益) + 属性破防增益
					this.adPF1 = addBuff('ng_PF');
					this.adPF1c = addBuff('ng_PFc');
					this.adPF2 = addBuff('wg_PF');
					this.adPF2c = addBuff('wg_PFc');
					//真实基础破防 = 填入破防 - 填入力道×职业属性加成
					this.rbasePF1 = this.basePF1 - this.baseY*adt[ROLE]['propPFAdd'];
					this.rbasePF2 = this.basePF2 - this.baseL*adt[ROLE]['propPFAdd'];
					//最终基础破防 = [真实基础破防 + ( 力道增益×(1+力道百分比增益) + 原始力道*力道百分比增益）*力道兑破防天然比 + 破防增益]×（1+最终破防值增益加成）
					this.R_basePF1 = ( rbasePF1 + (addBuff('ng_Y')*(1+addBuff('ng_YC'))+this.baseY*addBuff('ng_YC'))*tyAdd['Y'][3] + this.adPF1)*(1+this.adPF1c);
					this.R_basePF1 = ( rbasePF2 + (addBuff('wg_L')*(1+addBuff('wg_LC'))+this.baseL*addBuff('wg_LC'))*tyAdd['L'][3] + this.adPF2)*(1+this.adPF2c);
					//额外破防 = （填入力道+增益力道）×（1+%属性增益）× 职业属性破防加成
					this.R_propPF1 = (this.baseY + addBuff('ng_Y'))*(1+addBuff('ng_YC'))*adt[ROLE]['propPFAdd'];
					this.R_propPF2 = (this.baseL + addBuff('wg_L'))*(1+addBuff('wg_LC'))*adt[ROLE]['propPFAdd'];

					//最终破防 = 基础破防 + 额外破防
					this.R_PF1 = this.R_basePF1 + this.R_propPF1;
					this.R_PF2 = this.R_basePF2 + this.R_propPF2;
				
				//R_DF防御 = 怪面板防御*(1-所有怪防御减益百分比) - 防御等级减益
					function GET_DF(){
						var R_DF=[];
						if(CAT=='ng'){
							for (a=0;a<DF_TAR.length;a++){
								R_DF[a] = DF_TAR[a]*(1-addBuff('ng_DFc'))-addBuff('ng_DF');
							}
						}else if(CAT=='wg'){
							for (b=0;b<DF_TAR.length;b++){
								R_DF[b] = DF_TAR[b]*(1-addBuff('wg_DFc'))-addBuff('wg_DF');
							}
						}
						return R_DF;
					}
					this.R_DF = GET_DF();
				//R_PA破防加成 = （最终破防-目标内防）/目标内防系数
					function GET_PFX(pfvalue){
						var PFX = [];
						for (i=0;i<DF_TAR.length;i++){
							PFX[i] = (pfvalue - that.R_DF[i]) / PF_CFT[i];
						}
						return PFX;
					};
					this.R_PA1 = GET_PFX(that.R_PF1);
					this.R_PA2 = GET_PFX(that.R_PF2);
				//R_YS易伤加成
					this.adYS1 = addBuff('ng_APs');
					this.adYS2 = addBuff('wg_APs');
					this.R_YS1 = 1+this.adYS1;
					this.R_YS2 = 1+this.adYS2;
				//R_SP加速与技能实际运功时间方法
					this.adSP = addBuff('ty_SP');
					this.R_SP = this.baseSP/s_SP + this.adSP + adt[ROLE]['speedAd']/100; //ex:0.22
					//R运功实际时间 = floor( T/0.0625*1024/floor(S*10.24+S1+1024) )*0.0625
					//T = {} 技能初始释放时间  S=默认急速 S1 = 急速加成，转换为数值

					//获取技能当前运功时间方法
					function GET_SKT(skilltime){
						return Math.floor( skilltime / 0.0625*1024 / Math.floor(that.R_SP*1024+1024) )*0.0625;
					};
					//外功技能频率与平砍频率
					function GET_WGSKT(){
						return 16/Math.floor(1.5*16*1024/(1024+Math.floor(that.R_SP*1024)))
					}
					function GET_PKSKT(){
						return 16/Math.floor(1.625*16*1024/(1024+Math.floor(that.R_SP*1024)))
					}
				//萧南歌通用计算法
					function AP(x,y,z,w,a,b,c,origin){
						//origin自身默认整体基础攻击加成，冰心1.3027(剑舞30%)，其他职业一般为1
						//a技能秘籍加成
						//x技能面板攻击加成，y技能基础攻击加成，z技能固定伤害，

						
						var MAP = that.R_AP1*origin+that.propAP;  //面板攻击
						var AP = that.R_AP1*origin; //基础攻击
						var base = z; //技能固定伤害
						//技能伤害=（面板攻击*技能加成+基础攻击*技能基础攻击加成+技能固定伤害）*（1+秘籍伤害加成）*（1+奇穴伤害加成）* (1+破防加成)
						var SK_AP = ( MAP*(1+x) + AP*(1+y) + base ) * ( 1 + z) * (1 + w) * (1+that.R_PA1);
						//技能期望伤害=技能伤害*[（会心率*会效率+不会心+识破率*0.25]
						/*var X*/



					}
					
			//计算方法 - 2014.11.17--2014.11.22
				this.dpsMethod = Number($("#dpsMethod").val());
				this.MethodList = {
					//冰心----------------
						bx : [
						//0萧南歌·新妆
							function(){
								
							}
						//1萧南歌·玉素
							function(){
								
							}
						//2莫问·KAP
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},	
						//3言秀·新妆
							function(){ 
								//定义求单技能预期
								function SK_AP(a,b,c,d,e){
									var SK_AP=[];
									for (x=0;x<LIST.length;x++){
										SK_AP[x] = (a*(that.propAP+that.R_AP*1.3027)+b)*that.R_PA1[x]*(1-that.R_MISS1[x]-that.R_ST[x]+that.R_ST[x]*0.25+GET_CT(that.CT1_now+c)[x]*(Round_CF(that.R_CF1+d)-1))*that.R_YS1*e;
									}
									return SK_AP;
								};
								//定义求最终DPS预期
								function SK_DPS(x){
									var SK_DPS=[];
									for (i=0;i<LIST.length;i++){
										SK_DPS[i] = Math.round((Q1[i]+Q2[i]*(12-GET_SKT(1.5))/GET_SKT(0.8)+x[i]*12/GET_SKT(3))/12);
									}
									return SK_DPS;
								};
								//取值参数
									var Q1_E = 1.3+0.1*that.roleTZ,
										Q2_E = (1+adSkill.bx.daixian[0]+0.05*that.raidCW)*1.208;
									var Q1 = SK_AP(1.38,256,0,0,Q1_E),
										Q2 = SK_AP(0.396,201,0.1,0.1,Q2_E),
										Q3 = SK_AP(0.444,312,0,0,1),
										Q33 = SK_AP(0.592,416,0,0,1);
									console.log('Q1=' + SK_DPS(Q1));
									console.log('Q2=' + SK_DPS(Q2));
									console.log('Q3=' + SK_DPS(Q3));
									console.log('Q33=' + SK_DPS(Q33));
								//判断技能附魔
									if(that.roleFM==1){
										return SK_DPS(Q33);
									}else{
										return SK_DPS(Q3);
									}
							},
						//4言秀·玉素
							function(){
								//定义单技能期望
									function SK_AP(a,b,c,d,e,f){
										var SK_AP=[];
										for (x=0;x<LIST.length;x++){
											SK_AP[x] = (a*(that.propAP+that.R_AP*1.3027)+b)*that.R_PA1[x]*(1-that.R_MISS1[x]-that.R_ST[x]+that.R_ST[x]*0.25+(GET_CT(that.CT1_now+c)[x]+d)*(Round_CF(that.R_CF1+e)-1))*that.R_YS1*f;
										}
										return SK_AP;
									}
								//定义求最终DPS预期
									function SK_DPS(x,y,z,w){
										var SK_DPS=[];
										for (i=0;i<LIST.length;i++){
											SK_DPS[i] = Math.round((W1[i]+W2[i]*9+W3[i]+W4[i]+W5[i]*x+W6[i]*y+W7[i]*z)/(GET_SKT(3)*w+GET_SKT(1.5)));
										}
										return SK_DPS;
									};
								//取值参数
									var W1_E = (1.1+adSkill.bx.jianqi[0])*1.25,
										W2_E = (1+adSkill.bx.daixian[0]+0.05*that.raidCW);
									var W1= SK_AP(0.87,876,0,0.05,0,W1_E),	//剑气
										W2= SK_AP(0.396,201,0.1,0,0.1,W2_E),	//代弦
										W3= SK_AP(0.148,104,0.1,0,0.1,1),	//1急曲
										W4= SK_AP(0.296,208,0.1,0,0.1,1),	//2急曲
										W5= SK_AP(0.444,312,0.1,0,0.1,1),	//3急曲
										W6= SK_AP(2.664,1872,0.1,0,0.1,1);	//爆3急曲
										W7= SK_AP(3.552,2496,0.1,0,0.1,1);	//爆4急曲
										console.log('W1=' + W1);
										console.log('W2=' + W2);
										console.log('W3=' + W3);
										console.log('W4=' + W4);
										console.log('W5=' + W5);
										console.log('W6=' + W6);
										console.log('W7=' + W7);
								//判断技能附魔
									if(that.roleFM==1){
										return SK_DPS(0,1,0,3);
									}else{
										return SK_DPS(1,0,1,4);
									}
							},
						],
					//花间----------------
						hj : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//毒经----------------
						dj : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//傲血----------------
						ax : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//焚影----------------
						fy : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//易经----------------
						yj : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//气纯----------------
						qc : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF1-1)*that.R_CT1[i]+that.R_HT1+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//剑纯----------------
						jc : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//天罗----------------
						tl : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP1*(1+that.R_PA1[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//惊羽----------------
						jy : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//藏剑----------------
						cj : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//丐帮----------------
						gb : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//分山----------------
						fs : [
							function(){
								return ;
							},
							function(){
								return ;
							},
							function(){
								var Z=[];
								for (i=0;i<LIST.length;i++){
									Z[i] = Math.round(that.R_MAP2*(1+that.R_PA2[i])*((that.R_CF2-1)*that.R_CT2[i]+that.R_HT2+0.75*that.R_WS+(1-HT_NEED[i]/100-0.75*WS_NEED[i]/100)));
								}
								return Z;
							},
						],
					//奶秀----------------
						nx : [
							function(){ //0言秀·云裳
								var nxArr = [];
								//翔舞+上元
								nxArr[0]=Math.round((that.R_MAP3*0.083+200)*(1+that.CT1_now*(that.R_CF1-1))*(1+adSkill.nx.xiangwu[0])*that.addZLS);
								//翔鸾舞柳
								nxArr[1]=Math.round((that.R_MAP3*0.2+200)*(1+that.CT1_now*(that.R_CF1-1))*that.addZLS);
								//上元点鬟
								nxArr[2]=Math.round((that.R_MAP3*0.083+200)*(1+that.CT1_now*(that.R_CF1-1))*(1+adSkill.nx.shangyuan[0])*that.addZLS);
								//上元末跳
								nxArr[3]=Math.round((that.R_MAP3*0.417+640)*(1+that.CT1_now*(that.R_CF1-1))*(1+adSkill.nx.shangyuan[0])*that.addZLS);
								//王母挥袂
								nxArr[4]=Math.round((that.R_MAP3*0.7812+1622)*(1+(that.CT1_now+adSkill.nx.wangmu[1])*(that.R_CF1-1))*that.addZLS*(1+0.05*that.raidCW));
								//风袖低昂
								nxArr[5]=Math.round((that.R_MAP3*0.9896+702)*(1+that.CT1_now*(that.R_CF1-1))*that.addZLS);
								//回雪飘摇
								nxArr[6]=Math.round((that.R_MAP3*0.25+382)*(1+(that.CT1_now)*(that.R_CF1-1))*that.addZLS*(1+adSkill.nx.huixue[0]+(0.05*that.raidCW)));
								//玲珑箜篌
								nxArr[7]=Math.round((0.25*that.R_AP3+0.083*that.propAP+201)*(1+(that.CT1_now)*(that.R_CF1-1))*that.addZLS);
								return nxArr;
							},
						],
					//奶花----------------
						nh : [
							function(){
								
							},
						],
					//奶毒----------------
						nd : [
							function(){
								
							},
						]
				};
				this.go = this.MethodList[ROLE][this.dpsMethod];
			}

		//计算事件绑定 - 2014.11.17
			$("#go").on('click',function(){
				//判定是否已选择职业
				if(ROLE == undefined){
					alert('你还未选择职业！');
				}else{
					//创建实例
					window.ex = new JX3DPS();
					console.log(ex);

					//运算获取方案结果
					window.finalist = ex.go();

					//添加时间戳
					var time = new Date();
					var now = time.getFullYear() + '/' + (time.getMonth()+1) + '/' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
					window.finalist[8] = now;

					//判断计算有效性
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
					//console.log(finalist);

					//数据获取成功/错误提示
					if (validate_finalist()){
						showdate();
					}else{
						errordate();
					}
					
					//添加入数据面板
					$("#date td").html(function(i,value){
						var whichMethod = $("#dpsMethod").val();
						if(whichMethod=='2'){
							return finalist[i]+'K';
						}
						return finalist[i];
					})
				}
			})

	//*存储------------------------------------------
		//界面切换 - 2014.11.19
			$("#all").on('click',function(){
				$("#dpsForm").hide();
				$("#datelist").show();
			})
			$("#back-dps,#logo").on('click',function(){
				$("#datelist").hide();
				$("#dpsForm").show();
			})

		//创建存储对象 - 2014.11.19
			var date = {
				dps:[],
				nx:[],
				nh:[],
				nd:[],
			}
								
		//数据处理 - 2014.11.19~20
			//判断存储位置
				var dpsLocation=window.localStorage;
				$("input[name='storage']").change(function(){
					if($("#localstorage").prop('checked')){
						dpsLocation=window.localStorage;
					}else{
						dpsLocation=window.sessionStorage;
					}
				})
				
			//保存事件启动

				//动态添加数据
				function ADD_Line(role,z){
					var which_append = '.storage-date:eq('+z+') tbody tr:first';
					$(which_append).clone().insertBefore(which_append);
				}
				function ADD_Date(z){
					var which_adddate = '.storage-date:eq('+z+') tbody tr'
					$(which_adddate).eq(0).children('td').html(function(index){
						return finalist[index];
					})
				}

				$("#save").on('click',function(){
					//将表格中的数据或此时的finalist数据添加到date对象中
						if(window.finalist==undefined){
							alert('你还未生成数据');
						}else{
							//根据类别推入子对象
							switch(ROLE){
								case 'nx':
									date.nx.push(finalist);
									ADD_Line('nx',1);
									ADD_Date(1);
									break;
								case 'nh':
									date.nh.push(finalist);
									ADD_Line('nh',2);
									ADD_Date(2);
									break;
								case 'nd':
									date.nd.push(finalist);
									ADD_Line('nd',3);
									ADD_Date(3);
									break;
								default:
									date.dps.push(finalist);
									ADD_Line('dps',0);
									ADD_Date(0);
									break;
							}

							//将date对象转换为JSON存储到Storage
							var dateJSON = JSON.stringify(date);
							dpsLocation.setItem('jx3dps',dateJSON);

							//判断浏览器是否支持存储，并出具提示信息
							if(window.localStorage){
								$("#save-success").slideDown(200);
								setTimeout(function(){
									$("#save-success").fadeOut();
								},800)
							}else{
								$("#save-error").show(200);
								setTimeout(function(){
									$("#save-error").fadeOut();
								},2000)
							}

						}
				})

		//加载storage数据 - 2014.11.20重写优化
			function LOAD_DATE(){
				//读取storage中的数据
					var stodate = dpsLocation['jx3dps'];
				//将JSON转换为JS对象
					var newdate = JSON.parse(stodate);
				//动态创建克隆html元素 + 遍历对象对应的数组添加到表格中
					function INDEX_DATE(){
						var dateArr = ['dps','nx','nh','nd'];
						for (z=0;z<4;z++){
							var x = dateArr[z];
							//创建克隆html元素
							function creatLine(){
								for (i=0;i<newdate[x].length-1;i++){
									var which_append = '.storage-date:eq('+z+') tr:last';
									$(which_append).clone().insertAfter(which_append);
								}
							}
							creatLine();

							//遍历添加数据
							function addDATE(){
								var j=newdate[x].length;
								var which_adddate = '.storage-date:eq('+z+') tbody tr'
								for(i=0;i<newdate[x].length;i++){
									j--;
									$(which_adddate).eq(i).children('td').html(function(index){
										return newdate[x][j][index];
									})
								}
							}
							addDATE();

						}
					}
					INDEX_DATE();
					
			}
			
			$(window).load(LOAD_DATE);

	//*导入------------------------------------------
		//配装器导入 - 2014.11.23
			$("#pz-date").click(function(event) {
				//获取配装方案ID
				var pzID = prompt('请填写在配装器网站上保存的方案索引编号，可在用户设置-方案设置中查看');
				var pzURL = 'http://www.j3pz.com/getAttriById.php?id='+pzID+'&jsoncallback=?';
				//访问API获取数据
				$.getJSON(pzURL,function(json){
					//如果取不到数据
					if (json['error'] == 'true'){
						alert('此方案在配装器上尚未保存数值');
						return;
					}
					//获取职业对接并更新界面
					var pzROLE = {
						bingxin : 'bx',
						huajian : 'hj',
						dujing : 'dj',
						aoxue : 'ax',
						fenying : 'fy',
						yijin : 'yj',
						zixia : 'qc',
						taixu : 'jc',
						tianluo : 'tl',
						jingyu : 'jy',
						cangjian : 'cj',
						xiaochen : 'gb',
						fenshan : 'fs',
						yunchang : 'nx',
						lijing : 'nh',
						butian : 'nd',
					}
					window.ROLE = pzROLE[json.menpai];
					$("#role").val(ROLE).trigger('change');
					
					//遍历获取值，未定义项重定义为0，更改数据类型字符串->数字
					var pzBase = [json.spunk,json.spirit,json.sthength,json.agility,
					json.baseAttack,json.baseHeal,json.heal,
					json.hit,json.crit,json.critEffect,json.overcome,
					json.strain,json.haste];
					for (i=0;i<pzBase.length;i++){
						if (pzBase[i]==undefined){
							pzBase[i]=0;
						}
						pzBase[i] = parseFloat(pzBase[i]);
					}

					//创建新的实例，属性对应变更
					window.ex = new JX3DPS();
					ex.baseY = pzBase[0];
					ex.baseG = pzBase[1];
					ex.baseL = pzBase[2];
					ex.baseS = pzBase[3];
					ex.baseAP1 = pzBase[4];
					ex.baseAP2 = pzBase[4];
					ex.baseAP3 = pzBase[5];
					ex.baseAP3_X = pzBase[6];
					ex.baseHT1 = pzBase[7];
					ex.baseHT2 = pzBase[7];
					ex.baseCT1 = pzBase[8];
					ex.baseCT2 = pzBase[8];
					ex.baseCF1 = pzBase[9];
					ex.baseCF2 = pzBase[9];
					ex.basePF1 = pzBase[10];
					ex.basePF2 = pzBase[10];
					ex.baseWS = pzBase[11];
					ex.baseSP = pzBase[12];
					console.log(ex);

					//更新界面属性
					function RefreshUI(item){
						var _item = '#'+item;
						$(_item).val(ex[item]).trigger('change');
					};
					var itemlist = ['baseY','baseG','baseL','baseS','baseAP1','baseAP2','baseAP3_X','baseHT1','baseHT2','baseCT1','baseCT2','baseCF1','baseCF2','basePF1','basePF2','baseWS','baseSP'];
					for (j=0;j<itemlist.length;j++){
						RefreshUI(itemlist[j]);
					}

				})
			});

		//本地导入
		
			




})