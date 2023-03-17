"use strict";(self.webpackChunkFrontEnd=self.webpackChunkFrontEnd||[]).push([[831],{2831:(T,m,n)=>{n.r(m),n.d(m,{RoleModule:()=>l});var g=n(6895),u=n(8317),v=n(2149),o=n(4650),a=n(5938),d=n(7392),p=n(9101),f=n(4006),s=n(4385),h=n(3238);function Z(i,e){if(1&i&&(o.TgZ(0,"mat-option",32)(1,"div",33)(2,"div",34)(3,"mat-icon"),o._uU(4),o.qZA()(),o.TgZ(5,"div",35),o._uU(6),o.qZA()()()),2&i){const t=e.$implicit;o.Q6J("value",t),o.xp6(4),o.Oqu(t.icon),o.xp6(2),o.Oqu(t.viewValue)}}class c{constructor(e){this.matDialog=e,this.options=[{value:"lock-1",icon:"lock",viewValue:"Restricted"},{value:"public-2",icon:"public",viewValue:"Anyone with the link"}],this.selected2={value:"lock-1",icon:"lock",viewValue:"Restricted"}}openDialog(){this.matDialog.open(v.p,{height:"32.5rem",width:"44rem",panelClass:"custom-modalbox"})}compareFn(e,t){return e&&t?e.value===t.value:e===t}}c.\u0275fac=function(e){return new(e||c)(o.Y36(a.uw))},c.\u0275cmp=o.Xpm({type:c,selectors:[["app-role"]],decls:77,vars:5,consts:[["mat-button","",2,"width","10rem","height","5rem","background-color","antiquewhite",3,"click"],["open","",1,"dialog"],["mat-dialog-actions",""],["mat-button","","mat-dialog-close","",1,"Close"],["mat-dialog-content","",1,"Title"],["type","text","placeholder","Type to search people and groups",1,"Search"],["mat-fab","","extended","",1,"Invite"],["mat-dialog-content","",1,"List-Title"],[1,"grid-container"],[1,"Person-Name"],[1,"grid-item2"],[1,"grid-item4"],["id","People-Access-List"],["value","Viewer"],["value","Editor"],["value","Delete"],[1,"grid-item6"],[1,"General-Text"],[1,"Display"],[1,""],["id","security-icon"],["mat-raised-button","","type","button","color","primary",1,"Select-Button"],[1,"Access-Select",3,"value","compareWith","valueChange"],[1,"Div-Group1"],[1,"Option-Icon1"],[1,"Option-Value1"],["class","Select-Option",3,"value",4,"ngFor","ngForOf"],[1,"Only"],["mat-fab","","extended","",1,"Copy-Link"],[1,"Icon-Text"],[1,"Copy-Icon"],[1,"Copy-Text"],[1,"Select-Option",3,"value"],[1,"Div-Group2"],[1,"Option-Icon"],[1,"Option-Value"]],template:function(e,t){1&e&&(o.TgZ(0,"mat-dialog-actions")(1,"button",0),o.NdJ("click",function(){return t.openDialog()}),o._uU(2,"Test"),o.qZA()(),o.TgZ(3,"dialog",1)(4,"div",2)(5,"button",3),o._uU(6,"X"),o.qZA()(),o.TgZ(7,"div",4),o._uU(8,' Share "Document1.docx" '),o.qZA(),o.TgZ(9,"div"),o._UZ(10,"input",5),o.TgZ(11,"button",6),o._uU(12," Invite "),o.qZA()(),o.TgZ(13,"div",7),o._uU(14," List of people who have access "),o.qZA(),o.TgZ(15,"div",8)(16,"div",9),o._uU(17,"Nguy\u1ec5n V\u0103n A "),o._UZ(18,"br"),o._uU(19," vana01@gmail.com"),o.qZA(),o.TgZ(20,"div",10),o._uU(21," Owner "),o.qZA(),o.TgZ(22,"div",9),o._uU(23,"Nguy\u1ec5n V\u0103n B "),o._UZ(24,"br"),o._uU(25," vanb01@gmail.com"),o.qZA(),o.TgZ(26,"div",11)(27,"select",12)(28,"option",13),o._uU(29," Viewer "),o.qZA(),o.TgZ(30,"option",14),o._uU(31," Editor "),o.qZA(),o._UZ(32,"hr"),o.TgZ(33,"option",15),o._uU(34," Delete "),o.qZA()()(),o.TgZ(35,"div",9),o._uU(36,"Nguy\u1ec5n V\u0103n C "),o._UZ(37,"br"),o._uU(38," vanc01@gmail.com"),o.qZA(),o.TgZ(39,"div",16)(40,"select",12)(41,"option",13),o._uU(42," Viewer "),o.qZA(),o.TgZ(43,"option",14),o._uU(44," Editor "),o.qZA(),o._UZ(45,"hr"),o.TgZ(46,"option",15),o._uU(47," Delete "),o.qZA()()()(),o.TgZ(48,"div",17),o._uU(49," General access "),o.qZA(),o._UZ(50,"br"),o.TgZ(51,"div",18)(52,"div",19)(53,"mat-icon",20),o._uU(54,"security"),o.qZA()(),o.TgZ(55,"div")(56,"button",21)(57,"mat-select",22),o.NdJ("valueChange",function(b){return t.selected2=b}),o.TgZ(58,"mat-select-trigger")(59,"div",23)(60,"div",24)(61,"mat-icon",19),o._uU(62),o.qZA()(),o.TgZ(63,"div",25),o._uU(64),o.qZA()()(),o.YNc(65,Z,7,3,"mat-option",26),o.qZA()(),o.TgZ(66,"div",27),o._uU(67," Only people with access can open with the link "),o.qZA(),o._UZ(68,"br"),o.qZA(),o.TgZ(69,"div")(70,"button",28)(71,"div",29)(72,"div",30)(73,"mat-icon"),o._uU(74,"link"),o.qZA()(),o.TgZ(75,"div",31),o._uU(76,"Copy link"),o.qZA()()()()()()),2&e&&(o.xp6(57),o.Q6J("value",t.selected2)("compareWith",t.compareFn),o.xp6(5),o.Oqu(t.selected2.icon),o.xp6(2),o.Oqu(t.selected2.viewValue),o.xp6(1),o.Q6J("ngForOf",t.options))},dependencies:[g.sg,d.Hw,p.lW,p.cs,a.ZT,a.xY,a.H8,f.YN,f.Kr,s.gD,s.$L,h.ey],styles:['@import"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;1,300&display=swap";.dialog[_ngcontent-%COMP%]{border-radius:10px;background-color:#f4f6ff;border-color:rgba(var(--color-4-rgb),.8);position:absolute;float:left;left:38%;top:50%;justify-items:center;align-items:center;transform:translate(-50%,-50%)}.grid-item2[_ngcontent-%COMP%], #People-Access-List[_ngcontent-%COMP%]{font-size:1.0625rem;font-family:Open Sans,sans-serif;color:#424874;border-radius:10px;background-color:#f4f6ff;text-align-last:center;width:5rem;margin-left:1.6rem}.grid-item2[_ngcontent-%COMP%]{margin-left:1.5rem;height:1.5rem}.Person-Name[_ngcontent-%COMP%]{color:#424874}.grid-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto;grid-gap:1rem;column-gap:16rem;padding:.625rem;max-height:12rem;overflow-y:scroll}.Display[_ngcontent-%COMP%]{display:flex}.Invite[_ngcontent-%COMP%]{background-color:#424874;color:#f4f6ff;border-radius:10px;border-color:rgba(var(--color-4-rgb),.25);height:2.2em;width:7.75rem;font-size:11.125rem;margin-left:.5em;border-color:#f4f6ff}.Only[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#424874;font-weight:400}#Access-List[_ngcontent-%COMP%]{background-color:#f4f6ff}.General-Text[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#424874;font-weight:700;margin-top:.5rem;font-size:1.375rem}.Access-Select[_ngcontent-%COMP%]{width:11rem;color:#fff;margin-bottom:.35rem}.Select-Button[_ngcontent-%COMP%]{color:#424874;font-size:1.0625rem;width:12rem}.Option-Icon[_ngcontent-%COMP%], .Option-Value[_ngcontent-%COMP%]{color:#424874}.Option-Icon1[_ngcontent-%COMP%]{color:#424874;margin-top:.5rem}.Option-Value1[_ngcontent-%COMP%]{font-size:1.0625rem;color:#424874;margin-top:.68rem;margin-left:.3rem}.Div-Group1[_ngcontent-%COMP%], .Div-Group2[_ngcontent-%COMP%]{display:flex}.Search[_ngcontent-%COMP%]{width:25em;border-color:rgba(var(--color-4-rgb),.25);border-radius:10px;background-color:#f4f6ff;color:#424874;margin-top:1em;height:2em;font-size:1.0625rem}.Title[_ngcontent-%COMP%]{font-family:Open Sans,sans-serif;color:#424874;font-weight:700;font-size:1.375rem}.List-Title[_ngcontent-%COMP%]{margin-top:.5em;font-family:Open Sans,sans-serif;color:#424874;font-weight:700;font-size:1.375rem}#security-icon[_ngcontent-%COMP%]{color:#424874;margin-right:.5em;margin-top:1rem}.Copy-Link[_ngcontent-%COMP%]{color:#fff;background-color:#424874;width:8.62em;font-size:1.0625rem;height:3em;border-radius:10px;margin-bottom:1.3rem;margin-left:.5em;border-color:#f4f6ff;display:flex}.Icon-Text[_ngcontent-%COMP%]{display:flex;margin-bottom:.3rem}.Copy-Text[_ngcontent-%COMP%]{margin-top:.7rem;margin-left:.5rem}.Copy-Icon[_ngcontent-%COMP%]{margin-top:.63rem}.Close[_ngcontent-%COMP%]{color:#424874;position:absolute;top:0;right:0;padding:.5rem;line-height:.875rem;font-size:1.5rem;border-style:none;margin-right:.5rem;background-color:#f4f6ff}.Close[_ngcontent-%COMP%]:hover{background-color:#424874;color:#f4f6ff}option[_ngcontent-%COMP%]{text-align:center}']});const C=[{path:"",component:c}];class r{}r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({imports:[u.Bz.forChild(C),u.Bz]});var O=n(2271);class l{}l.\u0275fac=function(e){return new(e||l)},l.\u0275mod=o.oAB({type:l}),l.\u0275inj=o.cJS({imports:[g.ez,r,d.Ps,s.LD,a.Is,O.m]})}}]);