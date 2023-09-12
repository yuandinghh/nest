// eslint-disable-next-line prettier/prettier
// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   Generated,
// } from 'typeorm';

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, OneToMany } from 'typeorm';
import { Tags } from  '../../tags/entities/tag.entity'    //'./entities/tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  desc: string;
 
  // @Generated('uuid')
  // uuid: string
 
  @CreateDateColumn({ type: "timestamp" })
  createTime: Date
 
  @OneToMany(() => Tags, (tags) => tags.user)
  tags:Tags[]

}
// export { Tags };

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({ type: 'varchar', length: 100 })
//   username: string;
//   @Column({ type: 'varchar', length: 100 })
//   password: string;
//   @Column({ type: 'varchar', length: 100 })
//   nickname: string;
//   @Column({ type: 'varchar', length: 30 })
//   newdate: string;
//   @CreateDateColumn({ type: 'timestamp' })
//   times: Date;
//   @Column({ type: 'varchar', length: 250 })
//   token: string;
//   @Column({ type: 'varchar', length: 30 })
//   column: string;
//   @Column({ type: 'tinyint', default: 1 })
//   status: number;
//   @Column({ type: 'tinyint' })
//   age: number;
//   @Column({ type: 'varchar', length: 250 })
//   avater: string;
//   name: string;
//   desc: string;
//   // @Column({ type: 'varchar' })
//   // skill: string;
// }


//   @Generated('uuid')
//   uuid: string;
//  @Column({
//         type:"varchar",
//         name:"ipaaa", //数据库表中的列名
//         nullable:true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
//         comment:"注释",
//         select:true,  //定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
//         default:"xxxx", //加数据库级列的DEFAULT值
//         primary:false, //将列标记为主要列。 使用方式和@ PrimaryColumn相同。
//         update:true, //指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
//         collation:"", //定义列排序规则。
//     })   ip:string

//原文链接：https://blog.csdn.net/qq1195566313/article/details/127218592
// CREATE TABLE `users` (
//   `id` int NOT NULL AUTO_INCREMENT COMMENT 'this user infomaintion',
//   `username` varchar(45) NOT NULL,
//   `password` varchar(45) NOT NULL,
//   `nickname` varchar(50) DEFAULT NULL,
//   `newdate` varchar(30) DEFAULT NULL COMMENT '最新登录时间时间',
//   `times` timestamp(4) NOT NULL COMMENT '注册时间',
//   `token` varchar(250) DEFAULT NULL,
//   `column` varchar(21) DEFAULT NULL,
//   `status` tinyint(1) DEFAULT '0' COMMENT '用户状态： 0：用户状态正常，1： 用户被禁用\\\\n',
//   `age` tinyint(1) DEFAULT NULL,
//   `avater` varchar(250) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `id_UNIQUE` (`id`),
//   UNIQUE KEY `username_UNIQUE` (`username`)
// ) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表\n'
/*  mysql 数据类型
int, tinyint, smallint, mediumint, bigint, float, double, dec, decimal, 
numeric, date, datetime, timestamp, time, year, char, varchar, nvarchar,
 text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, 
 enum, json, binary, geometry, point, linestring, polygon, multipoint,
  multilinestring, multipolygon, geometrycollection

*/