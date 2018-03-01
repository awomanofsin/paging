/**
 * 分页导航固定式函数,本js全局变量前缀是paging font-weight:bold;
 */
var paging_N =1 ;
var paging_Size = 10;
var paging_total;
var paging_totalCount;
var paging_onclickFunc;
var paging_divName;
var paging_font_style = "color: #8c8c8c;margin-top: 4px;text-align: center;font-size: 14px;";
var paging_font_focusStyle = "display:inline;font-size: 12px;font-weight:bold;";
function bodyOnload(){
	function test(n,s){
		document.getElementsByName("test")[0].innerHTML = "页码："+n+"，页量："+s;
	}
	paging_N=1;
	paging_Size=10;
	paging_totalCount =1023;
	paging_divName = "display";
	paging_onclickFunc = function (pageN,pageSize,anoPra){
		test(pageN,pageSize);
	}
	createPagesNav(paging_totalCount,paging_Size,paging_onclickFunc,paging_divName);
}
function createPagesNav(totalCount,pageSize,onclickFunc,divName){
	paging_totalCount = totalCount;
	paging_onclickFunc = onclickFunc;
	paging_divName = divName;
	var pageNav_ul = createPageLis();
	var paglis_div = document.createElement("div");
	paglis_div.setAttribute("style", "display: inline;");
	paglis_div.setAttribute("name", "paglis_div");
	paglis_div.innerHTML = pageNav_ul.outerHTML;
	
	div_Parent.appendChild(paglis_div);
	//左边标签说明
	var totalInfo = document.createElement("div");
	totalInfo.setAttribute("style", "display:inline;"+paging_font_style);
	totalInfo.innerHTML = "&nbsp;&nbsp;合计&nbsp;"+totalCount+"&nbsp;条记录";
	
	//每页多少条下拉框
	var selc_div = document.createElement("div");
	selc_div.setAttribute("style", "display:inline;");
	//每页条数说明
	var sizeInfo = document.createElement("span");
	sizeInfo.setAttribute("style", paging_font_style);
	sizeInfo.innerHTML = "&nbsp;&nbsp;每页条数&nbsp;&nbsp;";
	selc_div.appendChild(sizeInfo);
	var selc = document.createElement("select");
	selc.setAttribute("name", "pageSize_slct");
	selc.setAttribute("onchange", "selcChange(this)");
	
	for(var i=1;i<=5;i++){
		var opt_i = document.createElement("option");
		opt_i.innerHTML = i*10;
		selc.appendChild(opt_i);
	}
	selc_div.appendChild(selc);
	//加入跳转至div
	var jumpto_div = document.createElement("div");
	jumpto_div.setAttribute("style", "display: inline;");
	var jumpto_hint = document.createElement("span")
	jumpto_hint.innerHTML = "&nbsp;&nbsp;&nbsp;跳转至&nbsp;&nbsp;"; 
	jumpto_hint.setAttribute("style",paging_font_style);
	jumpto_div.appendChild(jumpto_hint);
	var jumpto_input = document.createElement("input");
	jumpto_input.setAttribute("type", "text");
	jumpto_input.setAttribute("name", "jumpto_input");
	jumpto_input.setAttribute("value", "1");
	jumpto_input.setAttribute("style", paging_font_style+";width:50px;border:none;");
	jumpto_div.appendChild(jumpto_input);
	var bton_span = document.createElement("span");
	var jumpto_bton = document.createElement("button");
	bton_span.appendChild(jumpto_bton);
	jumpto_bton.innerHTML = "<span class='glyphicon glyphicon-play' style='color: #8c8c8c;'></span>";
	jumpto_bton.setAttribute("style","border: none;");
	jumpto_bton.setAttribute("onclick","getInputPageN()");
//	jumpto_bton.setAttribute("style","border:0;");
	jumpto_div.appendChild(bton_span);
	//加入到分页导航块中
	div_Parent.innerHTML += selc_div.outerHTML;		//页码容量下拉选择
	div_Parent.innerHTML += jumpto_div.outerHTML;	//调整页面输入
	div_Parent.innerHTML += totalInfo.outerHTML;
	showNear5Pages(1,paging_total);
}

//为翻页导航加上链接
function getNavAinLi(href,innerhtml,parLi) {
	var a = document.createElement("a");
	a.setAttribute("href", href);
	a.innerHTML = innerhtml;
	parLi.appendChild(a);
}

