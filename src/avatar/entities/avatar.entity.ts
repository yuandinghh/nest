import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, OneToMany } from 'typeorm';
//import { Tags } from '../../tags/entities/tag.entity'    //'./entities/tag.entity';

@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    _id: string;

    @Column({ type: 'varchar', length: 132 })
    url: string;

    @Column({ type: 'text'})
    description: string;
    
    @Column({ type: 'varchar', length: 20 })  // type: "timestamp"
    createTime: string;

    // @OneToMany(() => Tags, (tags) => tags.user)
    // tags: Tags[]

}
/*
{"_id":"643304ec9c298d584cb1125c","email":"110959751@qq.com","nickName":"yd","column":"643304ec9c298d584cb1125d",
"avatar":{"_id":"64dcf23e9c298d584cb1186e","url":"http://ve.jpg"},"description":"喜欢已经哲也的程序，edit，提交"},
*/