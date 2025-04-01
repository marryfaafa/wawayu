import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// const router = createRouter({
//   routes: [
//     //Ê×Ò³
//     {
//       name: "main",
//       path: "/",
//       component: () => import("../page/Container.vue"),
//     },
//   ],

//   history: createWebHistory(),
// });
// ????

/*
query参数跳转   http://localhost:5173/#/home?userid=33   path: "home",
params跳转     http://localhost:5173/#/home/=33   path: "home/:userid",
*/
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "/",
    component: ()=>import("../AppMain.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../view/usermain/index.vue"),
        name: "Home", 
      },
      {
        path: "help",
        component: () => import("../view/help/index.vue"),
        name: "Help", 
      },
      {
        path: "learn",
        component: () => import("../view/learn/index.vue"),
        name: "Learn", 
        children: [ 
                  {
                    path: "detailurl",
                    component: () => import("../components/learn/Iframe.vue"),
                    name: "DetailUrl",
                  },
              ]
      },
      {
        path: "popularization",
        component: () => import("../view/popularization/index.vue"),
        name: "Popularization", 
        meta: {
          title: '父页面',
          breadNum: 2,
          showFather: true,
      },
        children:[
          {  
            path: "require/:id", // 使用动态片段来捕获id  
            component: () => import("../view/popularization/components/subject.vue"),  
            name: "PopularizationSubject"  ,
            meta: {
              title: '子页面1',
              showFather: false,
              breadNum: 2,
          },
          },  
        ]
      },
      {
        path: "community",
        component: () => import("../view/community/index.vue"),
        // name: "Community", 
        meta: {
          title: '父页面',
          breadNum: 2,
          showFather: true,
      },
        children:[
        //   { 
        //     path: "submit",
        //   component: () => import("../components/community/submit.vue"),
        //   // name: "Submit"
        //  },
          { 
            path: "detail",
          component: () => import("../components/community/articleDetail.vue"),
          meta: {
            title: '子页面1',
            showFather: false,
            breadNum: 2,
        },
        hidden: true,
          name: "aDetail",
        },
        { 
          path: "publish",
        component: () => import("../components/community/Publish.vue"),
        meta: {
          title: '子页面2',
          showFather: false,
          breadNum: 2,
      },
      hidden: true,
        name: "Publish",
      },

        ]
      },
      {
        path: "recognition",
        component: () => import("../view/recognition/index.vue"),
        name: "Recognition", 
      },
      {
        path: "report",
        component: () => import("../view/report/index.vue"),
        name: "Report", 
        children:[
          {
            path: "detail/:address",
            component: () => import("../components/report/index.vue"),
            name: "Detail", 
          },
        ]
      },
      {
        path: "participate",
        component: () => import("../view/participate/index.vue"),
        name: "Participate", 
      },
      {
        path: "question",
        component: () => import("../view/question/index.vue"),
        name: "Question", 
      },

      //管理员
      {
        path: "admin",
        component: () => import("../view/admin/index.vue"),
        name: "Admin", 
      },
      {
        path: "volunteer",
        component: () => import("../view/volunteer/index.vue"),
        name: "Volunteer", 
      },
      {
        path: "volunteer-audit",
        component: () => import("../view/volunteer-audit/index.vue"),
        name: "VolunteerAudit", 
      },
      {
        path: "popular-science",
        component: () => import("../view/popular-science/index.vue"),
        name: "PopularScience", 
      },
      {
        path: "admin-report",
        component: () => import("../view/admin-report/index.vue"),
        name: "AdminReport", 
      },
      {
        path: "detection",
        component: () => import("../view/detection/index.vue"),
        name: "Detection", 
      },
      {
        path: "resource",
        component: () => import("../view/resource/index.vue"),
        name: "Resource", 
      },
      {
        path: "discovery",
        component: () => import("../view/discover/index.vue"),
        name: "Discover", 
      },
     
      
      // {
      //   path: "401",
      //   component: () => import("@/views/error-page/401.vue"),
      //   meta: { hidden: true },
      // },
      // {
      //   path: "404",
      //   component: () => import("@/views/error-page/404.vue"),
      //   meta: { hidden: true },
      // },
    ],
  },
  {
    path:'/login',
    name:"Login",
    component: ()=>import("../view/login/index.vue"),
  }
]

/**
 * ????
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