//单击某一页码：页码范围更新(改变css样式)
function showNear5Pages(pageNo,pageTotal){
	console.info("paging_N:"+paging_N);
	var nav_lis = document.getElementsByName("nav_li");
	if(pageTotal>5){
		//找到li_plot和nav_li
		var li_plots = document.getElementsByName("li_plot");
		//初始化所有的li不显示
		for(var i=1;i<pageTotal-1;i++){
			nav_lis[i].setAttribute("style","display:none;font-weight:bold;");
		}
		//两侧的省略号显示
		li_plots[0].setAttribute("style","display:inline;font-weight:bold;font-size: 12px;");
		li_plots[1].setAttribute("style","display:inline;font-weight:bold;font-size: 12px;");
		var page_left = pageNo-2;
		var page_right = pageNo+2;
		for(var i =page_left-1;i<=page_right-1;i++){
			if(nav_lis[i]!=undefined && nav_lis[i]!=null){
				nav_lis[i].setAttribute("style","display:inline;font-size: 12px;");
			}
		}
		if(page_left<=2){
			li_plots[0].setAttribute("style","display:none;font-weight:bold;");
		}
		if(page_right>=pageTotal-1){
			li_plots[1].setAttribute("style","display:none;font-weight:bold;");
		}
		nav_lis[paging_N-1].setAttribute("style",paging_font_focusStyle);
	}else {
		//选中页码加粗,同时其他页码样式还原
		for(var i = 0;i<paging_total;i++){
			nav_lis[paging_N-1].setAttribute("style",paging_font_focusStyle);
			if(paging_N-1!=i){
				nav_lis[i].setAttribute("style","display:inline;font-size: 12px;");
			}
		}
	}
}
//当页码或页容量改变时，触发这些操作
function no_sizeChange(li_n){
	
	//获取单击页码选中值
	paging_N = parseInt(li_n.children[0].innerHTML, 10);
	//页码显示范围变化
	showNear5Pages(paging_N,paging_total);
	//触发页面切换
	paging_onclickFunc(paging_N,paging_Size);
}
//单击前后页
function nav_sideOnclick(li_side) {
	//获取pageSize
//	pageSize = document.getElementsByName("pageSize_slct")[0].value;
	if(li_side.id=="pageNavLeft"){
		paging_N = paging_N-1;
	}
	if(li_side.id=="pageNavRight"){
		paging_N = paging_N+1;
	}
	if(paging_N<=0||paging_N>paging_total){
		return;
	}else{
		//页码显示范围变化
		showNear5Pages(paging_N,paging_total);
		//触发页面切换
		paging_onclickFunc(paging_N,paging_Size);
//		var ajaxUrl = getUrl+deviceId+"&pageNo="+pageNo+"&pageSize="+pageSize;
//		sendPageReq(pageNo, pageSize,ajaxUrl,ajaxSuccessFunc);
	}
}
//多选框选择事件
function selcChange(selc){
	paging_N = 1;
	paging_Size = document.getElementsByName("pageSize_slct")[0].value;
	paging_total = getPageTotal(paging_Size, paging_totalCount);
	var paglis_div = document.getElementsByName("paglis_div")[0];
	paglis_div.innerHTML = createPageLis().outerHTML;
	showNear5Pages(1,paging_total);
	//触发页面切换
	paging_onclickFunc(paging_N,paging_total);
	//页码显示
	var input = document.getElementsByName("jumpto_input")[0];
	input.value = paging_N;
}
//跳转页跳转按钮单击事件
function getInputPageN() {
	var input = document.getElementsByName("jumpto_input")[0];
	var n = parseInt(input.value,10);
	console.info("input_N:"+n);
	if(isNaN(n)){
		paging_N = 1;
	}else if(n<=0){
		paging_N = 1;
	}else if(n>paging_total){
		paging_N=paging_total;
	}else{
		paging_N = n;
	}
	showNear5Pages(paging_N,paging_total);
	//触发页面切换
	paging_onclickFunc(paging_N,paging_total);
	//页码显示
	input.value = paging_N;
}
//计算一共多少页
function getPageTotal(pageSize,totalCount) {
	if(totalCount==0){
		return 1;
	}
	console.info("pageSize:"+pageSize+",total:"+totalCount+"=="+Math.ceil(totalCount/pageSize));
	return Math.ceil(totalCount/pageSize);
}

//创建分页li
function createPageLis(){
	//计算有多少页
	paging_total = getPageTotal(paging_Size,paging_totalCount);
    div_Parent = document.getElementsByName(paging_divName)[0];
	//创建分页ul标签
	var pageNav_ul = document.createElement("ul");
	pageNav_ul.setAttribute("name", "pagination");
	pageNav_ul.setAttribute("class",  "pagination");
	pageNav_ul.setAttribute("style",  "display:inline;");
	//加入左翻页标签 id = pageNavLeft
	var li_left = document.createElement("li");
	li_left.setAttribute("id", "pageNavLeft");
	li_left.setAttribute("style", "font-size: 12px;");
	getNavAinLi("#prev", "&laquo;", li_left);
	li_left.setAttribute("onclick", "nav_sideOnclick(this)");
	
	pageNav_ul.appendChild(li_left);
	for(var i =1;i<=paging_total;i++){
		var li_n = document.createElement("li");
		li_n.setAttribute("name", "nav_li");
		li_n.setAttribute("style", "font-size: 12px;");
		//选中页码加粗
		if(i==1){li_n.setAttribute("style",paging_font_focusStyle);}
		getNavAinLi("#page="+i, i, li_n);
//		li_n.setAttribute("onclick", "nav_LiOnclick(this)");
		li_n.setAttribute("onclick", "no_sizeChange(this)");
		//创建省略号li
		if(paging_total>5){
			if(i==2||i==paging_total){
				var li_plot = document.createElement("li");
				li_plot.setAttribute("name", "li_plot");
				li_plot.setAttribute("style", "font-weight:bold;font-size: 12px;");
				getNavAinLi("#···", "···", li_plot);
				pageNav_ul.appendChild(li_plot);
			}
		}
		pageNav_ul.appendChild(li_n);
	}
	//下一页
	var li_right = document.createElement("li");
	li_right.setAttribute("id", "pageNavRight");
	li_right.setAttribute("style", "font-size: 12px;");
	getNavAinLi("#next", "&raquo;", li_right);
	li_right.setAttribute("onclick", "nav_sideOnclick(this)");
	pageNav_ul.appendChild(li_right);
	return pageNav_ul;
}

