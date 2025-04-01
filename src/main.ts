import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router"
import BaiduMap from 'vue-baidu-map-3x'
import { setupStore } from "./store";
import { setupElIcons } from "./plugins";
import ElementPlus from 'element-plus'


//��ʽ

import './style/index.scss'
import './style/reset.scss'


const app = createApp(App);
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.use(BaiduMap, {
    // ak ���ڰٶȵ�ͼ������ƽ̨�������Կ ��� http://lbsyun.baidu.com/apiconsole/key */
    ak: 'Ne0ftrVou33dkT7fPLdk6bI82cbznpIw',
    v:'3.0',  // Ĭ��ʹ��3.0
    type: 'API' // ||API Ĭ��API  (ʹ�ô�ģʽ BMap=BMapGL)
})
// ȫ��ע�� ״̬����(store)
setupStore(app);
// ȫ��ע��Element-plusͼ��
setupElIcons(app);
// ע�ᶯ̬·��
// setupPermission();
app.mount('#app')

