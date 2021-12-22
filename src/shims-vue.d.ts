

type asyncFunction = any;
type anyObj = { [key: string]: asyncFunction };
import Vue from 'vue'
export { } /// 这句不能删
declare module 'vue/types/vue' {
    interface Vue {
        // 是一个对象
        $platApi: anyObj,
        $commonApi: anyObj,
        $platRequest: anyObj
    }
}