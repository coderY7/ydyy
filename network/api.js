const http = uni.$u.http

// post请求，获取菜单
//export const postMenu = (params, config = {}) => http.post("/ebapi/public_api/index", params, config)
// get请求，获取菜单，注意：get请求的配置等，都在第二个参数中，详见前面解释
//export const getMenu = (data) => http.get("/ebapi/public_api/index", data)

//商家预付款
export const businessprepay=(params, config = {}) => http.post("mzato/businessprepay", params, config)
export const sendmessage=(params, config = {}) => http.post("mzato/main/app/sendmessage", params, config)
//永续采购 流程图 公用接口
export const commonMain=(params, config = {}) => http.post("mzato/main", params, config)

//手机验证码
export const bindphone=(params, config = {}) => http.post("mzato/main/app/bindphone", params, config)
//用户注册接口
export const usercheck=(params, config = {}) => http.post("mzato/main/app/usercheck", params, config)
//检测门店是否在线门店接口
export const ckonlinefd=(params, config = {}) => http.post("mzato/main/app/ckonlinefd", params, config)
//用户验证
export const usercheckapp=(params, config = {}) => http.post("mzsale/web/login/usercheckapp", params, config)
//第三方登录
export const logintype=(params, config = {}) => http.post("mzato/main/app/logintype", params, config)
//
export const sendCheck=(params, config = {}) => http.post("mzato/main/app/sendCheck", params, config)
//微信获取openid
export const getopenid=(params, config = {}) => http.post("mzato/main/app/getopenid", params, config)

//三方验证
export const userfast=(params, config = {}) => http.post("mzato/main/app/userfast", params, config)
//登录日志
export const getlogin=(params, config = {}) => http.post("mzato/main/app/getlogin", params, config)
//问题反馈
export const getQuestion=(params, config = {}) => http.post("mzato/main/app/getQuestion", params, config)
//公告拉取,验收完成处理
export const oaNoticec=(params, config = {}) => http.post("mzato/main/app/oaNoticec", params, config)
//获取最新工作信息
export const oaWorkFlow=(params, config = {}) => http.post("mzato/main/app/oaWorkFlow", params, config)
// app获取首页仪表盘分析数据
export const getpctodayssale=(params, config = {}) => http.post("mzato/main/app/getpctodayssale", params, config)
//工作流快速处理
export const oaWorkFlowWCk=(params, config = {}) => http.post("mzato/main/app/oaWorkFlowWCk", params, config)
//公告内容预览
export const getnotice=(params, config = {}) => http.post("mzato/main/app/getnotice", params, config)
//公告回复操作
export const oaNoticeRey=(params, config = {}) => http.post("mzato/main/app/oaNoticeRey", params, config)
//应用检查更新
export const appCheckVersion=(params, config = {}) => http.post("mzato/main/app/appCheckVersion", params, config)
//工作流内容预览
export const getDJdata=(params, config = {}) => http.post("mzato/main/app/getDJdata", params, config)
//工作流内容处理
export const oaNoticeCk=(params, config = {}) => http.post("mzato/main/app/oaNoticeCk", params, config)
//OA与APP获取必要信息
export const getother=(params, config = {}) => http.post("mzato/main/app/getother", params, config)

//商品采购接口
//更新商店信息
export const getFenDian=(params, config = {}) => http.post("mzato/main/app/getFenDian", params, config)
//商品上传更新
export const uploadgoshoping=(params, config = {}) => http.post("mzato/main/app/uploadgoshoping", params, config)
//在线查找商品
export const searchGoods=(params, config = {}) => http.post("mzato/main/app/searchGoods", params, config)
//在线查找商家
export const searchSupplier=(params, config = {}) => http.post("mzato/main/app/searchSupplier", params, config)
//更新供货方式信息
export const getSupplyType=(params, config = {}) => http.post("mzato/main/app/getSupplyType", params, config)
//更新部门信息
export const getDepart=(params, config = {}) => http.post("mzato/main/app/getDepart", params, config)

