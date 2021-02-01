-- 博客管理系统 DDL

create database if not exists blogcms default charset utf8mb4 collate utf8mb4_general_ci;;

use blogcms;

-- 用户信息表
create table users(
	id int not null primary key auto_increment comment '主键自增',
	username nvarchar(50) not null comment '用户名',
	nickname nvarchar(50) not null comment '昵称', 
	realname nvarchar(50) null comment '真实姓名',
	password nvarchar(50) not null comment '密码', 
	telephone nvarchar(50) null comment '手机号',
	email nvarchar(50) null comment '邮箱', 
	address nvarchar(200) null comment '住址',
	avatar nvarchar(100) null comment '头像',
	gender tinyint not null default 1 comment '性别:0女,1男,2未知',
	birth datetime null comment '出生日期', 
	remark nvarchar(2000) null comment '备注',
	status tinyint not null default 1 comment '启用状态,默认为1表示启用', 
	create_time timestamp not null default current_timestamp comment '创建时间',
	update_time timestamp null default current_timestamp on update current_timestamp comment '更新时间',
	is_delete tinyint null default 0 comment '是否注销,默认为0表示没有注销'
)COMMENT = '用户信息表';

-- 文章表
create table topics(
	id int not null primary key auto_increment comment '主键自增',
	title nvarchar(100) not null comment '文章标题',
	content text not null comment '文章内容',
	author int not null comment '作者',
	create_time timestamp not null default current_timestamp comment '创建时间',
	update_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
	is_delete tinyint not null default 0 comment '是否删除,默认为0表示没有删除'
)comment = '文章表';

-- 评论表
create table comments (
	id int not null primary key auto_increment comment '主键自增',
	content text not null comment '评论内容',
	topic_id int not null comment '所属文章',
	reply_id int null comment '指向父评论的id,如果不是对评论的回复,那么该值为null',
  user_id int not null comment '评论发表人',
	create_time timestamp not null default current_timestamp comment '创建时间',
	update_time timestamp not null default current_timestamp on update current_timestamp comment '更新时间',
	is_delete tinyint not null default 0 comment '是否删除,默认为0表示没有删除'
)comment = '评论表';