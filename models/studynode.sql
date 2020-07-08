/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.5.47 : Database - studynode
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`studynode` /*!40100 DEFAULT CHARACTER SET utf8 */;

/*Table structure for table `list` */

DROP TABLE IF EXISTS `list`;

CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `img` varchar(100) DEFAULT NULL COMMENT '图片',
  `sort` int(11) DEFAULT NULL COMMENT '排序值',
  `fabu` varchar(50) DEFAULT NULL COMMENT '是否发布',
  `jianjie` text COMMENT '简介',
  `content` text COMMENT '详细内容',
  `uid` int(11) DEFAULT NULL COMMENT '关联uid',
  `updatetime` datetime DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `list` */

insert  into `list`(`id`,`title`,`img`,`sort`,`fabu`,`jianjie`,`content`,`uid`,`updatetime`) values (11,'店铺1','upload/upload_af974730bbbe453558f6588621fe1b9a.jpg',0,'是','店铺1','<p>店铺1</p>',5,'2020-06-04 16:06:16'),(12,'店铺2','upload/upload_4f7046d83188950a0a74ce2f225a79dc.jpg',1,'是','店铺2','<p>店铺2</p>',5,'2020-06-04 16:07:20'),(13,'店铺3','upload/upload_f468ae7407d8d0eca2602ecba8716617.jpg',2,'否','店铺3','<p>店铺3</p>',5,'2020-06-05 16:33:04'),(14,'店铺4','upload/upload_4eabfcdb8b37aabb613ef597f22320cc.jpg',3,'是','店铺4','<p>店铺4</p>',5,'2020-06-12 17:55:13'),(15,'新闻动态1','upload/upload_f7c18b7267873a4b1efa55d3327f38f6.jpg',0,'是','新闻动态1的简介','<p>新闻动态1的详情<br/></p>',7,'2020-06-15 10:16:39'),(16,'新闻动态2','upload/upload_e2d2d8cc7f829cbc3cd979f6e7853df3.jpg',0,'是','新闻动态2简介','<p>新闻动态2详情</p>',7,'2020-06-15 10:17:05'),(17,'新闻动态3','upload/upload_098d41d2a31d43439928c9deec43e8b3.jpg',0,'是','新闻动态3简介','<p>新闻动态3详情</p>',7,'2020-06-15 10:37:16'),(18,'新闻动态4','upload/upload_faae0e1b176e93055ea39095b5e552f4.jpg',0,'是','新闻动态4简介','<p>新闻动态4详情</p>',7,'2020-06-15 10:37:41'),(19,'新闻动态5','upload/upload_a303c5d6ae98a9e066d7dafb01d183d2.jpg',0,'是','新闻动态5简介','<p>新闻动态5详情</p>',7,'2020-06-15 16:08:17'),(20,'新闻动态6','upload/upload_111c9ca91bb2adc83d215b5ec65eff0e.jpg',0,'是','新闻动态6简介','<p>新闻动态6详情</p>',7,'2020-06-15 16:08:37'),(21,'新闻动态7','upload/upload_64e6e7a1c8a451d840d6ffc823b4cf0e.jpg',0,'是','新闻动态7简介','<p>新闻动态7详情</p>',7,'2020-06-15 16:09:00'),(22,'会员天地1','upload/upload_1b01aed0828f6a8dee4dcf30bbcd4f3f.png',0,'是','会员天地1简介','<p>会员天地1详情</p>',8,'2020-06-15 17:58:50'),(23,'会员天地2','upload/upload_267da059b86663d37f165c84876f1001.png',0,'是','会员天地2简介','<p>会员天地2详情</p>',8,'2020-06-15 17:59:13'),(24,'会员天地3','upload/upload_e2dbd503709cc6f4b92ff9ca8d0428f1.png',0,'是','会员天地3简介','<p>会员天地3详情</p>',8,'2020-06-15 17:59:32'),(25,'会员天地4','upload/upload_e26e5f0687abf65cf1d35464ad8c8913.png',0,'是','会员天地4简介','<p>会员天地4详情</p>',8,'2020-06-15 17:59:51'),(26,'会员天地5','upload/upload_255f497e038b5df73a6812b64e786f7d.png',0,'是','会员天地5简介','<p>会员天地5详情</p>',8,'2020-06-16 10:24:02');

/*Table structure for table `navcolumn` */

DROP TABLE IF EXISTS `navcolumn`;

