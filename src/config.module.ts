import { Module, DynamicModule, Global } from '@nestjs/common'

interface Options {
    path: string
}
@Global()   //注册成全局模块
@Module({
    providers: [
        {
            provide: "Config",
            useValue: { baseUrl: "/api" }
        }
    ],
    exports: [
        {
            provide: "Config",
            useValue: { baseUrl: "/api" }
        }
    ]
})
export class ConfigModule {   //动态模块
    static forRoot(options: Options): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: "Config",
                    useValue: { baseApi: "/api" + options.path }
                }
            ],
            exports: [
                {
                    provide: "Config",
                    useValue: { baseApi: "/api" + options.path }
                }
            ]
        }
    }
} 
