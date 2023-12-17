import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Generated, OneToMany } from 'typeorm';
// "title": "是大法官", "content": "发达国家地方规划局", "column": "6bcae83e-90c5-428e-9321-a1a992beeb19", "author": 22, "image": "64dd92139c298d584cb11871"
@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, unique: true })
    title: string;

    @Column({ type: 'text'})
    content: string;

    @Column({ type: 'varchar', length: 100 })
    column: string;

    @Column({ type: 'varchar', length: 50 })
    author: string;

    @Column({ type: 'varchar', length: 200 })  //avatar
    image: string;

    @CreateDateColumn({ type: "timestamp" })   // type: 
    times: Date;
    // @OneToMany(() => Tags, (tags) => tags.user)
    // tags: Tags[]

}