CREATE TABLE `navcolumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `Subtitle` varchar(50) DEFAULT NULL COMMENT '副标题',
  `page` varchar(100) DEFAULT NULL COMMENT '页面类型',
  `banner` varchar(100) DEFAULT NULL COMMENT 'banner图片',
  `pic` varchar(100) DEFAULT NULL COMMENT '图片',
  `templateType` varchar(50) DEFAULT NULL COMMENT '模板类型',
  `template` varchar(50) DEFAULT NULL COMMENT '模板',
  `sort` int(11) DEFAULT NULL COMMENT '排序值',
  `keyWord` varchar(100) DEFAULT NULL COMMENT '关键词',
  `jianjie` text COMMENT '简介',
  `author` varchar(50) DEFAULT NULL COMMENT '作者',
  `source` varchar(100) DEFAULT NULL COMMENT '来源',
  `content` text COMMENT '内容',
  `updatetime` date DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

/*Data for the table `navcolumn` */

insert  into `navcolumn`(`id`,`title`,`Subtitle`,`page`,`banner`,`pic`,`templateType`,`template`,`sort`,`keyWord`,`jianjie`,`author`,`source`,`content`,`updatetime`) values (1,'首页','','主页面','upload/upload_b61be514ccad84e143da4efca2869a4a.jpg','upload/upload_3975e2aec2889fa47c7ba22b79d10658.jpg','单页面','index',0,'首页','首页，没什么摘要！','slowlyBT','slowlyBT','<p>首页，么什么内容！<br/></p>','2020-06-15'),(2,'招商加盟','','主页面','','','单页面','joinIn',1,'招商加盟','招商加盟简介你好啊','招商加盟作者','','<p>招商加盟内容招商加盟内容！</p>','2020-06-04'),(5,'终端体验','','主页面','upload/upload_4c11ee6f89c678ea0b4242189af27ec3.jpg','','产品新闻页面','terminal',2,'终端体验','','终端体验','','<p>这是一个终端体验页面！！！<br/></p>','2020-06-12'),(6,'品牌介绍','','主页面','','','单页面','brand',3,'品牌介绍','','品牌介绍','品牌介绍','<p>这是一个品牌介绍页面<br/></p>','2020-06-12'),(7,'新闻动态','','主页面','','','产品新闻页面','news',4,'新闻','新闻','新闻','新闻','<p>这是一个新闻页面<br/></p>','2020-06-15'),(8,'会员天地','','主页面','','','产品新闻页面','member',0,'','会员天地','会员天地','会员天地','<p>这是一个会员天地页面</p>','2020-06-15'),(9,'企业信息','','主页面','upload/upload_c08a439be80e0c1c75d3a6c6d61709a7.jpg','upload/upload_ced3264a3cfd29e4639e8402455d7e48.jpg','单页面','information',0,'','企业信息','','','<p>凯利捷商贸有限公司成立于2011年，是中国一家领先且快速增长的高端服装企业。我们专职从事高端服装的设计、推广、营销及销售业务，产品涵盖西服、连身裙、短裙、长裤、针织衫、外套、大衣、皮草及配饰等。我们现有四大品牌：2011年推出&quot;年青、浪漫、女人味&quot;的凯利，2012年推出&quot;从心悠雅&quot;的Carolinge.Kai卡诺琳.凯，2013年推出奢华大气的VICFINE维珂芬高端核心品牌，以及在2013年推出&quot;商务时装可以更艺术&quot;的LOUISE ODIER路易欧帝商务男装品牌。四个品牌的门店数量接近30家，遍布全国10多个城市；我们的核心品牌VICFINE维珂芬和LOUISE ODIER路易欧帝品牌在行业影响力强。我们成立了专业品牌管理公司，拓展国内外品牌业务。</p><p>凯利捷商贸有限公司经历八年的快速发展，亮眼的业绩赢得了诸多行业认同，同时也获得了国际设计师协会的高度认可。我们以专业的直营模式、以及大数据驱动的智能模式推出了高级定制，未来我们将秉持&quot;创新驱动多品牌，做大做强VICFINE维珂芬和LOUISE ODIER路易欧帝品牌的方针策略，坚持开放创新、合作共赢的理念，多方式发展中高端男女装业务。</p><p>我们是一家以人为本的企业，我们希望为各类人才搭建一个平台，大家在平台上贡献自己的智慧、经验和人脉等等，通过共同的努力实现共赢。我们致力于打造多品牌的时尚集团，力争在2020年成为行业的标杆企业，让世界感受中国品牌的魅力。</p>','2020-06-16'),(49,'联系我们','','主页面','upload/upload_ad40b25cb07b16e725d9e084060d1e4a.jpg','upload/upload_13e83eac49dc332d3dcff93f1f4f2af3.jpg','单页面','contact',0,'','联系我们页面','','','<p>联系人：黄先生</p><p>电话：+86 123456789<br/></p><p>手机：1231564846&nbsp;&nbsp; 034164413<br/></p><p>邮箱：413413413413@qq.com</p>','2020-06-17');

/*Table structure for table `navlist` */

DROP TABLE IF EXISTS `navlist`;

CREATE TABLE `navlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(100) NOT NULL COMMENT '名称',
  `uid` int(11) DEFAULT NULL COMMENT '关联uid',
  `updatetime` date DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `navlist` */