//报表查询接口
export const getcolumns=(params, config = {}) => http.post("mzsale/web/report/condition/getcolumns", params, config)
//更新商家信息
export const getSupplier=(params, config = {}) => http.post("mzato/main/app/getSupplier", params, config)
//商家销售
export const checkSjSale=(params, config = {}) => http.post("mzato/main/app/checkSjSale", params, config)
//收银缴款查询
export const getQuerySyySaleJK=(params, config = {}) => http.post("mzato/main/app/getQuerySyySaleJK", params, config)
//销售日报
export const saleCWbb=(params, config = {}) => http.post("mzato/main/app/saleCWbb", params, config)
//部门分析
export const queryBMSalebb=(params, config = {}) => http.post("mzato/main/app/queryBMSalebb", params, config)
//大类分析
export const fdSuperSale=(params, config = {}) => http.post("mzato/main/app/fdSuperSale", params, config)
//门店分析
export const fdSaleAnalyze=(params, config = {}) => http.post("mzato/main/app/fdSaleAnalyze", params, config)
//大类指标
export const fdSPTypeAnalyze=(params, config = {}) => http.post("mzato/main/app/fdSPTypeAnalyze", params, config)
//应付账款
export const cwsjjxcInfo=(params, config = {}) => http.post("mzato/main/app/cwsjjxcInfo", params, config)
//商品详情
export const spkcinfo=(params, config = {}) => http.post("mzato/main/app/spkcinfo", params, config)
//商品库存详情
export const qySpkcinfo=(params, config = {}) => http.post("mzato/main/app/qySpkcinfo", params, config)
//销售客单统计
export const custombb=(params, config = {}) => http.post("mzato/main/app/custombb", params, config)
//顾客消费分析
export const query002=(params, config = {}) => http.post("mzato/main/app/query002", params, config)
//商品销售综合
export const querySPSalebb=(params, config = {}) => http.post("mzato/main/app/querySPSalebb", params, config)
//实时获取报表数据
export const getAPPSaleReport=(params, config = {}) => http.post("mzato/main/app/getAPPSaleReport", params, config)
//获取采购数据
export const getCGDdata=(params, config = {}) => http.post("mzato/main/app/getCGDdata", params, config)
//验收完成处理
export const getCGDdataCK=(params, config = {}) => http.post("mzato/main/app/getCGDdataCK", params, config)
//获取实时报表数据
export const getToDaySale=(params, config = {}) => http.post("mzato/main/app/getToDaySale", params, config)
//综合报表
export const reportForm=(params, config = {}) => http.post("mzato/main/app/reportForm", params, config)

//商品补货接口
//离线上传补货单
export const uploadList=(params, config = {}) => http.post("mzato/main/app/uploadList", params, config)
//获取永续补货数据
export const getYXBHData=(params, config = {}) => http.post("mzato/main/app/getYXBHData", params, config)

//商品入库
//更新仓库信息
export const getCheckStorage=(params, config = {}) => http.post("mzato/main/app/getCheckStorage", params, config)
//离线上传入库单
export const uploadstorage=(params, config = {}) => http.post("mzato/main/app/uploadstorage", params, config)
//查询商品库存概况
export const getGoodsStock=(params, config = {}) => http.post("mzato/main/app/getGoodsStock", params, config)
//商品拣货处理
export const getPickArea=(params, config = {}) => http.post("mzato/main/app/getPickArea", params, config)

//商品盘点接口
//离线盘点单上传
export const uploadCheckList=(params, config = {}) => http.post("mzato/main/app/uploadCheckList", params, config)

//录标价签
//上传标价签
export const uploadLabelList=(params, config = {}) => http.post("mzato/main/app/uploadLabelList", params, config)
//永续补货 上传
export const upload=(params, config = {}) => http.post("mzato/main/app/upload", params, config)


//手动生成离线包
//手动生成离线数据包
export const eCAppBaseData=(params, config = {}) => http.post("mzato/main/app/eCAppBaseData", params, config)
