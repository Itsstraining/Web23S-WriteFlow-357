"use strict";(self.webpackChunkFrontEnd=self.webpackChunkFrontEnd||[]).push([[698],{3698:(P,d,e)=>{e.r(d),e.d(d,{HomeModule:()=>r});var a=e(6895),g=e(8317),n=e(4650),l=e(7556),u=e(9101),C=e(8735),_=e(4662);class s{constructor(t,i){this.router=t,this.authService=i,this.user=null,this.innerWidth=window.innerWidth}ngOnInit(){this.user=this.authService.currentUser,this.authService.user$.subscribe(t=>{this.user=t,t&&this.router.navigate(["/main"])}),this.user&&this.router.navigate(["/main"])}onResize(t){this.innerWidth=window.innerWidth}}s.\u0275fac=function(t){return new(t||s)(n.Y36(g.F0),n.Y36(l.e))},s.\u0275cmp=n.Xpm({type:s,selectors:[["app-home"]],hostBindings:function(t,i){1&t&&n.NdJ("resize",function(h){return i.onResize(h)},!1,n.Jf7)},decls:89,vars:3,consts:[[1,"section-1"],[1,"big-title"],[1,"idea-button"],["mat-button","",1,"idea-left"],["mat-button","",1,"idea-right"],[1,"big-title-description"],[1,"bold"],[1,"section-2"],[1,"words",3,"ngClass"],[1,"title"],[1,"description"],[1,"img-container"],["src","../../../assets/business-idea/3081627.jpg"],[1,"section-3"],["src","../../../assets/share idea/Man selling idea for startup.jpg"],[1,"section-4"],["src","../../../assets/discuss/5469.jpg"]],template:function(t,i){1&t&&(n._UZ(0,"app-navbar"),n.TgZ(1,"div",0)(2,"div")(3,"div",1)(4,"h1"),n._uU(5,"LET YOUR IDEA GROW"),n.qZA()(),n.TgZ(6,"div",2)(7,"button",3),n._uU(8,"Temporary Idea"),n.qZA(),n.TgZ(9,"button",4),n._uU(10,"Save your Idea"),n.qZA()(),n.TgZ(11,"div",5)(12,"p"),n._uU(13,"...This is the place for your idea flow in mind come true"),n._UZ(14,"br"),n._uU(15,"Wherever you are. Whenever you want. "),n._UZ(16,"br"),n._uU(17,"Open Write"),n.TgZ(18,"span",6),n._uU(19,"Flow"),n.qZA(),n._uU(20," and let your mind "),n.TgZ(21,"span",6),n._uU(22,"flow"),n.qZA(),n._uU(23,", but never lose "),n.TgZ(24,"span",6),n._uU(25,"control"),n.qZA(),n._uU(26,"... "),n.qZA()()()(),n.TgZ(27,"div",7)(28,"div")(29,"div",8)(30,"div")(31,"div",9)(32,"h1"),n._uU(33,"Create your"),n._UZ(34,"br"),n._uU(35,"idea instantly"),n.qZA()(),n.TgZ(36,"div",10)(37,"p"),n._uU(38,"Write"),n.TgZ(39,"span",6),n._uU(40,"Flow"),n.qZA(),n._uU(41," is a site to write your idea"),n._UZ(42,"br"),n._uU(43," whenever you want like a text editor"),n._UZ(44,"br"),n._uU(45," with necessary tool "),n.qZA()()()(),n.TgZ(46,"div",11),n._UZ(47,"img",12),n.qZA()()(),n.TgZ(48,"div",13)(49,"div")(50,"div",11),n._UZ(51,"img",14),n.qZA(),n.TgZ(52,"div",8)(53,"div")(54,"div",9)(55,"h1"),n._uU(56,"Share your idea"),n._UZ(57,"br"),n._uU(58,"to anyone"),n.qZA()(),n.TgZ(59,"div",10)(60,"p"),n._uU(61,"Write"),n.TgZ(62,"span",6),n._uU(63,"Flow"),n.qZA(),n._uU(64," can help you to share"),n._UZ(65,"br"),n._uU(66," your idea with a simple click "),n.qZA()()()()()(),n.TgZ(67,"div",15)(68,"div")(69,"div",8)(70,"div")(71,"div",9)(72,"h1"),n._uU(73,"Discuss about"),n._UZ(74,"br"),n._uU(75,"your idea"),n.qZA()(),n.TgZ(76,"div",10)(77,"p"),n._uU(78,"Write"),n.TgZ(79,"span",6),n._uU(80,"Flow"),n.qZA(),n._uU(81," has a community to"),n._UZ(82,"br"),n._uU(83," help your share your idea to"),n._UZ(84,"br"),n._uU(85," improve your skill"),n.qZA()()()(),n.TgZ(86,"div",11),n._UZ(87,"img",16),n.qZA()()(),n._UZ(88,"app-footer")),2&t&&(n.xp6(29),n.Q6J("ngClass",i.innerWidth>=1200?"left":"center"),n.xp6(23),n.Q6J("ngClass",i.innerWidth>=1200?"right":"center"),n.xp6(17),n.Q6J("ngClass",i.innerWidth>=1200?"left":"center"))},dependencies:[a.mk,u.lW,C.S,_.c],styles:[".section-1[_ngcontent-%COMP%], .section-2[_ngcontent-%COMP%], .section-3[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%]{width:100%;height:80%;position:relative;display:flex;align-items:center;justify-content:center;flex-direction:column}.section-2[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%]{background-color:var(--color-1)}.section-2[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-3[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:row}.img-container[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center}.img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:75%;min-width:50%;height:auto;mix-blend-mode:multiply}.section-2[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-3[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%] > div[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{width:100%;height:100%}.bold[_ngcontent-%COMP%]{font-weight:700}.section-1[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.big-title[_ngcontent-%COMP%]{font-size:48px;font-weight:800;color:var(--color-4)}.idea-button[_ngcontent-%COMP%]{margin-bottom:2rem}.idea-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-weight:700;font-size:20px;color:var(--color-4);height:3rem;width:200px;margin:1rem}.idea-button[_ngcontent-%COMP%]   .idea-left[_ngcontent-%COMP%]{background-color:#0000;border:1px solid rgba(var(--color-4-rgb),.25)}.idea-button[_ngcontent-%COMP%]   .idea-right[_ngcontent-%COMP%]{background-color:var(--color-1);box-shadow:2px 2px 2px 0 rgba(var(--color-4-rgb),.5)}.big-title-description[_ngcontent-%COMP%]{font-size:30px;font-weight:400;color:var(--color-4);text-align:center}.words[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;justify-content:center;color:var(--color-4)}.title[_ngcontent-%COMP%]{font-size:30px;font-weight:700}.description[_ngcontent-%COMP%]{font-size:24px;font-weight:400}.left[_ngcontent-%COMP%]{justify-content:flex-end}.left[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-right:5rem}.right[_ngcontent-%COMP%]{justify-content:flex-start}.right[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-left:5rem}.center[_ngcontent-%COMP%]{justify-content:center}@media screen and (max-width: 1200px){.section-1[_ngcontent-%COMP%]{height:100%}.section-1[_ngcontent-%COMP%]   .big-title[_ngcontent-%COMP%]{font-size:36px}.section-1[_ngcontent-%COMP%]   .idea-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:18px}.section-1[_ngcontent-%COMP%]   .big-title-description[_ngcontent-%COMP%]{font-size:24px}.section-1[_ngcontent-%COMP%], .section-2[_ngcontent-%COMP%], .section-3[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%]{height:auto;padding:2.5rem 0rem}.section-1[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-2[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-3[_ngcontent-%COMP%] > div[_ngcontent-%COMP%], .section-4[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{flex-direction:column;text-align:center}.title[_ngcontent-%COMP%]   br[_ngcontent-%COMP%], .description[_ngcontent-%COMP%]   br[_ngcontent-%COMP%]{display:none}}@media screen and (max-width: 850px){.section-1[_ngcontent-%COMP%]   .big-title[_ngcontent-%COMP%]{font-size:28px}.section-1[_ngcontent-%COMP%]   .idea-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:16px;height:2.5rem;width:150px}.section-1[_ngcontent-%COMP%]   .big-title-description[_ngcontent-%COMP%]{font-size:20px}.title[_ngcontent-%COMP%]{font-size:24px}.description[_ngcontent-%COMP%]{font-size:18px}}@media screen and (max-width: 650px){.section-1[_ngcontent-%COMP%]   .big-title[_ngcontent-%COMP%]{font-size:18px;padding:0rem 1rem}.section-1[_ngcontent-%COMP%]   .idea-button[_ngcontent-%COMP%]{margin-bottom:1rem}.section-1[_ngcontent-%COMP%]   .idea-button[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:.5rem;font-size:16px;height:2.5rem;width:150px}.section-1[_ngcontent-%COMP%]   .big-title-description[_ngcontent-%COMP%]{font-size:18px;padding:0rem 1rem}.words[_ngcontent-%COMP%], .words[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{padding:0rem}.title[_ngcontent-%COMP%], .description[_ngcontent-%COMP%]{padding:0rem 2rem}.title[_ngcontent-%COMP%]{font-size:18px}.description[_ngcontent-%COMP%]{font-size:16px}}"]});const M=[{path:"",component:s}];class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=n.oAB({type:c}),c.\u0275inj=n.cJS({imports:[g.Bz.forChild(M),g.Bz]});var m=e(9717),O=e(2271);class r{}r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=n.oAB({type:r}),r.\u0275inj=n.cJS({imports:[a.ez,c,m.h,O.m]})}}]);