insert  into `navlist`(`id`,`title`,`uid`,`updatetime`) values (1,'终端体验',5,'2020-06-03'),(2,'新闻动态',7,'2020-06-15'),(3,'会员天地',8,'2020-06-15');

/*Table structure for table `site` */

DROP TABLE IF EXISTS `site`;

CREATE TABLE `site` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '名称',
  `logo` varchar(100) DEFAULT NULL COMMENT 'LOGO图片',
  `domain` varchar(150) DEFAULT NULL COMMENT '域名',
  `keyWord` varchar(200) DEFAULT NULL COMMENT '关键词',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `phone` varchar(100) DEFAULT NULL COMMENT '电话',
  `address` varchar(100) DEFAULT NULL COMMENT '地址',
  `recordNo` varchar(50) DEFAULT NULL COMMENT '备案号',
  `content` text COMMENT '内容',
  `updatetime` date DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `site` */

insert  into `site`(`id`,`title`,`logo`,`domain`,`keyWord`,`description`,`phone`,`address`,`recordNo`,`content`,`updatetime`) values (1,'成都凯利捷商贸有限公司','upload/upload_93ee33823b27d5da69df963cfd06f5b7.jpg','127.0.0.1:6220','凯利捷','凯利捷官网','123456','成都市锦江区工业园锦华路三段88号汇融国际1栋5单元13楼1号','粤ICP备16033445号','<p>这是内容<br/></p><p><br/></p>','2020-06-12');

/*Table structure for table `slide` */

DROP TABLE IF EXISTS `slide`;

CREATE TABLE `slide` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `img` varchar(100) DEFAULT NULL COMMENT '图片',
  `sort` int(11) DEFAULT NULL COMMENT '排序值',
  `fabu` varchar(50) DEFAULT NULL COMMENT '是否发布',
  `jianjie` text COMMENT '简介',
  `content` text COMMENT '详细内容',
  `uid` int(11) DEFAULT NULL COMMENT '关联uid',
  `updatetime` datetime DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `slide` */

insert  into `slide`(`id`,`title`,`img`,`sort`,`fabu`,`jianjie`,`content`,`uid`,`updatetime`) values (15,'slide1','upload/upload_63fe19ac1caae61e0db315e08f1d9889.jpg',0,'是','第一张slide','<p>这是第一张slide<br/></p>',NULL,'2020-06-11 17:18:10'),(21,'slide2','upload/upload_5859bbc2d377cca38c376c0e0311c4db.jpg',1,'是','slide2','<p>slide2</p>',NULL,'2020-06-11 18:01:45'),(22,'slide3','upload/upload_2c87fb89b567e30696c28aa9a386e89e.jpg',0,'是','slide3','<p>slide3</p>',NULL,'2020-06-11 18:02:08'),(23,'slide4','upload/upload_e34ffaa14aaf11b88a04a624517e2dca.jpg',0,'是','slide4','<p>slide4<br/></p>',NULL,'2020-06-11 18:02:27'),(24,'slide5','upload/upload_549e7b39cd2de4bee387118d2bc4cd21.jpg',0,'是','slide5','<p>slide5</p>',NULL,'2020-06-12 17:55:30');

/*Table structure for table `soncolumn` */

DROP TABLE IF EXISTS `soncolumn`;

CREATE TABLE `soncolumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `Subtitle` varchar(50) DEFAULT NULL COMMENT '副标题',
  `page` varchar(100) DEFAULT NULL COMMENT '页面类型',
  `banner` varchar(100) DEFAULT NULL COMMENT 'banner图片',
  `pic` varchar(100) DEFAULT NULL COMMENT '图片',
  `templateType` varchar(50) DEFAULT NULL COMMENT '模板类型',
  `template` varchar(50) DEFAULT NULL COMMENT '模板',
  `sort` int(11) DEFAULT NULL COMMENT '排序值',
  `keyWord` varchar(100) DEFAULT NULL COMMENT '关键词',
  `jianjie` text COMMENT '简介',
  `author` varchar(50) DEFAULT NULL COMMENT '作者',
  `source` varchar(100) DEFAULT NULL COMMENT '来源',
  `uid` int(11) DEFAULT NULL COMMENT 'uid',
  `content` text COMMENT '内容',
  `updatetime` date DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

/*Data for the table `soncolumn` */

insert  into `soncolumn`(`id`,`title`,`Subtitle`,`page`,`banner`,`pic`,`templateType`,`template`,`sort`,`keyWord`,`jianjie`,`author`,`source`,`uid`,`content`,`updatetime`) values (1,'louiseOdier','香港知名服装设计师Kai于1999年创立','品牌介绍','upload/upload_14e92eac5f121e697485f0d92087c99e.jpg','upload/upload_a9485ccf65b2c967b8b571aa87939992.jpg','单页面','louiseOdier.html',0,'louiseOdier','louiseOdier页面','','',6,'<p>LOUISE ODIER男装品牌源自香港，由香港知名服装设计师Kai于1999年创立。得益 于Kai早年欧洲游学工作经历，在此期间深受欧洲的文化和生活影响，其极近苛刻的 工匠精神，承袭传统经典融合现代时尚风尚，以中西服饰精髓为指引，以“演绎”的 独特品牌哲学，提炼东西方时尚的精粹，以一线品牌考究的材质，精湛的细节铸就每 一件服饰的品质魅力，以演绎真我的时尚宣言，造就了LOUISE ODIER品牌的核心理 念，为都市精英创作出极尽个性魅力的轻奢华服。演绎”，让未来充满无限想象。 LOUISE ODIER将“演绎”的精髓不断传递，风靡欧美10多个国家，将国际化的视角 注入品牌基因，围绕精英生活的方方面面，缔造出精英男士在不同场合的着装需求！</p>','2020-06-12'),(2,'VICFINE','西式风情与东方气质融合','品牌介绍','upload/upload_ddb886c02b419f4c6607e7e1d2568fd9.jpg','upload/upload_b1eac02f76172a2c01fe8456eceff6da.jpg','单页面','vicfine.html',0,'VICFINE','VICFINE页面','','',6,'<p>VICFINE作为香港知名服装设计师Kai旗下品牌之一，是一个集时尚与成熟于一身的轻奢品牌，以其源于东西方文化的灵感，设计风格鲜明，注重时尚与奢华，充满睿智与魅力。</p><p>VICFINE将西式风情与东方气质融合，通过对时尚的解读与重塑，以其低调奢华的整体配色，风格沉稳而历久弥新，完美诠释都市精英生活细节中的优雅、淡定与自信。</p><p>VICFINE产品包括男女时装系列以及皮具、配饰，针对追求品位的30岁以上的精锐人士，以其注重时尚感设计与高舒适度的体验，深受都市精英的亲魅。</p><p>VICFINE自2009年进入中国，以其准确的市场定位及独特的风格，现已遍布全球10多个国家近200多家店铺，其时尚新贵的身份已经呼之欲出。</p>','2020-06-12'),(3,'Riina Clare','个性潮流的生活文化品牌 ','品牌介绍','upload/upload_4d9914712000003aa85c0e3d16a3e05d.jpg','upload/upload_12f169f4c51695fa7dba1462312efd27.jpg','单页面','riinaClare.html',0,'Riina Clare','Riina Clare','','',6,'<p>An action plan with executable,</p><p>actionable and creative ideas can effectively</p><p>enhance the company&#39;s reputation</p><p>and</p><p>brand reputation.</p>','2020-06-12'),(4,'企业理念','','企业信息','upload/upload_cb30b6973d8198afe04bc161d97a5647.jpg','','单页面','information.html',0,'','企业理念','','',9,'<p>企业目标：创世界品牌，铸百年企业</p><p>企业宗旨：创造完美时尚，倡导精致生活</p><p>企业经营理念：品质为本，服务顾客，</p><p>构筑连锁直营，创造双赢共享</p><p>企业质量观念：市场化决策，现代化经营，</p><p>系统化管理，专业化服务</p><p>企业的愿景：引领时尚流行趋势</p><p>企业人才观念：人力资源是企业生存的核心</p><p>企业价值观念：诚信、务实、责任、勤俭、和谐、</p><p>真诚和服务是企业生存的根本</p><p>企业经营理念：装点人生，服务社会</p><p>工作宗旨：努力奋斗，不断创新</p><p>企业精神：奉献、进取、宽仁、合作</p><p>道德理念：勤奋务实、正直善良、福而不骄、满而不溢、谦而不卑、刚柔相济</p><p>座右铭：言必信，行必果</p>','2020-06-16'),(5,'品牌介绍','','企业信息','upload/upload_1fa2ba6ebaa61f28d2c822eed5255689.jpg','upload/upload_e8cf3d39cf3cdd665d96e0a104ad7b8a.jpg','单页面','information.html',0,'','品牌介绍','','',9,'<p>LOUISE ODIER路易欧帝男装品牌源自香港，隶属君尚国际名品。由香港知名设计师Kai先生于1999年创立，融入独特的设计理念结合国际流行趋势，以经典的图纹、舒适的面料和世界一流的品质，引领高端时尚流行趋，诠释时尚经典的商务风，优雅睿智却彰显时尚内涵；以卓越品质、杰出创意、精湛工艺和精美绝伦的立体裁剪造就经典款式，优雅永恒，成为男装时尚艺术的象征。产品包括成衣、手提包、旅行用品、皮具、配饰、鞋履、腕表、高端珠宝及个性化订制服务等，产品远销售欧美10多个国家和地区，受国际时尚人士的青睐。</p><p>君尚国际是集设计研发、生产、销售为一体的国际化品牌公司。我们“坚持国际品质、引领时尚趋势”的愿景。秉承“天行健，君子以自强不息，地势坤，君子以厚德载物，”尽展王者风范。塑造时尚品味的精品魅力男士。</p>','2020-06-16'),(6,'品牌定位','','企业信息','upload/upload_f1bee0a9337b996691e16f915da2eafb.jpg','','单页面','information.html',2,'','品牌定位/品牌理念','','',9,'<p>LOUISE ODIER路易欧帝定位高端轻奢品牌，针对30到60岁的精英男士。坚持品牌个性并勇于创新，保持品牌影响力、主要品牌产品是男装。主题系列主要以商务精品、优雅时尚、轻休舒适，凌厉精致的演绎时尚精英男士的风采。</p>','2020-06-17'),(7,'运营策略','','企业信息','upload/upload_1949a76e608848f4a99759ec534fdc07.jpg','','单页面','information.html',5,'','运营策略','','',9,'<p>LOUISE ODIER路易欧帝定位高端轻奢品牌，以精美的设计、细致完美的工艺和贴心的服务作为品牌运营核心，针对30到60岁的精英男士。推向高端消费人群，主要以成功人士、高级白领和影视明星等，品牌以直营模式立足中部，辐射全国，引领男装流行趋势。</p>','2020-06-17'),(9,'设计理念','','企业信息','upload/upload_3d9fbb4f0535e00951c2c749dcfa722b.jpg','','单页面','brand',0,'','设计理念','','',9,'<p>LOUISE ODIER路易欧帝品牌服装设计追求的就是实用美与视觉美。融入独特的设计理念结合国际流行趋势，以经典的图纹、舒适的面料和世界一流的品质，引领高端时尚流行趋，诠释时尚经典的商务风，优雅睿智却彰显时尚内涵；以卓越品质、杰出创意、精湛工艺和精美绝伦的立体裁剪造就经典款式，优雅永恒，成为男装时尚艺术的象征。产品包括成衣、手提包、旅行用品、皮具、配饰、鞋履、腕表、高端珠宝及个性化订制服务等，运用一定的表现技法才得以完成造型。服装设计师不仅推敲了服装的设计构思，而且从创作的中挖掘灵感，使各方面的配套工作符合自己的设计意图。主要以商务精品、优雅时尚、轻休舒适，凌厉精致的演绎时尚精英男士的风采。</p>','2020-06-19'),(29,'品牌理念','','企业信息','','','单页面','information.html',4,'','','','',9,'<p>LOUISE ODIER路易欧帝品牌2013年诞生于誉有时尚之都的香港，并以其独特的风格与品味夺得众多业内人士的瞩目。他的设计既像大海般深沉又如阳光般炙烈，更让人吃惊的是他能将两者如此完美的融合在一起，使追求时尚的人们对“时尚”有了更深的理解。LOUISE ODIER路易欧帝品牌LOGO图标以圆形艺术，自然和谐、圆满完美。圆则满，满则圆，体现了品牌追求完美的精神。神秘却又醒目，沉稳而又内敛，自然而又经典，让人一眼看去便能解读出LOUISE ODIER路易欧帝的品牌内涵。</p>','2020-06-17');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(100) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `time` datetime DEFAULT NULL COMMENT '时间',
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`time`) values (1,'admin','e10adc3949ba59abbe56e057f20f883e','2020-05-23 05:49:54');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
